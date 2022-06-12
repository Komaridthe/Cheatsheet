let {warn} = console;
warn('===== Обработка ошибок, "try..catch" =====');
/*
 try..catch, это синтаксическая конструкция, которая позволяет «ловить» ошибки и вместо падения кода
и делать что-то более осмысленное.
*/
try {
   // код...
} catch (error) {
   // обработка ошибки
};

/*
! try..catch работает синхронно!
 Ошибку, которая произойдёт в коде, запланированном «на будущее»,
например в setTimeout, try..catch не поймает:
*/
try {
   setTimeout(function () {
      // noSuchVariable; // скрипт упадёт тут
   }, 1000);
} catch (e) {
   console.log("не сработает");
};
/*
 Это потому, что функция выполняется позже, когда движок уже покинул конструкцию try..catch!
 Чтобы поймать исключение внутри запланированной функции,
try..catch должен находиться внутри самой этой функции:
*/
setTimeout(() => {
   try {
      noSuchVariable; // try..catch обрабатывает ошибку!
   } catch {
      console.log('Ошибка поймана!');
   }
}, 1000);


/*
* Объект ошибки
 Когда возникает ошибка, JavaScript генерирует объект, содержащий её детали.
Затем этот объект передаётся как аргумент в блок catch:
*/
try {
   // ...
} catch (err) { // <-- объект ошибки
   // ...
};
/*
 Для всех встроенных ошибок этот объект имеет два основных свойства:
 · name - Имя ошибки. Например, для неопределённой переменной это "ReferenceError".
 · message - Текстовое сообщение о деталях ошибки.

 В большинстве окружений доступны и другие, нестандартные свойства.
Одно из самых широко используемых и поддерживаемых – это:
 · stack - Текущий стек вызова: строка, содержащая информацию о последовательности вложенных вызовов,
  которые привели к ошибке. Используется в целях отладки.
*/

try {
   lalala //  ошибка, переменная не определена!
} catch (err) {
   console.log(err.name);    // ReferenceError
   console.log(err.message); // lalala is not defined
   console.log(err.stack);   // ReferenceError: lalala is not defined at main.js:63

   // Можем также просто вывести ошибку целиком
   // Ошибка приводится к строке вида "name: message stack". То есть тоже, что и err.stack
   console.log(err); // ReferenceError: lalala is not defined at main.js:63
};

// Блок «catch» без переменной
// Если нам не нужны детали ошибки, в catch можно её пропустить:
try {
   // ...
} catch { //  <-- без (err)
   // ...
};

/*
* Реальное использование «try…catch»
 Получаем данные с сервера в Lson  и декодируем их для JS
*/
let json = '{"name":"John", "age": 30}'; // данные с сервера

let user = JSON.parse(json); // преобразовали текстовое представление в JS-объект
console.log(user.name); // John
console.log(user.age);  // 30
/*
 Если json некорректен, JSON.parse генерирует ошибку, то есть скрипт «падает».
Устроит ли нас такое поведение? Конечно нет!
Получается, что если вдруг что-то не так с данными, то посетитель никогда (если, конечно, не откроет консоль)
об этом не узнает. А люди очень не любят, когда что-то «просто падает» без всякого сообщения об ошибке.

 Используем try..catch для обработки ошибки:
*/
let jsonTwo = "{ некорректный JSON }";

try {
   let userTwo = JSON.parse(jsonTwo); // <-- тут возникает ошибка
   console.log(userTwo.name); // не сработает
} catch (e) {
   console.log("Извините, в данных ошибка, мы попробуем получить их ещё раз.");
   console.log(e);
};
/*
 Здесь мы используем блок catch только для вывода сообщения, но мы также можем сделать гораздо больше:
 · отправить новый сетевой запрос
 · предложить посетителю альтернативный способ
 · отослать информацию об ошибке на сервер для логирования...
 … Всё лучше, чем просто «падение».
*/

warn('===== Генерация собственных ошибок =====');
// Что если jsonTree синтаксически корректен, но не содержит необходимого свойства name?
let jsonTree = '{"age": 30}'; // данные неполны

