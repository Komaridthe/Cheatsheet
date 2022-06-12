const { warn } = console;

warn("======== С орбитальной высоты ========");
//* Этот раздел описывает набор современных стандартов для «веб-компонентов».
console.log('Это вводный теоретический раздел');
/*
* Компонентная архитектура
 Компонент имеет:
 · свой собственный JavaScript-класс.
 · DOM-структура управляется исключительно своим классом, и внешний код не имеет к ней доступа (принцип «инкапсуляции»).
 · CSS-стили, применённые к компоненту.
 · API: события, методы класса и т.п., для взаимодействия с другими компонентами.

 «Веб-компоненты» предоставляют встроенные возможности браузера для этого, поэтому нам больше не нужно эмулировать их.
 · Пользовательские элементы – для определения пользовательских HTML-элементов.
 · Теневой DOM – для создания внутреннего DOM компонента, скрытого от остальных.
 · Области видимости CSS – для определения стилей, которые применяются только внутри теневого DOM компонента.
 · Перенаправление событий и другие мелочи для создания более удобных в разработке пользовательских компонентов.
*/

warn("=== Пользовательские элементы (Custom Elements) ===");
/*
* Мы можем создавать пользовательские HTML-элементы, описываемые нашим классом, со своими методами и свойствами, событиями и так далее.
Словарь HTML-тегов богат, но не бесконечен. Не существует <easy-tabs>, <sliding-carousel>, <beautiful-upload>..
 Существует два вида пользовательских элементов:
 · Автономные пользовательские элементы – «полностью новые» элементы, расширяющие абстрактный класс HTMLElement.
 · Пользовательские встроенные элементы – элементы, расширяющие встроенные, например кнопку HTMLButtonElement и т.п.

 Чтобы создать пользовательский элемент, нам нужно сообщить браузеру ряд деталей о нём: как его показать,
что делать, когда элемент добавляется или удаляется со страницы и т.д.
 Это делается путём создания класса со специальными методами.
*/
class MyElement extends HTMLElement {
   constructor() {
      super();
      // элемент создан
   }
   connectedCallback() {
      // браузер вызывает этот метод при добавлении элемента в документ
      // (может вызываться много раз, если элемент многократно добавляется/удаляется)
   }
   disconnectedCallback() {
      // браузер вызывает этот метод при удалении элемента из документа
      // (может вызываться много раз, если элемент многократно добавляется/удаляется)
   }
   static get observedAttributes() {
      return [/* массив имён атрибутов для отслеживания их изменений */];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      // вызывается при изменении одного из перечисленных выше атрибутов
   }
   adoptedCallback() {
      // вызывается, когда элемент перемещается в новый документ
      // (происходит в document.adoptNode, используется очень редко)
   }
   // у элемента могут быть ещё другие методы и свойства
}
// После этого нужно зарегистрировать элемент. Сообщить браузеру, что <my-element> обслуживается нашим новым классом
customElements.define("my-element", MyElement); // customElements.define(tag, class)
/*
* Теперь для любых HTML-элементов с тегом <my-element> создаётся экземпляр MyElement и вызываются вышеупомянутые методы.
* Также можно использовать document.createElement('my-element') в JavaScript.

! Имя пользовательского элемента должно содержать дефис -, например, my-element и super-button – валидные имена, а myelement – нет.
! Это чтобы гарантировать отсутствие конфликтов имён между встроенными и пользовательскими элементами HTML.


* Пример: «time-formatted»
 Элемент <time> уже существует в HTML для даты/времени. Но сам по себе он не выполняет никакого форматирования.
Создадим элемент <time-formatted>, который отображает время в удобном формате с учётом языка:
*/
class TimeFormatted extends HTMLElement {
   connectedCallback() {
      let date = new Date(this.getAttribute('datetime') || Date.now());

      this.innerHTML = new Intl.DateTimeFormat("default", {
         year: this.getAttribute('year') || undefined,
         month: this.getAttribute('month') || undefined,
         day: this.getAttribute('day') || undefined,
         hour: this.getAttribute('hour') || undefined,
         minute: this.getAttribute('minute') || undefined,
         second: this.getAttribute('second') || undefined,
         timeZoneName: this.getAttribute('time-zone-name') || undefined,
      }).format(date);
   }
}
customElements.define("time-formatted", TimeFormatted);
/*
 · Класс имеет только один метод connectedCallback() – браузер вызывает его, когда элемент <time-formatted> добавляется на страницу
  (или когда HTML-парсер обнаруживает его), и он использует встроенный форматировщик данных Intl.DateTimeFormat,
   хорошо поддерживаемый в браузерах, чтобы показать красиво отформатированное время.
 · Нужно зарегистрировать новый элемент, используя customElements.define(tag, class).
 · Можно использовать его везде.


* Чтобы получить информацию о пользовательских элементах, есть следующие методы:
 · customElements.get(name) – возвращает класс пользовательского элемента с указанным именем name,
 · customElements.whenDefined(name) – возвращает промис, который переходит в состояние «успешно выполнен» (без значения),
  когда определён пользовательский элемент с указанным именем name.


* Наблюдение за атрибутами
 Можно наблюдать за атрибутами, поместив их список в статический геттер observedAttributes().
При изменении таких атрибутов вызывается attributeChangedCallback.
Он срабатывает не для любого атрибута по соображениям производительности.
 Вот новый <time-formatted>, который автоматически обновляется при изменении атрибутов:
*/
class NewTimeFormatted extends HTMLElement {
   render() {
      let date = new Date(this.getAttribute('datetime') || Date.now());

      this.innerHTML = new Intl.DateTimeFormat("default", {
         year: this.getAttribute('year') || undefined,
         month: this.getAttribute('month') || undefined,
         day: this.getAttribute('day') || undefined,
         hour: this.getAttribute('hour') || undefined,
         minute: this.getAttribute('minute') || undefined,
         second: this.getAttribute('second') || undefined,
         timeZoneName: this.getAttribute('time-zone-name') || undefined,
      }).format(date);
   }
   connectedCallback() {
      if (!this.rendered) {
         this.render();
         this.rendered = true;
      }
   }
   static get observedAttributes() {
      return ['datetime', 'year', 'month', 'day', 'hour', 'minute', 'second', 'time-zone-name'];
   }
   attributeChangedCallback(name, oldValue, newValue) {
      this.render();
   }
}
customElements.define("new-time-formatted", NewTimeFormatted);

