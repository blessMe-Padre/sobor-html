export const initScrollToTop = () => {

    const scrollBtn = document.querySelector('.scroll-top');
    window.onscroll = () => {
        if (window.scrollY > 400) {
            scrollBtn.classList.add('is-active');
        } else if (window.scrollY < 400) {
            scrollBtn.classList.remove('is-active');
        }
    };
    scrollBtn.onclick = (e) => {
        e.preventDefault();
        window.scrollTo(0, 0);
    };
};

