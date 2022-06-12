let { warn } = console;


warn('============ Базовый синтаксис ===========');

class MyClass {
   // методы класса
   constructor() { /*...*/ }
   method1() { /*...*/ }
   method2() { /*...*/ }
   method3() { /*...*/ }
   // ...
};
// Затем используется вызов new MyClass() для создания нового объекта со всеми перечисленными методами.

class Users {
   constructor(name) {
      this.name = name;
   }

   sayHi() {
      console.log(`Hi, ${this.name}!`);
   }
};

let dima = new Users("Dmitry");
dima.sayHi();
/*
 Когда вызывается new User("Dmitry"):
 · Создаётся новый объект.
 · constructor запускается с заданным аргументом и сохраняет его в this.name.
…Затем можно вызывать на объекте методы, такие как user.sayHi().
*/

//! Методы в классе не разделяются запятой !

//! Класс – это разновидность функции.

class User {
   constructor(name) { this.name = name; }
   sayHi() { alert(this.name); }
};
console.log(typeof User); // function
/*
 Вот что на самом деле делает конструкция class User {...}:
 · Создаёт функцию с именем User, которая становится результатом объявления класса.
  Код функции берётся из метода constructor (она будет пустой, если такого метода нет).
 · Сохраняет все методы, такие как sayHi, в User.prototype.

 При вызове метода объекта new User он будет взят из прототипа, как описано в главе F.prototype.
Таким образом, объекты new User имеют доступ к методам класса.
*/
//! класс - это не просто функция, если точнее, это метод constructor
console.log(User === User.prototype.constructor); // true

// Методы находятся в User.prototype
console.log(User.prototype.sayHi);

// в прототипе ровно 2 метода
console.log(Object.getOwnPropertyNames(User.prototype));


// Class Expression
// Как и функции, классы можно определять внутри другого выражения, передавать, возвращать, присваивать и т.д.
let NewUser = class {
   sayHi() {
      console.log(`Hi!`);
   }
};
/*
 Аналогично Named Function Expression, Class Expression может иметь имя.
Если у Class Expression есть имя, то оно видно только внутри класса.
*/
let NewUsers = class MyNewClass {
   defineClassName() {
      console.log(`${MyNewClass}`);
   }
};
new NewUsers().defineClassName(); // работает, выводит определение MyNewClass
// console.log(MyNewClass); // ошибка, имя MyClass не видно за пределами класса


// Можно создавать классы по запросу
function makeClass(phrase) {
   return class {
      sayHi() {
         console.log(phrase);
      }
   }
};
let Hello = makeClass('Hello!');
new Hello().sayHi();


//* Геттеры/сеттеры, другие сокращения
class Car {
   constructor(brand) {
      this.brand = brand;
   }
   get myBrand() {
      return this.brand;
   }
   set myBrand(value) {
      this.brand = value.toUpperCase();
   }
};
let honda = new Car('Honda');
honda.myBrand = 'Honda'; // при использовании геттеры/сеттеры класса выглядят как свойства объекта
console.log(honda);

// При объявлении класса геттеры/сеттеры создаются на Car.prototype.
Object.defineProperties(Car.prototype, {
   brand: {
      get() {
         return this.brand;
      },
      set(brand) {
         // ....
      }
   }
});
console.log(new Car());

// Пример с вычисляемым свойством в скобках [...]
class A {
   ['say' + 'Hi']() {
      console.log(`Привет!`);
   }
}
new A().sayHi();


//* Свойства классов
class Person {
   name = 'Anonimus';

   sayHi() {
      console.log(`Hi, ${this.name}!`);
   }
};
new Person().sayHi();
/*
 Свойство name не устанавливается в User.prototype.
Вместо этого оно создаётся оператором new перед запуском конструктора, это именно свойство объекта.
*/


warn('=========== Наследование классов ============');
// Допустим, у нас есть два класса..
class Animal {
   constructor(name) {
      this.name = name;
      this.speed = 0;
   }
   run(speed) {
      this.speed = speed;
      console.log(`${this.name} бежит со скоростью ${this.speed}.`);
   }
   stop() {
      this.speed = 0;
      console.log(`${this.name} стоит.`);
   }
};
let animal = new Animal('Мой питомец');

