let { warn } = console;

warn("============== Bind, Call & Apply ================");
/*
 Это три очень похожих метода функции, которыми мы указываем на конкетное значение this.
Call берёт любое число параметров, первый из которых является ссылкой на значение this,
остальные же это дополнительные аргументы. 
 Apply берет только два параметра: this и массив дополнительных аргументов.
Bind же эдентичен методу Call с тем отличием лиш, что не вызывает новую функцию сразу, её
необходимо вызвать в ручную. (прописав () после метода)
*/
function add(c, d) {
  console.log(this.a + this.b + c + d);
}

let ten = { a: 1, b: 2 };
let handerd = { a: 10, b: 20 };

add.call(ten, 3, 4);
add.bind(ten, 3, 4)();
add.apply(ten, [3, 4]);

add.call(handerd, 30, 40);
add.bind(handerd, 30, 40)();
add.apply(handerd, [30, 40]);
/*
 Когда мы используем add.bind() и add.call(), то первый параметр это то, чем будет this. 
Последующие параметры передаются функции, которую мы вызываем. Следовательно,
в add(), this.a соответствует ten.a и this.b соответствует ten.b и мы получаем на выходе 1+2+3+4 или 10.

 add.apply() довольно схож. Первый параметр это то, чем будет this.
Последующий параметр это массив аргументов используемый в функции.
*/
let jack = {
  name: "Jack",
  age: 30,
  logInfo(job, phone) {
    console.group(`${this.name} info:`);
    console.log(`Name is: ${this.name}`);
    console.log(`Age is: ${this.age}`);
    console.log(`Job is: ${job}`);
    console.log(`Phone is: ${phone}`);
    console.groupEnd();
  },
};

let john = {
  name: "John",
  age: 32,
};

jack.logInfo("driver", "234-34-54");
jack.logInfo.bind(john, "manager", "123-23-12")();
jack.logInfo.call(john, "frontend", "123-23-12");
jack.logInfo.apply(john, ["frontend", "123-23-12"]);
/*
 В связи с тем, что bind не вызывает новую функцию сразу, мы можем передать аргументы
при её вызове. Собственно в этом и заключается удобство использования этого метода.
*/
let jane = {
  name: "Jane",
  age: 23,
};
let person = jack.logInfo.bind(jane); // переменная для примера с передачей аргументов bind
person("teacher", "222-22-22");

//! Важной особенностью привязывания контекста является то, что привязать его можно только один раз!
let a = jack.logInfo
  .bind(john, "manager", "123-23-12")
  .bind(john, "teacher", "555-55-55");
a(); // Ничего не поменялось, John по-прежнему работает менеджером

/*
 Метод call может полностью заменить собой apply так как у нас теперь есть метод спред (...),
с помощью которого можно добавлять значения массива в качестве аргумента внутрь метода call.
*/
let janice = {
  name: "Janice",
  age: 28,
};
jack.logInfo.call(janice, ...["studient", "444-44-44"]);

warn("============ Декораторы и переадресация вызова ==============");
/*
 Декоратором является функция, которая принимает другую функцию и выполняет над ней манипуляции.
Смысл в том, что можно применить декоратор к другой функции не усложняя её код.
 К примеру можно, обернув функцию декоротором, получить кеширование данных, которое позволит лишний раз
не запускать (возможно) ресурсоёмкую первичную функцию.
*/

function one(x) {
  console.log(`Called with ${x}`);
  return x; // здесь могут быть ресурсоёмкие вычисления
}

function decor(func) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    } else {
      let result = func(x);
      cache.set(x, result);
      return result;
    }
  };
}
one = decor(one);
console.log(one(2));
console.log(one(2));
// на примере видно, что функция "one" не запускается т.к. информация достаётся из кеша функции "decor".

/*
* Применение «func.call» для передачи контекста.
 Упомянутый выше кеширующий декоратор не подходит для работы с методами объектов.
Декоратор вызывает оригинальную функцию как func(x), и она в данном случае получает this = undefined.
Ему необбходимо явно задать this!
*/
let obj = {
  metod() {
    return 2;
  },
  mult(x) {
    console.log(`Called with ${x}`);
    return x * this.metod();
  },
};

function decorWithCall(funk) {
  let cache = new Map();
  return function (x) {
    if (cache.has(x)) {
      return cache.get(x);
    } else {
      let result = funk.call(this, x); // Явно указываем на функцию
      cache.set(x, result);
      return result;
    }
  };
}
obj.mult = decorWithCall(obj.mult);
console.log(obj.mult(2));
console.log(obj.mult(2));
/*
 Данный декоратор можно сделать более универальным, добавив в него возможность принимать
неограниченное количество аргументов.
 Надо решить как использовать множество аргументов для ключа в коллекции Map(). Для этого подойдёт
простой способ. Нужно просто собрать все аргументы в один, написав для этого отдельную функцию.
*/
let newObj = {
  metod(x, y, z) {
    console.log(`Called with ${x}, ${y}, ${z}`);
    return x + y + z;
  },
};

function args() {
  // Функция сбора аргументов в строку
  return [].join.call(arguments); // Заимствование метода !!! Описание ниже
}

function decWithManyArgs(func, args) {
  let cache = new Map();
  return function () {
    let key = args(arguments); // Создаём ключ для Map()
    if (cache.has(key)) {
      return cache.get(key);
    } else {
      let result = func.call(this, ...arguments);
      cache.set(key, result);
      return result;
    }
  };
}
newObj.metod = decWithManyArgs(newObj.metod, args); // Передаём функцию с обработанными аргументами

console.log(newObj.metod(2, 3, 1));
console.log(newObj.metod(2, 3, 1));

warn("============== Заимствование метода =============");
/*
 Объект arguments является перебираемым псевдомассивом, но не реальным массивом. Поэтому метод join()
напрямую к нему не применим. Это вызовет ошибку.

function args() {
  return arguments.join(); // Ошибка: arguments.join не является функцией
}
args(1, 2);

 Для выхода из ситуации мы берём (заимствуем) метод join из обычного массива [].join. И используем [].join.call,
чтобы выполнить его в контексте arguments.
*/
// Если у объекта много методов и мы планируем их активно передавать, то можно привязать контекст для них всех в цикле:
let user = {};
for (let key in user) {
  if (typeof user[key] == "function") {
    user[key] = user[key].bind(user);
  }
}

warn("============== Частичное применение =============");
//* Можно привязать не только this, но и аргументы

function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2); // будет всегда умножать на два
let triple = mul.bind(null, 3); // будет всегда умножать на три
console.log(double(1));
console.log(triple(1));
/*
 Тут не используется this. Но для bind это обязательный параметр, так что нужно передать туда что-нибудь вроде null.
Таким образом создаётся новая функция, которая всегда умножает на нужное нам число.
*/
