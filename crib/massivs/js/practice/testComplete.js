
let arr = ['Привет, ', 'мир', '!'];
// Вывести в консоль фразу 'Привет, мир!'
console.log(arr.join(''));

// Вывести в консоль фразу 'Привет, мир!', заменив слово "Привет" на "Пока"
arr[0] = 'Пока, ';
console.log(arr.join(''));


let obj = { 'Толя': '1000', 'Вася': '500', 'Петя': '200' };
// Вывесли в консоль зарплату Толи
console.log(`${obj['Толя']} $`);


let matrix = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9, 10],
];
// Вывести цифру 10
console.log(matrix[2][3]);

// Заменить цифру 10 на Х
console.log(matrix[2][3] = 'X');
console.log(matrix[2]);


let arrTwo = ['Ваня', 'Петя', 'Оля', 'Шура',];
/*
 1) Удалить Ваню
 2) На первое место вписать Диму
 3) Удалить Шуру тремя способами
 4) Добавить в конец Иру
 5) Удалить Петю и возвращаем его в переменную "petia"
 6) Добавляем Машу на место Пети
 7) Создать новый массив, скопировав в него последние три элемента
 8) Создать новый массив, добавив в него три произвольных элемента
*/
arrTwo.shift();
console.log(arrTwo);

arrTwo.unshift('Дима');
console.log(arrTwo);

arrTwo.pop();
// arrTwo.length = 3;
// arrTwo.splice(3);
console.log(arrTwo);

arrTwo.push('Ира');
console.log(arrTwo);

let petia = arrTwo.splice(1, 1);
console.log(arrTwo);
console.log(petia);

arrTwo.splice(1, 0, 'Маша');
console.log(arrTwo);

let sliceArr = arrTwo.slice(-3);
console.log(sliceArr);

let conArr = sliceArr.concat('Дима', 'Макс', 'Кеша',);
console.log(conArr);


// В получившимся массиве:
/*
 1) Вернуть индекс Маши
 2) Узнать находится ли Вася третьей в списке (true/false)
*/
console.log(conArr.indexOf('Маша'));
console.log(conArr.includes('Вася', 2));


let attSearch = [
   { name: 'Ваня', age: 35 },
   { name: 'Петя', age: 18 },
   { name: 'Шура', age: 20 },
   { name: 'Оля', age: 17 },
];
/*
 1) Найти человека 18летнего возраста
 2) Найти всех совершеннолетних
 3) Вычислить средний возраст
*/
console.log(attSearch.find(item => item.age === 18));

console.log(maattSearch.filter(item => item.age >= 18));

console.log(arrCard.reduce((a, b) => a + b.age, 0) / arrCard.length);

/* По шагам
function getAveregeAge() {
   let age = attSearch.map(item => item.age);
   console.log(age); получили года в отдельный массив

   let avAge = age.reduce((prev, item) => {
      return item + prev;
   }, 0); сложили элементы массива

   averedAge = avAge / age.length; поделили сумму элементов на их количество
   console.log(averedAge);
}
getAveregeAge()
*/

let arrNames = ['Ваня', 'Петя', 'Оля', 'Шура',];
let arrNumbers = [3, 5, 23, 1, 15, 8, 11];
/*
 Отсортировать массивы:
  1) В алфавитном порядке (для имён)
  2) По возрастанию (для цифор)
  3) В обратном порядке
*/
console.log(arrNames.reverse());
console.log(arrNames.sort());
console.log(arrNumbers.sort((a, b) => (a - b)));
console.log(arrNames.reverse());
console.log(arrNumbers.sort((a, b) => (b - a)));


let arrTree = ['Женя', 'Оля', 'Петя', 'Антон',];
// Возвратить первую букву каждого элемента массива и
// преобразовать полученный в строку без разделителя
console.log(arrTree.map(item => item[0]).join(''));


let fruit = ["Банан", "Кокос", "Мандарин"];
//  Вывести в консоль порядковый номер и соответствующее название фрукта.
fruit.forEach((item, i) => {
   console.log(i + ': ' + item);
});
// for (let key in fruit) {
//    console.log(key + ': ' + fruit[key])
// }
// но это метод перебора объектов, и для массивов он не желателен

let arrSumm = [1, 2, 3, 4];
// Вычислить сцумму элементов разными методами перебора

// reduce
let arrSummRed = arrSumm.reduce((previousValue, item) => {
   return previousValue + item;
}, 0);
// let result = arrSum.reduce((prev, item) => prev + item) супер короткая запись
console.log(arrSummRed)

// forEach
let sum = 0;
arrSumm.forEach((item) => {
   sum += item;
});
console.log(sum);

// for
let sumFor = 0;
for (let i = 0; i < arrSumm.length; i++) {
   sumFor += arrSumm[i];
}
console.log(sumFor);

// for..of
let sumForOf = 0;
for (let i of arrSumm) {
   sumForOf += i;
}
console.log(sumForOf);


