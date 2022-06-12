let { warn } = console;


warn("============ Навигация по документу =============");
//! Самые верхние объекты дерева доступны как свойства объекта дерева

const htmlElement = document.documentElement;
const headElement = document.head;
const bodyElement = document.body;
console.log(htmlElement);
console.log(headElement);
console.log(bodyElement);

// Получаем первый и последний дочерние объекты
const firstChildElement = bodyElement.firstChild;
const lastChildElement = bodyElement.lastChild;
console.log(firstChildElement);
console.log(lastChildElement);

// Коллекция childNodes содержит всех детей, включая текстовые узлы
const childNodes = bodyElement.childNodes;
console.log(childNodes); // Это не массив, а коллекция

// Для проверки наличия дочерних узлов существует специальная функция hasChildNodes()
console.log(bodyElement.hasChildNodes());

/*
 childNotes похож на массив, а на самом деле это коллекция - особый перебираемый объект - псевдомассив.

 Отличия от массивов:
1. Для перебора коллекции можно использовать цикл FOR..OF
2. Методы массивов не будут рабольтать так как коллекция - это не массив
*/

//* Перебор коллекции
for (let node of childNodes) {
   console.log(node); // Покажет все узлы из коллекции
}

/*
 Почи все DOM-коллекции, за небольшим исключением, "живые".
 Другими словами они отражают текущее состояние DOM. Если мы сохраним ссылку на body.childNotes
и добавим/удалим узлы в DOMб то они появятся/исчезнут в сохранённой коллекции автоматически.

 Только для чтения.
 DOM-коллекции, и даже более - все навигационные свойства, перечисленные далее, доступны только для чтения.
 Мы не можем заменить один дочерний узел на другой, просто написав childNodes[i] = ....
 Для изменения DOM требуются другие методы.
*/

// Соседняе и родительские узлы
const previousSiblingNode = bodyElement.previousSiblingNode; // Предыдущий узел
const nextSiblingNode = bodyElement.nextElementSibling; // Следующий узел
const parentNode = bodyElement.parentElement; // Родительский узел
console.log(previousSiblingNode);
console.log(nextSiblingNode);
console.log(parentNode);


// Получаем коллексию всех дочерних элементов (не узлов!)
const bodyChildren = bodyElement.children;
console.log(bodyChildren);

// Первый и последний дочерние элементы
const firstChild = bodyElement.firstElementChild;
const lastChild = bodyElement.lastElementChild;
console.log(firstChild);
console.log(lastChild);

// Соседние и родительские элементы
const previousSibling = bodyElement.previousElementSibling; // Предыдущий элемент
const nextSibling = bodyElement.nextElementSibling; // Следующий элемент
const parentElement = bodyElement.parentElement; // Родительский элемент
console.log(previousSibling);
console.log(nextSibling);
console.log(parentElement);


console.warn("============ Поиск произвольного элемента =============");
/*
* elem.querySesectorAll(CSS);
 Самый популярный метод поиска, он возвращает всю коллекцию элементов внутри elem,
удовлетворяющих данному CSS-селектору.
 Необходимо помнить, что эта коллекция статична, а не живая!
 Этот метод мощный, потому что можно использовать любой CSS-селектор.
*/
// Поиск по селектору класса
const elemsOne = document.querySelectorAll('.lesson__list');
console.log(elemsOne);

// Поиск по селектору тега
const elemsTwo = document.querySelectorAll('li');
console.log(elemsTwo);

// Поиск по смешанному селектору тега и класса
const elemsThree = document.querySelectorAll('li.lesson__item-list');
console.log(elemsThree);

// Поиск по тегу первого уровня вложенности
const elemsFour = document.querySelectorAll('.lesson__list>li');
console.log(elemsFour);

// Поиск по нескольким классам
const elemsFive = document.querySelectorAll('.lesson__list, .lesson__item-list');
console.log(elemsFive);

// Поиск по вложенным классам
const elemsSix = document.querySelectorAll('.lesson__sub-list .lesson__item-sub-list');
console.log(elemsSix);

// Поиск по ID
const elemsSeven = document.querySelectorAll('#listItem');
console.log(elemsSeven);

// Поиск по атрибуту
const elemsEight = document.querySelectorAll('[data-item]');
console.log(elemsEight);

// Поиск по атрибуту со значением
const elemsNine = document.querySelectorAll('[data-item="45"]');
console.log(elemsNine);

// Получение конкретного элемента коллекции
const elem = document.querySelectorAll('li');
console.log(elem[2]);

// for (item of elem){
//    console.log(item);
// }

// Несмотря, что это не массив, можно применить метод перебора ForEach
elem.forEach(item => {
   console.log(item);
});

// Искать можно не только в document

const subList = document.querySelectorAll('.lesson__sub-list');
const subItems = subList[0].querySelectorAll('li');
console.log(subItems);

/*
* elem.querySelector(CSS) - поиск первого документа
 Возвращае первый элемент внутри elem, соответствующий данному CSS-селектору
*/

//const lessonList = document.querySelectorAll('.lesson__list')[0];
const lessonList = document.querySelector('.lesson__list');
console.log(lessonList);
// В этом случае в константу попадёт не коллекция, а объект


//* document.getElementById(ID) и elem.getElementsBy...
//! Главное отличие метода от предыдущего в том, что возвращается ЖИВАЯ коллекция!

//document.getElementById(ID);
/*
 Если у элемента есть ID, то его можно получить вызовом document.getElementById(id),
где бы он не находился.
 1. id - уникален
 2. Поиск только внутри document
*/

const elemId = document.getElementById('listItem'); // Решетку писать не надо
console.log(elemId);

/*
* getElementsBy...
 elem.getElementsByTagName(tag) ищет элементы с данным тегом и возвращает их коллекцию.
Передав "*" вместо тега, можно получить всех потомков.
 Получаем живую коллекцию!
*/
const elemTagName = document.getElementsByTagName('li');
console.log(elemTagName);

// getElementsByClassName - возвращает элементы, которые имеют данный CSS - класс
const elemClassName = document.getElementsByClassName('lesson__item-sub-list'); // Точку писать не нужно
console.log(elemClassName);

// getElementsByName(name) - возвращает элементы с заданным атрибутом name. Поиск только внутри document.
const elemName = document.getElementsByName('list');
console.log(elemName);

/*
* closest
 Метод elem.closest(css) ищет ближайшего предка, который соосветствует CSS - селлектору.
Сам элемент тоже врлючается в поиск.
 Метод поднимается вверх от элемента и проверяет каждого из его родителей. Если элемент
соответствует селлектору, поиск прекращается. Метод возвращает либо предка, либо null если 
такой элемент не найден.
*/
const elemLowLevel = document.querySelector('.lesson__item-sub-list');
const elemParant = elemLowLevel.closest('.lesson__list');
console.log(elemParant);

//* Проверка matches
// Ничего не ищет, только проверяет, удовлетворяет ли элемент CSS - селлектору, и возвращает true или false

const elemMatch = document.querySelectorAll('.lesson__item-list');
for (let elem of elemMatch) {
   if (elem.matches('[class$="lesson__item-list_red"]')) {
      console.log('Красный');
   } else if (elem.matches('[class$="lesson__item-list_blue"]')) {
      console.log('Синий');
   }
}
/*
 Получив объект тем или иным способом мы можем применять свойства навигации
о которых шла речь ранее.
*/
const text = document.querySelector('.text');
const list = text.nextElementSibling;
console.log(list);

