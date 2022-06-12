let { warn } = console;


warn("======== Размеры и прокрутка элементов ========");
//* Размеры и прокрутка элементов
// Метрики (на примере "elem")
// У элементов есть следующие геометрические свойства (метрики) :

// · offsetParent – ближайший CSS-позиционированный родитель или ближайший td, th, table, body.
console.log(elem.offsetParent); // div.parent

// · offsetLeft/offsetTop – позиция в пикселях верхнего левого угла относительно offsetParent.
console.log(elem.offsetLeft); // 10
console.log(elem.offsetTop); // 10

// · offsetWidth/offsetHeight – «внешняя» ширина/высота элемента, включая рамки.
console.log(elem.offsetWidth); // 200
console.log(elem.offsetHeight); // 100
/*
    clientLeft/clientTop – расстояние от верхнего левого внешнего угла до внутренного.
   Для операционных систем с ориентацией слева-направо эти свойства равны ширинам левой/верхней рамки(border).
   Если язык ОС таков, что ориентация справа налево, так что вертикальная полоса прокрутки находится не справа,
   а слева, то clientLeft включает в своё значение и её ширину тоже.
*/
console.log(elem.clientLeft); // 10
console.log(elem.clientTop); // 6

// clientWidth/clientHeight – ширина/высота содержимого вместе с внутренними отступами padding, но без полосы прокрутки.
console.log(elem.clientWidth); // 183
console.log(elem.clientHeight); // 83

// scrollWidth/scrollHeight – ширины/высота содержимого, аналогично clientWidth/Height, но учитывают прокрученную,
// невидимую область элемента.
console.log(elem.scrollWidth); // 183
console.log(elem.scrollHeight); // 198 == elem.clientHeight + прокрученная (невидимая) часть

// scrollLeft/scrollTop – ширина/высота прокрученной сверху части элемента, считается от верхнего левого угла.
console.log(elem.scrollTop); // 0
console.log(elem.scrollLeft); // 0

// Все свойства доступны только для чтения, кроме scrollLeft/scrollTop, изменение которых заставляет браузер прокручивать элемент.
elem.scrollTop = 50; // прокрутит элемент на 50px вниз
elem.scrollTop = 1e9; // прокрутит элемент в самый низ


warn("======== Размеры окна ========");
// Ширина/высота окна
// Самый простой способ:
console.log(document.documentElement.clientWidth);
console.log(document.documentElement.clientHeight); //  Эти способы указывают размер без полосы прокрутки!

console.log(window.innerWidth);
console.log(window.innerHeight); // А эти учитывают и прокрутку

//! Это надо усвоить т.к. работать придётся чаще с доступной шириной окна!

/*
* Ширина/высота документа
 Теоретически, т.к. корневым элементом документа является documentElement, и он включает в себя всё содержимое,
мы можем получить полный размер документа как documentElement.scrollWidth/scrollHeight.
 Но именно на этом элементе, для страницы в целом, эти свойства работают не так, как предполагается.
В Chrome/Safari/Opera, если нет прокрутки, то documentElement.scrollHeight может быть даже меньше,
чем documentElement.clientHeight! С точки зрения элемента это невозможная ситуация.

 Чтобы надёжно получить полную высоту документа, нам следует взять максимальное из этих свойств:
*/
let scrollHeight = Math.max(
   document.body.scrollHeight, document.documentElement.scrollHeight,
   document.body.offsetHeight, document.documentElement.offsetHeight,
   document.body.clientHeight, document.documentElement.clientHeight
);
console.log(`Полная высота документа с прокручиваемой частью: ${scrollHeight}`);


warn("======== Прокрутка ========");
//* Получение текущей прокрутки
// Самый простой и правльный метод:
console.log(`Текущая прокрутка сверху: ${window.pageYOffset}`);
console.log(`Текущая прокрутка слева: ${window.pageXOffset}`);
//! Эти свойства доступны только для чтения!

/*
* Прокрутка: scrollTo, scrollBy, scrollIntoView
 Обычные элементы можно прокручивать, изменяя scrollTop/scrollLeft.
Можно сделать то же самое для страницы в целом, используя document.documentElement.scrollTop/Left
(кроме основанных на старом WebKit (Safari), где, как сказано выше, document.body.scrollTop/Left).
*/
//* Совместимые специальные методы:
// element.scrollBy(x, y) - метод прокручивает страницу относительно её текущего положения.
elem.scrollBy(0, -10); // прокручивает елемент на 10px вверх (т.к. минус)

