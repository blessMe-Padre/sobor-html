export const initCurrentYear = () => {
    const year = new Date().getFullYear();
    const element = document.querySelectorAll('.data-span');
    if (element) {
        element.forEach(item => {
            item.innerText = year;
        });
    }
}




