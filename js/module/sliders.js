export const initSlider = () => {

    // слайдер "Отзывы"
    const feedback = document.querySelector('.feedback');
    if (feedback) {
        const feedback = new Swiper('.feedback', {
            loop: true,
            spaceBetween: 30,
            breakpoints: {
                374: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                767: {
                    slidesPerView: 2,
                },
                1023: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
        });
    }
}