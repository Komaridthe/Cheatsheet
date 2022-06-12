

/*
 Свойство elem.scrollTop содержит размер прокрученной области при отсчёте сверху.
А как подсчитать размер прокрутки снизу (назовём его scrollBottom)?
*/
let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
console.log(scrollBottom);



// Напишите код, который возвращает ширину стандартной полосы прокрутки.
let scroll = elem.offsetWidth - elem.clientWidth - 20; // 20 это два border по 10
console.log(scroll);
// вариант №2
let a = document.documentElement.clientWidth; // ширина до появления полосы
document.documentElement.style.overflow = 'scroll'; // ставим прокрутку
console.log(a - document.documentElement.clientWidth); // ширина до появления полосы минус ../.. с полосой



// Поместить с помощью JS мячь в центр ворот.
// *картинка должна иметь заданный размер
ball.style.left = Math.round(field.clientWidth / 2 - ball.clientWidth / 2) + 'px';
ball.style.top = Math.round(field.clientHeight / 2 - ball.clientHeight / 2) + 'px';



/*
 Написать код, который будет нивелировать изчезновение полосы прокрутки из документа
после document.body.style.overflow = "hidden"
*/
if (document.body.style.overflow === "") {
   let width = document.documentElement.clientWidth;
   document.body.style.overflow = "hidden";
   document.body.style.paddingRight = document.documentElement.clientWidth - width + 'px';
} else {
   document.body.style.overflow = "";
   document.body.style.paddingRight = 0;
}



// Вывести сообщение, спозиционированное относительно произвольно выбранного елемента.
let elem1 = document.getElementById('field');
function createMessage(elem, html) {
   let message = document.createElement('div');
   message.style.cssText = 'position: absolute; color: red; font-size: 26px; font-weight: bold';

   let coords = elem.getBoundingClientRect();
   message.style.left = coords.left + 100 + 'px';
   message.style.top = coords.top - 50 + 'px';

   message.innerHTML = html;
   return message;
}
let message = createMessage(elem1, 'HELLO!!!');
document.body.append(message);



/*
 Используя JS, найти координаты углов прямоугольника id ="field".
 · верхний левый, внешний угол (до границы)
 · нижний правый, внешний угол (за границей)
 · верхний левый, внутренний угол
 · нижний правый, внутренний угол
*/
let coords = elem1.getBoundingClientRect();
let topLeft = [coords.left, coords.top]; console.log('top left ', topLeft);
let botRight = [coords.right, coords.bottom]; console.log('bot right', botRight);
let topLeftInside = [coords.left + field.clientLeft, coords.top + field.clientTop]; console.log('top left Inside', topLeftInside);
let botRightInside = [
   coords.left + field.clientLeft + field.clientWidth,
   coords.top + field.clientTop + field.clientHeight
]; console.log('bot right Inside', botRightInside);



/*
 Переместить мяч на то место в поле, где был клик.
 · Центр мяча должен совпадать с местом нажатия мыши;
 · Мяч не должен пересекать границы поля;
 · При прокрутке страницы ничего не должно ломаться;
*/
// в стилях необходимо задать позиционирование элементам
field.addEventListener('click', function (event) {
   let fieldCoords = this.getBoundingClientRect();
   let ballCoords = {
      top: event.clientY - fieldCoords.top - ball.clientHeight / 2,
      left: event.clientX - fieldCoords.left - ball.clientWidth / 2
   }
   if (ballCoords.top < 0) ballCoords.top = 0;
   if (ballCoords.left < 0) ballCoords.left = 0;
   if (ballCoords.top + ball.clientHeight > field.clientHeight) ballCoords.top = field.clientHeight - ball.clientHeight;
   if (ballCoords.left + ball.clientWidth > field.clientWidth) ballCoords.left = field.clientWidth - ball.clientWidth;

   ball.style.top = ballCoords.top + 'px';
   ball.style.left = ballCoords.left + 'px';
})



/*
 Создать меню, которое по нажатию открывается либо закрывается и меняется стрелка.
Сладости:
 · Пирожное
 · Пончик
 · Мёд
*/
h3.addEventListener('click', () => {
   document.querySelector('.menu').classList.toggle('active');
   ul.classList.toggle('active');
})



// Запустить карусель
let inner = document.querySelector('.inner');

arw_l.addEventListener('click', () => {
   let left = parseInt(getComputedStyle(inner).marginLeft) - 390;
   if (left < -130 * 7) left = -130 * 7;
   inner.style.marginLeft = left + 'px';
})

arw_r.addEventListener('click', () => {
   let left = parseInt(getComputedStyle(inner).marginLeft) + 390;
   if (left > 0) left = 0;
   inner.style.marginLeft = left + 'px';
})



// Дан список сообщений с кнопками для удаления [x]. Заставить кнопки работать.
document.addEventListener('click', e => {
   if (e.target.className != 'remove-button') return
   e.target.closest('.pane').remove();
})


