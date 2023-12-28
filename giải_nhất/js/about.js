var swiper = new Swiper(".historySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 30,
      },
    },
  });
  
  new Swiper("#swiper-2", {
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 24,
    lazyLoading: true,
    loop: true,
    keyboard: {
      enabled: true,
    },
    navigation: {
      nextEl: "#nav-right",
      prevEl: "#nav-left",
    },
    breakpoints: {
      800: {
        slidesPerView: 1.5,
      },
      // 1400: {
      //     slidesPerView: 3
      // }
    },
  });