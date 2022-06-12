
/*
 · Написать класс Cars с методами заправки и расхода топлива у машин.
 · Выводить дату заправки в отдельном массиве.
 · Сеттор должен возвращать реитинг авто в верхнем регистре.
 · Добавить классу статическое свойство saller = 'NevaCars';
 · Добавить унаследованный класс для гибридного авто со статическим методом "discount".
 · Переписать метод расхода топлива, сделав расход топлива меньшим.
*/
class Cars {
   saller = 'NevaCars';
   constructor(options) {
      this.brand = options.brand;
      this.model = options.model;
      this.gas = 100;
      this.refueling = [];
   }
   drive() {
      this.gas -= 10;
      return this.gas;
   }
   getGas() {
      this.gas += 10;
      let date = Date.now();
      let time = new Date(date);
      this.refueling.push(time.toString());
      return this.gas;
   }
   get rating() {
      return `Авто ${this.brand} ${this.model} имеет рейтинг: \"${this.score}\".`
   }
   set rating(value) {
      this.score = value.toUpperCase();
   }
};

let honda = new Cars({ brand: 'Honda', model: 'Civic' });
honda.drive();
honda.drive();
honda.getGas();
honda.rating;
honda.rating = 'Five';
console.log(honda);


class HybridCar extends Cars {
   constructor(options) {
      super(options);
   }
   static discount() {
      console.log('На авто с гибридным двигателем скидка 10%!');
   }
   autoParking() {
      console.log('Автопрковка!');
   }
   drive() {
      this.gas -= 5;
      return this.gas;
   }
};

let toyota = new HybridCar({ brand: 'Toyota', model: 'Prius' });
toyota.autoParking();
toyota.drive();
console.log(toyota);

/*
 На реальном примере показать работу с классами.
 · класс Component должем иметь методы для скрытия и появления объекта
 · его дочерний класс Box определяет размер и цвет фигур
 · у класса Box наследует класс Cercle, который делает фигуры круглыми
 · создать три объекта имеющими свойства для определения своего размера и цвета,
 плюс добавить свойство selector для обращения к ним
*/

class Component {
   constructor(selector) {
      this.$el = document.querySelector(selector);
   }
   hide() {
      this.$el.style.display = 'none';
   }
   show() {
      this.$el.style.display = 'block';
   }
};

class Box extends Component {
   constructor(options) {
      super(options.selector);

      this.$el.style.width = this.$el.style.height = options.size + 'px';
      this.$el.style.background = options.color;
   }
};

let box1 = new Box({
   selector: '#box1',
   size: 100,
   color: 'red',
});

let box2 = new Box({
   selector: '#box2',
   size: 120,
   color: 'blue',
});

class Cercle extends Box {
   constructor(options) {
      super(options);
      this.$el.style.borderRadius = '50%';
   }
}

let cercle = new Cercle({
   selector: '#cercle',
   size: 90,
   color: 'green'
})


/*
 Создать класс с расширением свойств встроенного класса Array.
 · метод должен проверять пустой массив или нет
 · метод не должен распростроняться на дальнейшие результаты преобразований массива
*/
class PowerArray extends Array {
   isEmpty() {
      return this.length === 0;
   }
   static get [Symbol.species]() {
      return Array;
   }
};
let arr = new PowerArray(1, 2, 4, 6, 12, 34);
let arrTwo = new PowerArray();
console.log(arr.isEmpty());
console.log(arrTwo.isEmpty());
let filtereddArr = arr.filter(i => i >= 10);
console.log(filtereddArr);
// console.log(filtereddArr.isEmpty());


// Сделать проверку, наследует ли объект cercle от класса Component.
console.log(cercle instanceof Component);


/*
 · Написать код, позволяющий пройти проверку на наследственность к определённому классу объектам
со свойством xxx.
 · Дописать объекту символьное свойство, возвращающее тип объекта "Rock". Вывести тип в консоль.
*/
class Test {
   static [Symbol.hasInstance](item) {
      if (item.xxx) return true;
   }
};
let aaa = {
   xxx: 'xxx',
   [Symbol.toStringTag]: 'Rock'
};
console.log(aaa instanceof Test);
console.log({}.toString.call(aaa));



// Написать миксин


















