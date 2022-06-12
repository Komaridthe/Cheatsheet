

// Создайте функцию unique(arr), которая вернёт массив уникальных, не повторяющихся значений массива arr.
let values = ["Hare", "Krishna", "Hare", "Krishna", "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

function unique(arr) {
   return Array.from(new Set(arr)); //  [...new Set(arr)]; более короткий вариант
}
console.log(unique(values));



// Напишите функцию aclean(arr), которая возвращает массив слов, очищенный от анаграмм.
let anagArr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

function anagClean(arr) {
   let map = new Map();
   for (let word of arr) {
      let sorted = word.toLowerCase().split('').sort().join('');
      map.set(sorted, word);
   }
   return Array.from(map.values());
}
console.log(anagClean(anagArr));

//  Решение через Set. Только при таком решении будут выводиться не стова а слова
// отсортированные по алфавиту
function aclean(arr) {
   let set = new Set();
   for (const word of arr) {
      let clean = word.toLowerCase().split('').sort().join('');
      set.add(clean);
   }
   return [...set];
}

// ТОже самое, через forEach
function aclean(arr) {
   let set = new Set();
   arr.forEach(word => {
      set.add(word.toLowerCase().split('').sort().join(''));
   });
   return [...set];
}


// Задачи на Object.keys, values, entries. 

// Напишите функцию sumSalaries(salaries), которая возвращает сумму всех зарплат
// с помощью метода Object.values. Решить разными способами.
let salaries = {
   "John": 100,
   "Pete": 300,
   "Mary": 250
};

// Способ первый (через reduse())
function sumSalaries(salaries) {
   return Object.values(salaries).reduce((prev, item) => prev + item, 0);
}
console.log(sumSalaries(salaries));

// Способ второй (через цикл for..of)
function sumSalaries(salaries) {
   let result = 0;

   for (let value of Object.values(salaries)) {
      result += value;
   }
   return result;
}
console.log(sumSalaries(salaries));

// Напишите фенкцию, считающую сумму покупок. Решить разными способами.
let recipeMap = new Map([
   ['Помидор', 500],
   ['Огурец', 350],
   ['Лук', 50]
]);

function summReduce(arr) {
   return [...arr.values()].reduce((a, b) => a + b, 0);
   // return Object.values(Object.fromEntries(arr)).reduce((a, b) => a + b, 0);
}
console.log(summReduce(recipeMap));


function summForOf(arr) {
   let result = 0;
   for (const key of recipeMap.values()) {
      result += key;
   }
   return result;
}
console.log(summForOf(recipeMap));



// Напишите функцию count(obj), которая возвращает количество свойств объекта:
let user = {
   name: 'John',
   age: 30
};

function count(obj) {
   return Object.keys(obj).length;// entries/keys/values нет разницы
}
console.log(count(user));


/*
 У нас есть объект user из задачи выше. Напишите деструктурирующее присваивание, которое:
 1) свойство name присвоит в переменную name.
 2) свойство years присвоит в переменную age.
 3) свойство isAdmin присвоит в переменную isAdmin (false, если нет такого свойства)
*/
({ name, years: age, isAdmin = false } = user);
console.log(name);
console.log(age);
console.log(isAdmin);



/*
 У нас есть объект salaries с зарплатами. Создайте функцию topSalary(salaries),
которая возвращает имя самого высокооплачиваемого сотрудника.
Если объект salaries пустой, то нужно вернуть null.
*/
function topSalary(salaries) {
   let maxName = null;
   let maxSalary = 0;
   for (let [name, salary] of Object.entries(salaries)) {
      if (maxSalary < salary) {
         maxSalary = salary;
         maxName = name;
      }
   }
   return maxName;
}
console.log(topSalary(salaries));

// Через sort()
function topSalary(salaries) {
   return Object.entries(salaries).sort((a, b) => b[1] - a[1])[0]?.[0] || null;
}
console.log(topSalary(salaries));
















