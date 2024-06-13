export const initScroll = () => {
    // Плавный скролл до блока

    const header = document.querySelector('header');
    const menuLinks = document.querySelectorAll('.nav-link');
    if (menuLinks) {
        const onMenuLinkClick = (evt) => {
            const menuLink = evt.target;
            if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
                const gotoBlock = document.querySelector(menuLink.dataset.goto);
                const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - header.offsetHeight;

                window.scrollTo({
                    top: gotoBlockValue,
                    behavior: 'smooth',
                });
                evt.preventDefault();
            }
        };

        if (menuLinks.length > 0) {
            menuLinks.forEach((menuLink) => {
                menuLink.addEventListener('click', onMenuLinkClick);
            });
        }
    }

    window.addEventListener('scroll', () => {
        let scrollTop = window.scrollY;
        if (scrollTop >= 50) {
            header.classList.add('shadow-filter-1');
        } else {
            header.classList.remove('shadow-filter-1');
        }
    });
}

