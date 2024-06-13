export const initCurrentYear = () => {
    const year = new Date().getFullYear();
    const element = document.querySelector('.data-span');
    if (element) {
        element.innerText = year;
    }
}