try {
   let userTree = JSON.parse(jsonTree);// <-- выполнится без ошибок
   console.log(userTree.name); // свойства name нет!
} catch (e) {
   console.log('Не выполнится');
};
/*
 Здесь JSON.parse выполнится без ошибок, но на самом деле отсутствие свойства name для нас ошибка.
Для унифицирования обработок ошибок, применяется оператор throw.


* Оператор «throw»
Оператор throw генерирует ошибку.
 Технически в качестве объекта ошибки можно передать что угодно. Примитив, число или строка, но всё же лучше,
чтобы это был объект, желательно со свойствами name и message (для совместимости со встроенными ошибками).

 В JavaScript есть множество встроенных конструкторов для стандартных ошибок:
 · Error
 · SyntaxError
 · ReferenceError
 · TypeError
 … и другие. Можно использовать и их для создания объектов ошибки.
*/
let error = new Error("message");
let syntaxError = new SyntaxError("message");
let referenseError = new ReferenceError("message");
// ...
/*
 Для встроенных ошибок (не для любых объектов, только для ошибок), свойство name – это в точности имя конструктора.
А свойство message берётся из аргумента.
*/
let newError = new Error('Ого, это ошибка! О_о');
console.log(newError.name);    // Error
console.log(newError.message); //  Ого, ошибка! o_O

// Такую какую ошибку генерирует JSON.parse:
try {
   JSON.parse("{bad JSON !}")
} catch (e) {
   console.log(e.name);     // SyntaxError
   console.log(e.message);  // Unexpected token b in JSON at position 1
};
/*
 Как видно, это SyntaxError.
В нашем случае отсутствие свойства name – это ошибка, ведь пользователи должны иметь имена.
 Сгенерируем её:
*/
let jsonFour = '{"age": 30}'; // данные не полны

try {
   let userFour = JSON.parse(jsonFour); // <-- выполнится без ошибок
   if (!userFour.name) {
      throw new SyntaxError("Данные не полны: нет имени!")
   }
   console.log(userFour.name);
} catch (e) {
   console.log("JSON Error: " + e.message); // JSON Error: Данные неполны: нет имени
};
/*
 Оператор throw генерирует ошибку SyntaxError с сообщением message. Точно такого же вида, как генерирует сам JavaScript.
Выполнение блока try немедленно останавливается, и поток управления прыгает в catch.
 Теперь блок catch становится единственным местом для обработки всех ошибок: и для JSON.parse и для других случаев.
*/


warn('===== Проброс исключения =====');
/*
 Что, если в блоке try {...} возникнет другая неожиданная ошибка? Например, программная (неопределённая переменная)
или какая-то ещё, а не ошибка, связанная с некорректными данными.
*/
let jsonFive = '{"age": 30}'; // данные неполны

try {
   userFive = JSON.parse(jsonFive); // <-- забыл добавить "let" перед user
   if (!jsonFive.name) {
      throw new SyntaxError("Данные не полны: нет имени!");
   }
} catch (e) {
   console.log("JSON Error: " + e); // JSON Error: ReferenceError: "Данные не полны: нет имени!"
   // (не JSON ошибка на самом деле)
};
/*
 В этом случае можно выяснить, какую ошибку мы получили, например, по её свойству name:
"ReferenceError" - из-за неопределённой переменной.

 Блок catch должен обрабатывать только те ошибки, которые ему известны, и «пробрасывать» все остальные.
Техника «проброс исключения» выглядит так:
 · Блок catch получает все ошибки.
 · В блоке catch(err) {...} мы анализируем объект ошибки err.
 · Если мы не знаем как её обработать, тогда делаем throw err.
*/
//! Используем проброс исключения, catch обрабатывает только SyntaxError:
let jsonSix = '{ "age": 30 }'; // данные неполны

try {
   let userSix = JSON.parse(jsonSix);

   if (!userSix.name) throw new SyntaxError("Данные не полны: нет имени!");

   blabla(); // неожиданная ошибка
} catch (e) {
   if (e.name == "SyntaxError") {
      console.log("JSON Error: " + e.message);
   } else {
      throw e; // проброс (*)
   }
};
/*
 Ошибка в строке (*) из блока catch «выпадает наружу» и может быть поймана другой внешней конструкцией
try..catch (если есть), или «убьёт» скрипт.
 Такие ошибки могут быть пойманы с помощью ещё одного уровня try..catch.
*/
function readData() {
   let json = '{"age": 30}';

   try {
      let user = JSON.parse(json);
      if (!user.name) {
         throw new SyntaxError("Данные не полны: свойства 'name' нет!");
      }
      blabla(); // ошибка!
   } catch (e) {
      if (e.name == "SyntaxError") {
         console.log("JSON Error: " + e.message);
      } else if (e.name != "SyntaxError") {
         throw e; // проброс исключения (не знаю как это обработать)
      }
   }
};

