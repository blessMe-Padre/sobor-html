export const initSlider = () => {

    // слайдер "Отзывы"
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const feedback = new Swiper('.hero-swiper', {
            loop: true,
            spaceBetween: 30,
            slidesPerView: 1,

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