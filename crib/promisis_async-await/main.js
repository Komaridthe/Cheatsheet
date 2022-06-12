const { warn } = console;


warn("====== Введение: колбеки ======");
// Процесс называют «асинхронным», если его действие растянуто на какой-то отрезок времени

// Наглядная эмуляция работы с сервером через асинхронность и подход callback:
console.log('Request data...'); // муляж запроса на сервер

setTimeout(() => { // создадим асинхронность  (первый колбек)
   console.log('Reparing data...'); // запрос сервера к базе данных с получением некого результата

   const backendData = { // некая константа с бекэнда с с данными для наглядности
      server: 'aws',
      port: 200,
      status: 'working'
   };

   setTimeout(() => { // серверу понадобилось некоторое кол-во времени, что бы отдать данные (второй колбек)
      backendData.modified = true; // какая-то манипуляция на сервере
      console.log('Data resived', backendData);
   }, 2000);
}, 2000);
/*
 Такой подход неудобен из-за большого кол-ва вложенностей, что снижает читабельность кода и соответственно
его будет сложнее поддерживать.
*/

warn('======= Промисы =======');
/*
 Промисы - это функционал направленные на упрощение работы с асинхронными операциями.
(просто обёртка над асинхронностью для более удобного написания кода)
new Promis - это глобальный класс в конструктор которого необходимо передать колбек(функцию)
Синтаксис создания Promise:
*/
let promise = new Promise(function (resolve, reject) {
   // функция-исполнитель (executor)
   // здесь пишется асинхронный код...
});
/*
 Аргументы resolve и reject – это колбэки, которые предоставляет сам JavaScript. 
 · resolve(value) — срабатывает если работа завершилась успешно
 · reject(error) — если произошла ошибка
Важная деталь! Учитывается только первый вызов reject/resolve, остальные будут проигнорированны!

 Перепишем пример приведённый выше через промис:
*/
const p = new Promise((resolve, reject) => { // асинхронный код обёрнутый в промис
   setTimeout(() => {
      console.log('Reparing data...');
      const backendData = { // чтобы в дальнейшем иметь доступ к переменной её нужно передать в resolve(*)
         server: 'aws',
         port: 200,
         status: 'working'
      };
      resolve(backendData); //(*) вызываем фукцию resolve тем самым давая понять промису, что он завершил своё выполнение 
   }, 2000);
});

/*
* then, catch, finally
 Соотвецтвенно p теперь промис..)
У промисов есть три метода, с помощию которых можно продолжить работу.
 · then() - действие, которой можно произвести после окончания работы промиса. Была ошибка или нет - не важно!
 Так же передаём в неё колбек.
 · catch() - действие, которой можно произвести НАД ОШИБКОЙ после окончания работы промиса.
 Вызов .catch(f) – это сокращённый, «укороченный» вариант .then(null, f).
 · finally() - действие, которое выполнится в любом случае, когда промис завершится: успешно или с ошибкой.
 По аналогии с блоком finally из обычного try {...} catch {...}.
*/
//* then()
p.then((data) => { // Возвращая промисы (*), можно строить цепочки из асинхронных действий.
   return new Promise((resolve, reject) => { // возвращщаем ноовый промис!! это исключает вложенность колбеков!
      setTimeout(() => {
         data.modified = true;
         resolve(data); // говорим промису, что он завершился.
         // reject(data); // сообщение об ошибке
      }, 2000);
   });
}).then(clienData => { // просто пишем датьше как свойство..
   console.log('Data resived', clienData);
}) /* ";" не пишется. Иначе then() будут добавляться к единственному промису!
   
    Смысл промисов заключён в том, что не создаётся многоуровневая вложеннысть.
   Не надо создавать колбеки внутри колбеков. Мы всё время находимся в одном методе then().
   Плюс интуитивно понятно, что следующий then() начнётся после завершения предыдущего.
   
   * catch()   
    Это ловец ошибок по аналогии с блоком try{...} catch{...}. Его можно ставить где угодно.
   Самый лёгкий путь перехватить все ошибки – это добавить .catch() в конец цепочки.
   */
   .catch(err => console.error("Error", err))

   //* finally()
   // Это необязательный блок.
   .finally(() => console.log('Finally')) // если разкомментировать строку №76 сообщение всё равно появится в консоле