// .. и ..
class Rabbit {
   constructor(name) {
      this.name = name;
   }
   hide() {
      console.log(`${this.name} прячется!`);
   }
};
let rabbit = new Rabbit('Мой кролик');
/*
 Сейчас они полностью независимы.
Но мы хотим, чтобы Rabbit расширял функциональность Animal своими методами.

 Для того, чтобы наследовать класс от другого, нужно использовать
ключевое слово "extends" и указать название родительского класса перед {..}.
*/
class WhightRabbit extends Animal { // constructor же не пишем !! только доп метод(ы)
   hide() {
      console.log(`${this.name} прячется!`);
   }
};
let whightRabbit = new WhightRabbit('Белый кролик');
whightRabbit.run(5);
whightRabbit.stop();
whightRabbit.hide();

// Синтаксис создания класса допускает указывать после extends не только класс, а любое выражение.
// Например функцию
function Hi(phrase) {
   return class {
      sayHi() {
         console.log(`${phrase}!`);
      }
   }
};
class HiEveryone extends Hi('Всем привет') { };
new HiEveryone().sayHi();


/*
* Переопределение методов
 Сейчас Rabbit наследует от Animal метод stop, который устанавливает this.speed = 0.
Если мы определим свой метод stop в классе Rabbit, то он будет использоваться взамен родительского.
*/
class Rebbit extends Animal {
   stop() {
      // ...будет использован для rabbit.stop()
   }
};
/*
 Впрочем, обычно мы не хотим полностью заменить родительский метод, а скорее хотим сделать новый на его основе,
изменяя или расширяя его функциональность. Мы делаем что-то в нашем методе и 
вызываем родительский метод до/после или в процессе.

 У классов есть ключевое слово "super" для таких случаев.
 · super.method(...) вызывает родительский метод.
 · super(...) вызывает родительский конструктор (работает только внутри нашего конструктора).
*/
class Mouse extends Animal {
   constructor(name, color) {
      super(name); // ссылка на родительский конструктор (пишутся всегда перед this.(...))
      this.color = color;
   }
   hide() {
      console.log(`${this.color} ${this.name} причется!`);
   }
   stop() {
      super.stop(); // ссылка на родительский метод
      this.hide(); // дочерний объект mouse при остановке будет сразу прятаться 
   }
};
let mouse = new Mouse('Мышь', 'серая');
mouse.stop();


warn('========== Статические свойства и методы ============');
/*
 Статическими называются методы присвоиные самой функции-классу, а не её "prototype".
Обозначаются они ключевым словом static.
*/
class Apple {
   static staticMetod() {
      console.log(this === Apple);
   }
};
Apple.staticMetod(); // true

// Это равносильно присвоению метода как свойства функции

class Pear { };
Pear.staticMetod = function () {
   console.log(this === Pear);
};
/*
 Обычно статические методы используются для реализации функций, принадлежащих классу,
но не к каким-то конкретным его объектам.
 Например, есть объекты статей Article, и нужна функция для их сравнения.
Естественное решение – сделать для этого метод Article.compare
*/
class Article {
   constructor(title, date) {
      this.title = title;
      this.date = date;
   }
   static compare(article_A, article_B) {
      return article_A.date - article_B.date;
   }
};
let articles = [
   new Article("HTML", new Date(2019, 1, 1)),
   new Article("CSS", new Date(2019, 0, 1)),
   new Article("JavaScript", new Date(2019, 11, 1))
];

articles.sort(Article.compare);
console.log(articles[0].title); // CSS


//* Статические свойства (добавлены в язык относительно недавно)

class Archive {
   static publisher = 'Виталий Бианки';
};
console.log(Archive.publisher); // Такой-то Такой-то

// Это тоже самое, что и прямое присваивание (как и у методов)

Archive.publisher = "Самуил Маршак";
console.log(Archive.publisher); // Самуил Маршак

// Статические свойства и методы наследуются!
class Test extends Archive { };
console.log(Test.publisher);