setInterval(() => elem.setAttribute('datetime', new Date()), 1000);
/*
 · Логика рендеринга перенесена во вспомогательный метод render().
 · Мы вызываем его один раз, когда элемент вставляется на страницу.
 · При изменении атрибута, указанного в observedAttributes(), вызывается attributeChangedCallback().
 · …и происходит ререндеринг элемента.
 · В конце мы легко создаём живой таймер.


* Модифицированные встроенные элементы
 Можно расширять и модифицировать встроенные HTML-элементы, наследуя их классы.
Например, кнопки <button> являются экземплярами класса HTMLButtonElement, так выглядит элемент на его основе.
 1) Унаследуем HTMLButtonElement нашим классом:
*/
class HelloButton extends HTMLButtonElement {
   constructor() {
      super();
      this.addEventListener('click', () => { console.log('Hello, freak bitches!'); })
   }
}

// 2) Предоставим третий аргумент в customElements.define, указывающий тег:
customElements.define('hello-button', HelloButton, { extends: 'button' });
//! Бывает, что разные теги имеют одинаковый DOM-класс, поэтому указание тега необходимо.

// 3) Чтобы использовать пользовательский элемент, вставим обычный тег <button>, но добавим к нему is="hello-button":
// в html..


warn("======== Shadow DOM ========");
/*
* Теневое дерево
Каждый DOM-элемент может иметь 2 типа поддеревьев DOM:
 · Light tree – обычное, «светлое», DOM-поддерево, состоящее из HTML-потомков.
 · Shadow tree – скрытое, «теневое», DOM-поддерево, не отражённое в HTML.

 Если у элемента имеются оба поддерева, браузер отрисовывает только теневое дерево.
Также мы всё же можем задать «композицию» теневого и обычного деревьев.

 Теневое дерево можно использовать в пользовательских элементах (Custom Elements), чтобы спрятать внутренности компонента
и применить к ним локальные стили.

 Этот <show-hello> элемент прячет свой внутренний DOM в теневом дереве:
*/
customElements.define('show-hello', class extends HTMLElement {
   connectedCallback() {
      const shadow = this.attachShadow({ mode: 'open' });
      shadow.innerHTML = `<p>
      Hello, ${this.getAttribute('name')} !
      </p>`;
   }
});
let hello = document.createElement('show-hello');
hello.setAttribute('name', 'John');
document.body.append(hello);