try {
   readData();
} catch (e) {
   console.log("Внешний catch поймал: " + e); // должен был выдать ошибку.. но похоже она вне области видимости
};


warn('===== try…catch…finally =====');
/*
 Если секция есть, то она выполняется в любом случае:
 · после try, если не было ошибок,
 · после catch, если ошибки были.
*/
try {
   // ... пробуем выполнить код...
} catch (e) {
   // ... обрабатываем ошибки ...
} finally {
   // ... выполняем всегда ...
};

/*
 Секцию finally часто используют, когда мы начали что-то делать и хотим завершить это вне зависимости
от того, будет ошибка или нет.
 Например, мы хотим измерить время, которое занимает функция чисел Фибоначчи fib(n). Естественно,
мы можем начать измерения до того, как функция начнёт выполняться и закончить после. Но что делать,
если при вызове функции возникла ошибка? В частности, реализация fib(n) в коде ниже возвращает ошибку
для отрицательных и для нецелых чисел.
 Здесь finally гарантирует, что время будет измерено корректно в обеих ситуациях – и в случае успешного 
завершения fib и в случае ошибки.


let num = +prompt("Введите положительное целое число?", 35);

let diff, result;

function fib(n) {
   if (n < 0 || n != Math.trunc(n)) {
      throw new Error("Должно быть целое неотрицательное число");
   }
   return n <= 1 ? n : fib(n - 1) + fib(n - 2);
};

let start = Date.now();

try {
   result = fib(num);
} catch (e) {
   result = 0;
} finally {
   diff = Date.now() - start;
}

alert(result || "Возникла ошибка!");
alert(`Выполнение заняло ${diff}ms!`);


 Введя 35 в prompt – код завершится нормально, finally выполнится после try. А затем введя -1
– незамедлительно произойдёт ошибка, выполнение займёт 0ms. Оба измерения выполняются корректно.
 Другими словами, неважно как завершилась функция: через return или throw.
Секция finally срабатывает в обоих случаях.

! Переменные внутри try..catch..finally локальны!
 Переменные result и diff в коде выше объявлены до try..catch !
Если переменную объявить в блоке, например, в try, то она не будет доступна после него.


* finally и return
 Блок finally срабатывает при любом выходе из try..catch, в том числе и return.
В примере ниже из try происходит return, но finally получает управление до того,
как контроль возвращается во внешний код.
*/
function func() {
   try {
      return 1;
   } catch (e) {
      /* ... */
   } finally {
      console.log('finally');
   }
};
console.log(func()); // сначала finally, потом 1

/*
* try..finally
 Конструкция try..finally без секции catch также полезна. Применяется, когда не нужно
обрабатывать ошибки (пусть выпадут), но надо быть уверенным, что начатые процессы завершились.
*/
function funcTwo() {
   // начать делать что-то, что требует завершения (например, измерения)
   try {
      // ...
   } finally {
      // завершить это, даже если все упадёт
   }
};
/*
 В этом коде ошибка всегда выпадает наружу, потому что тут нет блока catch.
Но finally отрабатывает до того, как поток управления выйдет из функции.
*/


warn('====== Пользовательские ошибки, расширение Error ======');
/*
 При разработке могут понадобиться разные клаассы ошибок:
 · HttpError - при работе с сетью
 · DbError - для операций с базой данных
 · NotFoundError - для поиска..
 Наши ошибки должны поддерживать как базовые свойства, такие как message, name и, желательно, stack,
так и свои собственные свойства. Например, объекты HttpError могут иметь свойство statusCode
со значениями 404, 403 или 500.

* Расширение Error
 В качестве примера функция readUser(json), которая должна читать данные пользователя в формате JSON.
let json = `{ "name": "John", "age": 30 }`; // уже определена выше

 Внутри будет JSON.parse. При получении некорректного json он будет генерировать ошибку SyntaxError. 
За полноту данных будет отвечать другая ошибка - ValidationError. Она должна содержать информацию о поле,
которое является источником ошибки.
 Класс ValidationError должен наследовать от встроенного класса Error.

 Примерный код встроенного класса Error:
class Error {
   constructor(message){
      this.message = message;
      this.name = "Error";
      this.stack = "стек вызовов"
   }
};


 Чтобы постоянно вручную не прописывать имя нового класса ошибки можно сделать соственный
базовый класс ошибкии, который будет ставить this.name = this.constructor.name.
 И затем наследовать все ошибки уже от него.
*/
class MyError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
}

class ValidationError extends MyError { };

