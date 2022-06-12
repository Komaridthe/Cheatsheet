
// Напишите код для вставки <li>2</li><li>3</li> между этими двумя <li> (первый HTML)
one.insertAdjacentHTML('afterend', '<li>2</li><li>3</li>');


// После нажатия на кнопку за место неё должны появиться две с текстом
document.querySelector('.btn').addEventListener('click', function handleClick() {
   document.querySelector('.main').innerHTML = '<button>One</button>';
   document.querySelector('.main').innerHTML += '<button>Two</button>';
})


// Напишите код, который выделит красным цветом все ячейки в таблице (class ="score") по диагонали.
const table = document.querySelector('.score');
for (let i = 0; i < table.children[0].children.length; i++) {
   let td = table.rows[i].cells[i];
   td.style.backgroundColor = 'red';
}


// Как найти?…
// · Таблицу с id="table".
console.log(document.getElementById('table'));
// · Все элементы label внутри этой таблицы (их три).
console.log(document.querySelectorAll('table label'));
// · Первый элемент в таблице со словом «age».
console.log(document.getElementsByName('age')[0]);
// · Последний input в этой форме.
let form = document.getElementsByClassName('search')[0];
console.log(form.querySelectorAll('input')[form.querySelectorAll('input').length - 1]);


/*
 Есть дерево, структурированное как вложенные списки ul class="ulList"/li class="ulList__item".
 Написать код, который выведет каждый элемент списка <li>:
 · Какой в нём текст (без поддерева) ?
 · Какое число потомков – всех вложенных <li> (включая глубоко вложенные) ?
*/
document.querySelectorAll('.ulList__item').forEach(i => {
   let text = i.firstChild.data; // получаем содержимое лишки

   let index = text.indexOf('\n'); // получаем индекс переноса строки
   if (index !== -1) text = text.slice(0, index); // переписываем для красивой записи в консоле

   let number = i.querySelectorAll('li').length; // получаем длины списка
   console.log(text + ": " + number);
})


// Объектом какого класса является document?
console.log(document.constructor.name);

// Какое место он занимает в DOM-иерархии?
console.log(document.__proto__.constructor.name);
console.log(document.__proto__.__proto__.constructor.name);
console.log(document.__proto__.__proto__.__proto__.constructor.name);
console.log(document.__proto__.__proto__.__proto__.__proto__.constructor.name);
console.log(document.__proto__.__proto__.__proto__.__proto__.__proto__.constructor.name);

// Наследует ли он от Node или от Element, или может от HTMLElement?
console.log(document instanceof Node);
console.log(document instanceof Element);
console.log(document instanceof HTMLElement);


// Напишите код для выбора элемента с атрибутом data-widget-name из документа и прочитайте его значение.
// Через dataset
let menu = document.querySelector('[data-widget-name]');
console.log(menu.dataset.widgetName);
// Через getAttribute
console.log(menu.getAttribute('data-widget-name'));


/*
 Сделайте все внешние ссылки списка с классом "links-list" оранжевыми, изменяя их свойство style.
 Ссылка является внешней, если:
 · Её href содержит ://
 · Но не начинается с http://internal.com.
*/
// Через for of
for (const link of document.querySelectorAll('.links-list li a')) {
   let href = link.getAttribute('href');
   if (!href.startsWith('http://internal.com') && href.includes('://')) link.style.color = 'orange';
}

// Через forEach
document.querySelectorAll('.links-list li a').forEach(i => {
   let href = i.getAttribute('href');
   if (href.includes('://') && !href.startsWith('http://internal.com')) i.style.color = 'orange'
})



// Создайте функцию clear(elem), которая удаляет всё содержимое из elem.
function clear(elem) {
   elem.innerHTML = '';
}
clear(elem);


/*
 Напишите интерфейс для создания списка.
 Для каждого пункта:
 · Запрашивайте содержимое пункта у пользователя с помощью prompt.
 · Создавайте элемент <li> и добавляйте его к <ul>.
 · Процесс прерывается, когда пользователь нажимает Esc или вводит пустую строку.
 Все элементы должны создаваться динамически.
Если пользователь вводит HTML-теги -– пусть в списке они показываются как обычный текст.
*/
let ul = document.createElement('ul');
document.body.append(ul);