/*
 Создайте дерево, которое по клику на заголовок скрывает-показывает потомков:
 · Использовать только один обработчик событий (применить делегирование)
 · Клик вне текста заголовка (на пустом месте) ничего делать не должен
*/
for (let li of tree.querySelectorAll('li')) { // оборачиваем текст из li в span
   let span = document.createElement('span');
   li.prepend(span);
   span.append(span.nextSibling);
};
tree.addEventListener('click', e => {
   if (e.target.tagName != 'SPAN') return;

   let childrenContainer = e.target.parentNode.querySelector('ul');
   if (!childrenContainer) return;
   childrenContainer.hidden = !childrenContainer.hidden;
});



// Сделать таблицу id="grid" сортируемой.
grid.onclick = function (e) {
   if (e.target.tagName != 'TH') return;
   let th = e.target;
   // если ячейка TH, тогда сортировать
   // cellIndex - это номер ячейки th:
   //   0 для первого столбца
   //   1 для второго и т.д.
   sortGrid(th.cellIndex, th.dataset.type);
};

function sortGrid(colNum, type) {
   let tbody = grid.querySelector('tbody');
   let rowsArray = Array.from(tbody.rows);

   // compare(a, b) сравнивает две строки, нужен для сортировки
   let compare;

   switch (type) {
      case 'number':
         compare = function (rowA, rowB) {
            return rowA.cells[colNum].innerHTML - rowB.cells[colNum].innerHTML;
         };
         break;
      case 'string':
         compare = function (rowA, rowB) {
            return rowA.cells[colNum].innerHTML > rowB.cells[colNum].innerHTML ? 1 : -1;
         };
         break;
   }
   rowsArray.sort(compare);
   tbody.append(...rowsArray);
}



/*
 При наведении мыши на элемент с атрибутом data-tooltip, над ним должна показываться подсказка 
и скрываться при переходе на другой элемент.
 · Отступ от подсказки до элемента с data-tooltip должен быть 5px по высоте.
 · Подсказка должна быть, по возможности, посередине элемента.
 · Подсказка не должна вылезать за границы экрана, в том числе если страница частично прокручена,
    если нельзя показать сверху – показывать снизу элемента.
 · Текст подсказки брать из значения атрибута data-tooltip. Это может быть произвольный HTML.
*/
let message;
document.addEventListener('mouseover', e => {
   if (!e.target.dataset.tooltip) return;

   message = document.createElement('div');
   message.style.cssText = `
   position: fixed;
   padding: 10px 20px;
   border: 1px solid #b3c9ce;
   border-radius: 4px;
   text-align: center;
   font: italic 14px/1.3 sans-serif;
   color: #333;
   background: #fff;
   box-shadow: 3px 3px 3px rgba(0, 0, 0, .3);
   `;
   message.innerHTML = e.target.dataset.tooltip;
   document.body.append(message);


   let tarCoords = e.target.getBoundingClientRect();
   let left = tarCoords.left + (e.target.offsetWidth - message.offsetWidth) / 2;
   if (left < 0) left = 0; // не заезжать за левый край окна
   let top = tarCoords.top - message.offsetHeight - 5;
   if (top < 0) top = tarCoords.top + message.offsetHeight + 5; // если подсказка не помещается сверху, то отображать её снизу

   message.style.left = left + 'px';
   message.style.top = top + 'px';
})

document.addEventListener('mouseout', e => {
   if (message) {
      message.remove();
      message = null;
   }
})


/*
 Сделайте так, чтобы при клике на ссылки внутри элемента id="contents" пользователю выводился вопрос о том,
действительно ли он хочет покинуть страницу, и если он не хочет, то прерывать переход по ссылке.
 Использовать делегирование.
*/
contents.onclick = e => {
   let handlerClick = (href) => { // confirm  задаёт вопрос
      let isLeaving = confirm(`Leave for ${href}?`);
      if (!isLeaving) return false; // если нет то всё на этом
   }

   let target = e.target.closest('a');
   if (target && contents.contains(target)) { // если таргет то передаём ссылку в функцию
      return handlerClick(target.getAttribute('href'));
   }
}


// Создайте галерею изображений, в которой основное изображение изменяется при клике на уменьшенный вариант.
thumbs.onclick = e => {
   let target = e.target.closest('a');
   if (!target) return;
   showBigImg(target.href, target.title);
   e.preventDefault();
}
let showBigImg = (href, title) => {
   largeImg.src = href;
   largeImg.alt = title;
}
// или
thumbs.onclick = e => {
   let target = e.target.closest('a');
   if (!target || !thumbs.contains(target)) return;
   largeImg.src = target.href;
   e.preventDefault()
}

// Дописать к предыдущему заданию рандомный показ картинок(создать пользовательское событие).
let eSlider = new CustomEvent('click', {bubbles: true}); // создаю пользовательское событие

setInterval(() => { // каждую секунду выбираю случайную картинку
let num = Math.ceil(Math.random() * 5) + 1;
let elem = thumbs.querySelector(`a[title="Image ${num}"]`);
elem.dispatchEvent(eSlider);
}, 2000);






