warn('========= Thenable ========');
/*
 Обработчик может возвращать не именно промис, а любой объект, содержащий метод .then(),
такие объекты называют «thenable», и этот объект будет обработан как промис.
 Сторонние библиотеки могут создавать свои собственные совместимые с промисами объекты.
Они могут иметь свои наборы методов и при этом быть совместимыми со встроенными промисами,
так как реализуют метод .then().
*/
class Thenable {
   constructor(num) {
      this.num = num;
   }
   then(resolve, reject) {
      console.log(resolve); // function() { native code }
      setTimeout(() => resolve(this.num * 2), 1000); // (**)
   }
};

new Promise(resolve => resolve(1))
   .then(resoult => {
      return new Thenable(resoult); // (*)
   })
// .then(alert); // показывает 2 через 1000мс
/*
 JavaScript проверяет объект, возвращаемый из обработчика .then() в строке (*): если у него имеется метод then(),
который можно вызвать, то этот метод вызывается, и в него передаются как аргументы встроенные функции resolve и reject,
вызов одной из которых потом ожидается. В примере выше происходит вызов resolve(2) через 1 секунду (**).
Затем результат передаётся дальше по цепочке.
 Это позволяет добавлять в цепочки промисов пользовательские объекты, не заставляя их наследовать от Promise.
*/

warn('============ Промисификация =============');
// Это функция, которая принимает колбэк и возвращает вместо него промис.
// Пример функции, которая будет добавлять задержку
let sleep = ms => {
   return new Promise(resolve => {
      setTimeout(() => resolve(), ms)
   });
}

sleep(2000).then(() => console.log('After to 2 seconds'));
sleep(3000).then(() => console.log('After to 3 seconds'));
// Данная запись выглядит просто и локанично

// Пример коолбек функции переписанной на промис №2
function loadScript(src, callback) {
   let script = document.createElement('script');
   script.src = src;

   script.onload = () => callback(null, script);
   script.onerror = () => callback(new Error(`Ошибка загрузки скрипта ${src}`));
   document.head.append(script);
};
//  Использование:
// loadScript('path/script.js', (err, script) => {...})

// Промисификация:
let loadScriptPromise = src => {
   return new Promise((resolve, reject) => {
      loadScriptTwo(src, (script, err) => {
         if (err) reject(err)
         else resolve(script);
      });
   })
}
// Использование:
// loadScriptPromise('path/script.js').then(...)


warn('========== Promise API ==========');
/*
* Promise.all
 Promise.all пригодится если необходимо запустить множество промисов параллельно и дождаться, пока все они выполнятся.
Например, параллельно загрузить несколько файлов и обработать результат, когда он готов.
*/
let prom = Promise.all([/* ...промисы... */]); // Метод может принимать любой перебираемый объект, но обычно используется массив
/*
 Метод Promise.all принимает массив и возвращает новый промис. Новый промис завершится,
когда завершится весь переданный список промисов, и его результатом будет массив их результатов.
*/
// Пример на функции sleep()
Promise.all([sleep(2000), sleep(4000)]).then(() => console.log('All promises complete!'));
/*
 Если любой из промисов завершится с ошибкой, то промис, возвращённый Promise.all, немедленно завершается с этой ошибкой.
В случае ошибки, остальные результаты игнорируются!!

* Promise.allSettled
 Действует схожем образом, только в случае ошибок метод ждёт завершение всех промисов и выдаёт результат вида:
 · {status:"fulfilled", value:результат} для успешных завершений,
 · {status:"rejected", reason:ошибка} для ошибок.
*/
let urls = [
   'https://api.github.com/users/iliakan',
   'https://api.github.com/users/remy',
   'https://no-such-url' // несущещствующий адрес
];

Promise.allSettled(urls.map(url => fetch(url)))
   .then(results => {
      results.forEach((result, num) => {
         if (result.status == 'fulfilled') {
            console.log(`${urls[num]}: ${result.value.status}`);
         }
         if (result.status == 'rejected') { // Для каждого промиса есть его статус и значение/ошибка.
            console.log(`${urls[num]}: ${result.reason}`);
         }
      });
   });