/*
Написать функцию sumInput(), которая:
 1) Просит пользователя ввести значения, используя prompt и сохраняет их в массив.
 2) Заканчивает запрашивать значения, когда пользователь введёт не числовое значение,
  пустую строку или нажмёт «Отмена».
 3) Подсчитывает и возвращает сумму элементов массива.
P.S. Ноль 0 – считается числом, не останавливайте ввод значений при вводе «0».
*/
function sumInput() {
   let numbers = [];

   while (true) {
      let value = prompt('Введите число', 0);
      if (value == '' || value == null || !isFinite(value)) break;

      numbers.push(+value);
   }

   let summ = numbers.reduce((prev, item) => {
      return prev + item;
   }, 0);
   alert(summ);
   // alert(arr.reduce((a, b) => a + b, 0));  // укороченный вариант сложения
}
sumInput();


/*
 На входе массив произвольных чисел любого количества.(отрицательные и положительные)
Задача найти наибольшую сумму чисел этих массивов.
Если все элементы массива будут с отрицательным значением - делаем это значение равным нулю.
*/

function getMaxSubSum(arr) {
   let maxSum = 0;
   let partSum = 0;

   for (let item of arr) { // для каждого эл массива
      partSum += item;    // складываем все варианты
      maxSum = Math.max(maxSum, partSum);  // ищем максимум
      if (partSum < 0) partSum = 0;   // делаем ноль, если значение отрицательное
   }
   return maxSum;
}

console.log(getMaxSubSum([-1, 2, 3, -9]));
console.log(getMaxSubSum([-1, 2, 3, -9, 11]));
console.log(getMaxSubSum([-2, -1, 1, 2]));
console.log(getMaxSubSum([100, -9, 2, -3, 5]));
console.log(getMaxSubSum([1, 2, 3]));
console.log(getMaxSubSum([-1, -2, -3]));


// Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
function camelize(str) {
   return str.split('-').map((item, index) => index == 0 ? item : item[0].toUpperCase() + item.slice(1)).join('');
}
console.log(camelize("background-color"));
console.log(camelize("list-style-image"));
console.log(camelize("-webkit-transition"));



/*
   Напишите функцию filterRange(arr, a, b), которая принимает массив arr, ищет в нём элементы между a и b
 и отдаёт массив этих элементов. Функция должна возвращать новый массив и не изменять исходный.
 let arr2 = [5, 3, 8, 1, 2, 6];
*/
let arr2 = [5, 3, 8, 1, 2, 9];

function filterRange(arr, a, b) {
   return arr.filter(item => (a <= item && item <= b));
}
let filtered = filterRange(arr2, 1, 4);

console.log(arr2);
console.log(filtered);


/*
   Напишите функцию filterRangeInPlace(arr, a, b), которая принимает массив arr и удаляет из него все значения
 кроме тех, которые находятся между a и b. То есть.
  Функция должна изменять принимаемый массив и ничего не возвращать.
 Взять для задачи массив "arr2".
*/

function filterRangeInPlace(arr, a, b) {
   for (let i = 0; i < arr.length; i++) {
      let el = arr[i];

      if (el < a || el > b) {
         arr.splice(i, 1);
      }
   }
   // for (let i of arr) {
   //    if (i > a || i < b) arr.splice(i, 1);
   // } решение через for..of
}
filterRangeInPlace(arr2, 1, 4);
console.log(arr2);


/*
   У нас есть массив строк arr. Нужно получить отсортированную копию, но оставить arr неизменённым.
Создайте функцию copySorted(arr), которая будет возвращать такую копию.
*/
let arr3 = ["HTML", "JavaScript", "CSS"];
function copySorted(arr) {
   return arr.slice().sort();
}
let sorted = copySorted(arr3);
console.log(sorted);
console.log(arr3);


/*
   Имеется массив объектов user, и в каждом из них есть user.name.
 Напишите код, который преобразует их в массив имён.
*/
let vasya = { name: "Вася", surname: "Пупкин", id: 1, age: 25 };
let petya = { name: "Петя", surname: "Иванов", id: 2, age: 30 };
let masha = { name: "Маша", surname: "Петрова", id: 3, age: 28 };

let users = [vasya, petya, masha];
let names = users.map(item => item.name)
console.log(names);

/*
  У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.
Напишите код, который создаст ещё один массив объектов с параметрами id и fullName,
где fullName – состоит из name и surname.

usersMapped = [
  { fullName: "Вася Пупкин", id: 1 },
  { fullName: "Петя Иванов", id: 2 },
  { fullName: "Маша Петрова", id: 3 }
]
*/
let usersMapped = users.map(item => ({
   fullName: `${item.name} ${item.surname}`,
   id: item.id
}));
console.log(usersMapped[0]);
console.log(usersMapped);


//  Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age
// и сортирует их по нему.
function sortByAge(arr) {
   return arr.sort((a, b) => a.age > b.age ? 1 : -1);
}

console.log(sortByAge(users));
console.log(users[0].name);
console.log(users[1].name);
console.log(users[2].name);



// Напишите функцию shuffle(arr), которая перемешивает (переупорядочивает случайным образом) элементы массива.
let arr4 = [1, 2, 3];

function shuffle(arr) {
   return arr.sort(() => Math.random() - 0.5);
}
console.log(shuffle(arr4));



// Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.
let strings = ["кришна", "кришна", "харе", "харе", "харе", "харе", "кришна", "кришна", ":-O"];
function unique(arr) {
   let result = [];

   for (let str of arr) {
      if (!result.includes(str)) result.push(str);
   }
   return result;
   // return [...new Set(arr)]; - быстрое решение :)
}


console.log(unique(strings));