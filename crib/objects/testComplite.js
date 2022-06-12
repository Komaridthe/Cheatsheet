
// Создать объект с тремя разными свойствами
let object = {
   name: "Nick",
   age: 23,
   sex: 'man',
}
console.log(object);
// Добавить ключ из нескольких слов путём вычисления с переменной
let like = "Like";
obj[like + "JS"] = true;
console.log(object);

// Создать и добавить символ id с описанием (именем) "id"
let id = Symbol('id');
object[id] = 132;
console.log(object);

// Создать глобальный символ и вывести его имя (не через discription)
let globId = Symbol.for('Hi');
console.log(Symbol.keyFor(globId));

// Добавить свойство со вложенностью
object.address = {
   city: "Sestroretsk",
   street: "Transportnaya",
}
console.log(object);
console.log(object?.address);

// Удалить третье свойство
delete object.sex;
console.log(object);

// Изменить первое свойство на undefined
object.name = undefined;
console.log(object);

// Скопировать объект в новую переменную "newObj" и добавить свойство "sex".
// Появится ли новое свойство в родительском объекте?
let newObj = object;
newObj.sex = 'man';
console.log(object);
console.log(newObj);

// Продублировать объект "newObj"
let myInfo = Object.assign({}, object);

// Добавить дублированному объекту значение во вложенности через Object.assign
Object.assign(myInfo, { address: { city: "Sestroretsk", street: "Transportnaya", ["House nomber"]: 5, } });
console.log(myInfo?.address);

// Проверить наличие свойства через in и опциональную цепочку
if ("address" in myInfo) console.log(myInfo.address);
console.log(myInfo?.address?.city)

// Используя цикл вывести в консоль ключи и значения
for (let key in myInfo) {
   console.log(key);
   console.log(myInfo[key]);
}

// Создать объект с функцией, собирающей объект в строку (использовать this)
let obFu = {
   name: "Vitia",
   age: 30,
   address: {
      city: "S-Pb",
      street: 'Mira',
      house: 5,
   },
   showInfo() {
      console.log(`${this.name}, ${this.age} лет, Адрес г.${this.address.city},${this.address.street},${this.address.house}`);
   },
};
obFu.showInfo()

// Создать функцию-конструктор и вызвать её несколько раз
function Information(name) {
   this.name = name;
   this.age = 40;
}

console.log(new Information('Вася'));
console.log(new Information('Петя'));


// Создать калькутятор через prompt
function Calculator() {

   this.read = function () {
      this.a = +prompt('a?', 0);
      this.b = +prompt('b?', 0);
   };

   this.sum = function () {
      return this.a + this.b;
   };

   this.mul = function () {
      return this.a * this.b;
   };
}

let calc = new Calculator();
calc.read();

alert("Сумма равна: " + calc.sum());
alert("Множество равно: " + calc.mul());


// Вывести в alert() поочерёдно модель и произвольно изменённый год авто
// в строковом и числовом значении соответственно.
// Переписать через "toPrimitive".
let car = {
   model: 'Volga',
   year: 1980,
   toString() {
      return this.model;
   },
   valueOf() {
      return this.year;
   },
};
alert(car);

let newYearCar = car + 20;
alert(newYearCar);

let carTwo = {
   model: 'Volga',
   year: 1980,
   [Symbol.toPrimitive](hint) {
      console.log(`hint: ${hint}`)
      return hint == 'string' ? this.model : this.year;
   }
}
console.log(carTwo);
console.log(+carTwo);
console.log(carTwo + 20);