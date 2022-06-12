let { warn } = console;


warn("========= Proxy =========");
/*
 Объект Proxy «оборачивается» вокруг другого объекта и может перехватывать разные действия с ним,
например чтение/запись свойств и другие.

 let proxy = new Proxy(target, handler);

 · target – это объект, для которого нужно сделать прокси, может быть чем угодно, включая функции.
 · handler – конфигурация прокси: объект с «ловушками» («traps»): методами, которые перехватывают
разные операции, например, ловушка get – для чтения свойства из target,
ловушка set – для записи свойства в target и так далее.

 При операциях над proxy, если в handler имеется соответствующая «ловушка», то она срабатывает,
и прокси имеет возможность по-своему обработать её, иначе операция будет совершена
над оригинальным объектом target.
*/
//* Пример прокси без ловушек
let target = {};
let proxy = new Proxy(target, {}); // пустой handler

proxy.test = 5; // записываем в прокси
console.log(target.test); // свойство появилось в target
console.log(proxy.test); // и в proxy

for (const key in proxy) {
  console.log(key); // test, итерация работает
}
/*
 Так как нет ловушек, то все операции на proxy применяются к оригинальному объекту target.
 · Запись свойства proxy.test= устанавливает значение на target.
 · Чтение свойства proxy.test возвращает значение из target.
 · Итерация по proxy возвращает значения из target.

* Полный список перехватываемых методов

Внутренний метод         \ Ловушка	                  \ Что вызывает
_________________________\____________________________\__________________________________________________________________
[[Get]]	                \ get	                     \ чтение свойства
-------------------------\----------------------------\------------------------------------------------------------------
[[Set]]	                \ set	                     \ запись свойства
-------------------------\----------------------------\------------------------------------------------------------------
[[HasProperty]]	       \ has	                     \ оператор in
-------------------------\----------------------------\------------------------------------------------------------------
[[Delete]]	             \ deleteProperty	            \ оператор delete
-------------------------\----------------------------\------------------------------------------------------------------
[[Call]]	                \ apply	                     \ вызов функции
-------------------------\----------------------------\------------------------------------------------------------------
[[Construct]]	          \ construct	               \ оператор new
-------------------------\----------------------------\------------------------------------------------------------------
[[GetPrototypeOf]]	    \ getPrototypeOf	            \ Object.getPrototypeOf
-------------------------\----------------------------\------------------------------------------------------------------
[[SetPrototypeOf]]	    \ setPrototypeOf	            \ Object.setPrototypeOf
-------------------------\----------------------------\------------------------------------------------------------------
[[IsExtensible]]	       \ isExtensible	            \ Object.isExtensible
-------------------------\----------------------------\------------------------------------------------------------------
[[PreventExtensions]]	 \ preventExtensions	         \ Object.preventExtensions
-------------------------\----------------------------\------------------------------------------------------------------
[[DefineOwnProperty]]	 \ defineProperty	            \ Object.defineProperty, Object.defineProperties
-------------------------\----------------------------\------------------------------------------------------------------
[[GetOwnProperty]]	    \ getOwnPropertyDescriptor	\ Object.getOwnPropertyDescriptor,
                         \                            \   for..in, Object.keys/values/entries
-------------------------\----------------------------\------------------------------------------------------------------
[[OwnPropertyKeys]]	    \ ownKeys	                  \ Object.getOwnPropertyNames, Object.getOwnPropertySymbols,
                         \                            \   for..in, Object.keys/values/entries
-------------------------\----------------------------\------------------------------------------------------------------
*/

warn("========== Инварианты ==========");
/*
 JavaScript налагает некоторые условия – инварианты на реализацию внутренних методов и ловушек.
Большинство из них касаются возвращаемых значений:
 · Метод [[Set]] должен возвращать true, если значение было успешно записано, иначе false.
 · Метод [[Delete]] должен возвращать true, если значение было успешно удалено, иначе false.
…и так далее.
*/

warn("========== «get» ===========");
/*
* Чтобы перехватить операцию чтения, handler должен иметь метод get(target, property, receiver).
Он срабатывает при попытке прочитать свойство объекта, с аргументами:
 · target – это оригинальный объект, который передавался первым аргументом в конструктор new Proxy,
 · property – имя свойства,
 · receiver – если свойство объекта является геттером, то receiver – это объект,
 который будет использован как this при его вызове. Обычно это сам объект прокси (или наследующий от него объект).
*/
// Сделаем числовой массив, так чтобы при чтении из него несуществующего элемента возвращался 0, а не undefined.
let numbers = [0, 1, 2];

numbers = new Proxy(numbers, {
  get(target, prop) {
    // перехватываем чтение свойства
    if (prop in target) {
      // если значение есть в массиве
      return target[prop]; // то возвращаем это значение
    } else {
      return 0; // иначе вызвращаем наше значение
    }
  },
});
console.log(numbers[1]); // 1
console.log(numbers[10]); // 0 а не undefined

