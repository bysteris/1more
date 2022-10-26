const headElem = document.getElementById("headTest");
const buttonsElem = document.getElementById("buttonsTest");
const pagesElem = document.getElementById("testPages");

//Класс, который представляет сам тест
class Quiz
{
	constructor(type, questions, results)
	{
		//Тип теста: 1 - классический тест с правильными ответами, 2 - тест без правильных ответов
		this.type = type;

		//Массив с вопросами
		this.questions = questions;

		//Массив с возможными результатами
		this.results = results;

		//Количество набранных очков
		this.score = 0;

		//Номер результата из массива
		this.result = 0;

		//Номер текущего вопроса
		this.current = 0;
	}

	Click(index)
	{
		//Добавляем очки
		let value = this.questions[this.current].Click(index);
		this.score += value;

		let correct = -1;

		//Если было добавлено хотя одно очко, то считаем, что ответ верный
		if(value >= 1)
		{
			correct = index;
		}
		else
		{
			//Иначе ищем, какой ответ может быть правильным
			for(let i = 0; i < this.questions[this.current].answers.length; i++)
			{
				if(this.questions[this.current].answers[i].value >= 1)
				{
					correct = i;
					break;
				}
			}
		}

		this.Next();

		return correct;
	}

	//Переход к следующему вопросу
	Next()
	{
		this.current++;
		
		if(this.current >= this.questions.length) 
		{
			this.End();
		}
	}

	//Если вопросы кончились, этот метод проверит, какой результат получил пользователь
	End()
	{
		for(let i = 0; i < this.results.length; i++)
		{
			if(this.results[i].Check(this.score))
			{
				this.result = i;
			}
		}
	}
} 

//Класс, представляющий вопрос
class Question 
{
	constructor(text, answers)
	{
		this.text = text; 
		this.answers = answers; 
	}

	Click(index) 
	{
		return this.answers[index].value; 
	}
}

//Класс, представляющий ответ
class Answer 
{
	constructor(text, value) 
	{
		this.text = text; 
		this.value = value; 
	}
}

//Класс, представляющий результат
class Result 
{
	constructor(text, value)
	{
		this.text = text;
		this.value = value;
	}

	//Этот метод проверяет, достаточно ли очков набрал пользователь
	Check(value)
	{
		if(this.value <= value)
		{
			return true;
		}
		else 
		{
			return false;
		}
	}
}

//Массив с результатами
const results = 
[
	new Result("Ваша скидка 3%, выберите магазин", 0),
	new Result("Ваша скидка 3%, выберите магазин", 3),
	new Result("Ваша скидка 7%, выберите магазин", 5),
	new Result("Ваша скидка 10%, выберите магазин", 7)
];

//Массив с вопросами
const questions = 
[
	new Question("Кто создал первые в мире стереонаушники?", 
	[
		new Answer("Томас Эдисон", 0),
		new Answer("Джон Косс", 1),
		new Answer("Эрнест Меркадье", 0)
	]),

	new Question("В каком году были выпущены первые советские наушники стандарта Hi-Fi?", 
	[
		new Answer("1979", 1),
		new Answer("1984", 0),
		new Answer("1989", 0)
	]),

	new Question("В какой стране появились первые наушники в мире?", 
	[
		new Answer("Япония", 0),
		new Answer("США", 1),
		new Answer("Россия", 0)
	]),

	new Question("В каком веке появились первые беспроводные наушники?", 
	[
		new Answer("19 век", 0),
		new Answer("20 век", 0),
		new Answer("21 век", 1),
	]),

	new Question("Какие наушники впервые поставлялись вместе с плеером?", 
	[
		new Answer("Sony (MDL-3L2)", 1),
		new Answer("Bluetake (i-PHONO BT420EX)", 0),
		new Answer("Sennheiser HD 414", 0),
	]),

	new Question("Кто придумал наушники-затычки?", 
	[
		new Answer("Изобретатель радио Александр Попов", 0),
		new Answer("Фирма слуховых аппаратов Westone", 0),
		new Answer("Звукорежиссер группы Van Halen", 1),
	]),

	new Question("В каком году появились первые стереонаушники?", 
	[
		new Answer("1937", 0),
		new Answer("1958", 1),
		new Answer("1960", 0),
	]),

	new Question("Какая модель наушников была самой популярной в СССР?", 
	[
		new Answer("ТДС-3", 1),
		new Answer("ТДС-7", 0),
		new Answer("ТДС-15", 0),
	]),

	new Question("В каком году появились первые беспроводные наушники?", 
	[
		new Answer("1989", 0),
		new Answer("1995", 0),
		new Answer("2005", 1),
	]),

	new Question("Какая технология использовалась в советских наушниках ТДК-3?", 
	[
		new Answer("Монофония", 0),
		new Answer("Амбифония", 0),
		new Answer("Квадрофония", 1),
	])
	
];

//Сам тест
const quiz = new Quiz(1, questions, results);

Update();

//Обновление теста
function Update()
{
	//Проверяем, есть ли ещё вопросы
	if(quiz.current < quiz.questions.length) 
	{
		//Если есть, меняем вопрос в заголовке
		headElem.innerHTML = quiz.questions[quiz.current].text;

		//Удаляем старые варианты ответов
		buttonsElem.innerHTML = "";

		//Создаём кнопки для новых вариантов ответов
		for(let i = 0; i < quiz.questions[quiz.current].answers.length; i++)
		{
			let btn = document.createElement("div");
			btn.className = "test-modal_body-item";

			btn.innerHTML = quiz.questions[quiz.current].answers[i].text;

			btn.setAttribute("index", i);

			buttonsElem.appendChild(btn);
		}
		
		//Выводим номер текущего вопроса
		pagesElem.innerHTML = (quiz.current + 1) + " / " + quiz.questions.length;

		//Вызываем функцию, которая прикрепит события к новым кнопкам
		Init();
	}
	else
	{
		//Если это конец, то выводим результат
		buttonsElem.innerHTML = "";
		headElem.innerHTML = quiz.results[quiz.result].text;
		pagesElem.innerHTML = quiz.score + " из 10";
	}
}

function Init()
{
	//Находим все кнопки
	let btns = document.getElementsByClassName("test-modal_body-item");

	for(let i = 0; i < btns.length; i++)
	{
		//Прикрепляем событие для каждой отдельной кнопки
		//При нажатии на кнопку будет вызываться функция Click()
		btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
	}
}

function Click(index) 
{
	//Получаем номер правильного ответа
	let correct = quiz.Click(index);

	//Находим все кнопки
	let btns = document.getElementsByClassName("test-modal_body-item");

	//Делаем кнопки серыми
	for(let i = 0; i < btns.length; i++)
	{
		btns[i].className = "test-modal_body-item passive";
	}

	//Если это тест с правильными ответами, то мы подсвечиваем правильный ответ зелёным, а неправильный - красным
	if(quiz.type == 1)
	{
		if(correct >= 0)
		{
			btns[correct].className = "test-modal_body-item correct";
		}

		if(index != correct) 
		{
			btns[index].className = "test-modal_body-item wrong";
		}
	}
	else
	{
		//Иначе просто подсвечиваем зелёным ответ пользователя
		btns[index].className = "test-modal_body-item correct";
	}

	//Ждём секунду и обновляем тест
	setTimeout(Update, 1000);
}