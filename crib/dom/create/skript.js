let { warn } = console;


warn("=========== Содержимое элемента innerHTML ===========");
// Получаем объект
const textElement = document.querySelector(".text");

// Получаем содержимое объекта "как есть" вместе с HTML
const textElementContent = textElement.innerHTML;
console.log(textElementContent);

textElement.innerHTML = "Меняю <span>HTML</span> через <span>JS</span>.";

// Дописываем содержимое объекта
textElement.innerHTML = `${textElementContent} <p>Меняю <span>HTML</span> через <span>JS</span>.</p>`;
console.log(textElement.innerHTML);

//* Содержимое элемента outerHTML
// На этот раз получаем содержимое объекта "как есть" вместе с HTML, а так же сам элемент
const textElementContentPlus = textElement.outerHTML;
console.log(textElement.outerHTML);

// Меняем содержимое объекта
//textElement.outerHTML = `<p style=padding-bottom:20px>Проверка замены объекта через <span>outerHTML</span>.</p>`
console.log(textElement.outerHTML); // Проверка покажет старое содержимое, а не новое!

// Только текст элемента textContent
const textElementTextContent = textElement.textContent;
console.log(textElementTextContent);

// Полезная возможность textContent - записывать текст "безопасным способом".
textElement.textContent = `<p>Запись текста
    <span>"безопасным способом"</span>.</p>`;
console.log(textElement.textContent);
/*
!  Нежелательно, чтобы на сайте появился произвольный HTML-код. Присваивание через textContent
! один из способов от него защититься.
*/

//* Содержимое текстового узла/комментария
const enotherTextElement = document.querySelector("h3");
const getComment = enotherTextElement.nextSibling;
console.log(getComment);
console.log(getComment.data); // Вывод содержимого текстового узла/комментария

// Изменение текстового узла/комментария
getComment.data = "Привет!";
console.log(getComment.data);


warn("=========== Создание элементов и узлов ===========");
// Создание нового элемента (тега)
const newElement = document.createElement("div");
console.log(newElement);

// Наполняем новый элемент
newElement.innerHTML = `Текст с <span>тегами</span>, что-бы показать пример наполнения <span>нового</span> элемента.`;
console.log(newElement);

// Создание нового текстового узла
//const textElement = document.querySelector('.text');
const newText = document.createTextNode("Новый текст");
console.log(newText);
// Созданные объекты находятся в константах, но не являются частью документа

// Вставляем новый элемент...

// ...перед объектом
textElement.before(newElement);

// ...после объекта
textElement.after(newElement);

// ...внутрь и в начало объекта
textElement.prepend(newElement);

// ...внутрь и в конец объекта
textElement.append(newElement);

// Вставка нескольких объектов сразу
textElement.before(newElement, "ПРИВЕТ. ");

// Можно вставить и строку, но она будет вставлена "безопасным методом" по типу метода textContent
textElement.before(
  `Текст с <span>тегами</span>, что-бы показать пример наполнения <span>нового</span> элемента.`
);

//* Методы вставки
//insertAdjacentHTML/Text/Element

// Получаем объект
// const textElement = document.querySelector('.text');

// Вставляем текст, HTML, элемент
textElement.insertAdjacentHTML(
  "afterend",
  "<p><span>Очередной</span> текст-вставка</p>"
);
/*
"beforebegin" - вставить HTML непосредственно перед textElement
"afterbegin" - вставить HTML в начало textElement
"beforeend" - вставить HTML в конец textElement
"afterend" - вставить HTML непосредственно после textElement

! insertAdjacentText дублирует textContent, а insertAdjacentElement - before, after и остальные..
 Этими элементами пользуются редко так как писать их немного дольше.
*/

/*
* Перенос элемента
! Все методы вставки автоматически удаляют узлы со старых мест
*/
// Получаем объекты
const lessonBlock = document.querySelector(".text");
const title = document.querySelector("h3");

// Переносим title в конец блока lessonBlock
lessonBlock.append(title);

//* Клонирование узлов cloneNode
// Если необходимо не просто перенести, а копировать элемент

// Получаем объект (сделано выше)
// const title = document.querySelector('h3');

// Копирование без дочерних элементов
//const cloneTextElement = title.cloneNode(false);

// Глубокое копирование вместе с содержимым
const cloneTextElement = title.cloneNode(true);

// Получаем другой объект (относительно которого будем вставлять клонированный объект)
const lesson = document.querySelector(".lesson");

// Вставляем клон в нужное место
lesson.after(cloneTextElement); // потом заменён на "Тро-ло-ло"

// Замена узлов
let anotherClone = cloneTextElement.cloneNode(true); // делаем очередную копию
cloneTextElement.after(anotherClone); // вставляем её следующим елементом
anotherClone.replaceWith("Тро-ло-ло "); // заменяем на строки или узлы

// Удаляем объект
cloneTextElement.remove();


warn("======= Устаревшие методы вставки =======");
//! Все эти методы возвращают "node"

// parent.appendChild(node) - Добавляет node в конец дочерних элементов parentElem.
let newLi = document.createElement("li");
newLi.textContent = "Новый пункт 1";
console.log(list.appendChild(newLi)); // <li>Новый пункт 1</li>

// parent.insertBefore(node, nextSibling) - Вставляет node перед nextSibling в parentElem.
let newLiTwo = document.createElement("li");
newLiTwo.textContent = "Новый пункт 2";
console.log(list.insertBefore(newLiTwo, list.children[1])); // <li>Новый пункт 2</li>