// Переделаем объект-словарь с фразами на английском и их переводом на испанский.
let dictionary = {
  Hello: "Hola",
  Bye: "Adiós",
};
console.log(dictionary["Hello"]); // Hola
console.log(dictionary["Welcome"]); // undefined
/*
 Сейчас, если фразы в dictionary нет, при чтении возвращается undefined.
Сделаем, чтобы фразы оставались не переведёнными если их нет в словаре.
*/
dictionary = new Proxy(dictionary, {
  get(target, phrase) {
    // перехватываем чтение свойства в dictionary
    if (phrase in target) {
      // если перевод для фразы есть в словаре
      return target[phrase]; // возвращаем его
    } else {
      return phrase; // иначе возвращаем непереведённую фразу
    }
  },
});
console.log(dictionary["Hello"]); // Hola
console.log(dictionary["Welcome"]); // Welcome

/*
! Прокси должен перезаписывать переменную: dictionary = new Proxy(dictionary, ...);
 Прокси должен заменить собой оригинальный объект повсюду.
Никто не должен ссылаться на оригинальный объект после того, как он был проксирован.
*/

warn("========== «set» ===========");
/*
* Ловушка set срабатывает, когда происходит запись свойства.
set(target, property, value, receiver):
 · target – это оригинальный объект, который передавался первым аргументом в конструктор new Proxy,
 · property – имя свойства,
 · value – значение свойства,
 · receiver – аналогично ловушке get, этот аргумент имеет значение, только если свойство – сеттер.

 Допустим, нужно сделать массив исключительно из чисел. Если в него добавляется значение иного типа,
то это должно приводить к ошибке.
 Ловушка set должна вернуть true, если запись прошла успешно, и false в противном случае 
(будет сгенерирована ошибка TypeError).
*/
let num = [];

num = new Proxy(num, {
  set(target, prop, val) {
    if (typeof val == "number") {
      target[prop] = val;
      return true; // не забывайть вернуть true
    } else {
      return false;
    }
  },
});
num.push(1);
num.push(2); // добавились успешно
console.log(`Длина массива равна: ${num.length}`); // 2
// num.push("тест"); // TypeError (ловушка set на прокси вернула false)


warn("Перебор при помощи «ownKeys» и «getOwnPropertyDescriptor»");
/*
* Ловушкой ownKeys(target) перехватываются большинство методов, которые работают со списком свойств объекта,
используют внутренний метод [[OwnPropertyKeys]]. (Object.keys, цикл for..in и т.д.)
 · Object.getOwnPropertyNames(obj) возвращает НЕсимвольные ключи.
 · Object.getOwnPropertySymbols(obj) возвращает символьные ключи.
 · Object.keys/values() возвращает НЕсимвольные ключи/значения с флагом enumerable.
 · for..in перебирает НЕсимвольные ключи с флагом enumerable, а также ключи прототипов.

 Используя ловушку ownKeys, сделаем так, чтобы цикл for..in проходя по объекту, равно как Object.keys 
и Object.values пропускали свойства, начинающиеся с подчёркивания _.
*/
let user = {
  name: "Igor",
  age: 34,
  _password: "123",
};

let pu = new Proxy(user, {
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});
for (key in pu) console.log(key); // name, age. ownKeys исключил _password
console.log(Object.keys(pu)); // ['name', 'age']  ключ _password не оторажается

// Если попробовать возвратить ключ, которого в объекте на самом деле нет, то Object.keys его не выдаст:
let a = {};
a = new Proxy(a, {
  ownKeys(target) {
    return ["a", "b", "c"];
  },
  // getOwnPropertyDescriptor(target, prop){
  //    return{
  //    enumerable: true,
  //    configurable: true
  //    
  // }
});
console.log(Object.keys(a));
/*
 Причина в том, что Object.keys возвращает только свойства с флагом enumerable.
Применив ловушку getOwnPropertyDescriptor можно вернуть дескриптор.
 · enumerable - перебираемость
 · configurable - возможность добавить свойство
*/