/*
* Вызов elem.attachShadow({mode: …}) создаёт теневое дерево.
 Есть два ограничения:
 · Для каждого элемента мы можем создать только один shadow root.
 · В качестве elem может быть использован пользовательский элемент (Custom Element), либо один из следующих элементов:
!  «article», «aside», «blockquote», «body», «div», «footer», «h1…h6», «header», «main» «nav», «p», «section» или «span».
!  Остальные, например, <img>, не могут содержать теневое дерево.

 Свойство mode задаёт уровень инкапсуляции. У него может быть только два значения:
 · "open" – корень теневого дерева («shadow root») доступен как elem.shadowRoot.
  Любой код может получить теневое дерево elem.
 · "closed" – elem.shadowRoot всегда возвращает null.
  До теневого DOM в таком случае мы сможем добраться только по ссылке, которую возвращает attachShadow.

 С возвращаемым методом attachShadow объектом корнем теневого дерева, можно работать как с обычным DOM-элементом:
менять его innerHTML или использовать методы DOM, такие как append, чтобы заполнить его.
* Элемент с корнем теневого дерева называется – «хозяин» (host) теневого дерева, и он доступен в качестве свойства host у shadow root:
 при условии, что {mode: "open"}, иначе elem.shadowRoot равен null
 */
console.log(hello.shadowRoot.host === hello); // true

/*
* Инкапсуляция
 Теневой DOM отделён от главного документа:
 · Элементы теневого DOM не видны из обычного DOM через querySelector.
  В частности, элементы теневого DOM могут иметь такие же идентификаторы, как у элементов в обычном DOM (light DOM).
 Они должны быть уникальными только внутри теневого дерева.
 · У теневого DOM свои стили. Стили из внешнего DOM не применятся.
*/
el.attachShadow({ mode: 'open' });

// у теневого дерева свои стили
el.shadowRoot.innerHTML = `
<style> h5 { font-weight: bold; } </style>
<h5>Hello, Mr.Ipkis!</h5>`;

// <h5> виден только запросам внутри теневого дерева
console.log(document.querySelectorAll('h5').length); // 0
console.log(el.shadowRoot.querySelectorAll('h5').length); // 1
/*
 · Стили главного документа не влияют на теневое дерево (в фаиле style.css есть стили на h5).
 · …Но свои внутренние стили работают.
 · Чтобы добраться до элементов в теневом дереве, нам нужно искать их изнутри самого дерева.
*/

warn("======== Элемент 'template' ========");
/*
 · Содержимым <template> может быть любой синтаксически корректный HTML.
 · Содержимое <template> считается находящимся «вне документа», поэтому оно ни на что не влияет.
 · Мы можем получить доступ к template.content из JavaScript, клонировать его и переиспользовать в новом компоненте.

 Элемент <template> уникальный по следующим причинам:
 · Браузер проверяет правильность HTML-синтаксиса в нём (в отличие от строк в скриптах).
 · …При этом позволяет использовать любые HTML-теги, даже те, которые без соответствующей обёртки не используются (например <tr>).
 · Его содержимое оживает (скрипты выполняются, <video autoplay> проигрывается и т. д.), когда помещается в документ.
 Смотри hyml..

! Элемент <template> не поддерживает итерацию, связывания данных или подстановки переменных. Однако эти возможности можно реализовать поверх него.
*/
//* Содержимое шаблона доступно по его свойству content в качестве DocumentFragment – особый тип DOM-узла.
element.onclick = () => {
   element.attachShadow({ mode: 'open' });
   element.shadowRoot.append(tmpl.content.cloneNode(true));
   element.shadowRoot.getElementById('message').innerHTML = "Привет из теней!";
};


