let {warn} = console;

warn(`============ [[Prototype]] ============`);
/* Прототипное наследование - это унаследование методов другого объекта

* [[Prototype]]
 В JavaScript объекты имеют специальное скрытое свойство [[Prototype]], которое либо равно null,
либо ссылается на другой объект. Этот объект называется «прототип».
 Свойство [[Prototype]] является внутренним и скрытым, но есть много способов задать его.
Одним из них является использование __proto__, например так:
*/
let animal = {
   eats: 'carrot'
};
let rabbit = {
   jumps: true
};

rabbit.__proto__ = animal;
/*
 Теперь, когда мы захотим прочитать свойство eats у rabbit,
JavaScript автоматически возьмёт его из прототипа. 
*/
console.log(rabbit.jumps); // true
console.log(rabbit.eats); // carrot

// Если у нас есть метод в animal, он может быть вызван на wolf.

let animals = {
   eats: true,
   walk() {
      console.log("Animals walk");
   }
};
let wolf = {
   color: "gray",
   __proto__: animals
};
wolf.walk(); // Animals walk

//! Цепочка может быть сколь угодно длинной.

let fox = {
   color: 'orange',
   __proto__: wolf // делаем wolf прототипом, у которого, в свою очередь, прототипом является animal
};
console.log(fox.eats); // вызываем animals из fox по цепочке через wolf


/*
! Есть только два ограничения:
 · Ссылки не могут идти по кругу. JavaScript выдаст ошибку, если мы попытаемся назначить __proto__ по кругу.
 · Значение __proto__ может быть объектом или null. Другие типы игнорируются.


* Операция записи не использует прототип
 Прототип используется только для чтения свойств.
Операции записи/удаления работают напрямую с объектом.
 В приведённом ниже примере мы присваиваем john собственный метод walk:
*/
let humen = {
   eats: true,
   walk() {
      console.log(`Humens is walked`);
      // этот метод не будет использоваться в john т.к. у него появится свой
   }
};

let john = {
   name: 'John',
   __proto__: humen
};
john.walk = function () {
   console.log(`My name is ${this.name}!`);
};
john.walk();
//! Теперь вызов john.walk() находит метод непосредственно в объекте и выполняет его, не используя прототип.
/*
* Свойства-аксессоры – исключение, так как запись в него обрабатывается функцией-сеттером.
То есть, это, фактически, вызов функции.
По этой причине admin.fullName работает корректно в приведённом ниже коде:
*/
let user = {
   name: 'David',
   surName: 'Bowie',
   set fullName(value) {
      [this.name, this.surName] = value.split(' ');
   },
   get fullName() {
      return `${this.name} ${this.surName}`;
   }
};
let admin = {
   __proto__: user,
   isAdmin: true
};
console.log(admin.fullName);
admin.fullName = 'Alise Cooper'; //! срабатывает сеттер
console.log(admin.fullName);

/*
* Значение this
! Прототипы никак не влияют на this!
 Неважно, где находится метод: в объекте или его прототипе.
При вызове метода this — всегда объект перед точкой.

 Например, здесь predator представляет собой «хранилище методов», и bear использует его.
Вызов bear.sleep() устанавливает this.isSleeping для объекта bear.
*/
let predator = {
   walk() {
      if (!this.isSleeping) {
         console.log(`I walk`);
      }
   },
   sleep() {
      this.isSleeping = true;
   }
};

let bear = {
   name: 'Gray Bear',
   __proto__: predator
};

bear.sleep(); // модифицирует bear.isSleeping
console.log(bear.isSleeping); // true
console.log(predator.isSleeping); // undefined (нет такого свойства в прототипе)
//! В результате методы являются общими, а состояние объекта — нет.


/*
* Цикл for…in
! Цикл for..in проходит не только по собственным, но и по унаследованным свойствам объекта. 
 let animal = {
  eats: true
};

let rabbit = {
  jumps: true,
  __proto__: animal
};
*/
console.log(Object.keys(rabbit)); // Object.keys возвращает только собственные ключи

for (const key in rabbit) {
   console.log(key); // jumps, затем eats
};

/*
 Если унаследованные свойства нам не нужны, то мы можем отфильтровать их при помощи
встроенного метода obj.hasOwnProperty(key): он возвращает true, если у obj есть собственное,
не унаследованное, свойство с именем key.
*/
for (const key in rabbit) {
   if (Object.hasOwnProperty.call(rabbit, key)) {
      console.log(`Our: ${key}`); // только jumps
   } else {
      console.log(`Inherited: ${key}`); // только eats
   }
};
/*
 Почти все остальные методы, получающие ключи/значения,
такие как Object.keys, Object.values и другие – игнорируют унаследованные свойства.
Они учитывают только свойства самого объекта, не его прототипа.
*/


warn(`============ F.prototype ============`);
/*
* F.prototype
 Новые объекты могут быть созданы с помощью функции-конструктора new F().
F.prototype означает обычное свойство с именем "prototype" для F. Это ещё не «прототип объекта»,
а обычное свойство F с таким именем.
 Если в F.prototype содержится объект, оператор new устанавливает его в качестве [[Prototype]] для нового объекта.

! В обычных объектах prototype не является чем-то особенным!!
*/

let car = {
   gas: 100
};
let money = {
   cost: 100000
};

function Cars(model) {
   this.model = model;
};
Cars.prototype = car; // Cars.__proto__ == car