warn("=========== deleteProperty ==========");
/*
* Защищённые свойства с ловушкой «deleteProperty» и другими
 Пример прокси для защиты свойства, начинающиеся на _, от доступа извне.
 · get – для того, чтобы сгенерировать ошибку при чтении такого свойства
 · set – для того, чтобы сгенерировать ошибку при записи
 · deleteProperty – для того, чтобы сгенерировать ошибку при удалении
 · ownKeys – для того, чтобы исключить такие свойства из for..in и методов типа Object.keys
*/
let newUser = {
  name: "Vasily",
  _password: "******",
};
newUser = new Proxy(newUser, {
  get(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Protected property!");
    } else {
      let value = target[prop];
      return typeof value === "function" ? value.bind(target) : value; //! смотри ниже
    }
  },
  set(target, prop, val) {
    if (prop.startsWith("_")) {
      throw new Error("Чего ты лезешь куда не просят?!");
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    if (prop.startsWith("_")) {
      throw new Error("Ты что, не понял?");
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    return Object.keys(target).filter((key) => !key.startsWith("_"));
  },
});

// "get" не позволяет прочитать _password
try {
  console.log(newUser._password);
} catch (error) {
  console.log(error.message);
}

// "set" не позволяет записать _password
try {
  newUser._password = "123456";
} catch (e) {
  console.log(e.message);
}

// "deleteProperty" не позволяет удалить _password
try {
  delete newUser._password;
} catch (e) {
  console.log(e.message);
}

// "ownKeys" исключает _password из списка видимых для итерации свойств
for (key in newUser) console.log(key); // name

/* 
! *
user = {
   ...
* метод объекта должен иметь доступ на чтение _password
  checkPassword(value) {
    return value === this._password;
  }
};
! this для методов проксируется, поэтому ему надо передать оригинальный объукт (target) в качестве this.
*/

warn("=========== has ============");
/*
* «В диапазоне» с ловушкой «has»
has(target, property)
 · target – это оригинальный объект, который передавался первым аргументом в конструктор new Proxy
 · property – имя свойства
*/
// Объект range, описывает диапазон
let range = {
  start: 1,
  end: 10,
};

// Задача использовать оператор in, чтобы проверить, что некоторое число находится в указанном диапазоне.
range = new Proxy(range, {
  has(target, prop) {
    return prop >= target.start && prop <= target.end;
  },
});
console.log(5 in range); // true
console.log(50 in range); // false


warn("========== apply ============");
/*
* Оборачиваем функции: «apply»
Ловушка apply(target, thisArg, args) активируется при вызове прокси как функции:
 · target – это оригинальный объект (функция – это объект в языке JavaScript),
 · thisArg – это контекст this.
 · args – список аргументов.
*/
// Вызов delay(f, ms) возвращал функцию, которая передавала вызовы f после ms миллисекунд.
function delay(f, ms) {
  return new Proxy(f, {
    apply(target, thisArg, args) {
      return setTimeout(() => target.apply(thisArg, args), ms);
    },
  });
}

function sayHi(someUser) {
  console.log(`Hello, ${someUser}!`);
}
sayHi = delay(sayHi, 2000);
sayHi("Ivan");
/*
 Эта обёртка лучше обычной тем, что операция чтения свойства sayHi.length возвращает корректное значение.
При простом обёртывании доступ к свойствам оригинальной функции, таким как name, length, и другим, будет потерян.
*/
console.log(sayHi.length); // 1


warn("============ Reflect ============");
/*
* Reflect – встроенный объект, упрощающий создание прокси.
 Внутренние методы, такие как [[Get]], [[Set]] и другие, существуют только в спецификации,
к ним нельзя обратиться напрямую.
 Объект Reflect делает это возможным. Его методы – минимальные обёртки вокруг внутренних методов.

Операция	                          \ Вызов Reflect	                             \ Внутренний метод
___________________________________\____________________________________________\______________________________
obj[prop]	                       \ Reflect.get(obj, prop)	                    \ [[Get]]
-----------------------------------\--------------------------------------------\------------------------------
obj[prop] = value	                 \ Reflect.set(obj, prop, value)	           \ [[Set]]
-----------------------------------\--------------------------------------------\------------------------------
delete obj[prop]	                 \ Reflect.deleteProperty(obj, prop)	        \ [[Delete]]
-----------------------------------\--------------------------------------------\------------------------------
new F(value)	                    \ Reflect.construct(F, value)	              \ [[Construct]]
-----------------------------------\--------------------------------------------\------------------------------
…	                                \ …                                          \  …
-----------------------------------\--------------------------------------------\------------------------------
*/
let obj = {};
Reflect.set(obj, "name", "Vasia");
console.log(obj.name); // Vasia
/*
 Для каждого внутреннего метода, перехватываемого Proxy, есть соответствующий метод в Reflect,
который имеет такое же имя и те же аргументы, что и у ловушки Proxy.

 В этом примере обе ловушки get и set прозрачно перенаправляют операции чтения и записи на объект,
при этом выводя сообщение:
*/
let userTwo = {
  name: "Petia",
};
userTwo = new Proxy(userTwo, {
  get(target, prop, rec) {
    console.log(`GET ${prop}`);
    return Reflect.get(target, prop, rec);
  },
  set(target, prop, val, rec) {
    console.log(`SET ${prop} = ${val}`);
    return Reflect.set(target, prop, val, rec);
  },
});
userTwo.name; // выводит "GET name"
userTwo.name = "Kolia"; // выводит "SET name = Kolia"
/*
 · Reflect.get читает свойство объекта.
 · Reflect.set записывает свойство и возвращает true при успехе, иначе false.
*/

warn("========= receiver =========");
/*
 В receiver хранится ссылка на правильный контекст this, который нужно передать геттеру.
Как передать геттеру контекст? Для обычной функции можно использовать call/apply,
но это же геттер, его не вызывают, просто читают значение. Это может сделать Reflect.get.
*/
let userTree = {
  _name: "Gest",
  get name() {
    return this._name;
  },
};
let userTreeProxy = new Proxy(userTree, {
  get(target, prop, reciver) {
    return Reflect.get(target, prop, reciver); // return target[prop]; <- target = userTree, а так target = admin
  },
});

let admin = {
  __proto__: userTreeProxy,
  _name: "Admin",
};
console.log(admin.name); // Admin

/*
 Можно переписать ловушку и короче:
   get(target, prop, receiver) {
     return Reflect.get(...arguments);
   }
*/
