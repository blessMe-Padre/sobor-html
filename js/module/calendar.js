export const initCalendar = () => {

    var Cal = function (divId) {

        //Сохраняем идентификатор div
        this.divId = divId;

        // Дни недели с понедельника
        this.DaysOfWeek = [
            'Пн',
            'Вт',
            'Ср',
            'Чт',
            'Пт',
            'Сб',
            'Вс'
        ];

        // Месяцы начиная с января
        this.Months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

        //Устанавливаем текущий месяц, год
        var d = new Date();

        this.currMonth = d.getMonth('9');
        this.currYear = d.getFullYear('22');
        this.currDay = d.getDate('3');

    };

    // Переход к следующему месяцу
    Cal.prototype.nextMonth = function () {
        if (this.currMonth == 11) {
            this.currMonth = 0;
            this.currYear = this.currYear + 1;
        }
        else {
            this.currMonth = this.currMonth + 1;
        }
        this.showcurr();
    };

    // Переход к предыдущему месяцу
    Cal.prototype.previousMonth = function () {
        if (this.currMonth == 0) {
            this.currMonth = 11;
            this.currYear = this.currYear - 1;
        }
        else {
            this.currMonth = this.currMonth - 1;
        }
        this.showcurr();
    };

    // Показать текущий месяц
    Cal.prototype.showcurr = function () {
        this.showMonth(this.currYear, this.currMonth);
    };

    // Показать месяц (год, месяц)
    Cal.prototype.showMonth = function (y, m) {
        var d = new Date()
            // Первый день недели в выбранном месяце 
            , firstDayOfMonth = new Date(y, m, 7).getDay()
            // Последний день выбранного месяца
            , lastDateOfMonth = new Date(y, m + 1, 0).getDate()
            // Последний день предыдущего месяца
            , lastDayOfLastMonth = m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();


        var html = '<table>';

        // Запись выбранного месяца и года
        html += '<thead><tr>';
        html += '<td colspan="7" class="header-date">' + this.Months[m] + ' ' + y + '</td>';
        html += '</tr></thead>';


        // заголовок дней недели
        html += '<tr class="days">';
        for (var i = 0; i < this.DaysOfWeek.length; i++) {
            html += '<td class="cell">' + this.DaysOfWeek[i] + '</td>';
        }
        html += '</tr>';

        // Записываем дни
        var i = 1;
        do {

            var dow = new Date(y, m, i).getDay();

            // Начать новую строку в понедельник
            if (dow == 1) {
                html += '<tr>';
            }

            // Если первый день недели не понедельник показать последние дни предидущего месяца
            else if (i == 1) {
                html += '<tr>';
                var k = lastDayOfLastMonth - firstDayOfMonth + 1;
                for (var j = 0; j < firstDayOfMonth; j++) {
                    html += '<td class="cell not-current">' + k + '</td>';
                    k++;
                }
            }

            // Записываем текущий день в цикл
            var chk = new Date();
            var chkY = chk.getFullYear();
            var chkM = chk.getMonth();
            if (chkY == this.currYear && chkM == this.currMonth && i == this.currDay) {
                html += '<td class="cell today">' + i + '</td>';
            } else {
                html += '<td class="cell normal">' + i + '</td>';
            }
            // закрыть строку в воскресенье
            if (dow == 0) {
                html += '</tr>';
            }
            // Если последний день месяца не воскресенье, показать первые дни следующего месяца
            else if (i == lastDateOfMonth) {
                var k = 1;
                for (dow; dow < 7; dow++) {
                    html += '<td class="cell not-current">' + k + '</td>';
                    k++;
                }
            }

            i++;
        } while (i <= lastDateOfMonth);

        // Конец таблицы
        html += '</table>';

        // Записываем HTML в div
        document.getElementById(this.divId).innerHTML = html;
    };

    // При загрузке окна
    // Начать календарь
    var c = new Cal("divCal");
    c.showcurr();

    // Привязываем кнопки «Следующий» и «Предыдущий»
    getId('btnNext').onclick = function () {
        c.nextMonth();
        dateHandler();
    };
    getId('btnPrev').onclick = function () {
        c.previousMonth();
        dateHandler();
    };

    const dayCell = document.querySelectorAll('.cell');
    dayCell.forEach(element => {
        element.addEventListener('click', (evt) => {
            dayCell.forEach(item => {
                item.classList.remove('today');
            });

            element.classList.add('today');
            const headerDate = document.querySelector('.header-date');
            const headerDateValue = headerDate.innerHTML;

            const formattedDate = formatDate(headerDateValue);
            let currentDay = evt.target.innerHTML;
            const daysTitle = document.querySelector('.holiday-titles');

            removeAllChildren(daysTitle);

            let date = formattedDate + '-' + currentDay;
            addHolidayContent(date);
        });
    });

    let d = new Date();
    let currMonth = d.getMonth();
    let currYear = d.getFullYear();
    let currDay = d.getDate();

    let firstDate;

    if (currMonth < 10) {
        firstDate = currYear + '-' + '0' + (currMonth + 1) + '-' + currDay;
    } else {
        firstDate = currYear + '-' + (currMonth + 1) + '-' + currDay;
    }

    addHolidayContent(firstDate);

    // Получить элемент по id
    function getId(id) {
        return document.getElementById(id);
    }

    const dateHandler = () => {
        const dayCell = document.querySelectorAll('.cell');
        dayCell.forEach(element => {
            element.addEventListener('click', (evt) => {

                dayCell.forEach(item => {
                    item.classList.remove('today');
                });

                element.classList.add('today');
                const headerDate = document.querySelector('.header-date');
                const headerDateValue = headerDate.innerHTML;

                const formattedDate = formatDate(headerDateValue);
                let currentDay = evt.target.innerHTML;
                const daysTitle = document.querySelector('.holiday-titles');

                removeAllChildren(daysTitle);

                let date = formattedDate + '-' + currentDay;
                addHolidayContent(date);
            });
        });
    };

    // ===================================================================================================

    function addHolidayContent(date) {

        // запросы к api и сайту
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

        async function fetchDataQuote(date) {
            try {
                const response = await fetch(`https://azbyka.ru/days/${date}`);
                if (!response.ok) {
                    throw new Error('Ошибка ' + response.statusText);
                }
                const html = await response.text();
                return html;

            } catch (error) {
                console.error('Ошибка с запросом:', error);
            }
        }

        // Обработка ответов =============================================
        // Цитата дня
        function extractQuote(htmlString) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const quoteDiv = doc.querySelector('.quote-of-day p');
            let quoteContent = quoteDiv.innerText;
            return quoteContent;
        }

        function extractShadow(htmlString) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const quoteDiv = doc.querySelector('.shadow');
            let quoteHtml = quoteDiv.innerHTML;
            const cleanText = quoteHtml.replace(/<br\s*\/?>/gi, ' ')
                .replace(/<[^>]+>/g, '')
                .replace(/&nbsp;/g, ' ');
            return cleanText;
        }

        // Цитата дня имя
        function extractQuoteAuthor(htmlString) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlString, 'text/html');
            const quoteDivLink = doc.querySelector('.quote-of-day a');
            const quoteDivLinkValue = quoteDivLink ? quoteDivLink.innerText : 'свт. Тихон Задонский';
            return quoteDivLinkValue;
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
        // Вызов функций и отрисовка DOM элементов  ==========================================================

        fetchDataQuote(date).then(data => {
            const cleanQuot = extractQuote(data);
            const cleanQuotName = extractQuoteAuthor(data);
            const cleanShadow = extractShadow(data);

            const daysQuot = document.querySelector('.quote');
            const daysQuotName = document.querySelector('.quote-name');
            const holidayShadow = document.querySelector('.holiday-shadow');
            daysQuot.innerText = cleanQuot;
            daysQuotName.innerText = cleanQuotName;
            holidayShadow.innerText = cleanShadow;
        });

        fetchData(date).then(data => {

            let cleanImgs = clearImgTags(data.imgs);
            let imageList = document.querySelector('.holiday-image-list');
            removeAllChildren(imageList);
            cleanImgs.forEach(imgTag => {
                let li = document.createElement('li');
                li.classList.add('swiper-slide');
                li.innerHTML = imgTag;
                imageList.appendChild(li);
            });
        });

        fetchData(date).then(data => {
            const cleanDate = extractToday(data.presentations);
            const toDay = document.querySelector('.calendar-today');
            toDay.innerHTML = cleanDate
        });

        fetchData(date).then(data => {
            const daysTitle = document.querySelector('.holiday-titles');
            const cleanTitle = extractTitle(data.presentations);
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