let honda = new Cars('Honda')
console.log(honda.gas); // 100
/*
 Установка Cars.prototype = car буквально говорит интерпретатору следующее:
"При создании объекта через new Cars() запиши ему car в [[Prototype]]".
*/
console.log(honda); // в консоле видно наследование свойств объекта
/*
 F.prototype используется только при вызове new F() и присваивается в качестве свойства [[Prototype]] нового объекта.
После этого F.prototype может измениться, и новые объекты, созданные с помощью new F(),
будут иметь другой объект в качестве [[Prototype]], но уже существующие объекты сохранят старый.
*/
Cars.prototype = money; // переназначаем "Cars.__proto__ == car" на "Cars.__proto__ == money"
let bmw = new Cars('bmw');
console.log(bmw.cost);
console.log(honda); // объект по-прежнему наследует свойства у "car"
console.log(bmw); // у нового объекта свойство "gas" переписывается на новое свойство "cost"

/*
* F.prototype по умолчанию, свойство constructor
 У каждой функции-конструктора по умолчанию уже есть свойство "prototype".
По умолчанию "prototype" – объект с единственным свойством constructor, которое ссылается на функцию-конструктор.
*/
function Eagle() { };
// по умолчанию:
// Egle.prototype = { constructor: Egle }

console.log(Eagle.prototype.constructor == Eagle); // true

// Соответственно, если мы ничего не меняем, то свойство constructor будет доступно всем орлам через [[Prototype]]:

let eagle = new Eagle() // наследует от {constructor: Eagle}
console.log(eagle.constructor == Eagle); // true (свойство получено из прототипа)
console.log(eagle); // Eagle {}

// Можно использовать свойство constructor существующего объекта для создания нового.
function Fish(name) {
   this.name = name;
   console.log(name);
}
let forel = new Fish('Forel');
let swordfish = new forel.constructor('Swordfish');
/*
 Это удобно, когда есть объект, но не известно, какой конструктор использовался для его создания
(например, он мог быть взят из сторонней библиотеки), а необходимо создать ещё один такой объект.

! ВАЖНО !!! 
 Свойство "constructor" является свойством по умолчанию в "prototype" у функций,
но то, что случится с ним позже – зависит только от нас.
 Если заменить прототип по умолчанию на другой объект, то свойства "constructor" в нём не будет.
*/
function User() { };

User.prototype = { name: 'Igor' }; //! здесь мы не добавляем, а полностью переписываем свойство
let igor = new User();
console.log(igor.constructor == User); // false
/*
 Таким образом, чтобы сохранить верное свойство "constructor", мы должны добавлять/удалять/изменять 
свойства у прототипа по умолчанию вместо того, чтобы перезаписывать его целиком.
*/
function Users() { };

Users.prototype.name = 'Valera'; //! Не перезаписываем Users.prototype полностью, а добавляем к нему свойство
let valera = new Users();
console.log(valera.constructor == Users); // true

//! Либо можно заново создать свойство constructor

function OurUsers() { };

OurUsers.prototype = {
   name: 'Ivan',
   prototype: OurUsers // переопределяем свойство
};
let ivan = new OurUsers();
console.log(ivan.prototype == OurUsers); // true


warn('========= Методы прототипов ==========');
/*
 Свойство __proto__ считается устаревшим, и по стандарту оно должно поддерживаться только браузерами.
* Современные методы:
 · Object.create(proto, [descriptors]) – создаёт пустой объект со свойством [[Prototype]],
    указанным как proto, и необязательными дескрипторами свойств descriptors.
 · Object.getPrototypeOf(obj) – возвращает свойство [[Prototype]] объекта obj.
 · Object.setPrototypeOf(obj, proto) – устанавливает свойство [[Prototype]] объекта obj как proto.
 Проще говоря это новый синтаксис свойства __proto__.
*/
let person = {
   name: 'Vasia',
   surName: 'Sidorov'
};
let vasia = Object.create(person);
console.log(vasia.name); // Vasia
console.log(Object.getPrototypeOf(vasia) == person); // true

/*
 У Object.create есть необязательный второй аргумент: дескрипторы свойств.
Благодаря ему можно добавить дополнительное свойство новому объекту.
*/
let petia = Object.create(person, {
   name: { // можно как добавить новое свойство так и переписать старое
      value: 'Petia'
   }
});
console.log(petia.name); // Petia

//! Добавление метода выглядит так:

let dictionary = Object.create(null, {
   toString: { // добавляем toString через дискриптор свойств, тем самым делая его не перечисляемым
      value() { // значение - это функция
         return Object.entries(this).join();
      }
   }
});
dictionary.apple = "Apple";
dictionary.__proto__ = "test";
console.log(dictionary);


//! Можно использовать Object.create для «продвинутого» клонирования объекта, более мощного, чем копирование свойств в цикле for..in.

let dima = Object.create(Object.getPrototypeOf(person), Object.getOwnPropertyDescriptors(person));
console.log(dima);
/*
 Такой вызов создаёт точную копию объекта obj, включая все свойства с их флагами: перечисляемые и неперечисляемые,
геттеры/сеттеры для свойств – и всё это с правильным свойством [[Prototype]].
*/

//* Ещё методы:
let obj = {};
let key = Symbol('id');
obj[key] = 'samething';

Object.keys(obj) / Object.values(obj) / Object.entries(obj) // – возвращают массив всех перечисляемых собственных
// строковых ключей/значений/пар ключ-значение.
Object.getOwnPropertySymbols(obj) // – возвращает массив всех собственных символьных ключей.
Object.getOwnPropertyNames(obj) // – возвращает массив всех собственных строковых ключей.
Reflect.ownKeys(obj) // – возвращает массив всех собственных ключей.
obj.hasOwnProperty(key) // – возвращает true, если у obj есть собственное (не унаследованное) свойство с именем key.

