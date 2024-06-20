export const initSlider = () => {

    // слайдер "Отзывы"
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const feedback = new Swiper('.hero-swiper', {
            loop: true,
            spaceBetween: 30,
            slidesPerView: 1,

            // navigation: {
            //     nextEl: '.swiper-button-next',
            //     prevEl: '.swiper-button-prev',
            // },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
        });
    }

    // слайдер "Отзывы"
    const newsSection = document.querySelector('.news');
    if (newsSection) {
        const feedback = new Swiper('.news-swiper', {
            loop: true,
            spaceBetween: 30,
            slidesPerView: 1,

            navigation: {
                nextEl: '.news-button-next',
                prevEl: '.news-button-prev',
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },

            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },

                1023: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }
        });
    }

    // слайдер "Иконы в календаре"
    const calendarSection = document.querySelector('.calendar');
    if (calendarSection) {
        const feedback = new Swiper('.icon-swiper', {
            loop: true,
            spaceBetween: 10,
            slidesPerView: 3,
            speed: 2000,
            autoplay: {
                delay: 2000,
            },

            breakpoints: {
                320: {
                    slidesPerView: 1,
                },
                767: {
                    slidesPerView: 2,
                    spaceBetween: 15,
                },

                1023: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                },
            }
        });
    }
}