/*
! Полифил!
Если браузер не поддерживает Promise.allSettled, можно сделать полифил:
*/
if (!Promise.allSettled) {
   Promise.allSettled = promises => {
      return Promise.all(promises.map(p => Promise.resolve(p).then(value => ({
         status: 'fulfilled',
         value: value
      }), error => ({
         status: 'rejected',
         reason: error
      }))))
   };
}
/*
 В этом коде promises.map берёт аргументы, превращает их в промисы (на всякий случай) и добавляет каждому обработчик .then().
Этот обработчик превращает успешный результат value в {state:'fulfilled', value: value}, 
а ошибку error в {state:'rejected', reason: error}. Это как раз и есть формат результатов Promise.allSettled.
 Затем можно использовать Promise.allSettled, чтобы получить результаты всех промисов,
даже если при выполнении какого-то возникнет ошибка.

* Promise.race
 Похож на Promise.all, но ждёт только первый выполненный промис, из которого берёт результат (или ошибку).
Синтаксис:
 let promise = Promise.race(iterable);
*/
// Пример на функции sleep()
Promise.race([sleep(2000), sleep(4000)]).then(() => {
   console.log('Race promises (after 2 seconds)');
})


warn('======== Async/await ========');
/* Это специальный синтаксис для олее наглядной и упрощённой работы с промисами.

* Asinc
 Ключевого слова async. Оно ставится перед функцией:
*/
let n = 1;
async function f() {
   return n;
}
/*
 У слова async один простой смысл: эта функция всегда возвращает промис. 
Значения других типов оборачиваются в завершившийся успешно промис автоматически.
*/
f().then(console.log(n)) // 1

//* Этаже запись на промисах:
function f2() {
   // return new Promise(r => n);
   return Promise.resolve(n); // так или как строчкой выше.. без разницы
}
f2().then(console.log(n + 1));

//* Await
//! работает только внутри async–функций
async function f3() {
   let value = await promise;
}
/*
 Ключевое слово await заставит интерпретатор JavaScript ждать до тех пор,
пока промис справа от await не выполнится.
После чего оно вернёт его результат, и выполнение кода продолжится.
 В этом примере промис успешно выполнится через 1 секунду:
*/
async function f4() {
   let promise = new Promise((r) => {
      setTimeout(() => r('Готово!'), 1000);
   })
   let result = await promise; // будет ждать, пока промис не выполнится
   console.log(result);
};
f4(); // нужно не забыть вызвать функцию..

// Пример запроса на сервер
async function showAvatar() {
   // запрашиваем информацию о пользователе из github
   let githubResponse = await fetch(`https://api.github.com/users/komaridthe`);
   let githubUser = await githubResponse.json();

   // отображаем аватар пользователя
   let img = document.createElement('img');
   img.src = githubUser.avatar_url;
   img.style.height = 300 + 'px';
   document.body.prepend(img);

   // Скрыть изображение через 3 секунды
   await new Promise(r => setTimeout(r, 3000)); // создаём промис с задержкой
   img.remove(); // по окончанию задержки изоражение удалится
};
// showAvatar();

//! await работает с «thenable» – объектами!
/*
 Как и promise.then, await позволяет работать с промис–совместимыми объектами.
Идея в том, что если у объекта можно вызвать метод then, этого достаточно, чтобы использовать его с await.

Класс Thenable написан на 107 строке
*/
async function asyncThenable() {
   let result = await new Thenable(2);
   console.log(result);
};
asyncThenable();

/*
* Обработка ошибок
Когда промис завершается успешно, await promise возвращает результат. Когда завершается с ошибкой
– будет выброшено исключение. Как если бы на этом месте находилось выражение throw.

Такой код:
*/
async function errorF() {
   await new Promise.reject(new Error("Упс!"));
};
// Делает то же самое, что и такой:

async function errorF2() {
   throw new Error("Упс!");
};
/*
 Но есть отличие: на практике промис может завершиться с ошибкой не сразу, а через некоторое время.
В этом случае будет задержка, а затем await выбросит исключение.
 Такие ошибки можно ловить, используя try..catch, как с обычным throw:
*/
async function errorF3() {
   try {
      let resopnse = await fetch("http://no-such-url");
      let user = await resopnse.json();
   } catch (e) {
      console.log(e);
   }
};
errorF3();
/*
 Если не писать try..catch, асинхронная функция будет возвращать завершившийся с ошибкой промис (в состоянии rejected).
В этом случае можно использовать метод .catch промиса, чтобы обработать ошибку:
*/
async function errorF4() {
   let responce = await fetch("http://no-such-url");// errorF4() вернёт промис в состоянии rejected
}
// errorF4().catch(alert);
// Если забыть добавить .catch, то будет сгенерирована ошибка «Uncaught promise error» и выведена в консоль. 









