let { warn } = console;

warn("======== Основы ========");
//* Создание массива
let arr = new Array(); // Используется редко
let arrX = [];

//* Значения массива
let arrOne = [
   'Ваня',
   'Петя',
   'Шура', // Висячая запятая
];
// Или
let arrOneX = ['Ваня', 'Петя', 'Шура',];

//* Разные типы значений
let arrTwo = [
   'Коля',
   {
      age: 30,
      type: 'JS'
   },
   true,
   function () {
      console.log('Куку');
   }
];

//* Многомерные массивы
let matrix = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9],
];


//* Получение значений
let receipt = [
   'Ваня', // 0ая позиция
   'Петя', // 1ая позиция
   'Шура', // 2ая позиция
];
console.log(receipt[0]);
console.log(receipt[5]); // undefined

let receiptOne = [
   'Коля',
   {
      age: 30,
      type: 'JS'
   },
   true,
   function () {
      console.log('Выполнение функции в массиве');
   }
];

console.log(receiptOne);
console.log(receiptOne[0]);
console.log(receiptOne[1].age);
console.log(receiptOne[2]);
receiptOne[3](); // Вызовет функцию

//* Многомерные массивы
let matrixOne = [
   [1, 2, 3],
   [4, 5, 6],
   [7, 8, 9, 10],
];
console.log(matrixOne);
console.log(matrixOne[0]);
console.log(matrixOne[0][1]);


//* Длина массива
let lengthOfMassiv = ['Ваня', 'Петя', 'Шура',];
console.log(lengthOfMassiv);
console.log(lengthOfMassiv.length);  // length - в переводе длина


/*
* Доступ к массиву
! Массив является объектоми, следовательно, ведёт себя как объект.
Например копируется по ссылке:
*/
let arrOld = ['Ваня', 'Петя', 'Шура',];
console.log(arrOld);

let arrNew = arrOld;

arrNew.length = 2;
console.log(arrOld);


//* Изменение значений
let ar = ['Ваня', 'Петя', 'Шура',];

// Меняем существующее
ar[0] = 'Коля';
console.log(ar);

// Добавляем новое
ar[3] = 'Вася';
console.log(ar);



warn("======== Методы массивов ========");
/*
* Варианты применения массивов
 I. Упорядоченная коллекция элементов (очередь)
 · Добавление элемента в начало очереди
 · Удаление элемента вначале, сдвигая очередь,
 т.к. второй элемент становится первым.

 II. Структура данных (стек)
 · Добавление элемента в конец
 · Удаление последнего элемента

 Массивы в JaveScript могут работать и как, очередь и как стек.
Можно добавлять/удалять элементы как в начало, так и вконец массива.
*/

//* Метод push() - добавляет элемент в конец массива
let arrAddAnd = ['Ваня', 'Петя', 'Шура',];

arrAddAnd.push('Катя');
console.log(arrAddAnd);

arrAddAnd.push('Дима', 'Оля');
console.log(arrAddAnd);

//* Метод shift() - удаляет первый элемент в начале, так что второй элемент становится первым.
let arrDelFirst = ['Ваня', 'Петя', 'Шура',];

arrDelFirst.shift();
console.log(arrDelFirst);

//* Метод pop() - удаляет последний элемент в массиве
let arrDelLast = ['Ваня', 'Петя', 'Шура',];

arrDelLast.pop();
console.log(arrDelLast);

//* Метод unshift() - добавляет элемент в начало массива
let arrAddFirst = ['Ваня', 'Петя', 'Шура',];

arrAddFirst.unshift('Оксана', 'Микола');
console.log(arrAddFirst);

/*
! Методы push() и pop() выполняются быстро, а shift() и unshift() - медленно.

 Это происходит из-за большего числа выпонляемых методами действий.
Операции shift() и unshift() должны выполнить по 3 действия:
 1) Добавить/удалить в начале элемент
 2) Сдвинуть остальные элементы попутно по-новой их пронумеровав
 3) Обновить свойство lenght

 Чем большее элементов содержит массив, тем больше временя потребуется
на выполнение всех операций.

 Соответственно добавление/удаление элемента из конца массива
не потребует перемещения остальный элементов и их перенумерования.
Достаточно будет поменять значение lenght.
*/


