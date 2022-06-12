let { warn } = console;


warn("======== Fetch ========");
/*
 Метод fetch() — один из способов делать сетевые запросы и получать информацию с сервера.
Базовый синтаксис: let promise = fetch(url, [options]);
 · url – URL для отправки запроса.
 · options – дополнительные параметры: метод, заголовки и так далее.
 Без options это простой GET-запрос, скачивающий содержимое по адресу url.

* Процесс получения ответа обычно происходит в два этапа.
 Во-первых, promise выполняется с объектом встроенного класса Response в качестве результата, как только сервер пришлёт заголовки ответа.
На этом этапе мы можем проверить статус HTTP-запроса и определить, выполнился ли он успешно, а также посмотреть заголовки, но пока без тела ответа.
Промис завершается с ошибкой, если fetch не смог выполнить HTTP-запрос, например при ошибке сети или если нет такого сайта.
! HTTP-статусы 404 и 500 не являются ошибкой.
 Мы можем увидеть HTTP-статус в свойствах ответа:
 · status – код статуса HTTP-запроса, например 200.
 · ok – логическое значение: будет true, если код HTTP-статуса в диапазоне 200-299.
*/
async function getJson(url) {
   let response = await fetch(url);

   if (response.ok) { // если HTTP-статус в диапазоне 200-299 получаем тело ответа 
      let json = await response.json();
   } else {
      alert("Ошибка HTTP: " + response.status);
   }
}
/*
 Во-вторых, для получения тела ответа нам нужно использовать дополнительный вызов метода.
Response предоставляет несколько методов, основанных на промисах, для доступа к телу ответа в различных форматах:
 · response.text() – читает ответ и возвращает как обычный текст
 · response.json() – декодирует ответ в формате JSON
 · response.formData() – возвращает ответ как объект FormData
 · response.blob() – возвращает объект как Blob (бинарные данные с типом)
 · response.arrayBuffer() – возвращает ответ как ArrayBuffer (низкоуровневое представление бинарных данных)
 · response.body – это объект ReadableStream, с помощью которого можно считывать тело запроса по частям.

 Получим JSON-объект с последними коммитами из репозитория на GitHub:
*/
let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
async function getJsonGit(url) {
   let response = await fetch(url);
   let commits = await response.json();

   console.log(commits[0].author.login); // iliakan
}
getJsonGit(url);

// То же самое без await, с использованием промисов:
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
   .then(response => response.json())
   .then(commits => console.log(commits[0].author.login));

// Для получения ответа в виде текста используем await response.text() вместо .json():
fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits')
   .then(response => response.text())
   .then(text => console.log(text.slice(0, 80) + '...'));

// В качестве примера работы с бинарными данными, запросим и выведем на экран логотип спецификации «fetch»:
(async () => {
   let response = await fetch('https://resources.whatwg.org/logo-fetch.svg');
   let blob = await response.blob(); // скачиваем как Blob-объект

   // создаём <img>
   let img = document.createElement('img');
   img.style = 'position:fixed;top:10px;left:10px;width:100px';
   document.body.append(img);

   // выводим на экран
   img.src = URL.createObjectURL(blob);

   setTimeout(() => { // прячем через три секунды
      img.remove();
      URL.revokeObjectURL(img.src);
   }, 3000);
})();
/*
! Мы можем выбрать только один метод чтения ответа.
! Если мы уже получили ответ с response.text(), тогда response.json() не сработает, так как данные уже были обработаны.


* Заголовки ответа
Заголовки ответа хранятся в похожем на Map объекте response.headers.
Это не совсем Map, но мы можем использовать такие же методы, как с Map, чтобы получить заголовок по его имени или перебрать заголовки в цикле:
*/
(async () => {
   let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits');
   console.log(response.headers.get('Content-Type')); // application/json; charset=utf-8

   for (let [key, value] of response.headers) console.log(`${key} = ${value}`);
})();
/*
* Заголовки запроса
Для установки заголовка запроса в fetch мы можем использовать опцию headers. Она содержит объект с исходящими заголовками, например:
let response = fetch(protectedUrl, {
  headers: {
    Authentication: 'secret'
  }
});

! Есть список запрещённых HTTP-заголовков, которые мы не можем установить:
 · Accept-Charset, Accept-Encoding
 · Access-Control-Request-Headers
 · Access-Control-Request-Method
 · Connection
 · Content-Length
 · Cookie, Cookie2
 · Date
 · DNT
 · Expect
 · Host
 · Keep-Alive
 · Origin
 · Referer
 · TE
 · Trailer
 · Transfer-Encoding
 · Upgrade
 · Via
 · Proxy-*
 · Sec-*
Эти заголовки обеспечивают достоверность данных и корректную работу протокола HTTP, поэтому они контролируются исключительно браузером.

* POST-запросы
 Для отправки POST-запроса или запроса с другим методом, нам необходимо использовать fetch параметры:
 · method – HTTP метод, например POST,
 · body – тело запроса, одно из списка:
  · строка (например, в формате JSON),
  · объект FormData для отправки данных как form/multipart,
  · Blob/BufferSource для отправки бинарных данных,
  · URLSearchParams для отправки данных в кодировке x-www-form-urlencoded, используется редко.
*/
// Этот код отправляет объект user как JSON:
let user = {
   name: 'John',
   surname: 'Smith'
};
(async () => {
   let response = await fetch('/article/fetch/post/user', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(user)
   });

   let result = await response.json();
   console.log(result.message);
})();