function test() {
   throw new ValidationError("Упс!");
};

try {
   test();
} catch (err) {
   console.log(err.name); // ValidationError
   console.log(err.message); // Упс!
   console.log(err.stack); // список вложенных вызовов с номерами строк для каждого
};

// Использование
function readUser(json) {
   let user = JSON.parse(json);

   if (!user.age) {
      throw new ValidationError('Нет поля: "age"');
   }
   if (!user.name) {
      throw new ValidationError('Нет поля: "name"');
   }
   return user;
};

// Рабочий пример с try..catch
try {
   readUser('{ "age": 25 }');
} catch (err) {
   if (err instanceof ValidationError) {
      console.log("Некорректные данные: " + err.message); // Некорректные данные: Нет поля: name
   } else if (err instanceof SyntaxError) {
      console.log("JSON Ошибка Синтаксиса: " + err.message);
   } else {
      throw err; // неизвестная ошибка, пробросить исключение
   }
};
// Блок try..catch в коде выше обрабатывает и новую ValidationError, и встроенную SyntaxError из JSON.parse.

/*
* Дальнейшее наследование
 Класс ValidationError является слишком общим. Много чего может пойти не так.
Свойство может отсутствовать или иметь неверный формат.
Поэтому для отсутствующих свойств делают более конкретные классы, типо PropertyRequiredError.
Он будет нести дополнительную информацию о свойстве, которое отсутствует.
*/
class PropertyRequiredError extends ValidationError {
   constructor(property) {
      super("Нет свойства: " + property);
      this.property = property;
   }
};

function readUserTwo(json) {
   let user = JSON.parse(json);

   if (!user.name) {
      throw new PropertyRequiredError(`"name"`);
   }
   if (!user.age) {
      throw new PropertyRequiredError(`"age"`);
   }
   return user;
};

try {
   readUserTwo('{ "age": 25 }');
} catch (err) {
   if (err instanceof ValidationError) {
      console.log("Неверные данные: " + err.message); // Неверные данные: Нет свойства: "name"
      console.log(err.name); // PropertyRequiredError
      console.log(err.property); // "name"
   } else if (err instanceof SyntaxError) {
      console.log("Ошибка синтаксиса JSON: " + err.message);
   } else {
      throw err; // неизвестная ошибка, повторно выбросит исключение
   }
};

/*
* Обёртывание исключений
 Функция ловит низкоуровневые исключения и создаёт одно «высокоуровневое» исключение вместо
разных низкоуровневых.
 Создадим новый класс ReadError. Если синтаксическая ошибка возникает внутри readUserTree,
она перехвается и сгенерируется ReadError. Также сохраним ссылку на исходную ошибку в свойстве cause.
Тогда внешний код должен будет только проверить наличие ReadError.
*/
class ReadError extends Error {
   constructor(message, cause) {
      super(message);
      this.cause = cause;
      this.name = this.constructor.name;
   }
};
// class ValidationError extends MyError { /*...*/ }
// class PropertyRequiredError extends ValidationError { /* ... */ }

function validateUser(user) {  // функция валидности User'а
   if (!user.name) {
      throw new PropertyRequiredError(`"name"`);
   }
   if (!user.age) {
      throw new PropertyRequiredError(`"age"`);
   }
};

function readUserTree(json) {
   let user;
   try {
      user = JSON.parse(json);
   } catch (err) {
      if (err instanceof SyntaxError) {
         throw new ReadError("Синтаксическая ошибка", err); // если SyntaxError -> то запуск ReadError + коммент
      } else {
         throw err;
      }
   }

   try {
      validateUser(user);
   } catch (err) {
      if (err instanceof ValidationError) {
         throw new ReadError("Ошибка валидации", err); // если ValidationError -> то запуск ReadError + дугой коммент
      } else {
         throw err;
      }
   }
};

try {
   readUserTree('{bad json}');
} catch (err) {
   if (err instanceof ReadError) {
      console.log(err);
      console.log("Исходная ошибка: " + err.cause);
      // Исходная ошибка: SyntaxError: Unexpected token b in JSON at position 1
   } else {
      throw err;
   }
};
/*
 readUser работает так, как описано – функция распознаёт синтаксические ошибки и ошибки валидации
и выдаёт вместо них ошибки ReadError (неизвестные ошибки, как обычно, пробрасываются).
 Внешний код проверяет только instanceof ReadError. Не нужно перечислять все возможные типы ошибок.
Этот подход и называется «обёртывание исключений».
*/



