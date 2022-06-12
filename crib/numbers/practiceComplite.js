
// Записать в сокращённой форме числа:
//  1) 1,340000000
//  2) 0.0000012
console.log(1.34e9);
console.log(12e-7);

// Вернуть число 255 в 16иричной и двоичной системе исчисления
console.log(255..toString(16));
console.log(255..toString(2));


// Создайть скрипт, который запрашивает ввод двух чисел (использовать prompt)
//  и после показывает их сумму(alert).

function summ() {
   let a = +prompt('Введите число', 0);
   let b = +prompt('Введите число', 0);

   alert(a + b);
}
summ();

/*
Создайте функцию readNumber(), которая будет запрашивать ввод числового значения до тех пор,
 пока посетитель его не введёт. Функция должна возвращать числовое значение.
 Также надо разрешить пользователю остановить процесс ввода, 
 отправив пустую строку или нажав «Отмена». В этом случае функция должна вернуть null.
*/

function readNumber() {
   let num;
   do {
      num = prompt('Введите число', '');
   } while (!isFinite(num));

   if (num === null || num === '') return null;

   return +num;
}
alert(`Число: ${readNumber()}`);


// Написать функцию random(min, max), которая генерирует случайное число с плавающей точкой
// от min до max (но не включая max).


function random(min, max) {
   return min + Math.random() * (max - min);
}

console.log(random(1, 5));
console.log(random(1, 5));
console.log(random(1, 5));


/*
Напишите функцию randomInteger(min, max), которая генерирует случайное
 целое (integer) число от min до max (включительно).
 Сделать два варианта. Один через Math.round, другой через Math.floor.
*/

function randomInteger(min, max) {
   let random = min - 0.5 + Math.random() * (max + 1 - min); // позволит добавить необходимые вероятности к min и max

   return Math.round(random);
}

console.log(randomInteger(1, 5));
console.log(randomInteger(1, 5));
console.log(randomInteger(1, 5));


console.log('=======================================================')

function randomIntegerFloor(min, max) {
   let integer = min + Math.random() * (max + 1 - min);

   return ~~integer; // ~~ - краткая запись Math.floor()
}

console.log(randomIntegerFloor(1, 5));
console.log(randomIntegerFloor(1, 5));
console.log(randomIntegerFloor(1, 5));





















