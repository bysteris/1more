$(document).ready(function () {
  $(window).on('load', function() {
    //Прелоадер 
    $(".preloader")
      .delay(1200)
      .queue(function (next) {
          $(this).addClass("active");
      });
    $(".preloader-layer")
    .delay(1200)
    .queue(function (next) {
        $(this).addClass("active");
    });
    next();
  });
  
  // Плавная прокрутка по якорям
  $("a[href*='#']").on("click", function (e) {
    var anchor = $(this);

    if ($(".header-burger").hasClass("active")) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top,
          },
          {
            duration: 700,
            easing: "swing",
          }
        );
    } else {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $(anchor.attr("href")).offset().top,
          },
          {
            duration: 1000,
            easing: "swing",
          }
        );
    }
    e.preventDefault();
    return false;
  });

  // TimeLine Animation
  (function ($) {
    $(function () {
      $(window).on("scroll", function () {
        fnOnScroll();
      });

      $(window).on("resize", function () {
        fnOnResize();
      });

      var agTimeline = $(".js-timeline"),
        agTimelineLine = $(".js-timeline_line"),
        agTimelineLineProgress = $(".js-timeline_line-progress"),
        agTimelinePoint = $(".js-timeline-card_point-box"),
        agTimelineItem = $(".js-timeline_item"),
        agOuterHeight = $(window).outerHeight(),
        agHeight = $(window).height(),
        f = -1,
        agFlag = false;

      function fnOnScroll() {
        agPosY = $(window).scrollTop();

        fnUpdateFrame();
      }

      function fnOnResize() {
        agPosY = $(window).scrollTop();
        agHeight = $(window).height();

        fnUpdateFrame();
      }

      function fnUpdateWindow() {
        agFlag = false;

        agTimelineLine.css({
          top:
            agTimelineItem.first().find(agTimelinePoint).offset().top -
            agTimelineItem.first().offset().top,
          bottom:
            agTimeline.offset().top +
            agTimeline.outerHeight() -
            agTimelineItem.last().find(agTimelinePoint).offset().top,
        });

        f !== agPosY && ((f = agPosY), agHeight, fnUpdateProgress());
      }

      function fnUpdateProgress() {
        var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

        i = agTop + agPosY - $(window).scrollTop();
        a =
          agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
        n = agPosY - a + agOuterHeight / 1.2;
        i <= agPosY + agOuterHeight / 2 && (n = i - a);
        agTimelineLineProgress.css({
          height: n + "px",
        });

        agTimelineItem.each(function () {
          var agTop = $(this).find(agTimelinePoint).offset().top;

          agTop + agPosY - $(window).scrollTop() < agPosY + 0.85 * agOuterHeight
            ? $(this).addClass("js-ag-active")
            : $(this).removeClass("js-ag-active");
        });
      }

      function fnUpdateFrame() {
        agFlag || requestAnimationFrame(fnUpdateWindow);
        agFlag = true;
      }
    });
  })(jQuery);

  // GSAP scripts
  gsap.registerPlugin(ScrollTrigger);

  // Hero Slider
  function hero() {
    const heroItems = gsap.utils.toArray(".hero-item");

    const heroItemsTL = gsap.timeline();

    function slideTL(heroItem, isFirst = false) {
      const tlHero = gsap.timeline();

      if (!isFirst) {
        tlHero.from(heroItem, { yPercent: 100,});
        tlHero.from(heroItem.querySelector(".circles-wrapper"), {
          duration: 0.1,
          transform: "rotateZ(45deg)",
        },0.2);
        tlHero.from(heroItem.querySelector(".section_img"), {
          duration: 1,
          opacity: 0,
          x: -200,
        },0.8);
        tlHero.from(heroItem.querySelector(".section_title"), {
          duration: 0.5,
          opacity: 0,
          x: -100,
        },0.5);
        tlHero.from(heroItem.querySelector(".section-description"), {
          duration: 0.6,
          opacity: 0,
          x: -100,
        },0.5);
        tlHero.from(heroItem.querySelector(".section_mini-img"), {
          duration: 0.7,
          scale: 0,
        },0.6);
        tlHero.from(heroItem.querySelector(".gift"), {
          duration: 1,
          scale: 0,
        },0.9);
      }

      // tlHero.fromTo(heroItem.querySelector(".hero_bg-img"), { 
      //   yPercent: isFirst ? 0 : 0 
      // }, { 
      //   yPercent: -1 
      // },0);

      return tlHero;
    }

    heroItems.forEach((heroItem, i) => {
      if (i === 0) {
        heroItemsTL.add(slideTL(heroItem, true));
      } else {
        heroItemsTL.add(slideTL(heroItem), "+=0.1");
      }
    });

    ScrollTrigger.create({
      animation: heroItemsTL,
      trigger: ".hero-container",
      start: "top top",
      end: `+=${heroItems.length * 100}%`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    });
  }
  hero();

  // Banner with radius
  let radius = gsap.to(".banner-radius", {
    scrollTrigger: {
      trigger: ".banner-radius",
      start: "20% 100%",
      end: "100% 100%",
      scrub: 1,
      //markers: true,
    },
    scale: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    duration: 0.1,
  });

  gsap.from(".banner-title", {
    scrollTrigger: {
      trigger: ".banner-title",
      start: "-100% 100%",
      end: "0% 100%",
      scrub: 1,
    },
    yPercent: 100,
    ease: "SlowMo",
    stagger: 0.2,
    duration: 2,
  });

  gsap.from(".banner-description_wrapper", {
    scrollTrigger: {
      trigger: ".banner-description_wrapper",
      start: "100% 100%",
      end: "bottom bottom",
      scrub: 2,
      //markers: true
    },
    xPercent: -10,
    opacity: 0,
    ease: "SlowMo",
    stagger: 0.2,
    duration: 2,
  });

  // Horizontal Scroll Banner
  let sections = gsap.utils.toArray(".banner_horizontal-container .page");

  let horizontal = gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "SlowMo",
    scrollTrigger: {
      trigger: ".page-banner",
      pin: ".page-banner",
      anticipatePin: 1,
      scrub: 1,
      //pinSpacing: false,
      snap: 1 / (sections.length - 1),
      end: () => "+=" + document.querySelector(".page-banner").offsetWidth,
      //markers: true,
    },
  });

  // Headphones left and right to center
  gsap.timeline({
      scrollTrigger: {
        trigger: ".page-contest",
        start: "0% 100%",
        end: "bottom bottom",
        scrub: 1,
        // pin: true,
        //markers: true,
      },
      ease: "SlowMo",
    })
    .to(".contest-wave",{ yPercent: 20, scale: 1, ease: "SlowMo" }, 0)
    .to(".contest-left-headphone",{ marginLeft: 0 }, 0)
    .to(".contest-right-headphone",{ marginRight: 0 }, 0)
    .to(".contest-container",{ yPercent: 20,ease: "SlowMo" }, 0)
    .to(".contest-description h1",{ yPercent: 80, opacity: 1, ease: "SlowMo" }, 0)
    .to(".contest-description span",{ yPercent: 200, opacity: 1, ease: "SlowMo" }, 0)
    .to(".contest-btn", { yPercent: -600, opacity: 1, ease: "SlowMo", transition: "translate 0.5s" }, 0);

  // Animation for title Page Buy
  gsap.from(".buy-title h1:nth-child(1)", {
    scrollTrigger: {
      trigger: ".buy-title",
      start: "0% 100%",
      end: "bottom bottom",
      scrub: 1,
      //markers: true
    },
    xPercent: -60,
    opacity: 0,
    ease: "SlowMo",
    transition: "all 0.2s",
  });

  gsap.from(".buy-title h1:nth-child(2)", {
    scrollTrigger: {
      trigger: ".buy-title",
      start: "0% 100%",
      end: "bottom bottom",
      scrub: 1,
      //markers: true
    },
    xPercent: -100,
    opacity: 0,
    ease: "SlowMo",
    transition: "all 0.2s",
  });

  gsap.from(".buy-title h1:nth-child(3)", {
    scrollTrigger: {
      trigger: ".buy-title",
      start: "0% 100%",
      end: "bottom bottom",
      scrub: 1,
      //markers: true
    },
    xPercent: -140,
    opacity: 0,
    ease: "SlowMo",
    transition: "all 0.2s",
  });

  //Animation block for Page Buy
  gsap.from(".buy-item:nth-child(1) .buy-item_img", {
    scrollTrigger: {
      trigger: ".buy-item:nth-child(1) .buy-item_img",
      start: "0% 100%",
      end: "10% 100%",
      scrub: 1,
    },
    yPercent: 20,
    ease: "SlowMo",
  });

  gsap.from(".buy-item:nth-child(1) .buy-item_img img", {
    scrollTrigger: {
      trigger: ".buy-item:nth-child(1) .buy-item_img img",
      start: "0% 100%",
      end: "20% 100%",
      scrub: 1,
    },
    yPercent: 20,
    ease: "SlowMo",
  });

  gsap.from(".buy-item:nth-child(2) .buy-item_img", {
    scrollTrigger: {
      trigger: ".buy-item:nth-child(2) .buy-item_img",
      start: "0% 100%",
      end: "10% 100%",
      scrub: 1,
    },
    yPercent: 20,
    ease: "SlowMo",
  });

  gsap.from(".buy-item:nth-child(2) .buy-item_img img", {
    scrollTrigger: {
      trigger: ".buy-item:nth-child(2) .buy-item_img img",
      start: "0% 100%",
      end: "20% 100%",
      scrub: 1,
    },
    yPercent: 20,
    ease: "SlowMo",
  });

  gsap.from(".buy-item:nth-child(3) .buy-item_img", {
    scrollTrigger: {
      trigger: ".buy-item:nth-child(3) .buy-item_img",
      start: "0% 100%",
      end: "10% 100%",
      scrub: 1,
    },
    yPercent: 20,
    ease: "SlowMo",
  });

  gsap.from(".buy-item:nth-child(3) .buy-item_img img", {
    scrollTrigger: {
      trigger: ".buy-item:nth-child(3) .buy-item_img img",
      start: "0% 100%",
      end: "20% 100%",
      scrub: 1,
    },
    yPercent: 20,
    ease: "SlowMo",
  });

  // hover effect on btn
  let $buyItemBtn = $(".buy-item_btn"),
    $buyItemImg = $(".buy-item_img");

  $buyItemBtn.each(function (i) {
    $(this).hover(function () {
      $buyItemImg.eq(i).toggleClass("active");
    });
  });

  // Horizontal Scroll Second Banner
  const slides = gsap.utils.toArray(".slide");
  const slidesTL = gsap.timeline();

  function slideTL(slide, isFirst = false) {
    const tl = gsap.timeline();
    if (!isFirst) {
      tl.from(slide, {
        xPercent: 100,
      });
    }

    tl.fromTo(
      slide.querySelector(".bg-img"),
      {
        xPercent: isFirst ? 0 : 8,
      },
      {
        xPercent: -8,
      },
      0.2
    );

    return tl;
  }

  slides.forEach((slide, i) => {
    if (i === 0) {
      slidesTL.add(slideTL(slide, true));
    } else {
      slidesTL.add(slideTL(slide), "-=0.1");
    }
  });

  ScrollTrigger.create({
    animation: slidesTL,
    trigger: ".slide-container",
    end: `+=${slides.length * 100}%`,
    scrub: 1,
    pin: true,
    anticipatePin: 1,
    //markers: true,
  });

  // Открытие и закрытие меню
  let headerBurger = document.querySelector(".header-burger"),
      burgerMenu = document.querySelector(".burger-menu"),
      footer = document.querySelector("footer"),
      burgerMenuItems = document.querySelectorAll(".burger-menu_list-item");

  headerBurger.addEventListener("click", function () {
    this.classList.toggle("active");
    burgerMenu.classList.toggle("active");
    footer.classList.toggle("active"),
    document.body.classList.toggle("active");
    

    if (this.classList.contains("active")) {
      document.querySelector(".center-block").style.opacity = 0;
    }
    else {
      document.querySelector(".center-block").style.opacity = 1;
    }   

  });

  burgerMenuItems.forEach(burgerMenuItem => {
    burgerMenuItem.addEventListener("click", function () {
      setTimeout(function () {
        headerBurger.classList.remove("active");
        burgerMenu.classList.remove("active");
        footer.classList.remove("active");
        document.body.classList.remove("active");
        document.querySelector(".center-block").style.opacity = 1;
      }, 600);
    });
  });

  // Открытие и закрытие модального окна на баннере
  let bannerBtn = document.querySelector(".banner-btn"),
      bannerModal = document.querySelector(".banner-modal"),
      bannerModalContent = document.querySelector(".banner-modal_content"),
      bannerModalClose = document.querySelector(".banner-modal_close");

  bannerBtn.addEventListener("click", function () {
    bannerModal.classList.add("active");
    bannerModalContent.classList.add("active");
    bannerModalClose.classList.add("active");
  });

  bannerModalClose.addEventListener("click", function () {
    setTimeout(function () {
      bannerModal.classList.remove("active");
    }, 1200);
    bannerModalContent.classList.remove("active");
    bannerModalClose.classList.remove("active");
  });

  // Открытие и закрытие формы на блоке с конкурсом
  let contestBtn = document.querySelector(".contest-btn"),
      contestModal = document.querySelector(".contest-modal"),
      contestModalContent = document.querySelector(".contest-modal_content"),
      contestModalClose = document.querySelector(".contest-modal_close");

  contestBtn.addEventListener("click", function () {
    contestModal.classList.add("active");
    contestModalContent.classList.add("active");
    contestModalClose.classList.add("active");
  });

  contestModalClose.addEventListener("click", function () {
    setTimeout(function () {
      contestModal.classList.remove("active");
    }, 1300);
    contestModalContent.classList.remove("active");
    contestModalClose.classList.remove("active");
  });

  // Открытие и закрытие модального окна у теста
  let testModal = document.querySelector(".test-modal"),
    btnModal = document.querySelector(".test-btn"),
    btnModalClsoe = document.querySelector(".test-modal_close");

  btnModal.addEventListener("click", function () {
    testModal.classList.add("active");
  });

  btnModalClsoe.addEventListener("click", function () {
    testModal.classList.remove("active");
  });

  // Анимация звуковой волны в хедере
  var loadTimeOut = function () {
    var soundWave = $(".sound-wave .bar").removeClass("bar");
    setTimeout(function () {}, 3000);
  };
  $(".sound-wave .bar").addClass("bar2");

});