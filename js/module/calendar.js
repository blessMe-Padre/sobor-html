export const initCalendar = () => {
    let date = '2024-06-20';

    function clearImgTags(imgs) {
        return imgs.map(tag => {
            let match = tag.match(/<img[^>]+>/);
            return match ? match[0] : '';
        });
    }


    async function fetchData(date) {
        try {
            const response = await fetch(`https://azbyka.ru/days/widgets/presentations.json?image=1&date=${date}`);
            if (!response.ok) {
                throw new Error('Ошибка ' + response.statusText);
            }
            const data = await response.json();
            console.log(data);
            return data;
        } catch (error) {
            console.error('Ошибка с запросом:', error);
        }
    }


    // Вызов функций
    fetchData(date).then(data => {
        let cleanImgs = clearImgTags(data.imgs);
        let imageList = document.querySelector('.image-list');
        cleanImgs.forEach(imgTag => {
            let li = document.createElement('li');
            li.innerHTML = imgTag;
            imageList.appendChild(li);
        });
    });
}