// scrollTo(pageX,pageY) - метод прокручивает страницу на абсолютные координаты (pageX,pageY).
/*
 То есть, чтобы левый-верхний угол видимой части страницы имел данные координаты относительно
левого верхнего угла документа. Это всё равно, что поставить scrollLeft/scrollTop.
 Для прокрутки в самое начало можно использовать scrollTo(0,0).
*/
elem.scrollTo(0, 0);

// elem.scrollIntoView(top) - прокручивает страницу, чтобы elem оказался вверху.
/*
 · если top=true (по умолчанию), то страница будет прокручена так, чтобы elem появился в верхней части окна.
 · если top=false, то страница будет прокручена, чтобы elem появился внизу.
*/
console.log(`Пример прокрутки scrollIntoView - две синии кнопки`);

/*
* Запретить прокрутку
 Иногда необходимо сделать документ «непрокручиваемым». Например, при показе большого диалогового окна над документом 
– чтобы посетитель мог прокручивать это окно, но не документ.
Чтобы запретить прокрутку страницы(и не только), достаточно установить document.body.style.overflow = "hidden".

 Недостатком этого способа является то, что сама полоса прокрутки исчезает. Её надо компенсировать добавив padding.
*/
console.log(`Пример запрета прокрутки - две жёлтые кнопки`);


warn("======== Координаты ========");
/*
 Большинство соответствующих методов JavaScript работают в одной из двух указанных ниже систем координат:
 · Относительно окна браузера – как position:fixed, отсчёт идёт от верхнего левого угла окна.
  Будем обозначать эти координаты как clientX/clientY.
 · Относительно документа – как position:absolute на уровне документа, отсчёт идёт от верхнего левого угла документа.
  Будем обозначать эти координаты как pageX/pageY.

 При прокрутке документа:
 · pageY – координата точки относительно документа осталась без изменений, так как отсчёт по-прежнему ведётся
  от верхней границы документа (сейчас она прокручена наверх).
 · clientY – координата точки относительно окна изменилась, так как точка стала ближе к верхней границе окна.


 Координаты относительно окна: getBoundingClientRect
 Метод elem.getBoundingClientRect() возвращает координаты в контексте окна для минимального по размеру прямоугольника,
который заключает в себе элемент elem, в виде объекта встроенного класса DOMRect.

 Основные свойства объекта типа DOMRect:
 · x/y – X/Y-координаты начала прямоугольника относительно окна,
 · width/height – ширина/высота прямоугольника (могут быть отрицательными).

Дополнительные, «зависимые», свойства:
 · top/bottom – Y-координата верхней/нижней границы прямоугольника,
 · left/right – X-координата левой/правой границы прямоугольника.
*/
let JSONrect = JSON.stringify(btn__tree.getBoundingClientRect(), null, 2);
console.log(`Координаты красной кнопки: ${JSONrect}`);

function btnRect(obj) {
   obj.addEventListener('click', alert(JSON.stringify(btn__tree.getBoundingClientRect(), null, 2)));
};

/*
 x/y и width/height точно задают прямоугольник. Остальные свойства могут быть вычислены на их основе:
 · left = x
 · top = y
 · right = x + width
 · bottom = y + height


 elementFromPoint(x, y)

 Вызов document.elementFromPoint(x, y) возвращает самый глубоко вложенный элемент в окне,
находящийся по координатам (x, y).
*/
//  Например, код ниже выделяет с помощью стилей и выводит имя тега элемента, который сейчас в центре окна браузера:
let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;
let element = document.elementFromPoint(centerX, centerY)
element.style.background = 'rgba(255, 0, 0, .25)';
console.log(element.tagName);

/*
* fixed позиционированиe
 Чаще всего нам нужны координаты для позиционирования чего-либо.
Чтобы показать что-то около нужного элемента, мы можем вызвать getBoundingClientRect,
чтобы получить его координаты элемента, а затем использовать CSS-свойство position вместе с left/top (или right/bottom).
 Например, функция createMessageUnder(elem, html) ниже показывает сообщение под элементом "красная кнопка":
*/
let el = document.getElementById("btn__tree");

function createMessageUnder(elem, html) {
   // создаём элемент, который будет содержать сообщение
   let message = document.createElement('div');
   message.style.cssText = "position:fixed; color: red;";

   // устанавливаем координаты элементу, не забываем про "px"!
   let coords = elem.getBoundingClientRect();
   message.style.left = coords.left + 'px'; // можно ставить любые координаты 
   message.style.top = coords.bottom + 'px';

   message.innerHTML = html;
   return message;
}
// добавим сообщение на страницу на 5 секунд
let message = createMessageUnder(el, 'ВСЕГО ХОРО-ШЕГО!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);




