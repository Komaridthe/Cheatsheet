let { warn } = console;


warn("==== Цикл WHILE ====");
//! Цикл выполняется только тогда, когда булевое значение WHILE возвращает TRUE
let num = 0;
while (num < 5) {
  console.log(num);
  num++;
}
/*
let numm = 5;
while (numm) {
	console.log(numm)
	numm--;
}
*/
// Если условие содержит всего одну строку то можно применить упрощённуюзапись
let numm = 5;
while (numm) console.log(numm--);

//* Форма DO WHILE
// Применяется, когда необходима хотябы одна итерация
let number = 0;
do {
  console.log(number);
  number++;
} while (number < 0);


warn("==== Цикл FOR ====");
/*
for (Начало; Условие; Шаг){
	Тело цикла
}
*/
for (let numb = 0; numb < 5; numb++) {
  console.log(numb);
}
/*
* Работа цикла for:
	1) Выполняется начало - let numb = 0
	2) Выполняется условие - numb < 5
	3) Если условие TRUE выполняется тело цикла - console.log(numb)
	4) Выполняется шаг - numb++
 Повтор начинается с пункта №2


 Если определить переменную раньше цикла, а врутри него просто присвоить ей значение,
то с ней можно будет работать вне цикла
*/
let qant;
for (qant = 0; qant < 5; qant++) {
  console.log(qant);
}
console.log(`Вывод цикла: ${qant}`);

//! Можно убрать любую часть цикла из круглых скобок КРОМЕ УСЛОВИЯ
let qantity = 0;
for (; qantity < 5; ) {
  console.log(qantity);
  qantity++;
}

//* Директива break
// Если необходимо остановить цикл раньше
let date = 0;
for (; date < 5; date++) {
  console.log(date);
  if (date == 2) break;
}
console.log(`Работа окончена, name = ${date}`);

//* Директива continue
// Если необходимо пропустить часть цикла
let n = 0;
for (; n < 5; n++) {
  if (n == 3) continue;
  console.log(n);
}

//! Директивы break и continue НЕЛЬЗЯ ИСПОЛЬЗОВАТЬ с "?"


warn("==== Метки ====");
firstFor: for (let nu = 0; nu < 4; nu++) {
  // Крутонёт 4 раза
  for (let size = 0; size < 3; size++) {
    // Т.к. size < 3, а значение 2 у неё continue
    if (size == 2) {
      /*break*/ continue firstFor; // Четыре раза повторится 0 1
    }
    console.log(`Работа окончена, name = ${size}`);
  }
}

let m = 0;
for (; m < 6; m++) {
  console.log(m);
}

let d = 0;
while (d < 3) {
  console.log(`Число: ${d}`);
  d++;
}

mod: for (let x = 0; x < 2; x++) {
  for (let y = 0; y < 3; y++) {
    if (y == 1) {
      break mod;
    }
    console.log(y);
  }
}