warn("======== Слоты теневого DOM, композиция ========");
/*
* Именованные слоты
 Теневой DOM поддерживает элементы <slot>, которые автоматически наполняются контентом из обычного, «светлого» DOM-дерева.
Теневой DOM <user-card> имеет два слота, заполняемых из обычного DOM:
*/
customElements.define('user-card', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <div>Имя:
       <slot name="username"></slot>
      </div>
      <div>Дата рождения:
       <slot name="birthday"></slot>
      </div>
      `;
   }
});
/*
 В теневом DOM <slot name="X"> определяет «точку вставки» – место, где отображаются элементы с slot="X".
Затем браузер выполняет «композицию»: берёт элементы из обычного DOM-дерева и отображает их в соответствующих слотах теневого DOM-дерева.
 Теперь у элемента есть два DOM-дерева: обычное («светлое») и теневое.
Чтобы отобразить содержимое, для каждого <slot name="..."> в теневом DOM браузер ищет slot="..." с таким же именем в обычном DOM.
! Эти элементы отображаются внутри слотов.

! Рзвёрнутое DOM-дерево существует только для целей отображения и обработки событий. Фактически в документе расположение узлов не меняется.
*/
console.log(document.querySelectorAll('user-card span').length); // 2
/*
! Атрибут slot="..." работает только на непосредственных детях элемента-хозяина теневого дерева (в примере это элемент <user-card>).
! Для вложенных элементов он игнорируется.

* Содержимое слота «по умолчанию»
 При добавлении данных в <slot>, они становятся содержимым «по умолчанию». Браузер отображает его,
если в светлом DOM-дереве отсутствуют данные для заполнения слота.
 Например, в этой части теневого дерева текст Аноним отображается, если в светлом дереве нет значения slot="username".
<div>Имя:
  <slot name="username">Аноним</slot>
</div>


* Слот по умолчанию (первый без имени)
 Первый <slot> в теневом дереве без атрибута name является слотом по умолчанию. Он будет отображать данные со всех узлов светлого дерева,
не добавленные в другие слоты.
 Например, добавим слот по умолчанию в новый элемент на базе <user-card>; он будет собирать всю информацию о пользователе,
не занесённую в другие слоты:
*/
customElements.define('user-card-two', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
     <div>Имя:
       <slot name="username"></slot>
     </div>
     <div>Дата рождения:
       <slot name="birthday"></slot>
     </div>
     <fieldset>
       <legend>Другая информация</legend>
       <slot></slot>
     </fieldset>
     `; // слот в fildset'е соберёт всё содержимое обычного дерева, не добавленное в слоты
   }
});
// Элементы добавляются в дефолтный слот по очереди, поэтому в нём оказались оба элемента данных, которые не были добавлены в слоты.

/*
! Если в светлом DOM есть несколько элементов с одинаковым именем слота, они добавляются в слот один за другим.
* Пример меню
 Можно использовать слоты для распределения элементов. Смотри HTML.
 <custom-menu> - разметка для меню
 <tamplate id="tmpl2"> - Шаблон теневого DOM-дерева с правильными слотами
*/
customElements.define('custom-menu', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(tmpl2.content.cloneNode(true)); // tmpl -- шаблон для теневого DOM-дерева

      // нельзя выбирать узлы светлого DOM, поэтому обработаем клики на слоте
      this.shadowRoot.querySelector('slot[name="title"]').onclick = () => {
         this.shadowRoot.querySelector('.menu').classList.toggle('closed');
      }
   }
});

