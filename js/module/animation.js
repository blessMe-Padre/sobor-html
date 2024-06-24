export const initAnimation = () => {
    const animateElement = document.querySelector('.animate-element');
    const animateElementImage = document.querySelector('.animate-element-image');

    const animateElement2 = document.querySelector('.animate-element-2');
    const animateElementImage2 = document.querySelector('.animate-element-image-2');

    if (animateElement) {
        document.addEventListener('scroll', function () {
            const section = document.querySelector('.animate-section'); // Получаем секцию, внутри которой будет происходить анимация
            const sectionRect = section.getBoundingClientRect(); // Получаем размеры и положение секции относительно окна
            const windowHeight = window.innerHeight || document.documentElement.clientHeight; // Получаем высоту окна браузера

            // Устанавливаем начальное значение translateX равное 0
            animateElement.style.transform = 'translateX(0px)';

            // Проверяем, находится ли секция в видимой области окна браузера
            if (sectionRect.top <= windowHeight && sectionRect.bottom >= 0) {
                const sectionWidth = sectionRect.width; // Ширина секции
                const elementWidth = animateElement.offsetWidth; // Ширина анимируемого элемента
                const maxTranslateX = sectionWidth - elementWidth; // Максимальное смещение элемента по оси X

                const scrollY = window.scrollY || window.pageYOffset; // Текущая позиция прокрутки по оси Y
                const sectionTop = section.offsetTop; // Положение верхней границы секции относительно документа
                const sectionHeight = section.offsetHeight; // Высота секции

                // Вычисляем прогресс прокрутки внутри секции
                const scrollProgress = (scrollY - sectionTop) / (sectionHeight - windowHeight);
                // Ограничиваем прогресс прокрутки значениями от 0 до 1
                const boundedScrollProgress = Math.max(0, Math.min(1, scrollProgress));

                // Вычисляем смещение элемента по оси X
                const translateX = (436) - (maxTranslateX * boundedScrollProgress);
                // const translateX = maxTranslateX * boundedScrollProgress;

                // Применяем смещение к элементу
                animateElement.style.transform = `translateX(${translateX}px)`;
                animateElementImage.style.transform = `translateX(${translateX}px)`;
            }
        });
    }

    if (animateElement2) {
        document.addEventListener('scroll', function () {
            const section = document.querySelector('.animate-section-2'); // Получаем секцию, внутри которой будет происходить анимация
            const sectionRect = section.getBoundingClientRect(); // Получаем размеры и положение секции относительно окна
            const windowHeight = window.innerHeight || document.documentElement.clientHeight; // Получаем высоту окна браузера

            // Устанавливаем начальное значение translateX равное 0
            animateElementImage2.style.transform = 'rotate(0deg)';

            // Проверяем, находится ли секция в видимой области окна браузера
            if (sectionRect.top <= windowHeight && sectionRect.bottom >= 0) {
                const sectionWidth = sectionRect.width; // Ширина секции
                const elementWidth = animateElement.offsetWidth; // Ширина анимируемого элемента
                const maxTranslateX = sectionWidth - elementWidth; // Максимальное смещение элемента по оси X

                const scrollY = window.scrollY || window.pageYOffset; // Текущая позиция прокрутки по оси Y
                const sectionTop = section.offsetTop; // Положение верхней границы секции относительно документа
                const sectionHeight = section.offsetHeight; // Высота секции

                // Вычисляем прогресс прокрутки внутри секции
                const scrollProgress = (scrollY - sectionTop) / (sectionHeight - windowHeight);
                // Ограничиваем прогресс прокрутки значениями от 0 до 1
                const boundedScrollProgress = Math.max(0, Math.min(1, scrollProgress));

                // Вычисляем смещение элемента по оси X
                const rotate = ((maxTranslateX * boundedScrollProgress) / 10 - 40) / 3;

                console.log(rotate);

                // Применяем смещение к элементу
                animateElement2.style.transform = `rotate(${rotate}deg)`;
                animateElementImage2.style.transform = `rotate(${rotate}deg)`;
            }
        });
    }
};

