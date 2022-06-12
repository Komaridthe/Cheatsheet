let { warn } = console;


warn("==== Введение в браузерные события ====");
/*
*  События
 Событие – это сигнал от браузера о том, что что-то произошло.

 Это основные события..
 *События мыши:
 · click – происходит, когда кликнули на элемент левой кнопкой мыши (на устройствах с сенсорными экранами оно происходит при касании).
 · contextmenu – происходит, когда кликнули на элемент правой кнопкой мыши.
 · mouseover / mouseout – когда мышь наводится на / покидает элемент.
 · mousedown / mouseup – когда нажали / отжали кнопку мыши на элементе.
 · mousemove – при движении мыши.

*События на элементах управления:
 · submit – пользователь отправил форму <form>.
 · focus – пользователь фокусируется на элементе, например нажимает на <input>.

*Клавиатурные события:
 · keydown и keyup – когда пользователь нажимает / отпускает клавишу.

*События документа:
 · DOMContentLoaded – когда HTML загружен и обработан, DOM документа полностью построен и доступен.

*CSS events:
 · transitionend – когда CSS-анимация завершена.
*/

warn("======== Обработчики событий ========");
/*
* Использование атрибута HTML
 Обработчик может быть назначен прямо в разметке, в атрибуте, который называется on<событие>.
Чтобы назначить обработчик события click на элементе input, можно использовать атрибут onclick

 <input value="Нажми меня" onclick='alert("Спасибо !")' type="button"></input>

 Атрибут HTML-тега – не самое удобное место для написания большого количества кода,
поэтому лучше создать отдельную JavaScript-функцию и вызвать её там.
*/
function countRabbits() {
   for (let i = 1; i <= 3; i++) {
      alert("Кролик номер " + i);
      console.log("Кролик номер " + i);
   }
}

// Использование свойства DOM-объекта
// Можно назначать обработчик, используя свойство DOM-элемента on<событие>.
elem.onclick = function () {
   alert("Пасиб !");
   console.log("Пасиб !");
}
/*
 Так как у элемента DOM может быть только одно свойство с именем onclick,
то назначить более одного обработчика таким образом нельзя.

В примере из HTML назначение через JavaScript перезапишет обработчик из атрибута.

! Убрать обработчик можно назначением elem.onclick = null.

* Доступ к элементу через this
 Внутри обработчика события this ссылается на текущий элемент, то есть на тот, на котором, как говорят,
«висит» (т.е. назначен) обработчик.
В коде из HTML button выводит своё содержимое, используя this.innerHTML.


* addEventListener
 element.addEventListener(event, handler[, options]);
 · event - Имя события, например "click".
 · handler - Ссылка на функцию-обработчик.
 · options - Дополнительный объект со свойствами:
  · once: если true, тогда обработчик будет автоматически удалён после выполнения.
  · capture: фаза, на которой должен сработать обработчик. Так исторически сложилось,
   что options может быть false/true, это то же самое, что {capture: false/true}.
  · passive: если true, то указывает, что обработчик никогда не вызовет preventDefault().

 Для удаления обработчика следует использовать removeEventListener:
element.removeEventListener(event, handler[, options]);

Для удаления нужно передать именно ту функцию-обработчик которая была назначена.
*/
function handler() {
   alert('Спасибо!');
}

input.addEventListener("click", handler);
// ....
input.removeEventListener("click", handler);

//! Если функцию обработчик не сохранить где-либо, мы не сможем её удалить!!


warn("======== Объект события ========");
/*
 Когда происходит событие, браузер создаёт объект события, записывает в него детали
и передаёт его в качестве аргумента функции-обработчику.
Пример ниже демонстрирует получение координат мыши из объекта события:
*/
elemEvent.addEventListener('click', function (event) {
   alert(event.type + ' на ' + event.currentTarget);
   alert('Координаты: ' + event.clientX + ':' + event.clientY);

   console.log(event.type + ' на ' + event.currentTarget);
   console.log('Координаты: ' + event.clientX + ':' + event.clientY);
})