/*
* Обновление слотов
 Браузер наблюдает за слотами и обновляет отображение при добавлении и удалении элементов в слотах.
Если код компонента хочет узнать об изменениях в слотах, можно использовать событие slotchange.
Здесь пункт меню вставляется динамически через 1,5 секунды, и заголовок меняется через одну:
*/
customElements.define('custom-menu-two', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <div class="menu">
        <slot name="title"></slot>
        <ul><slot name="item"></slot></ul>
      </div>`;

      // shadowRoot не может иметь обработчиков событий, поэтому используется первый потомок
      this.shadowRoot.firstElementChild.addEventListener('slotchange',
         e => console.log("slotchange: " + e.target.name));

      // слотовый элемент добавляется/удаляется/заменяется (это пример использования методов JS, о них ниже)
      this.shadowRoot.firstElementChild.addEventListener('slotchange', e => {
         let slot = e.target;
         if (slot.name == 'item') {
            this.items = slot.assignedElements().map(elem => elem.textContent);
            console.log("Items: " + this.items);
         }
      });
   }
});
setTimeout(() => {
   menu.insertAdjacentHTML('beforeEnd', '<li slot="item">Лосось</li><li slot="item">Форель</li><li slot="item">Треска</li>')
}, 1500);
setTimeout(() => {
   menu.querySelector('[slot="title"]').innerHTML = "Новое меню:";
}, 1000);
/*
 Здесь есть два события slotchange:
 · При инициализации: slotchange: title запускается сразу же, как только slot="title" из обычного дерева попадает в соответствующий слот.
 · Через 1,5 секунды: slotchange: item запускается, когда добавляется новый элемент <li slot="item">.

! Cобытие slotchange не запускается через 1 секунду, когда меняется контент slot="title". Это происходит потому, что сам слот не меняется.
! Меняется содержимое элемента, который находится в слоте, а это совсем другое.


* API слотов
 Если у теневого дерева стоит {mode: 'open'}, то мы можем выяснить, какие элементы находятся в слоте, и, наоборот,
определить слот по элементу, который в нём находится:
 · node.assignedSlot – возвращает элемент <slot>, в котором находится node.
 · slot.assignedNodes({flatten: true/false}) – DOM-узлы, которые находятся в слоте. Опция flatten имеет значение по умолчанию false.
  Если явно изменить значение на true, она просматривает развёрнутый DOM глубже и возвращает вложенные слоты, если есть вложенные компоненты,
  и резервный контент, если в слоте нет узлов.
 · slot.assignedElements({flatten: true/false}) – DOM-элементы, которые находятся в слоте (то же самое, что выше, но только узлы-элементы).
*/


warn("======== Настройка стилей теневого DOM ========");
/*
 Теневой DOM может содержать теги <style> и <link rel="stylesheet" href="…">. В последнем случае таблицы стилей кешируются по протоколу HTTP,
так что они не будут загружаться повторно при использовании одного шаблона для многих компонентов.


*:host
 Селектор :host позволяет выбрать элемент-хозяин (элемент, содержащий теневое дерево).
Например, создаём элемент <custom-dialog> который нужно расположить по-центру. Для этого необходимо стилизовать сам элемент <custom-dialog>.
 Смотри HTML.
*/
customElements.define('custom-dialog', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' }).append(hostTmpl.content.cloneNode(true));
   }
});

/*
* Каскадирование
 Элемент-хозяин (элемент <custom-dialog>) находится в светлом DOM, поэтому к нему применяются CSS-стили документа.
! Если есть некоторое свойство, стилизованное как в :host локально, так и в документе, то стиль документа будет приоритетным.
 Например, если в документе из примера поставить:
<style>
custom-dialog {
  padding: 0;
}
</style>
…то <custom-dialog> будет без padding.


* :host(selector)
 То же, что и :host, но применяется только в случае, если элемент-хозяин подходит под селектор selector.
Например, мы бы хотели выровнять по центру <custom-dialog>, только если он содержит атрибут centered:
Мсотри HTML.
*/
customElements.define('custom-dialog-two', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' }).append(hostTmplTwo.content.cloneNode(true));
   }
});
// Теперь дополнительные стили для выравнивания по центру применяются только к элементу: <custom-dialog centered>.

/*
* Применение стилей к содержимому слотов
 Элементы слотов происходят из светлого DOM, поэтому они используют стили документа. Локальные стили не влияют на содержимое слотов.
В примере ниже текст в <span> жирный в соответствии со стилями документа, но не берёт background из локальных стилей:
*/
customElements.define('user-card-style', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
       span { background: red; }
      </style>
      Имя: <slot name="username"></slot>
      `;
   }
});
/*
 В результате текст жирный, но не красный.
Если нужно стилизовать слотовые элементы в компоненте, то есть два варианта.
 1) можно стилизовать сам <slot> и полагаться на наследование CSS:
*/
customElements.define('user-card-style-two', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
      slot[name="username"] { font-weight: bold; color: red; }
      </style>
      Имя: <slot name="username"></slot>
    `;
   }
});
/*
 Здесь <span>John Smith</span> выделяется жирным шрифтом, потому что наследование CSS действует между <slot> и его содержимым.
! Но в CSS как таковом не все свойства наследуются.

 2) использовать псевдокласс ::slotted(селектор). Соответствует элементам, если выполняются два условия:
 · Это слотовый элемент, пришедший из светлого DOM. То есть любой элемент, вставленный в <slot>, но только сам элемент, а не его потомки.
 · Элемент соответствует селектору.
*/
customElements.define('user-card-style-tree', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `
      <style>
       ::slotted(div) {display: inline-block; border: 2px solid red; padding: 10px;}
      </style>
      Name: <slot name="username"></slot>
      `;
   }
});
/*
! Селектор ::slotted не может спускаться дальше в слот. Эти селекторы недействительны:
::slotted(div span) {
  слот <div> не соответствует этому
}

::slotted(div) p {
  не может войти в светлый DOM
}
! Кроме того, ::slotted можно использовать только в CSS. Мы не можем использовать его в querySelector.


* CSS-хуки с пользовательскими свойствами
 Аналогично тому, как мы предусматриваем у компонента методы, чтобы взаимодействовать с ним, мы можем использовать переменные CSS
(пользовательские свойства CSS) для его стилизации.
! Пользовательские свойства CSS существуют одновременно на всех уровнях, как светлом, так и в тёмном DOM.
*/
customElements.define('user-card-four', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.append(document.getElementById('tmplFour').content.cloneNode(true));
   }
});


warn("======== Теневой DOM и события ========");
//! События, которые произошли в теневом DOM, но пойманы снаружи этого DOM, имеют элемент-хозяин в качестве целевого элемента event.target.
customElements.define('user-card-event', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<p>
      <button>Нажми меня</button>
    </p>`;
      this.shadowRoot.firstElementChild.onclick =
         e => console.log("Внутренний целевой элемент: " + e.target.tagName);
   }
});
document.onclick = e => console.log("Внешний целевой элемент: " + e.target.tagName);
/*
 · Внутренний целевой элемент: BUTTON – внутренний обработчик событий получает правильный целевой элемент – элемент, находящийся внутри теневого DOM.
 · Внешний целевой элемент: USER-CARD – обработчик событий на уровне документа получает элемент-хозяин в качестве целевого.

 Браузер подменяет целевые элементы событий. Внешний документ ничего не знает о внутреннем устройстве компонента.
С его (внешнего документа) точки зрения, событие происходит на <user-card>.
! Подмена целевого элемента не происходит, если событие берёт начало на элементе из слота, который фактически находится в обычном, светлом DOM.

 Например, если пользователь кликнет на <span slot="username"> в следующем примере – целевой элемент события будет именно этот span для обоих обработчиков
– теневого и обычного (светлого):
*/
customElements.define('user-card-event-two', class extends HTMLElement {
   connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = `<div>
       <b>Имя:</b> <slot name="username"></slot>
     </div>`;

      this.shadowRoot.firstElementChild.onclick =
         e => console.log("Внутренний целевой элемент: " + e.target.tagName);
   }
});
userCardEvent.onclick = e => console.log(`Внешний целевой элемент: ${e.target.tagName}`);
/*
 Если клик произойдёт на "Алексей Алексеич", то для обоих обработчиков – внутреннего и внешнего – целевым элементом будет <span slot="username">.
Это элемент обычного (светлого) DOM, так что подмены не происходит.
 С другой стороны, если клик произойдёт на элементе, который находится в теневом DOM, например, на <b>Имя</b>, то как только всплытие выйдет за пределы
теневой DOM-структуры, его event.target станет <user-card>.


* Всплытие и метод event.composedPath()
 Если у нас есть элемент в слоте, и событие происходит где-то внутри него, то оно всплывает до <slot> и выше.
Полный путь к изначальному целевому элементу, со всеми теневыми элементами, можно получить, воспользовавшись методом event.composedPath().
 В предыдущем примере, при клике по <span slot="username"> вызов метода event.composedPath() вернёт массив:
[span, slot, div, shadow-root, user-card, body, html, document, window]. Что в точности отражает цепочку родителей от целевого элемента в
развёрнутой DOM-структуре после композиции.

! Детали теневого DOM-дерева доступны только для деревьев с {mode:'open'}
Если теневое DOM-дерево было создано с {mode: 'closed'}, то после композиции путь будет начинаться с элемента-хозяина: user-card и дальше вверх по дереву.


* Свойство: event.composed
 Большинство событий успешно всплывают сквозь границу теневого DOM. Но не все. Вот те, что всплывают:
 · blur, focus, focusin, focusout,
 · click, dblclick,
 · mousedown, mouseup mousemove, mouseout, mouseover,
 · wheel,
 · beforeinput, input, keydown, keyup.
 · Все события курсора и сенсорные события также имеют composed: true.

 Хотя есть и события, имеющие composed: false:
 · mouseenter, mouseleave (они вообще не всплывают),
 · load, unload, abort, error,
 · select,
 · slotchange.
! Эти события могут быть пойманы только на элементах того же DOM, в котором находится целевой элемент события.

* Генерация событий
 При генерации события, чтобы оно всплывало за пределы компонента, нужно установить оба свойства: bubbles и composed – в значение true.
Например, при создании элемента div#inner в теневом DOM-дереве элемента div#outer генерируем на нём два события.
Только одно с флагом composed: true выйдет наружу, в документ:
*/
outer.attachShadow({ mode: 'open' });

let inner = document.createElement('div');
outer.shadowRoot.append(inner);
/*
div(id=outer)
  #shadow-dom
    div(id=inner)
*/
document.addEventListener('test', event => console.log(event.detail));

inner.dispatchEvent(new CustomEvent('test', {
   bubbles: true,
   composed: true,
   detail: "not composed"
}));




