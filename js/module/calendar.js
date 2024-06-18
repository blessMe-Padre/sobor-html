export const initCalendar = () => {
    let date = '2024-06-17';

    function clearImgTags(imgs) {
        return imgs.map(tag => {
            let match = tag.match(/<img[^>]+>/);
            return match ? match[0] : '';
        });
    }

    function extractToday(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const todayDiv = doc.querySelector('.today');
        let todayContent = todayDiv.innerText;
        return todayContent;
    }

    function extractTitle(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const titleDiv = doc.querySelector('.main-block > p');
        return titleDiv;
    }

    async function fetchData(date) {
        try {
            const response = await fetch(`https://azbyka.ru/days/widgets/presentations.json?image=1&date=${date}`);
            if (!response.ok) {
                throw new Error('Ошибка ' + response.statusText);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Ошибка с запросом:', error);
        }
    }

    // Вызов функций ==========================================================

    // fetchData(date).then(data => {
    //     let cleanImgs = clearImgTags(data.imgs);
    //     let imageList = document.querySelector('.image-list');
    //     cleanImgs.forEach(imgTag => {
    //         let li = document.createElement('li');
    //         li.innerHTML = imgTag;
    //         imageList.appendChild(li);
    //     });
    // });

    // fetchData(date).then(data => {
    //     const cleanDate = extractToday(data.presentations);
    //     console.log(cleanDate);
    // });

    fetchData(date).then(data => {
        const cleanTitle = extractTitle(data.presentations);
        console.log(cleanTitle);
    });
}