//* Удаление/добавление/изменение конкретных элементов
let arrDel = ['Ваня', 'Петя', 'Шура',];

delete arrDel[1];
console.log(arrDel); // Элемент удалён, но место его сохранено
console.log(arrDel[1]);
console.log(arrDel.length);


//* Метод splise(). Позволяет добавлять, удалять и узменять элементы.
// Синтаксис arr.splice(index[, deleteCount, slsm1, ..., elemN])

// Удаляем элемент
let arrDelOne = ['Ваня', 'Петя', 'Шура',];

arrDelOne.splice(1, 1); // Первое значение это номер элемента, второе кол-во удаляемых элементов 
console.log(arrDelOne);

// Удаляем через отрицательное значение
let arrDelNeg = ['Ваня', 'Петя', 'Шура',];

arrDelNeg.splice(-1, 1);
console.log(arrDelNeg);

// Удаляем элемент и возвращаем его в переменную
let arrDelTwo = ['Ваня', 'Петя', 'Шура',];

let arrDelTwoNew = arrDelTwo.splice(1, 1);
console.log(arrDelTwoNew);

// Заменяем элементы
let arrChange = ['Ваня', 'Петя', 'Шура',];

arrChange.splice(2, 1, 'Катя');
console.log(arrChange);

// Добавляем элемент/ы
let arrAddNew = ['Ваня', 'Петя', 'Шура',];

arrAddNew.splice(1, 0, 'Катя', 'Маша'); // 0 означает, добавление элемента
console.log(arrAddNew);


//* Метод slice() - Создаёт новый массив, в котором копирует часть либо весь массив
// Синтаксис arr.slice([start], [end]) Не включая [end].

// Копирует часть массива
let arrCopy = ['Ваня', 'Петя', 'Шура',];
// Начинает с 1ой позиции('Петя') и до 2ой('Шура') не включая её
let arrCopyNew = arrCopy.slice(1, 2);
console.log(arrCopyNew);

// Копируем предпоследнюю
let arrDelNotEnd = arrCopy.slice(-2, -1);
console.log(arrDelNotEnd);

// Копируем последнюю (второе значение не нужно)
let arrCopyEnd = arrCopy.slice(-1);
console.log(arrCopyEnd);

// Копируем ввесь массив
let arrCopyAll = arrCopy.slice();
console.log(arrCopyAll);

/*
*  Метод concat() - Создаёт новый массив, в который копирует данные из других массивов
* и дополнительные значения (в конец массива)
 Синтаксис arr.concat(arg1, arg2, ...)
*/
let arrCon = ['Ваня', 'Петя', 'Шура',];
let arrConTwo = arrCon.concat('Гриша');
console.log(arrConTwo);
/*
 Метод может добавлять в массив не только элементы, а целые массмвы и даже объекты.
Правда объект будет обрабатываться как массив только если он имеет
специальное свойство ([Symbol.isConcatSpreadable]: true.)
В противном случае объект добавится в массив "как он есть" ([object Object]).
*/


warn("======== Поиск в массиве ========");
/*
* Методы indexOf/lastIndexOf и includes
 · arr.indexOf(item, from) ищет item, начиная с индекса from,
и возвращает индекс, на котором был найден искомый элемент, 
в противном случае получаем -1.
 · arr.lastIndexOf(item, from) тоже самое, тодлько поиск начнётся справа налево.
 · arr.includes(item, from) ищет item с индекса from и возвращает true,
если поиск успешен.
*/
let arrSearch = ['Ваня', 'Петя', 'Шура',];

// indexOf()
console.log(arrSearch.indexOf('Петя'));
console.log(arrSearch.indexOf('Коля'));
console.log(arrSearch.lastIndexOf('Петя', 2));

// includes()
console.log(arrSearch.includes('Ваня'));
console.log(arrSearch.includes('Шура'));
console.log(arrSearch.includes('Петя', 2));