//* Некоторые свойства объекта event:
/*
 · event.type - Тип события, в данном случае "click".
 · event.currentTarget - Элемент, на котором сработал обработчик. Значение – обычно такое же, как и у this,
  но если обработчик является функцией-стрелкой или при помощи bind привязан другой объект в качестве this,
  то мы можем получить элемент из event.currentTarget.
 · event.clientX / event.clientY - Координаты курсора в момент клика относительно окна, для событий мыши.


* Объект-обработчик: handleEvent
 Мы можем назначить обработчиком не только функцию, но и объект при помощи addEventListener.
В этом случае, когда происходит событие, вызывается метод объекта handleEvent.
*/
obj.addEventListener('click', {
   handleEvent(event) {
      console.log(event.type + " на " + event.currentTarget);
   }
});

// Также можно использовать для этого класс:
class ObjBtn {
   handleEvent(event) {
      switch (event.type) {
         case 'mousedown':
            obj.innerText = 'Кнопка нажата';
            break;

         case 'mouseup':
            obj.innerText += ' ..и отжата';
            break;
      }
   }
}
let objBtn = new ObjBtn();
obj.addEventListener('mousedown', objBtn);
obj.addEventListener('mouseup', objBtn);
/*
 Метод handleEvent не обязательно должен выполнять всю работу сам. Он может вызывать другие методы,
которые заточены под обработку конкретных типов событий, вот так:
*/
class SeparateMetods {
   handleEvent(event) {
      let method = 'on' + event.type[0].toUpperCase() + event.type.slice(1);
      this[method](event);
   }

   onMousedown() {
      objTwo.innerText = 'Кнопка мыши нажата';
   }
   onMouseup() {
      objTwo.innerText = ' .. и снова отжата';
   }
}
let separ = new SeparateMetods();

objTwo.addEventListener('mousedown', separ);
objTwo.addEventListener('mouseup', separ);


///* Примеры
// Удаление текста
document.querySelector('.div_remove').addEventListener('click', () => {
   text.style.display = 'none';
})
// Удаление себя (в HTML)


warn("======== Всплытие и погружение ========");
/*
 При наступлении события – самый глубоко вложенный элемент, на котором оно произошло,
помечается как «целевой» (event.target).
 · Затем событие сначала двигается вниз от корня документа к event.target, по пути вызывая обработчики,
  поставленные через addEventListener(...., true), где true – это сокращение для {capture: true}.
 · Далее обработчики вызываются на целевом элементе.
 · Далее событие двигается от event.target вверх к корню документа, по пути вызывая обработчики,
  поставленные через on<event> и addEventListener без третьего аргумента или с третьим аргументом равным false.

 Каждый обработчик имеет доступ к свойствам события event:
 · event.target – самый глубокий элемент, на котором произошло событие.
 · event.currentTarget (=this) – элемент, на котором в данный момент сработал обработчик
  (тот, на котором «висит» конкретный обработчик, элемент перед addEventListener)
 · event.eventPhase – на какой фазе он сработал (погружение=1, фаза цели=2, всплытие=3).

 event.stopPropagation() - остановливает всплытие обработчика события 
*/

//* Пример прохождения фаз погружения и всплытия в люой точке экрана
// for (const elem of document.querySelectorAll('*')) {
//    elem.addEventListener('click', e => alert(`Погружение: ${elem.tagName}`), true);
//    elem.addEventListener('click', e => alert(`Всплытие: ${elem.tagName}`));
// }


warn("======== Делегирование событий ========");
/*
 Идея в том, что если у нас есть много элементов, события на которых нужно обрабатывать похожим образом,
то вместо того, чтобы назначать обработчик каждому, мы ставим один обработчик на их общего предка.

 Задача – реализовать подсветку ячейки <td> при клике.
Вместо того, чтобы назначать обработчик для каждой ячейки <td> (их может быть очень много) – 
- вешается «единый» обработчик на элемент <table>.
Он будет использовать event.target, чтобы получить элемент, на котором произошло событие, и подсветить его.
*/
let table = document.getElementById('bagua-table');
let selectedTd;
table.addEventListener('click', e => {
   let td = e.target.closest('td'); // все элементы внутри ячейки
   if (!td || !table.contains(td)) return; // если не в td или вне таблицы, то не интересует
   highlight(td);
})
function highlight(td) {
   if (selectedTd) selectedTd.classList.remove('highlight');
   selectedTd = td;
   selectedTd.classList.add('highlight');
}