//? Создайте асинхронную функцию getUsers(names), которая получает на вход массив логинов пользователей GitHub.
//?  1
const getTodos = (names = []) =>
   Promise.all(
      names.map(async (el) => {
         try {
            return (
               await fetch(`https://jsonplaceholder.typicode.com/todos/${el}`)
            ).json();
         } catch (e) {
            console.log(e);
         }
      })
   );

//?  2
async function getUsers(names) {
   let mas = [];
   for (let name of names) {
      let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${name}`);
      if (res.ok) {
         let result = response.json();
         mas.push(result);
      }
   }
   return mas;
}


warn("======== FormData ========");
/*
* Объекты FormData это объекты, представляющие данные HTML формы.
Конструктор: let formData = new FormData([form]);
 Если передать в конструктор элемент HTML-формы form, то создаваемый объект автоматически прочитает из неё поля.
 Его особенность заключается в том, что методы для работы с сетью, например fetch, позволяют указать объект FormData в свойстве тела запроса body.
Он будет соответствующим образом закодирован и отправлен с заголовком Content-Type: form/multipart.
*/
//* Отправка простой формы
formElem.onsubmit = async (e) => {
   e.preventDefault();

   let response = await fetch('/article/formdata/post/user', {
      method: 'POST',
      body: new FormData(formElem)
   });

   let result = await response.json();
   console.log(result.message);
};
/*
* Методы объекта FormData
С помощью указанных ниже методов мы можем изменять поля в объекте FormData:
 · formData.append(name, value) – добавляет к объекту поле с именем name и значением value,
 · formData.append(name, blob, fileName) – добавляет поле, как будто в форме имеется элемент <input type="file">,
  третий аргумент fileName устанавливает имя файла (не имя поля формы), как будто это имя из файловой системы пользователя,
 · formData.delete(name) – удаляет поле с заданным именем name,
 · formData.get(name) – получает значение поля с именем name,
 · formData.has(name) – если существует поле с именем name, то возвращает true, иначе false
 Технически форма может иметь много полей с одним и тем же именем name, поэтому несколько вызовов append добавят несколько полей с одинаковыми именами.

 Ещё существует метод set, его синтаксис такой же, как у append. Разница в том, что .set удаляет все уже имеющиеся поля с именем name и только затем
добавляет новое. То есть этот метод гарантирует, что будет существовать только одно поле с именем name, в остальном он аналогичен .append:
 · formData.set(name, value),
 · formData.set(name, blob, fileName).
*/
// Поля объекта formData можно перебирать, используя цикл for..of:
let formData = new FormData();
formData.append('key1', 'value1');
formData.append('key2', 'value2');
for (let [name, value] of formData) console.log(`${name} = ${value}`);

/*
* Отправка формы с файлом
 Объекты FormData всегда отсылаются с заголовком Content-Type: form/multipart, этот способ кодировки позволяет отсылать файлы.
Таким образом, поля <input type="file"> тоже отправляются, как это и происходит в случае обычной формы.
*/
formElemTwo.onsubmit = async (e) => {
   e.preventDefault();

   let response = await fetch('/article/formdata/post/user-avatar', {
      method: 'POST',
      body: new FormData(formElem)
   });

   let result = await response.json();

   alert(result.message);
};

//* Отправка формы с Blob-данными
canvasElem.onmousemove = function (e) {
   let ctx = canvasElem.getContext('2d');
   ctx.lineTo(e.clientX, e.clientY);
   ctx.stroke();
};
async function submit() {
   let imegeBlob = await new Promise(resolve => canvasElem.toBlob(resolve, 'image/png'));

   let formData = new FormData();
   formData.append("firstName", "John");
   formData.append("image", imegeBlob, 'image/png');

   let response = fetch('/article/formdata/post/image-form', {
      method: 'POST',
      body: formData
   });

   let result = await response.json();
   console.log(result.message);
}


warn("======== Fetch: ход загрузки ========");
/*
 Чтобы отслеживать ход загрузки данных с сервера, можно использовать свойство response.body. Это ReadableStream («поток для чтения») – особый объект,
который предоставляет тело ответа по частям, по мере поступления.
 В отличие от response.text(), response.json() и других методов, response.body даёт полный контроль над процессом чтения, и мы можем подсчитать,
сколько данных получено на каждый момент.

* вместо response.json() и других методов
const reader = response.body.getReader();

 бесконечный цикл, пока идёт загрузка
while(true) {
   done становится true в последнем фрагменте
   value - Uint8Array из байтов каждого фрагмента
  const {done, value} = await reader.read();

  if (done) {
    break;
  }
  console.log(`Получено ${value.length} байт`)
}
* Результат вызова await reader.read() – это объект с двумя свойствами:
 · done – true, когда чтение закончено, иначе false.
 · value – типизированный массив данных ответа Uint8Array.
*/

// Пример, который получает ответ сервера и в процессе получения выводит в консоли длину полученных данных:
(async () => {
   // Шаг 1: начинаем загрузку fetch, получаем поток для чтения
   let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');
   const reader = response.body.getReader();

   // Шаг 2: получаем длину содержимого ответа
   const contentLength = +response.headers.get('Content-Length');

   // Шаг 3: считываем данные:
   let receivedLength = 0; // количество байт, полученных на данный момент
   let chunks = []; // массив полученных двоичных фрагментов (составляющих тело ответа)
   while (true) {
      const { done, value } = await reader.read();

      if (done) {
         break;
      }
      chunks.push(value);
      receivedLength += value.length;
      console.log(`Получено ${receivedLength} из ${contentLength}`)
   }

   // Шаг 4: соединим фрагменты в общий типизированный массив Uint8Array
   let chunksAll = new Uint8Array(receivedLength); // (4.1)
   let position = 0;
   for (let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
   }

   // Шаг 5: декодируем Uint8Array обратно в строку
   let result = new TextDecoder("utf-8").decode(chunksAll);

   // Готово!
   let commits = JSON.parse(result);
   console.log(commits[0].author.login);
})();


warn("======== Fetch: прерывание запроса ========");
/*
 Как известно, метод fetch возвращает промис. А в JavaScript в целом нет понятия «отмены» промиса. 
Для таких целей существует специальный встроенный объект: AbortController, который можно использовать для отмены не только fetch,
но и других асинхронных задач.
*/
let controller = new AbortController();
/*
* Контроллер controller – чрезвычайно простой объект.
Он имеет единственный метод abort() и единственное свойство signal.
 При вызове abort():
 · генерируется событие с именем abort на объекте controller.signal
 · свойство controller.signal.aborted становится равным true.
 Все, кто хочет узнать о вызове abort(), ставят обработчики на controller.signal, чтобы отслеживать его.
*/
let signal = controller.signal;

// срабатывает при вызове controller.abort()
signal.addEventListener('abort', () => console.log('Отмена!'));

controller.abort();
console.log(signal.aborted); // true

/*
* Для fetch надо передать свойство signal опцией в метод fetch
let controller = new AbortController();
fetch(url, {
  signal: controller.signal
});
*/
//* Когда fetch отменяется, его промис завершается с ошибкой AbortError, поэтому мы должны обработать её, например, в try..catch:
(async () => {
   // прервать через 1 секунду
   let controller = new AbortController();
   setTimeout(() => controller.abort(), 1000);

   try {
      let response = await fetch('/article/fetch-abort/demo/hang', {
         signal: controller.signal
      });
   } catch (err) {
      if (err.name == 'AbortError') { // обработать ошибку от вызова abort()
         alert("Прервано!");
      } else {
         throw err;
      }
   }
})();
//* AbortController – масштабируемый, он позволяет отменить несколько вызовов fetch одновременно.


warn("======== Fetch: запросы на другие сайты ========");
/*
* Простые запросы
 Есть два вида запросов на другой источник:
 · Простые
 · Все остальные
* Простой запрос – это запрос, удовлетворяющий следующим условиям:
 · Простой метод: GET, POST или HEAD
 · Простые заголовки – разрешены только:
  · Accept,
  · Accept-Language,
  · Content-Language,
  · Content-Type со значением application/x-www-form-urlencoded, multipart/form-data или text/plain.
 Любой другой запрос считается «непростым». Например, запрос с методом PUT или с HTTP-заголовком API-Key не соответствует условиям.
! Принципиальное отличие между ними состоит в том, что «простой запрос» может быть сделан через <form> или <script>, без каких-то специальных методов.

* CORS для простых запросов
 При запросе на другой источник браузер всегда ставит «от себя» заголовок Origin.
Например, если мы запрашиваем https://anywhere.com/request со страницы https://javascript.info/page, заголовки будут такими:
GET /request
Host: anywhere.com
Origin: https://javascript.info
...

 Здесь браузер играет роль доверенного посредника:
 · Он гарантирует, что к запросу на другой источник добавляется правильный заголовок Origin.
 · Он проверяет наличие разрешающего заголовка Access-Control-Allow-Origin в ответе и, если всё хорошо, то JavaScript получает доступ к ответу сервера,
 в противном случае – доступ запрещается с ошибкой.

 Вот пример ответа сервера, который разрешает доступ:
200 OK
Content-Type:text/html; charset=UTF-8
Access-Control-Allow-Origin: https://javascript.info


* Заголовки ответа
По умолчанию при запросе к другому источнику JavaScript может получить доступ только к так называемым «простым» заголовкам ответа:
 · Cache-Control
 · Content-Language
 · Content-Type
 · Expires
 · Last-Modified
 · Pragma
! При доступе к любому другому заголовку ответа будет ошибка.

 Чтобы разрешить JavaScript доступ к любому другому заголовку ответа, сервер должен указать заголовок Access-Control-Expose-Headers.
Он содержит список, через запятую, заголовков, которые не являются простыми, но доступ к которым разрешён.
 Например:
200 OK
Content-Type:text/html; charset=UTF-8
Content-Length: 12345
API-Key: 2c9de507f2c54aa1
Access-Control-Allow-Origin: https://javascript.info
Access-Control-Expose-Headers: Content-Length,API-Key

* «Непростые» запросы
 Предварительный запрос использует метод OPTIONS, у него нет тела, но есть два заголовка:
 · Access-Control-Request-Method содержит HTTP-метод «непростого» запроса.
 · Access-Control-Request-Headers предоставляет разделённый запятыми список его «непростых» HTTP-заголовков.

 Если сервер согласен принимать такие запросы, то он должен ответить без тела, со статусом 200 и с заголовками:
 · Access-Control-Allow-Methods должен содержать разрешённые методы.
 · Access-Control-Allow-Headers должен содержать список разрешённых заголовков.
 · Кроме того, заголовок Access-Control-Max-Age может указывать количество секунд, на которое нужно кешировать разрешения.
 Так что браузеру не придётся посылать предзапрос для последующих запросов, удовлетворяющих данным разрешениям.
*/


warn("======== Fetch API ========");
//* Нижеследующий список – это все возможные опции для fetch с соответствующими значениями по умолчанию
//* (в комментариях указаны альтернативные значения):
let promise = fetch(url, {
   method: "GET", // POST, PUT, DELETE, etc.
   headers: {
      // значение этого заголовка обычно ставится автоматически,
      // в зависимости от тела запроса
      "Content-Type": "text/plain;charset=UTF-8"
   },
   body: undefined, // string, FormData, Blob, BufferSource или URLSearchParams
   referrer: "about:client", // или "" для того, чтобы не послать заголовок Referer,
   // или URL с текущего источника
   referrerPolicy: "no-referrer-when-downgrade", // no-referrer, origin, same-origin...
   mode: "cors", // same-origin, no-cors
   credentials: "same-origin", // omit, include
   cache: "default", // no-store, reload, no-cache, force-cache или only-if-cached
   redirect: "follow", // manual, error
   integrity: "", // контрольная сумма, например "sha256-abcdef1234567890"
   keepalive: false, // true
   signal: undefined, // AbortController, чтобы прервать запрос
   window: window // null
});


warn("======== Объекты URL ========");
/*
* Синтаксис создания нового объекта URL:
new URL(url, [base])
 · url – полный URL-адрес или только путь, если указан второй параметр,
 · base – необязательный «базовый» URL: если указан и аргумент url содержит только путь, то адрес будет создан относительно него (пример ниже).
*/
let url1 = new URL('https://javascript.info/profile/admin');

// Этот URL эдентичен следующему:
let url2 = new URL('/profile/admin', 'https://javascript.info');
console.log(url1); // https://javascript.info/profile/admin
console.log(url2); // https://javascript.info/profile/admin

// Можно создать новый URL по пути относительно существующего URL-адреса:
let newUrl = new URL('tester', url1);
console.log(newUrl); // https://javascript.info/profile/tester

// Объект URL даёт доступ к компонентам URL, поэтому это отличный способ «разобрать» URL-адрес:
let urlJS = new URL('https://javascript.info/url');

console.log(urlJS.protocol); // https:
console.log(urlJS.host); // javascript.info
console.log(urlJS.pathname); // /url
/*
* Компоненты URL:
 · href это полный URL-адрес, то же самое, что url.toString()
 · protocol – протокол, заканчивается символом двоеточия :
 · search строка параметров, начинается с вопросительного знака ?
 · hash начинается с символа #
 · также есть свойства user и password, если используется HTTP-аутентификация: http://login:password@site.com

* SearchParams «?…»
 Допустим, мы хотим создать URL-адрес с заданными параметрами, например, https://google.com/search?query=JavaScript.
 Мы можем указать их в строке: new URL('https://google.com/search?query=JavaScript')
…Но параметры должны быть правильно закодированы, чтобы они могли содержать не-латинские буквы, пробелы и т.п.
 Для этого есть свойство url.searchParams – объект типа URLSearchParams.

* Он предоставляет удобные методы для работы с параметрами:
 · append(name, value) – добавить параметр по имени,
 · delete(name) – удалить параметр по имени,
 · get(name) – получить параметр по имени,
 · getAll(name) – получить все параметры с одинаковым именем name (такое возможно, например: ?user=John&user=Pete),
 · has(name) – проверить наличие параметра по имени,
 · set(name, value) – задать/заменить параметр,
 · sort() – отсортировать параметры по имени, используется редко,
 · …и является перебираемым, аналогично Map.
*/
//* Пример добавления параметров, содержащих пробелы и знаки препинания:
let googleURL = new URL('https://google.com/search');
googleURL.searchParams.set('q', 'test me!'); // добавим параметр, содержащий пробел и !
console.log(googleURL);
// alert(googleURL);  // https://google.com/search?q=test+me%21

googleURL.searchParams.set('tbs', 'qdr:y'); // параметр с двоеточием :
// параметры автоматически кодируются
// alert(url); // https://google.com/search?query=test+me%21&tbs=qdr%3Ay

// перебрать параметры (в исходном виде)
for (let [name, value] of googleURL.searchParams) console.log(`${name}=${value}`);
/*
* Кодирование
 Запрещённые символы, например, нелатинские буквы и пробелы, должны быть закодированы – заменены соответствующими кодами UTF-8 с префиксом %
Объекты URL делают всё это автоматически. Мы просто указываем параметры в обычном, незакодированном, виде, а затем конвертируем URL в строку:
*/
let url123 = new URL('https://ru.wikipedia.org/wiki/Тест');
url123.searchParams.set('key', 'ъ');
// alert(url123); //https://ru.wikipedia.org/wiki/%D0%A2%D0%B5%D1%81%D1%82?key=%D1%8A
/*
* Кодирование в строках
 Если мы используем строку, то надо самим позаботиться о кодировании специальных символов.
 Для этого есть встроенные функции:
 · encodeURI – кодирует URL-адрес целиком.
 · decodeURI – декодирует URL-адрес целиком.
 · encodeURIComponent – кодирует компонент URL, например, параметр, хеш, имя пути и т.п.
 · decodeURIComponent – декодирует компонент URL.

 РазницаЖ
 · encodeURI кодирует только символы, полностью запрещённые в URL.
 · encodeURIComponent кодирует эти же символы плюс, в дополнение к ним, символы #, $, &, +, ,, /, :, ;, =, ? и @.
 Так что для URL целиком можно использовать encodeURI:
*/
let urlHello = encodeURI('http://site.com/привет');
// alert(urlHello); // http://site.com/%D0%BF%D1%80%D0%B8%D0%B2%D0%B5%D1%82

// …А для параметров лучше будет взять encodeURIComponent:
let music = encodeURIComponent('Rock&Roll');
let urlMus = `https://google.com/search?q=${music}`;
// alert(urlMus); // https://google.com/search?q=Rock%26Roll

// Сравните с encodeURI:
let musicTwo = encodeURI('Rock&Roll');
let urlMusTwo = `https://google.com/search?q=${musicTwo}`;
// alert(urlMusTwo); // https://google.com/search?q=Rock&Roll
//! Функция encodeURI не закодировала символ &, который является разрешённым в составе полного URL-адреса.


warn("======== XMLHttpRequest ========");
/*
* Основы
XMLHttpRequest имеет два режима работы: синхронный и асинхронный.

Чтобы сделать запрос, нам нужно выполнить три шага:
 · Создать XMLHttpRequest.

let xhr = new XMLHttpRequest(); // у конструктора нет аргументов
 · Инициализировать его.
xhr.open(method, URL, [async, user, password])
 Этот метод обычно вызывается сразу после new XMLHttpRequest. В него передаются основные параметры запроса:
 · method – HTTP-метод. Обычно это "GET" или "POST".
 · URL – URL, куда отправляется запрос: строка, может быть и объект URL.
 · async – если указать false, тогда запрос будет выполнен синхронно.
 · user, password – логин и пароль для базовой HTTP-авторизации (если требуется).
 Вызов open, вопреки своему названию, не открывает соединение. Он лишь конфигурирует запрос,
но непосредственно отсылается запрос только лишь после вызова send.

 · Послать запрос.
xhr.send([body])
 Этот метод устанавливает соединение и отсылает запрос к серверу. Необязательный параметр body содержит тело запроса.
Некоторые типы запросов, такие как GET, не имеют тела. А некоторые, как, например, POST, используют body, чтобы отправлять данные на сервер.

 · Слушать события на xhr, чтобы получить ответ.
Три наиболее используемых события:
 · load – происходит, когда получен какой-либо ответ, включая ответы с HTTP-ошибкой, например 404.
 · error – когда запрос не может быть выполнен, например, нет соединения или невалидный URL.
 · progress – происходит периодически во время загрузки ответа, сообщает о прогрессе.
*/
//* Вот полный пример. Код ниже загружает /article/xmlhttprequest/example/load с сервера и сообщает о прогрессе:

// 1. Создаём новый XMLHttpRequest-объект
let xhr = new XMLHttpRequest();

// 2. Настраиваем его: GET-запрос по URL /article/.../load
xhr.open('GET', '/article/xmlhttprequest/example/load');

// 3. Отсылаем запрос
xhr.send();

// 4. Этот код сработает после того, как мы получим ответ сервера
xhr.onload = function () {
   if (xhr.status != 200) { // анализируем HTTP-статус ответа, если статус не 200, то произошла ошибка
      console.log(`Ошибка ${xhr.status}: ${xhr.statusText}`); // Например, 404: Not Found
   } else { // если всё прошло гладко, выводим результат
      console.log(`Готово, получили ${xhr.response.length} байт`); // response -- это ответ сервера
   }
};

xhr.onprogress = function (event) {
   if (event.lengthComputable) {
      console.log(`Получено ${event.loaded} из ${event.total} байт`);
   } else {
      console.log(`Получено ${event.loaded} байт`); // если в ответе нет заголовка Content-Length
   }

};

xhr.onerror = function () {
   console.log("Запрос не удался");
};
/*
 После ответа сервера мы можем получить результат запроса в следующих свойствах xhr:
 · status - Код состояния HTTP (число): 200, 404, 403 и так далее, может быть 0 в случае, если ошибка не связана с HTTP.
 · statusText - Сообщение о состоянии ответа HTTP (строка): обычно OK для 200, Not Found для 404, Forbidden для 403, и так далее.
 · response (в старом коде может встречаться как responseText) - Тело ответа сервера.
 Мы можем также указать таймаут – промежуток времени, который мы готовы ждать ответ:
xhr.timeout = 10000; // таймаут указывается в миллисекундах, т.е. 10 секунд

* Тип ответа
Мы можем использовать свойство xhr.responseType, чтобы указать ожидаемый тип ответа:
 · "" (по умолчанию) – строка,
 · "text" – строка,
 · "arraybuffer" – ArrayBuffer (для бинарных данных, смотрите в ArrayBuffer, бинарные массивы),
 · "blob" – Blob (для бинарных данных, смотрите в Blob),
 · "document" – XML-документ (может использовать XPath и другие XML-методы),
 · "json" – JSON (парсится автоматически).

* Прогресс отправки
 Событие progress срабатывает только на стадии загрузки ответа с сервера.
А именно: если мы отправляем что-то через POST-запрос, XMLHttpRequest сперва отправит наши данные (тело запроса) на сервер, а потом загрузит ответ сервера.
И событие progress будет срабатывать только во время загрузки ответа.
 Существует другой объект, без методов, только для отслеживания событий отправки: xhr.upload.
 · loadstart – начало загрузки данных.
 · progress – генерируется периодически во время отправки на сервер.
 · abort – загрузка прервана.
 · error – ошибка, не связанная с HTTP.
 · load – загрузка успешно завершена.
 · timeout – вышло время, отведённое на загрузку (при установленном свойстве timeout).
 · loadend – загрузка завершена, вне зависимости от того, как – успешно или нет.

* Примеры обработчиков для этих событий:
*/
xhr.upload.onprogress = function (event) {
   console.log(`Отправлено ${event.loaded} из ${event.total} байт`);
};

xhr.upload.onload = function () {
   console.log(`Данные успешно отправлены.`);
};

xhr.upload.onerror = function () {
   console.log(`Произошла ошибка во время отправки: ${xhr.status}`);
};


warn("======== Возобновляемая загрузка файлов ========");
/*
 Возобновляемая загрузка должна сопровождаться индикацией прогресса, ведь, скорее всего, нам нужно отправлять большие файлы.
Поскольку fetch не позволяет отслеживать прогресс отправки, то мы будем использовать XMLHttpRequest.

* Алгоритм
 · Во-первых, создадим уникальный идентификатор для файла, который собираемся загружать:
let fileId = file.name + '-' + file.size + '-' + +file.lastModifiedDate;
 Это нужно, чтобы при возобновлении загрузки серверу было понятно, какой файл мы продолжаем загружать.
Если имя или размер или дата модификация файла изменятся, то у него уже будет другой fileId.

 · Далее, посылаем запрос к серверу с просьбой указать количество уже полученных байтов:
*/
(async () => {
   let response = await fetch('status', {
      headers: {
         'X-File-Id': fileId
      }
   });
   // сервер получил столько-то байтов
   let startByte = +await response.text();
})();
// Предполагается, что сервер учитывает загружаемые файлы с помощью заголовка X-File-Id. Это на стороне сервера должно быть реализовано.
// Если файл серверу неизвестен, то он должен ответить 0.

//· Затем мы можем использовать метод slice объекта Blob, чтобы отправить данные, начиная со startByte байта:
xhr.open("POST", "upload", true);

// Идентификатор файла, чтобы сервер знал, что мы загружаем
xhr.setRequestHeader('X-File-Id', fileId);

// Номер байта, начиная с которого мы будем отправлять данные.
// Таким образом, сервер поймёт, с какого момента мы возобновляем загрузку
xhr.setRequestHeader('X-Start-Byte', startByte);

xhr.upload.onprogress = (e) => {
   console.log(`Uploaded ${startByte + e.loaded} of ${startByte + e.total}`);
};

// файл file может быть взят из input.files[0] или другого источника
xhr.send(file.slice(startByte));
/*
 Здесь мы посылаем серверу и идентификатор файла в заголовке X-File-Id, чтобы он знал, что мы загружаем, и номер стартового байта в заголовке
X-Start-Byte, чтобы он понял, что мы продолжаем отправку, а не начинаем её с нуля.
 Сервер должен проверить информацию на своей стороне, и если обнаружится, что такой файл уже когда-то загружался, и его текущий размер равен
значению из заголовка X-Start-Byte, то вновь принимаемые данные добавлять в этот файл.
*/


warn("======== Длинные опросы ========");
/*
* Частые опросы (периодический опрос) - регулярные запросы на сервер.
 В ответ сервер, во-первых, помечает у себя, что клиент онлайн, а во-вторых посылает весь пакет сообщений, накопившихся к данному моменту.

 Это работает, но есть и недостатки:
 · Сообщения передаются с задержкой до 10 секунд (между запросами).
 · Даже если сообщений нет, сервер «атакуется» запросами каждые 10 секунд, даже если пользователь переключился куда-нибудь или спит.
 С точки зрения производительности, это довольно большая нагрузка.

* Длинные опросы
 Как это происходит:
 · Запрос отправляется на сервер.
 · Сервер не закрывает соединение, пока у него не возникнет сообщение для отсылки.
 · Когда появляется сообщение – сервер отвечает на запрос, посылая его.
 · Браузер немедленно делает новый запрос.

 Примерный код клиентской функции subscribe, которая реализует длинные опросы:
*/
async function subscribe() {
   let response = await fetch("/subscribe");

   if (response.status == 502) {
      // Статус 502 - это таймаут соединения;
      // возможен, когда соединение ожидало слишком долго
      // и сервер (или промежуточный прокси) закрыл его
      // давайте восстановим связь
      await subscribe();
   } else if (response.status != 200) {
      // Какая-то ошибка, покажем её
      showMessage(response.statusText);
      // Подключимся снова через секунду.
      await new Promise(resolve => setTimeout(resolve, 1000));
      await subscribe();
   } else {
      // Получим и покажем сообщение
      let message = await response.text();
      showMessage(message);
      // И снова вызовем subscribe() для получения следующего сообщения
      await subscribe();
   }
}
subscribe();
// Функция subscribe() делает запрос, затем ожидает ответ, обрабатывает его и снова вызывает сама себя.


warn("======== WebSocket ========");
/*
 Протокол WebSocket («веб-сокет») обеспечивает возможность обмена данными между браузером и сервером через постоянное соединение.
Данные передаются по нему в обоих направлениях в виде «пакетов», без разрыва соединения и дополнительных HTTP-запросов.

 Чтобы открыть веб-сокет-соединение, нам нужно создать объект new WebSocket, указав в url-адресе специальный протокол ws:
let socket = new WebSocket("ws://javascript.info");

 Также существует протокол wss://, использующий шифрование. Это как HTTPS для веб-сокетов. Использовать ныжно его!

 Как только объект WebSocket создан, мы должны слушать его события.
 · open – соединение установлено,
 · message – получены данные,
 · error – ошибка,
 · close – соединение закрыто.
…А если мы хотим отправить что-нибудь, то вызов socket.send(data) сделает это.
*/
let socket = new WebSocket("wss://javascript.info/article/websocket/demo/hello");

socket.onopen = function (e) {
   alert("[open] Соединение установлено");
   alert("Отправляем данные на сервер");
   socket.send("Меня зовут Джон");
};

socket.onmessage = function (event) {
   alert(`[message] Данные получены с сервера: ${event.data}`);
};

socket.onclose = function (event) {
   if (event.wasClean) {
      alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
   } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      alert('[close] Соединение прервано');
   }
};

socket.onerror = function (error) {
   alert(`[error] ${error.message}`);
};


warn("======== Server Sent Events ========");
/*
WebSocket	                                              \  EventSource
__________________________________________________________\________________________________________________________
Двунаправленность: и сервер,                              \  Однонаправленность: данные посылает только сервер
 и клиент могут обмениваться сообщениями	                \                                                       
----------------------------------------------------------\--------------------------------------------------------
Бинарные и текстовые данные	                            \  Только текст
----------------------------------------------------------\--------------------------------------------------------
Протокол WebSocket	                                     \  Обычный HTTP


 EventSource не настолько мощный способ коммуникации с сервером, как WebSocket.
Зачем нам его использовать?
 Основная причина: он проще. Многим приложениям не требуется вся мощь WebSocket.
 Если нам нужно получать поток данных с сервера: неважно, сообщения в чате или же цены для магазина – с этим легко справится EventSource.
К тому же, он поддерживает автоматическое переподключение при потере соединения, которое, используя WebSocket, нам бы пришлось реализовывать самим.
Кроме того, используется старый добрый HTTP, а не новый протокол.

! Поддерживается во всех современных браузерах (кроме Internet Explorer).

* Синтаксис: 
let source = new EventSource(url, [credentials]);
 Второй аргумент – необязательный объект с одним свойством: { withCredentials: true }. Он позволяет отправлять авторизационные данные на другие домены.

 В целом, кросс-доменная безопасность реализована так же как в fetch и других методах работы с сетью.

* Свойства объекта EventSource
 · readyState - Текущее состояние подключения: EventSource.CONNECTING (=0), EventSource.OPEN (=1) или EventSource.CLOSED (=2).
 · lastEventId - id последнего полученного сообщения. При переподключении браузер посылает его в заголовке Last-Event-ID.
* Методы
 · close() - Закрывает соединение.
*События
 · message - Сообщение получено, переданные данные записаны в event.data.
 · open - Соединение установлено.
 · error - В случае ошибки, включая как потерю соединения, так и другие ошибки в нём. Мы можем обратиться к свойству readyState, чтобы проверить,
 происходит ли переподключение.
Сервер может выставить собственное событие с помощью event:. Такие события должны быть обработаны с помощью addEventListener, а не on<event>.

* Формат ответа сервера
Сервер посылает сообщения, разделённые двойным переносом строки \n\n.

Сообщение состоит из следующих полей:
 · data: – тело сообщения, несколько data подряд интерпретируются как одно сообщение, разделённое переносами строк \n.
 · id: – обновляет свойство lastEventId, отправляемое в Last-Event-ID при переподключении.
 · retry: – рекомендованная задержка перед переподключением в миллисекундах. Не может быть установлена с помощью JavaScript.
 · event: – имя пользовательского события, должно быть указано перед data:.
Сообщение может включать одно или несколько этих полей в любом порядке, но id обычно ставят в конце.
*/