/*
* find() и findIndex() - Поиск в массиве объектов с определённым условием

let result = arr.find(function(item, index, array) {
 · если true - возвращается текущий элемент и перебор прерывается
 · если все итерации оказались ложными, возвращается undefined
});
*/
let attFind = [
   { name: 'Ваня', age: 35 },
   { name: 'Петя', age: 18 },
   { name: 'Шура', age: 'Не скажу' },
];

// let resultAtt = attFind.find(function (item, index, array) {
//    return item.age === 18;
// });

let resultAtt = attFind.find(item => item.age === 18);
console.log(resultAtt);

// findIndex() делает тоже самое только возвращает не элемент а его индекс (ключ)
let resultIndAtt = attFind.findIndex(item => item.age === 18);
console.log(resultIndAtt);

/*
* filter() - Метод ищет все элементы удовлетворяющие условию не останавливаясь на первом как метод find

let results = arr.filter(function(item, index, array) {
 · если true - элемент добовляется к результату и перебор продолжается
 · если ничего не найдено - возвращается пустой массив
});
*/
let attFilter = [
   { name: 'Ваня', age: 35 },
   { name: 'Петя', age: 18 },
   { name: 'Шура', age: 'Не скажу' },
];

// let resultFiltAtt = attFilter.filter(function(item, index, array){
//    return item.age >= 18;
// });

let resultFiltAtt = attFilter.filter(item => item.age >= 18);
console.log(resultFiltAtt);


//* some() - Метод проверяет, удовлетворяет ли ХОТЯБЫ ОДИН элемент массива условию, заданному в передаваемой функции.
let arrOfNumbers = [1, 2, 3, 4];

let even = (element) => element % 2 === 0; // это условие (элемент массива должен делиться на 2 без остатка)
console.log(arrOfNumbers.some(even)); // если хоть один элемент удовлетворяет условию проверка выдаст true


//* every() - Метод проверяет, удовлетворяют ли ВСЕ элементы массива условию, заданному в передаваемой функции.
function isBigEnough(element, index, array) {
   return element >= 10;
}
console.log([12, 5, 8, 130, 44].every(isBigEnough)); // fulse
console.log([12, 54, 18, 130, 44].every(isBigEnough)); // true

// Стрелочная функция приводит более краткий синтаксис
console.log([12, 5, 8, 130, 44].every(elem => elem >= 10)); // fulse
console.log([12, 5, 8, 130, 44].some(elem => elem >= 10)); // true



warn("======== Сортировка массива ========");
//* sort(fn) - метод сортирует массив на месте меняя в нём порядок элементов.
// Сортировка слов (по алфавиту)
let arrSort = ['Петя', 'Ваня', 'Шура',];
console.log(arrSort.sort());

// Сортировка чисел
let arrSortNum = [8, 22, 1];
console.log(arrSortNum.sort()); // получаем [1, 22, 8]

//  По умолчанию элементы сортируются как строки. А для строк
// применяется лексикографический порядок, по которому выходит, что "8" > "22".
console.log("8" > "22");

// Чтобы решить эту задачу необходимо вписать доп функцию в функцию sort
let arrSortNumTwo = [8, 22, 1];
console.log(arrSortNumTwo.sort());

/*
* Функция сортировки
function compeareNumeric(a, b) {
   console.log(`Сравниваем ${a} и ${b}`);
   if (a > b) return 1;
   if (a == b) return 0;
   if (a < b) return -1;

!   либо просто return a - b;
};
console.log(arrSortNumTwo.sort(compeareNumeric))

Можно всё сильно упростить записью стрелочной функции
*/
console.log(arrSortNumTwo.sort((a, b) => (a - b)));

//* reverse() - Метод меняет порядок элементов в массиве на обратный
let arrRev = ['Петя', 'Ваня', 'Шура',]; //! Не обратный алфавитному, а обратный фактическому
console.log(arrRev.reverse());



warn("======== Преобразование массивов ========");
//* map() - Метод вызывает функцию для каждого элемента массива и возвращает массив результатов выполнения этой функции.
let arrPre = ['Петя', 'Ваня', 'Шура',];

// let resPre = arrPre.map(function(item, index, array){
//    return item[0]; // Возвращаем первую букву каждого элемента массива
// });

