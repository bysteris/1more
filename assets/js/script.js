document.addEventListener("DOMContentLoaded", function () {
  //swiper на главном экране
  var mySwiper = new Swiper(".swiper-container", {
    direction: "vertical",
    loop: false,
    pagination: ".swiper-pagination",
    grabCursor: false,
    speed: 1000,
    paginationClickable: true,
    parallax: true,
    autoplay: false,
    effect: "slide",
    //mousewheelControl: 1,
    mousewheel: {
      invert: false,
      releaseOnEdges: true,
    },
  });


  const bcg = document.querySelector(".evolution-line .move");
  const evolutionPage = document.querySelector(".evolution-page");

  window.addEventListener("scroll", () => {
    let calc = (((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100) + 100);
    bcg.style.height = `${calc}vh`;

    if (window.scrollY > (window.screen.availHeight) / 2) {

      bcg.classList.add('active');
    } else {
      bcg.classList.remove('active');
    }
  });


  // Инит AOSanimation
  AOS.init();

  gsap.to(".radius-section", {
    scrollTrigger: {
        trigger: ".radius-section",
        start: "10% 100%",
        end: "100% 95%",
        scrub: 1
    },
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    // scale: 1.2,
    duration: 2
});
});