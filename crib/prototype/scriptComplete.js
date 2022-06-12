/*
 Создать объект 
 · со свойствами: name, surName
 · геттор fullName возвращает полное имя
 · сеттор позволяет его заменить наследующим объектом
*/
let actor = {
   name: 'Oleg',
   surName: 'Baseloshvili',
   get fullName() {
      return `Имя актёра: ${this.name} ${this.surName}`;
   },
   set fullName(value) {
      [this.name, this.surName] = value.split(' ');
   }
}

let bond = {
   __proto__: actor
}
bond.fullName = 'James Bond';
console.log(bond.fullName);


/*
 Написать функции Auto прототипный метод drive, который при вызове будет уменьшать количество
топлива в баке на 20. При пустом баке в консоль должно выводиться сообщение об этом.
 Создать два объекта-машинки. Вторая должна наследовать свойства от первой. 
*/
function Auto(model, price, gas) {
   this.model = model;
   this.price = price;
   this.gas = gas;
};
Auto.prototype.drive = function () {
   if (this.gas > 0) {
      this.gas = this.gas - 20;
      console.log(this.gas);
      return this.gas;
   } else {
      console.log(`Бензин закончился!`);
   }
   switch (this.gas) {
      case 20:
         console.log(`Бензин на исходе!`);
         break;
   }
};

let reno = new Auto('Reno', '10,000', 100);
let pegout = new reno.constructor('Pegout', '30,000', 120);
pegout.drive();
pegout.drive();
pegout.drive();
pegout.drive();
pegout.drive();
pegout.drive();
pegout.drive();
console.log(pegout);




/*
 Создать для встроенного класса String прототипное свойство reopeat, которое будет повторять
строку n-ое количество раз. 'string'.repeat(n)
*/
if (!String.prototype.repeat) {
   String.prototype.repeat = function (n) {
      return new Array(n + 1).join(this);
   }
}
console.log('La'.repeat(3));


// Добавьте всем функциям в прототип метод defer(ms), который вызывает функции через ms миллисекунд.
function f(a, b) {
   console.log(a + b);
}

Function.prototype.defer = function (ms) {
   let f = this;
   return function (...args) {
      return setTimeout(() => f.call(this, ...args), ms);
   }
};
f.defer(1000)(1, 2);


/*
 Имеется объект dictionary, созданный с помощью Object.create(null) для хранения любых пар ключ/значение.
Нужно добавить ему метод dictionary.toString(), который должен возвращать список ключей, разделённых запятой.
toString не должен выводиться при итерации объекта через for..in.
*/
let dictionary = Object.create(null, {
   toString: {
      value() {
         return Object.keys(this).join(',');
      }
   }
});
dictionary.apple = "Apple";
dictionary.__proto__ = "test";
console.log(dictionary.toString());

for (const keys in dictionary) {
   if (Object.hasOwnProperty.call(dictionary, keys)) {
      console.log(`Own propertyes: ${keys}`);
   } else {
      console.log(`Other propertyes: ${keys}`);
   }
};