/*
* Применение делегирования: действия в разметке
 Допустим, нужно сделать меню с разными кнопками: «Сохранить (save)», «Загрузить (load)», «Поиск (search)» и т.д.
И есть объект с соответствующими методами save, load, search… Как их состыковать?
 Можно добавить один обработчик для всего меню и атрибуты data-action для каждой кнопки в соответствии с методами,
которые они вызывают:
 <button data-action="save">Сохранить</button>
*/
class Menu {
   constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // 
   }
   save() {
      alert('Сохраняю!')
   }
   load() {
      alert('Загружаю!')
   }
   search() {
      alert('Ищу!')
   }
   onClick(e) {
      let action = e.target.dataset.action;
      if (action) this[action]();
   }
}
new Menu(menu);

/*
* Приём проектирования «поведение»
 Делегирование событий можно использовать для добавления элементам «поведения» (behavior),
декларативно задавая обработчики установкой специальных HTML-атрибутов и классов.
 · Элементу ставится пользовательский атрибут, описывающий его поведение.
 · При помощи делегирования ставится обработчик на документ, который ловит все клики (или другие события) и,
  если элемент имеет нужный атрибут, производит соответствующее действие.

* Поведение: «Счётчик»
document.addEventListener('click', e => {
   if (e.target.dataset.counter != undefined) e.target.value++; // если есть атрибут...
})

 При помощи делегирования мы фактически добавили новый «псевдостандартный» атрибут в HTML, 
который добавляет элементу новую возможность («поведение»).

* Поведение: «Переключатель» (Toggler)
 Сделаем так, что при клике на элемент с атрибутом data-toggle-id будет скрываться/показываться
элемент с заданным id:
*/
document.addEventListener('click', e => {
   let id = e.target.dataset.toggleId;
   if (!id) return;

   let elem = document.getElementById('subscribe-mail');
   elem.hidden = !elem.hidden;
})


warn("======== Действия браузера по умолчанию ========");
/*
Многие события автоматически влекут за собой действие браузера.Например:
 · Клик по ссылке инициирует переход на новый URL.
 · Нажатие на кнопку «отправить» в форме – отсылку её на сервер.
 · Зажатие кнопки мыши над текстом и её движение в таком состоянии – инициирует его выделение.

* Отмена действия браузера
 · Основной способ – это воспользоваться объектом event.
 Для отмены действия браузера существует стандартный метод event.preventDefault().
 · Если же обработчик назначен через on<событие> (не через addEventListener),
 то также можно вернуть false из обработчика.
*/
menu_2.onclick = e => {
   if (e.target.nodeName != 'A') return;

   let href = e.target.getAttribute('href');
   alert(href); // меняем логику
   return false; // ! отменить действие браузера (переход по ссылке)
}

/*
* Опция «passive» для обработчика
 Необязательная опция passive: true для addEventListener сигнализирует браузеру, что обработчик
не собирается выполнять preventDefault().
 Есть некоторые события, как touchmove на мобильных устройствах. Когда браузер обнаружит такое событие,
он должен для начала запустить все обработчики и после, если preventDefault не вызывается нигде,
он может начать прокрутку. Это может вызвать ненужные задержки в пользовательском интерфейсе.
 Опция passive: true сообщает браузеру, что обработчик не собирается отменять прокрутку.
Тогда браузер начинает её немедленно, обеспечивая максимально плавный интерфейс,
параллельно обрабатывая событие.

* event.defaultPrevented
 Свойство event.defaultPrevented установлено в true, если действие по умолчанию было предотвращено,
и false, если нет.
 Использууется, чтобы не применять .stopPropagetion(), который лишит элемент всплытия.
*/
elem_btn.oncontextmenu = e => {
   e.preventDefault();
   alert("Контекстное меню кнопки");
}

el_btn_block.oncontextmenu = e => {
   if (e.defaultPrevented) return; // проверка на отмену действия элементом

   e.preventDefault();
   alert("Контекстное меню документа");
}


