let { warn } = console;


warn('===== Числа =====');
// * Простое число
let someNum = 490;
console.log(someNum);

//* Десятисные числа
let someNums = 4.43;
console.log(someNums);

// let someBigNum = 1000000;
// console.log(someBigNum);
let someBigNum = 1e6; // 1 * 1000000
console.log(someBigNum);

// let someLittleNum = 0.000001;
// console.log(someLittleNum);
let someLittleNum = 1e-6; // 1 / 1000000
console.log(someLittleNum);

/*
* Шестнадцатеричные, двоичные и восьмеричные числа
 Шестнадцатеричные числа широко используются в JavaScript  для представления цветов,
кодировки символов и многово другого.
*/
// Шестнадцатеричное число
console.log(0xff); // = 0xff = 255 (регистр не имеет значения)

// Двоичное число
console.log(0b11111111); // = 255

// Восьмеричныо число
console.log(0o377); // = 255

/*
* Метод toString(base)
 Метод num.toString(base) возвращает стоковое представление числа в той или иной системе исчисления (base).
base может принимать значения от 2 до 36 (по умолчанию 10)
*/
let num = 255;
console.log(num.toString(16));
console.log(num.toString(8));
console.log(num.toString(2));

/*
* Округление чисел
 В JavaScript встроен объект Math, который содержит несколько функций для работы с округлением:
Math.floor - Округление в меньшую сторону
*/
let numOne = Math.floor(5.8);
let numTwo = Math.floor(2.2);
let numThree = Math.floor(-2.2);

console.log(numOne);
console.log(numTwo);
console.log(numThree);

// Math.ceil - Округление в большую сторону
let numOneOne = Math.ceil(5.8);
let numTwoTwo = Math.ceil(2.2);
let numThreeThree = Math.ceil(-2.2);

console.log(numOneOne);
console.log(numTwoTwo);
console.log(numThreeThree);

// Math.round - Округление до ближайшего целого
let numOneOneOne = Math.round(5.8);
let numTwoTwoTwo = Math.round(2.2);
let numThreeThreeThree = Math.round(-2.2);

console.log(numOneOneOne);
console.log(numTwoTwoTwo);
console.log(numThreeThreeThree);


//? Как получить 5.8 или 5.85?
// Способ умножения и деления
let numX = Math.round(5.845 * 10) / 10; // 58.45 -> 58 -> 5.8
console.log(numX);

let numY = Math.round(5.845 * 100) / 100; // 584.5 -> 585 -> 58.5
console.log(numY);

let numZ = Math.round(5.8449 * 100) / 100; // 584.49 -> 584 -> 58.4
console.log(numZ);

// Метод toFixed(n) - округляет число до n знаков после запятой и возвращает строчное представление результата.
let numNum = 5.845;
console.log(numNum.toFixed(1)); // Получаем строку !!

// Преобразуем строку в число
console.log(+numNum.toFixed(2));
console.log(Number(numNum.toFixed(1)));


warn('===== Проблема неточных вычислений =====');
let numProblemOne = Math.round(1.005 * 100) / 100;
console.log(numProblemOne); // Ожидаем 1.01

let numProblemTwo = 12.35;
console.log(+numProblemTwo.toFixed(1)); // Ожидаем 12.4

let problem = 0.1 + 0.2 === 0.3;
console.log(problem);
console.log(0.1 + 0.2);

//* Решение проблемы с помощью Number.EPSILON;
console.log(Number.EPSILON);
let sourceNum = 1.005 + Number.EPSILON;
let sourceAnswer = Math.round(sourceNum * 100) / 100;
console.log(sourceAnswer);

console.log(sourceNum * 100);
console.log(Math.round(sourceNum * 100));

warn('===== Проверка: isFinite и isNaN =====');
/*
 · Infinite - специальоне числовое значение (безконечность)
 · NaN - -/- (ошибка вычисления)
 Эти значения являются типами данных NUMBER, но не являются обычными числами.
Для проверки таких значений существуют специальные функции.

* Проверка isNaN
*/
console.log(Number(34 + "Hello"));
console.log(isNaN(34 + "Hello"));

if (34 + "Hello" !== NaN) {
  console.log("Я не NaN");
}
//! NaN это уникальное значение и оно никогда не равно само себе!
console.log(NaN === NaN);

/*
* Проверка isFinite
 Преобразует элемент в число и возвращает true, если оно является нормальным числом.
*/
console.log(isFinite("34")); // "34" -> 34 -> true
console.log(isFinite("Hello")); // "Hello" -> NaN -> false
console.log(isFinite(34 / 0)); // 34/0 -> Infinity -> false

/*
* parseInt и parseFloat
 Как известно, преобразовать строку в число можно унарным оператором либо специальной функцией Number.
*/
let valueOne = +"150";
console.log(valueOne);
console.log(typeof valueOne);

// Но зачастую можно встретить значение у которой есть единица измерения.
let valueTwo = +"150px";
console.log(valueTwo);
console.log(typeof valueTwo);

/*
 Для получения чисел из такой строки существуют parseInt и parseFloat.
Если в процессе чтения возникает ошибка, они возвращают полученное до
ошибки число.

 Тоесть если перед числом будет стоять буква то функци вернёт ошибку

 Функция parseInt возвращает целое число, а parseFloat
возвращает число с плавающей точкой:
*/
let valueThree = parseInt("15.45px");
console.log(valueThree);
console.log(typeof valueThree);

let valueFour = parseFloat("15.45px");
console.log(valueFour);
console.log(typeof valueFour);
/*
 Функция parseInt() имеет необязательный второй параметр.
 Он определяет систему изчисления, таким образом parseInt
может также читать строки с шестнадцатеричными числами,
двоичными числами и т.д.:
*/
console.log(parseInt("0xff", 16));
console.log(parseInt("ff", 16));

/*
* Другие возможности
! Объект Math содержит различные математические функции и константы.

* Math.random() -
 возвращает псевдослучайное число в диапозоне от 0 (включительно) до 1 (не включая 1)
*/
console.log(Math.random());
console.log(Math.random());
console.log(Math.random());

//* Math.max(a, b, c...) / Math.min(a, b, c...) -
// возвращает наибольшее/наименьшее число из перечисленных.
console.log(Math.max(2, 54, -45));
console.log(Math.min(2, 54, -45));
console.log(Math.min("Hello"));
console.log(Math.min(10 + 2));

//* Math.abs() -
// возвращает абсолютное значение (модуль) числа.
let number = -23;
console.log(Math.abs(number));

//* Math.pow(n, power) -
// возвращает число n, возведённое в степень power
console.log(Math.pow(5, 8));


warn('===== Примеры задач =====');
// #1
let firstSet = 1.005 + Number.EPSILON;
let secondSet = Math.round(firstSet * 100) / 100;
console.log(secondSet);

// #2
let value = "135.58px";
valueMy = parseFloat(value);
console.log(valueMy);

// #3
let valOne = 58 + "Free";
if (valOne !== NaN) {
  console.log("Результат выражения NaN");
}

// #4
console.log(Math.max(10, 58, 39, -150, 0));

// #5
let niko = 58.858;
console.log(Math.floor(niko));