let resPre = arrPre.map(item => item[0]);

console.log(arrPre);
console.log(resPre);

/*
* split и join
 Метод split преобразует строку в массив по заданному разделителю.
Синтаксис: str.split(delim)
*/
let string = `Ваня,Маша,Оля`;

let resString = string.split(',');
console.log(resString);

//! Можно ограничить кол-во объектов которые попадут в массив
let resStringTwo = string.split(',', 2);
console.log(resStringTwo);
/*
 Метод join работает наоборот. Он преобразует массив в строку с заданным разделителем.
Синтаксис arr.join(glue)
*/
let arrJoy = ['Петя', 'Ваня', 'Шура',];
let resJoy = arrJoy.join(';');
console.log(resJoy);


//* Получение строки из массива
//! Различие от join только в том, что мы не можем указать нужный нам разделитель. Он в данном приёме всегда будет ','.
console.log(String(arrJoy));



warn("======== роверка Array.isArray ========");
//! Массивы не образуют отдельный тип данных. Они основаны на объектах.
let obj = {};
let mas = [];

console.log(typeof obj);
console.log(typeof mas);

if (Array.isArray(mas)) {
   console.log(`Это массив!`);
} else {
   console.log(`Это не массив!`);
};

if (Array.isArray(obj)) {
   console.log(`Это массив!`);
} else {
   console.log(`Это не массив!`);
};


warn("======== Перебор элементов ========");
let arrFor = ['Петя', 'Ваня', 'Шура',];
console.log(arrFor.length);

//* Цикл FOR
for (let i = 0; i < arrFor.length; i++) {
   console.log(arrFor[i]);
}

//* Цикл FOR...OF
// Можно использовать для вывода значений
let arrForOf = ['Петя', 'Ваня', 'Шура',];

for (let itemForOf of arrForOf) {
   console.log(itemForOf);
}

/*
* Метод перебора forEach выполняет функцию для каждого элемента массива
 arr.forEach(function(item, index, array) {
   ... делать что-то с item
 });
*/

let arrFech = ['Петя', 'Ваня', 'Шура',];

// arrFech.forEach(function(item, index, array) {
//    console.log(`${item} находится на ${index} позиции в ${array}`)
//  });

arrFech.forEach((item, index, array) => {
   console.log(`${item} находится на ${index} позиции в ${array}`);
});


let arrFechTwo = ['Петя', 'Ваня', 'Шура',];

arrFechTwo.forEach(show);

function show(item) {
   console.log(item);
}

/*
* Методы reduce/reduceRight
 Эти методы немного сложнее описаных ранее. Они используются
для вычисления какого-нибудь единого значения на основе всего массива

 Синтаксис:
let value = arr.reduce(function(previousValue, item, index, array) {
   ....
}, [initial]);

 · previousValue - результат предыдущего вызова этой функции,
 · равен initial при первом вызове (если передан initial),
 · item - очередной элемент массива,
 · index - его тндекс,
 · array - сам массив.

 Функция применяется по очереди ко всем элементам массива и переносит свой результат на следующимй вызов.
*/
let arrRed = [1, 2, 3, 4];
let reduseValueOne = arrRed.reduce(function (previousValue, item, index, array) {
   return item + previousValue;
}, 0);
console.log(reduseValueOne);
/*
Шаг №1
previousValue = 0
item = 1
Сумма = 1

Шаг №2
previousValue = 1
item = 2
Сумма = 3

Шаг №3
previousValue = 3
item = 3
Сумма = 6

Шаг №4
previousValue = 6
item = 4
Сумма = 10
*/

let arrPrev = ['Петя', 'Ваня', 'Шура',];
/*
 Если не указать начальное значение, то оно будет равно первому элементу массива (previousValue = Петя)
А работа начнётся со второго элемента(item = Ваня)
*/
let reduseValueTwo = arrPrev.reduce(function (previousValue, item, index, array) {
   console.log(previousValue);
   console.log(item);
   return `${item} ${previousValue}`
})
console.log(`Пользователи: ${reduseValueTwo}`);

//  Метод arr.reduseRight работает аналогично, но проходит по массиву справа налево.