warn("==== Генерация пользовательских событий ====");
/*
* Конструктор Event
 Встроенные классы для событий формируют иерархию аналогично классам для DOM-элементов.
Её корнем является встроенный класс Event.
   let event = new Event(type[, options]);

 · type – тип события, строка, например "click" или же любой придуманный нами – "my-event".
 · options – объект с тремя необязательными свойствами:
  · bubbles: true/false – если true, тогда событие всплывает.
  · cancelable: true/false – если true, тогда можно отменить действие по умолчанию.
  · composed: true/false – если true, тогда событие будет всплывать наружу за пределы Shadow DOM.
! По умолчанию все три свойства установлены в false!


* Метод dispatchEvent
 После того, как объект события создан, мы должны запустить его на элементе,
вызвав метод elem.dispatchEvent(event).
 Затем обработчики отреагируют на него, как будто это обычное браузерное событие. 
Если при создании указан флаг bubbles, то оно будет всплывать.
*/
let autoEvent = new Event('click'); // событие click инициируется JS-кодом так, как будто кликнули по кнопке
elem_auto.dispatchEvent(autoEvent);

/*
* event.isTrusted
 Свойство event.isTrusted принимает значение true для событий, порождаемых реальными действиями пользователя,
и false для генерируемых кодом.
*/

//* Пример всплытия
document.addEventListener('hello', e => {
   console.log(`Привет от ${e.target.tagName}`); // событие сработает если всплывёт 'hello'
})
let helloEvent = new Event('hello', { bubbles: true }); // прописываем возможность всплытия
h2elem.dispatchEvent(helloEvent);
/*
!  Нужно использовать addEventListener для наших собственных событий, т.к. on<event>-свойства
! существуют только для встроенных событий, то есть document.onhello не сработает.


* MouseEvent, KeyboardEvent и другие
 Для некоторых конкретных типов событий есть свои специфические конструкторы

 · UIEvent
 · FocusEvent
 · MouseEvent
 · WheelEvent
 · KeyboardEvent
 · …

 Специфический конструктор позволяет указать стандартные свойства для данного типа события.
Например, clientX/clientY для события мыши:
*/
let newMouseEvent = new MouseEvent('clickTwo', {
   bubbles: true,
   cancelable: true,
   clientX: 100,
   clientY: 100
});
console.log(newMouseEvent.clientX);
//! Можно обойтись и Event, а свойства записать в объект отдельно, после создания, вот так: event.clientX=100.

/*
* Пользовательские события
 Для генерации событий совершенно новых типов, таких как "hello", следует использовать
конструктор new CustomEvent.
 У второго аргумента-объекта есть дополнительное свойство detail, в котором можно указывать
информацию для передачи в событие.
*/
vasia.addEventListener('helloVasia', e => {
   console.log(e.detail.name);
});
vasia.dispatchEvent(new CustomEvent('helloVasia', {
   detail: { name: 'Василий' }
}));
/*
 Можно и в обычное new Event записать любые свойства. Но CustomEvent предоставляет специальное поле detail
во избежание конфликтов с другими свойствами события.
 Свойство detail может содержать любые данные.


* event.preventDefault()
 Вызов event.preventDefault() является возможностью для обработчика события сообщить в
сгенерировавший событие код, что эти действия надо отменить.
 Тогда вызов elem.dispatchEvent(event) возвратит false. И код, сгенерировавший событие, узнает,
что продолжать не нужно.
*/
let hide = () => {
   let hideEvent = new CustomEvent('hide', {
      cancelable: true //  иначе, вызов event.preventDefault() будет проигнорирован.
   });
   if (!rabbit.dispatchEvent(hideEvent)) {
      alert('Отмена действия!');
   } else {
      rabbit.hidden = true;
   }
}
rabbit.addEventListener('hide', e => {
   if (confirm("Вызвать preventDefault?")) e.preventDefault();
});

/*
* Вложенные события обрабатываются синхронно
 Обычно события обрабатываются асинхронно. То есть, если браузер обрабатывает onclick и в процессе этого
произойдёт новое событие, то оно ждёт, пока закончится обработка onclick.
 Исключением является ситуация, когда событие инициировано из обработчика другого события.
*/
asyncBtn.onclick = () => {
   alert(1);

   asyncBtn.dispatchEvent(new CustomEvent('asyncDoc', { // вложенное событие alert(3)
      bubbles: true
   }));

   alert(2);
};
document.addEventListener('asyncDoc', () => { alert(3) });
/*
 Это справедливо не только для dispatchEvent, но и для других ситуаций. JavaScript в обработчике события
может вызвать другие методы, которые приведут к другим событиям – они тоже обрабатываются синхронно.
*/

