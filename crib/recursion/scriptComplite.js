


// Посчитать сумму зарплат работников компании.
let company = {
   sales: [{ name: 'John', salary: 1000 }, { name: 'Alice', salary: 600 }],
   development: {
      sites: [{ name: 'Peter', salary: 2000 }, { name: 'Alex', salary: 1800 }],
      internals: [{ name: 'Jack', salary: 1300 }]
   }
};

function sumSalaries(department) {
   if (Array.isArray(department)) {
      return department.reduce((prev, item) => prev + item.salary, 0);
   } else {
      let summ = 0;
      for (const subLvl of Object.values(department)) {
         summ += sumSalaries(subLvl);
      }
      return summ;
   }
}
console.log(sumSalaries(company));

// Написать функцию приводящую в движение красный квадрат при нажатии кнопки "move" с помощью рекурсии.
let offset = 0;

let move = () => {
   offset = offset + 5;
   document.querySelector('.red').style.left = offset + 'px';
   if (offset > 500) {
      return true;
   }
   setTimeout(move, 100);
}
document.querySelector('button').onclick = move;


// Напишите функцию sumTo(n), которая вычисляет сумму чисел до данного (1 + 2 + ... + n.)
// Через цикл
function sumTo(n) {
   let sum = 0;
   for (let i = 0; i <= n; i++) {
      sum += i;
   }
   return sum;
}
console.log(sumTo(4));

// Через рекурсию
function sumToRecurse(n) {
   if (n == 1) {
      return 1;
   } else {
      return n + sumToRecurse(n - 1);
   }
}
console.log(sumToRecurse(4));

// Через  арифметическую прогрессию
function sumToProgress(n) {
   return n * (n + 1) / 2;
}
console.log(sumToProgress(4));


/*
 Вычислить факториал. Факториал натурального числа – это число, умноженное на "себя минус один",
затем на "себя минус два", и так далее до 1. Факториал n обозначается как n!
 Определение факториала можно записать как:
n! = n * (n - 1) * (n - 2) * ...*1
 Задача – написать функцию factorial(n), которая возвращает n!, используя рекурсию.
*/

let factorial = (n) => {
   return (n != 1) ? n * factorial(n - 1) : n;
};
console.log(factorial(3));
console.log(factorial(4));
console.log(factorial(5));


/*
 Последовательность чисел Фибоначчи определяется формулой Fn = Fn-1 + Fn-2.
То есть, следующее число получается как сумма двух предыдущих. Первые два числа равны 1, 
затем 2(1+1), затем 3(1+2), 5(2+3) и так далее: 1, 1, 2, 3, 5, 8, 13, 21....
 Написать функцию fib(n) которая возвращает n-е число Фибоначчи.
*/
/*
0 = 0 + 0 = 0
1 = 0 + 1 = 1
2 = 0 + 1 = 1
3 = 1 + 1 = 2
4 = 1 + 2 = 3
5 = 2 + 3 = 5
6 = 3 + 5 = 8
7 = 5 + 8 = 13
8 = 8 + 13 = 21
*/
console.log(new Date().getMilliseconds());
let fib = (n) => {
   if (n <= 1) {
      return n;
   } else {
      return fib(n - 1) + fib(n - 2);
   }
}
console.log(fib(7)); // очень ресурсоёмкий способ при больших значениях!!
console.log(new Date().getMilliseconds());

let fibTwo = (n) => {
   let a = 1,
      b = 1;
   for (let i = 3; i <= n; i++) {
      let c = a + b;
      /* теперь у нас есть fib(1), fib(2), fib(3)  
            a  b  c
            1, 1, 2
      */
      a = b; // переназначаем значеения
      b = c;
   }
   return b;
}
console.log(fibTwo(7));
console.log(new Date().getMilliseconds());



// Допустим, у нас есть односвязный список (как описано в главе Рекурсия и стек):
let list = {
   value: 1,
   next: {
      value: 2,
      next: {
         value: 3,
         next: {
            value: 4,
            next: null
         }
      }
   }
};
// Написать функцию printList(list), которая выводит элементы списка по одному.
// Сделайте два варианта решения: используя цикл и рекурсию.
let printList = (list) => {
   while (list) {
      console.log(list.value);
      list = list.next;
   }
}
printList(list);