warn('====== Приватные и защищённые методы и свойства ======');
/*
 В среде програмистов защищённые свойства и методы принято обозначать знаком "_" перед названием.
Типо того: 
   _name:
   _metod()...
*/
class CoffeeMachine {
   _waterLevel = 0;
   constructor(power) {
      this._power = power
   }
   set waterLevel(value) {
      if (value < 0) throw new Error('Недостаточно воды!');
      this.waterLevel = value;
   }
   get waterLevel() {
      return this._waterLevel;
   }
};

let coffeeMachine = new CoffeeMachine(100);
// coffeeMachine.waterLevel = -1; //! Вызовет сообщение об ошибке


/*
* Свойство только для чтения 
 Для того чтобы свойство после его создания нельзя было изменить
нужно создать только геттер. Сеттер не создавать.
*/
class Manager {
   constructor(presedent) {
      this._presedent = presedent;
   }
   get presedent() {
      return `Наш президент: ${this._presedent}`;
   }
};
// создаём президента
let newPresedent = new Manager('Putin');
console.log(newPresedent.presedent);
newPresedent.presedent = 'Petrov';
console.log(newPresedent.presedent); // Свойство защищено. Президент по-прежнему Путин 

//! Защищённые поля наследуются!! т.к. их "защищщённость" чисто формальна


/*
* Приватное свойство.   #...
 Это недавно добавленная в язык возможность. Нужен полифил.
*/
class BigCoffeeMachine {
   #waterLimit = 200;

   #checkWater(value) {
      if (value < 0) throw new Error('Воды недостаточно!');
      if (value > this.#waterLimit) throw new Error('Воды слишком много!');
   }
};
let bigCM = new BigCoffeeMachine();
// bigCM.#checkWater(); // Private field '#waterLimit' must be declared in an enclosing class
// bigCM.#waterLimit = 1000; // Private field '#waterLimit' must be declared in an enclosing class
/*
 "#" является спецсимволом, означающим привотность поля. К нему нет доступа извне или наследуемых классов! 
 Приватные поля не конфликтуют с обычными. Одновременно может быть два поля: и #name и name.
*/


warn('========== Расширение встроенных классов ===========');
// От встроенных классов, таких как Array, Map и других, тоже можно наследовать.

class PowerArray extends Array {
   isEmpty() {
      return this.length === 0;
   }
};
let arr = new PowerArray(1, 2, 4, 10, 16);
console.log(arr.isEmpty()); // false

let filteredArr = arr.filter(item => item >= 10);
console.log(filteredArr);
console.log(filteredArr.isEmpty()); // false
/*
 Встроенные методы, типо filter, map и т.д. возвращают новые объекты унаследованного класса PowerArray
при помощи объекта constructor.
*/
console.log(arr.constructor === PowerArray); // true
/*
 Поэтому при вызове метода arr.filter() он внутри создаёт массив результатов, именно используя arr.constructor,
а не обычный массив. Это позволяет продолжать использовать методы PowerArray далее на результатах.
 Это настраиваемо.
 Специальноый статический геттер Symbol.species может вернуть конструктор,
который JavaScript будет использовать в filter, map и других методах для создания новых объектов.
*/
// Сделаем, чтобы методы возвращщали обычные массивы.
class PowerArrayTwo extends Array {
   isEmpty() {
      return this.length === 0;
   }
   static get [Symbol.species]() {
      return Array;
   }
};
let arrTwo = new PowerArrayTwo(2, 3, 5, 13, 20);
console.log(arrTwo.isEmpty());
let filteredArrTwo = arrTwo.filter(item => item > 10);
// console.log(filteredArrTwo.isEmpty()); //! Вызовет ошибку
// Теперь .filter возвращает Array. Расширенная функциональность не будет передаваться далее.
/*
 Другие коллекции, такие как Map, Set, работают аналогично. Они также используют Symbol.species.

 Встроинные классы (Arrey, Object..) не наследуют статические методы типа  Object.keys, Array.isArray и т. д.
Array, и Date наследуют от Object, так что в их экземплярах доступны методы из Object.prototype.
Но Array.[[Prototype]] не ссылается на Object, поэтому нет методов Array.keys() или Date.keys().
*/


