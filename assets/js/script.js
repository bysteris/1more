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
        n = agPosY - a + agOuterHeight / 2;
        i <= agPosY + agOuterHeight / 2 && (n = i - a);
        agTimelineLineProgress.css({ height: n + "px" });

        agTimelineItem.each(function () {
          var agTop = $(this).find(agTimelinePoint).offset().top;

          agTop + agPosY - $(window).scrollTop() < agPosY + 0.5 * agOuterHeight
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

  gsap.to(".banner-radius", {
    scrollTrigger: {
      trigger: ".banner-radius",
      start: "25% 100%",
      end: "100% 100%",
      scrub: 1,
      //markers: true,
    },
    scale: 1,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    duration: 2,
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
      end: "200% 100%",
      scrub: 1,
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

  gsap.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: "SlowMo",
    scrollTrigger: {
      trigger: ".banner-wrapper",
      pin: true,
      start: "top",
      //markers: true,
      scrub: 2,
      end: () =>
        "+=" +
        document.querySelector(".banner_horizontal-container").offsetWidth / 2,
    },
  });

  // Horizontal Scroll Second Banner
  let sections2 = gsap.utils.toArray(
    ".second-banner_horizontal-container .page"
  );

  gsap.to(sections2, {
    xPercent: -100 * (sections2.length - 1),
    ease: "SlowMo",
    scrollTrigger: {
      trigger: ".second-banner_wrapper",
      pin: true,
      start: "top",
      //markers: true,
      scrub: 1,
      end: () =>
        "+=" +
        document.querySelector(".second-banner_horizontal-container")
          .offsetWidth /
          2,
    },
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
