export const initHoliday = () => {


    // let date = localStorage.getItem('date');
    let date = '2024-06-20';

    // Изображения
    function clearImgTags(imgs) {
        return imgs.map(tag => {
            let match = tag.match(/<img[^>]+>/);
            return match ? match[0] : '';
        });
    }

    // Дата
    function extractToday(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const todayDiv = doc.querySelector('.today');
        let todayContent = todayDiv.innerText;
        return todayContent;
    }

    // Заголовки
    function extractTitle(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const titleDiv = doc.querySelector('.main-block > p');
        const links = titleDiv.querySelectorAll('a');
        let titleArrays = [];
        links.forEach(link => {
            titleArrays.push(link.innerText);
        });

        return titleArrays;
    }
    // Контент
    function extractTitle(htmlString) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        const titleDiv = doc.querySelector('.main-block > p:nth-child(2)');
        const links = titleDiv.querySelectorAll('a');
        let ContentArrays = [];
        links.forEach(link => {
            ContentArrays.push(link.innerText);
        });
        return ContentArrays;
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
    //     let imageList = document.querySelector('.holiday-image-list');
    //     cleanImgs.forEach(imgTag => {
    //         let li = document.createElement('li');
    //         li.innerHTML = imgTag;
    //         imageList.appendChild(li);
    //     });
    // });

    fetchData(date).then(data => {
        const cleanDate = extractToday(data.presentations);
        console.log(cleanDate);
    });

    fetchData(date).then(data => {
        const cleanTitle = extractTitle(data.presentations);
        const daysTitle = document.querySelector('.holiday-titles');

        cleanTitle.forEach(item => {
            let li = document.createElement('li');
            li.innerText = item;
            daysTitle.appendChild(li);
        });
    });

    fetchData(date).then(data => {
        const cleanTitle = extractTitle(data.presentations);
        const daysTitle = document.querySelector('.holiday-content');

        cleanTitle.forEach(item => {
            let li = document.createElement('li');
            li.innerText = item;
            daysTitle.appendChild(li);
        });
    });

    // TODO добавить цитату дня 

}