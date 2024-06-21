export const initNav = () => {
    const body = document.querySelector('body');
    // Меню
    const mobileMenu = document.querySelector('.mobile-menu');
    const menuButton = document.querySelector('.btn-close-menu');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu a');
    const noiseSection = document.querySelector('.noise');

    menuButton.addEventListener('click', evt => {
        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('is-active');
        body.classList.toggle('lock');
        body.classList.toggle('is-active');

        if (body.classList.contains('is-active')) {
            body.addEventListener('click', evt => {
                console.log(evt.target);
            });
        }
    });

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', (evt) => {
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            body.classList.remove('lock');
        });
    });

    if (noiseSection) {
        noiseSection.addEventListener('click', (evt) => {
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            body.classList.remove('is-active');
        });
    }

    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuButton.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            body.classList.remove('is-active');
        });
    });
}