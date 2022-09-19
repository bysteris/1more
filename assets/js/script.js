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


});