while (true) {
   let data = prompt('Введите текст пункта меню', '');
   if (!data) break;

   let li = document.createElement('li');
   li.textContent = data;
   ul.prepend(li);
}



// Напишите функцию createTree, которая создаёт вложенный список ul/li из объекта.
let data = {
   "Кустарники": {
      "Черника": {},
      "Малина": {}
   },

   "Деревья": {
      "Хвойные": {
         "Секвойя": {},
         "Ель": {}
      },
      "Цветковые": {
         "Яблоня": {},
         "Магнолия": {}
      }
   }
};
let container = document.querySelector('.container');

// Через innerHTML
function createTree(container, obj) {
   container.innerHTML = createTreeText(obj);
}

function createTreeText(obj) { // отдельная рекурсивная функция
   let li = '', ul;

   for (let key in obj) li += '<li>' + key + createTreeText(obj[key]) + '</li>';
   if (li) ul = '<ul>' + li + '</ul>';
   return ul || '';
}

// Через DOM вариант 1
function createTree(place, obj) {
   if (Object.keys(obj).length) {
      let ul = document.createElement('ul');
      Object.entries(obj).forEach(([key, value]) => {
         let li = document.createElement('li');
         li.append(key);
         ul.append(li);
         createTree(li, value);
      });
      place.append(ul);
   }
}

// Через DOM вариант 2
function createTree(place, obj) {
   let ul = document.createElement('ul');

   for (item in obj) {
      let li = document.createElement('li');
      let text = document.createTextNode(item);

      li.append(text);
      ul.append(li);

      if (Object.keys(obj[item]).length) createTree(li, obj[item])
   }
   place.append(ul);
}
createTree(container, data);



/*
 Напишите код, который добавит каждому элементу списка <li> количество вложенных в него элементов. 
Узлы нижнего уровня, без детей – пропускать.
*/
let lis = document.getElementsByTagName('li');
for (let li of lis) {
   let num = li.getElementsByTagName('li').length; // кол-во вложенных элементов
   if (!num) continue;

   li.firstChild.data += ' [' + num + ']';
}


/*
***
 Напишите функцию createCalendar(elem, year, month).
Вызов функции должен создать календарь для заданного месяца month в году year и вставить его в elem.
Календарь должен быть таблицей, где неделя – это <tr>, а день – это <td>.
 У таблицы должен быть заголовок с названиями дней недели, каждый день – <th>,
первым днём недели должен быть понедельник.
*/
function createCalendar(elem, year, month) {
   let mon = month - 1;
   let d = new Date(year, mon);
   let table = '<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

   for (let i = 0; i < getDay(d); i++) table += '<td></td>';

   while (d.getMonth() == mon) {
      table += '<td>' + d.getDate() + '</td>';
      if (getDay(d) % 7 == 6) table += '<tr></tr>';
      d.setDate(d.getDate() + 1);
   }

   if (d.getDay() != 0) {
      for (let i = getDay(d); i < 7; i++) table += '<td></td>';
   }

   table += '</tr></table>';
   elem.innerHTML = table;
}

function getDay(date) {
   let day = date.getDay();
   if (day == 0) day = 7;
   return day - 1;
}
createCalendar(calendar, 2021, 12);


// Напишите код для сортировки по столбцу "name" теблицы "sortNames".
let sortedRows = Array.from(sortNames.rows).slice(1)
   .sort((rowA, rowB) => rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);
sortNames.tBodies[0].append(...sortedRows); // не забыть про tBody



/*
 Напишите функцию showNotification(options), которая создаёт уведомление: <div class="notification">
с заданным содержимым. Уведомление должно автоматически исчезнуть через 2 секунды.
*/
function showNotification({ top = 0, right = 0, html, className }) {
   let div = document.createElement('div');
   div.classList.add(className);
   div.innerHTML = html;
   div.style.marginRight = `${right}px`;
   div.style.marginTop = `${top}px`;

   document.getElementById('ul').insertAdjacentElement('beforebegin', div);
   setTimeout(() => div.style.display = 'none', 2000);
}
showNotification({ top: 10, right: 10, html: "Hello!", className: "welcome" });