// parent.replaceChild(newElem, node) - Заменяет oldChild на node среди дочерних элементов parentElem.
let newLiTree = document.createElement("li");
newLiTree.textContent = "Новый пункт 3";
console.log(list.replaceChild(newLiTree, list.firstChild)); // " "

// parent.removeChild(node) - Удаляет node из parentElem (предполагается, что он родитель node).
console.log(list.removeChild(list.children[4])); // <li>2</li>


warn("=========== Стили и классы ===========");
//* Управление классами. className и classList

//* Свойство className
// Получаем элемент
const element = document.querySelector(".lesson__item-list_red");

// Получаем имена всех классов элемента
const allElementClasses = element.className;
console.log(allElementClasses);

// Перезаписываем все классы данного элемента
//element.className = "red";

//* Свойство classList
// Получаем элемент (уже сделано)
//const element = document.querySelector('.lesson__item-list_red');

// Добавить класс
element.classList.add("active");
// Удалить класс
element.classList.remove("active");
// Добавить класс, если его нет, а если есть удалить
element.classList.toggle("active");
// Проверка наличия класса, возвращает true/false
element.classList.contains("active");

// Проверка
if (element.classList.contains("active")) {
  console.log(`У элемента есть класс "active"!`);
}

// Свойство classList является перебираемым, поэтому все классы можно перечислить
// с помощью for..of

for (let className of element.classList) {
  console.log(className);
}

//* Управление стилями. element.slyle
// Получаем элемент (уже сделано)
const elementRed = document.querySelector(".lesson__item-list_red");

// Задаём стиль с помощью CSS свойства
elementRed.style.color = "red";

// Для свойств из нескольких слов используется camelCase:
// font-size
elementRed.style.fontSize = "18px";
// margin-bottom
elementRed.style.marginBottom = "10px";
// z-index
elementRed.style.zIndex = "10";

//! Каждое свойство пишется отдельно

// Получение значания свойства. Только если оно записано в атрибуте style
console.log(elementRed.style.zIndex);

// Сброс стиля атрибута
elementRed.style.zIndex = "";

//* Полная запись стилей style.cssText
// Получаем элемент
const elementBlue = document.querySelector(".lesson__item-list_blue");

elementBlue.style.cssText = `
margin-top: 10px;
font-size: 18px;
color: lightblue;
`;
//! Минус этого свойства в том, что оно перезаписывает все свойства, которые ранее были в атрибуте style

//* Вычисленные стили. getComputedStyle(element, [psevdo])
//! Инструмент работает только для чтения. Используя его невозможно переназначить значение стиля элемента
// Получаем элемент
const elementSub = document.querySelector(".lesson__item-sub-list");

// Вычисляем его стиль
const elementSubStyle = getComputedStyle(elementSub);
// console.log(elementSubStyle); //  - все стили
console.log(elementSubStyle.fontSize); // - возвращаем конкретный стиль

// Стиль псевдоэлемента (::before, ::after, ::marker...)
const elementSubMarkerStyle = getComputedStyle(elementSub, "::marker");
console.log(elementSubMarkerStyle.color);

// Чтобы получить число без единицы измерения подходит метод parseInt
const markerMargenLeft = parseInt(elementSubMarkerStyle.marginLeft);
console.log(markerMargenLeft);


warn("========== Атрибуты и свойства ===========");
// У разных DOM-элементов могут быть свои специфические свойства и атрибуты, которых нет у других.

const link = document.querySelector(".link");
const input = document.querySelector(".input");

console.log(link.href);
console.log(input.href);

console.log(link.value);
console.log(input.value);

// Получить все доступные свойства поможет вызов console.dir(elem)
console.dir(link);

//* Произвольные атрибуты
// Получаем элемент
const punktThree = document.querySelector("#listItem");

// Проверяем наличие атрибута
punktThree.hasAttribute("name");
// Получаем значение атрибута
punktThree.getAttribute("name");
// Устанавливаем значение атрибута
punktThree.setAttribute("name", "value");
// Удаляем атрибут
punktThree.removeAttribute("name");

console.log(punktThree);

// Пример
punktThree.setAttribute("some-attribute", "some-value");
// Проверка наличя атрибута
if (punktThree.hasAttribute("some-attribute")) {
  console.log(`some-attribute существует`);
}


warn("========== Синхроницация между атрибутами и свойствами ===========");
/*
 Мы можем обратиться к тому или иному свойству через методы доступа к атрибутам. Когда 
стандартеый атрибут изменяется, соответствующее свойство автоматически обновляется.
Это работает и в обратную сторону с незначительными исключениями.
*/

input.setAttribute("id", "123");
console.log(input.id);

input.id = "321";
console.log(input.getAttribute("id")); // либо console.log(input.id);

//! НО с value такой фокус не проходит

input.setAttribute("value", "Привет!");
console.log(input.value);

input.value = "Пока!";
console.log(input.getAttribute("value"));


warn("========== Нестандартные атрибуты, dataset ===========");
/*
 Все атрибуты, начинающиеся с префикса "data-", зарезервированы для использования
програмистами. Они доступны в свойстве dataset.
*/
// Получаем элемент
const lessonText = document.querySelector(".text");

// Получаем data-атрибут
console.log(lessonText.dataset.size);

// Перезаписываем data-атрибут
lessonText.dataset.size = "7891";
console.log(lessonText.dataset.size);