warn('============ Проверка класса: "instanceof" ============');
// obj instanceof Class == Class.prototype.isPrototypeOf(obj)
// Оператор вернёт true, если obj принадлежит классу Class или наследующему от него.

class Aaa { coonstructor() { } };
class Bbb extends Aaa { };
let bbb = new Bbb();
console.log(bbb instanceof Aaa); // true

// Работает и с функциями-конструкторами
function Rabbit12() { };
console.log(new Rabbit12() instanceof Rabbit12); // true

// …И для встроенных классов, таких как Array
let arr123 = [1, 2, 3];
console.log(arr123 instanceof Array); // true
console.log(arr123 instanceof Object); // true


// Symbol.hasInstance статический метод для ручной настройки instanceof
// Поверка instanceof будет полагать, что все объекты со свойством "eatMeat" - хищники "Predator".
class Predator {
   static [Symbol.hasInstance](objAnimal) {
      if (objAnimal.eatMeat) return true;
   }
};
let pig = { eatMeat: true };
console.log(pig instanceof Predator); // true


warn('============ Object.prototype.toString ============');
// Object.prototype.toString возвращает тип
let obj = {};
console.log(typeof obj); // [object]
console.log(obj.toString()); // [object Object]
/*
 toString можно использовать его как расширенную версию typeof и как альтернативу instanceof.
toString может быть позаимствован у объекта и вызван в контексте любого другого значения.
И результат зависит от типа этого значения.
 · Для числа это будет [object Number]
 · Для булева типа это будет [object Boolean]
 · Для null: [object Null]
 · Для undefined: [object Undefined]
 · Для массивов: [object Array]
…и т.д. 
*/
// скопируем метод toString в переменную для удобства
let objToString = Object.prototype.toString;
let array = [];
console.log(objToString.call(array)); // [object Array]

// Алгоритм метода toString анализирует контекст вызова this и возвращает соответствующий результат.
console.log(objToString.call(123)); // [object Number]
console.log(objToString.call(true)); // [object Boolean]
console.log(objToString.call(alert)); // [object Function]


//* Symbol.toStringTag.
// Поведение метода объектов toString можно настраивать, используя специальное свойство объекта Symbol.toStringTag.
let diman = {
   [Symbol.toStringTag]: "Diman"
};
console.log({}.toString.call(diman)); // [object Diman]
/*
 Можно использовать {}.toString.call вместо instanceof для встроенных объектов, когда мы хотим получить тип в виде строки,
а не просто сделать проверку.
*/
/*
            |   работает для	                                                   | возвращает
------------|------------------------------------------------------------------- |----------------------
typeof	   |   примитивов	                                                      | строка
{}.toString	|   примитивов, встроенных объектов, объектов с Symbol.toStringTag   | строка
instanceof	|   объектов	                                                      | true/false
*/


warn('===================== Примеси =====================');
/*
 Примесь – общий термин в объектно-ориентированном программировании: класс,
который содержит в себе методы для других классов.
 Примеси - это копирование методов через Object.essign из другого объекта.
*/
class IWhantToSay {
   constructor(name) {
      this.name = name;
   }
};
let mrX = {
   sayHi() {
      console.log(`Hi, ${this.name}!`);
   },
   sayBye() {
      console.log(`Goodbye, ${this.name}!`);
   }
};

Object.assign(IWhantToSay.prototype, mrX);
new IWhantToSay('Vasia').sayHi();

// Примеси могут наследовать друг друга.
let sayPhrase = {
   say(phrase) {
      console.log(phrase);
   }
};
let theWord = {
   __proto__: sayPhrase, // или через Object.create()
   sayHi() {
      super.say(`Hi, ${this.name}!`); // тоже через super
   }
};

class Humen {
   constructor(name) {
      this.name = name;
   }
};
Object.assign(Humen.prototype, theWord);
new Humen('Alesha').sayHi();


/*
* EventMixin
 Примесь, которая позволяет добавить управление событиями в любой класс без вмешательства в цепочку наследования.
*/



