export const initCalendar = () => {

    // Дни недели с понедельника
    const DaysOfWeek = ['Пн', 'Вт', 'Ср', 'Чтв', 'Пт', 'Сб', 'Вс'];

    // Месяцы начиная с января
    const Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    // Получить элемент по id
    const getId = id => document.getElementById(id);

    const createCalendar = (divId) => {
        let d = new Date();
        let currMonth = d.getMonth();
        let currYear = d.getFullYear();
        let currDay = d.getDate();

        const showMonth = (y, m) => {
            const firstDayOfMonth = new Date(y, m, 1).getDay();
            const lastDateOfMonth = new Date(y, m + 1, 0).getDate();
            const lastDayOfLastMonth = m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

            let html = '<table>';
            html += '<thead><tr>';
            html += '<td colspan="7" class="header-date">' + Months[m] + ' ' + y + '</td>';
            html += '</tr></thead>';

            html += '<tr class="days">';
            DaysOfWeek.forEach(day => {
                html += '<td>' + day + '</td>';
            });
            html += '</tr>';

            let i = 1;
            do {
                let dow = new Date(y, m, i).getDay();

                if (dow === 1) {
                    html += '<tr>';
                } else if (i === 1) {
                    html += '<tr>';
                    let k = lastDayOfLastMonth - firstDayOfMonth + 1;
                    for (let j = 0; j < firstDayOfMonth; j++) {
                        html += '<td class="cell not-current">' + k + '</td>';
                        k++;
                    }
                }

                const chk = new Date();
                const chkY = chk.getFullYear();
                const chkM = chk.getMonth();
                if (chkY === currYear && chkM === currMonth && i === currDay) {
                    html += '<td class="cell today">' + i + '</td>';
                } else {
                    html += '<td class="cell normal">' + i + '</td>';
                }

                if (dow === 0) {
                    html += '</tr>';
                } else if (i === lastDateOfMonth) {
                    let k = 1;
                    for (dow; dow < 7; dow++) {
                        html += '<td class="not-current">' + k + '</td>';
                        k++;
                    }
                }

                i++;
            } while (i <= lastDateOfMonth);

            html += '</table>';

            getId(divId).innerHTML = html;
        };

        const dateHandler = () => {
            const dayCell = document.querySelectorAll('.cell');
            dayCell.forEach(element => {
                element.addEventListener('click', (evt) => {
                    const headerDate = document.querySelector('.header-date');
                    const headerDateValue = headerDate.innerHTML;

                    const formattedDate = formatDate(headerDateValue);
                    let currentDay = evt.target.innerHTML;
                    console.log(currentDay);
                    const daysTitle = document.querySelector('.holiday-titles');

                    removeAllChildren(daysTitle);

                    let date = formattedDate + '-' + currentDay;
                    console.log(date);
                    addHolidayContent(date);
                });
            });
        };

        const nextMonth = () => {
            if (currMonth === 11) {
                currMonth = 0;
                currYear++;
            } else {
                currMonth++;
            }
            showMonth(currYear, currMonth);
            dateHandler();
        };

        const previousMonth = () => {
            if (currMonth === 0) {
                currMonth = 11;
                currYear--;
            } else {
                currMonth--;
            }
            showMonth(currYear, currMonth);
            dateHandler();
        };

        showMonth(currYear, currMonth);

        getId('btnNext').onclick = nextMonth;
        getId('btnPrev').onclick = previousMonth;
        dateHandler();
    };

    createCalendar("divCal");


    // ===================================================================================================

    function addHolidayContent(date) {

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

        // fetchData(date).then(data => {
        //     const cleanDate = extractToday(data.presentations);
        //     console.log(cleanDate);
        // });

        fetchData(date).then(data => {
            const daysTitle = document.querySelector('.holiday-titles');
            const cleanTitle = extractTitle(data.presentations);
            cleanTitle.forEach(item => {
                let li = document.createElement('li');
                li.innerText = item;
                daysTitle.appendChild(li);
            });
        });

        // fetchData(date).then(data => {
        //     const cleanTitle = extractTitle(data.presentations);
        //     const daysTitle = document.querySelector('.holiday-content');

        //     cleanTitle.forEach(item => {
        //         let li = document.createElement('li');
        //         li.innerText = item;
        //         daysTitle.appendChild(li);
        //     });
        // });

        // TODO добавить цитату дня 
    }

    //  утилиты =======================================================================================
    function removeAllChildren(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    function formatDate(headerDateValue) {
        const months = {
            "Январь": "01",
            "Февраль": "02",
            "Март": "03",
            "Апрель": "04",
            "Май": "05",
            "Июнь": "06",
            "Июль": "07",
            "Август": "08",
            "Сентябрь": "09",
            "Октябрь": "10",
            "Ноябрь": "11",
            "Декабрь": "12"
        };

        const [month, year] = headerDateValue.split(' ');
        const formattedMonth = months[month];

        if (!formattedMonth) {
            throw new Error('Invalid month format');
        }

        return `${year}-${formattedMonth}`;
    }
};