let printListRec = (list) => {
   console.log(list.value);
   if (list.next) {
      printListRec(list.next);
   }
}
printListRec(list);

// Написать функцию printReverseList(list), которая выводит элементы списка по одному в обратном порядке.
let printReverseList = (list) => {
   let arr = [];
   while (list) {
      arr.push(list.value);
      list = list.next
   }
   for (let i = arr.length - 1; i >= 0; i--) {
      console.log(arr[i]);
   }
}
printReverseList(list);



//  Написать функцию-счётчик, которая может как увеличивать так и уменьшать значение.
// Использывать замыкания и функцию-конструктор
function Counter() {
   let count = 0;

   this.up = function () {
      return ++count;
   };
   this.down = function () {
      return --count;
   }
}
let x = new Counter();
console.log(x.up());
console.log(x.up());
console.log(x.up());
console.log(x.up());
console.log(x.down());
console.log(x.down());
console.log(x.down());
console.log(x.down());


/*
 Напишить функцию sum, которая работает таким образом: sum(a)(b) = a+b.
На пример:
 sum(1)(2) = 3
 sum(5)(-1) = 4
*/
function sum(a) {
   return function (b) {
      return a + b;
   }
}
console.log(sum(1)(2));
console.log(sum(5)(-1));


/*
 У нас есть встроенный метод arr.filter(f) для массивов. Он фильтрует все элементы с помощью функции f.
Если она возвращает true, то элемент добавится в возвращаемый массив.
Сделайте набор «готовых к употреблению» фильтров:

inBetween(a, b) – между a и b (включительно).
inArray([...]) – искомые значения находится в данном массиве.
*/
let arr = [1, 2, 3, 4, 5, 6, 7];

function inBetween(a, b) {
   return function (x) {
      return a <= x && b >= x;
   }
}
console.log(arr.filter(inBetween(3, 5)));

function inArray(arr) {
   return function (x) {
      return arr.includes(x);
   };
}
console.log(arr.filter(inArray([1, 2, 10])));


/*
 У нас есть массив объектов, который нужно отсортировать. Нужен скрипт для укороченной запися функции сортировки.
users.sort(byField('name'));
users.sort(byField('age'));
*/

let users = [
   { name: "John", age: 20, surname: "Johnson" },
   { name: "Pete", age: 18, surname: "Peterson" },
   { name: "Ann", age: 19, surname: "Hathaway" }
];

function byField(fieldName) {
   return (a, b) => a[fieldName] > b[fieldName] ? 1 : -1;
}
console.log(users.sort(byField('name')));



// Написать рекурсивную функцию-счётчик используя её свойство "count".
function makeCounter() {
   function counter() {
      return counter.count++;
   }
   counter.count = 0;
   return counter;
}

let counter = makeCounter();
counter();
counter();
counter();
counter();
counter();
console.log(counter());



// Функцию printNumbers(from, to) должна выводить число каждую секунду, начиная от from и заканчивая to.
// Сделать два варианта решения, через setInterval и setTimeout.
function printNumbers(from, to) {
   let timer = setInterval(function () {
      console.log(from);
      if (from == to) {
         clearInterval(timer);
      } from++;
   }, 100)
}
printNumbers(5, 10);

function printNumbersTwo(from, to) {
   setInterval(function tikTak() {
      if(from <= to){
         console.log(from++);
      } clearInterval(tikTak);
   })
}
printNumbersTwo(1, 10);

function printNumbersTimeout(from, to) {
   setTimeout(function tick() {
      if (from <= to) {
         console.log(from++);
         setTimeout(tick, 100);
      }
   })
}
printNumbersTimeout(1, 5);








let sayHello = function yo(who) {
   if (who) {
      console.log(`Hello, ${who}`);
   } else {
      yo('Guest');
   }
}


