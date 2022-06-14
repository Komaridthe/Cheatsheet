"use strict"

let {warn} = console;


warn("=== Объявление функции (Function Declaration) ===");
/*
function имя(параметры){
 	тело (код) функции
}
*/
//* Запуск функции
showMessage();
function showMessage() {
  console.log("Сообщение");
}
showMessage();
showMessage();

//* Вложенность и видимость функции
function getSumm() {
  let numOne, numTwo;
  function getNumOne() {
    numOne = 1;
  }
  function getNumTwo() {
    numTwo = 2;
  }
  getNumOne();
  getNumTwo();

  let numSumm = numOne + numTwo;
  console.log(numSumm);
}
getSumm();


//* Локальные и внешние переменные
function getMessage() {
  let mess = "Привет"; // Локальная переменная
  console.log(mess);
};
// console.log(mess); - вызовет ошибку


//* Внешняя переменная
let mes;

function showMyMessage() {
  mes = "Ку-ку!";
};
showMyMessage();
console.log(mes);


//* Внешняя переменная
let myMess = "Сообщение 1";

function givMyMess() {
  myMess = "Сообщение 2";
  console.log(myMess);
};
console.log(myMess);
givMyMess();


//* Глобальные переменные
let globalVar = "Я глобальная переменная";

function getMeSumm() {
  let nuOne, nuTwo;
  function getNumOne() {
    nuOne = 1;
    console.log(globalVar);
  }
  function getNumTwo() {
    nuTwo = 2;
  }
  getNumOne();
  getNumTwo();

  let nuSumm = nuOne + nuTwo;
  console.log(globalVar);
};
console.log(globalVar);
getMeSumm();


//* Параметры (аргументы)
function calcSumm(nOne = 1, nTwo = 2) {
  console.log(`Переменная nOne:${nOne}`);
  console.log(`Переменная nTwo:${nTwo}`);

  let nummSumm = nOne + nTwo;
  console.log(`Сумма:${nummSumm}`);
};
calcSumm(5, 5); // Значения в скобках заменят параметры по умолчанию


//* Функции-колбеки
function calckSumm(numOne, numTwo, more, less) {
  let numSumm = numOne + numTwo;

  if (numSumm > 3) {
    more();
  } else {
    less();
  }
};
function showMoreMessage() {
  console.log(`Больше чем 3`);
};
function showLessMessage() {
  console.log(`Меньше чем 3`);
};
calckSumm(1, 5, showMoreMessage, showLessMessage);


//* Возврат результата
function clcSumm(numOne, numTwo) {
  let numSumm = numOne + numTwo;

  return numSumm; // Возврат

  //! Дальше код выполняться не будет
};
let funcRezult = clcSumm(1, 2);

console.log(funcRezult);


//* Рекурсия - вызов функцией самой себя.
function clculateSumm(numOne, numTwo) {
  let result = 1;
  
  for (let i = 0; i < numTwo; i++) { // Умножает result на numOne numTwo раз в цикле
    result *= numOne;
  }
  return result;
}
console.log(clculateSumm(2, 4));

function clculSumm(numOne, numTwo) {
  if (numTwo === 1) {
    return numOne;
  } else {
    return numOne * clculSumm(numOne, numTwo - 1);
  }
}
console.log(clculSumm(2, 4));


warn("=== Функциональное выражение (Function Expression) ===");
/*
let имя переменной = function (параметр, ...параметр){
	return выражение;
};
 Отличается от FD (определения функции) тем, что её можно вызвать только после её создания.
FD же можно вызвать в любом месте кода.
*/
// sMessage(); - этот вызов функции вызовет ошибку в консоле
let sMessage = function () {
  console.log("Привет!");
};
sMessage();

function gSumm() {
  let summ = 1 + 2;
  console.log(summ);
};

someVar = gSumm;

someVar();
gSumm();
/*
! В строгом режиме, FD, объявленная внутри блока, нигде, помимо него, не видна.
 Функциональное выражение решает эту проблему.
*/
if (2 > 1) {
  function getMyNewSumm() {
    let summ = 12 + 2;
    console.log(summ);
  }
};
// getMyNewSumm(); //! Ошибка

//! Необходимо только объявить переменную вне блока
let getaSumm;

if (2 > 1) {
  getaSumm = function () {
    let summ = 2 + 2;
    console.log(summ);
  };
}
getaSumm();


warn("=== Функции стрелки (arrow functions) ===");
// let имя переменной = function (параметр, ...параметр) => выражение

// Однострочная стрелочная функция
let gMess = (text, name) => text + ", " + name + "!";
console.log(gMess("Привет", "Вася"));

// Многосторочная стрелочная функция
let someMessage = (text, name) => {
  let message = text + ", " + name + "!";
  return message;
};
console.log(someMessage("Пока", "Вася"));


warn("=== Планирование setTimeout и setInterval ===");
/*
* setTimeout позволяет вызвать функцию один раз через определённый промежуток времени
setTimeout(функция ил код, задержка, параметр, ..параметр)

* setInterval позволяет вызывать функцию регулярно, повторяя вызов через определённый промежуток времени
setInterval(функция ил код, задержка, параметр, ..параметр)

function showMess(text, name){
	console.log(`${text}, ${name}`);
};

setInterval(showMess, 3000, 'Yo', 'Common');

function showMess(text, name){
	console.log(`${text}, ${name}`);
	setTimeout(showMess, 3000, 'Yo', 'Common');   // Более правильная запись для получения ИНТЕРВАЛА
};

setTimeout(showMess, 3000, 'Yo', 'Common');
*/

//* Прерывание
function calc(num) {
  console.log(num);
  if (num < 5) {
    setTimeout(calc, 1000, ++num);
  }
}
setTimeout(calc, 1000, 1);

function calk(numn) {
  console.log(numn);
  let timeId = setTimeout(calk, 1000, ++numn);
  if (numn === 6) {
    clearTimeout(timeId);
  }
}
setTimeout(calk, 1000, 1);

let resultTwo = 0;
function showMyNumber(num) {
  resultTwo += num;
  console.log(resultTwo);
  if (resultTwo === 6) clearInterval(interval);
}
let interval = setInterval(showMyNumber, 1000, 1);











