let { warn } = console;


warn('=========== IF ===========');
let message = "Привет!";

if (2 < 4) { //! Код выполняется только если выражение в скобках вернёт true
   console.log(message);
}

let message_1 = "Пока!";
let first = 5;
let second = '5';

if (first !== second) { // Код выполняется только если выражение в скобках вернёт true
   console.log(message_1);
}

let message_2 = "Здоров!";
if (2 + 1 === 3 && "1" == 1 || 10 > 5 && 10 === 1) {
   console.log(message_2);
}

// Преобразование типов
let message_3 = "Хай!";

if ('j') { //! выражение в скобках возвращает булевое значение
   console.log(message_3);
}

// Упрощённая запись
let message_4 = "Ёу!";

if (2 > 1) console.log(message_4);  // Если применяется всего одно условие. Если больше то можно просто запутаться


warn('=========== ELSE И ELSE IF ===========');
let message_5 = "Эу!";
let number = 5;

if (number > 1) {
   console.log(message_5);
} else {
   console.log('Условие не выполнено :(')
};

//* ELSE IF  ( ЕЩЁ ЕСЛИ )
if (number > 50) {
   console.log(`${number} больше 50`);
} else if (number > 30) {
   console.log(`${number} больше 30`)
} else if (number > 10) {
   console.log(`${number} больше 10`)
} else if (number > 1) {
   console.log(`${number} больше 1`)
} else {
   console.log('Условие не выполнено :(')
};


let name = 'Nick';
if (name > 'Nicks') {
   console.log('Коммон!')
} else if (name < 'Nicks') {
   console.log('Не коммон')
};

//* Условный оператор "?"
let mess = "Привет";
// let messEnd;

// if (5 > 4) {
//    messEnd = ", Васил!";
// } else {
//    messEnd = ", Микола!";
// }

let messEnd = 5 > 4 ? ", Васил!" : ", Микола"; // Можно сразу присвоить переменную

mess += messEnd;
console.log(mess);


let mess_1 = "Привет";
let messEnd_1;

// if (5 > 50) {
//    messEnd_1 = ", Вася!"
// } else if (5 > 30) {
//    messEnd_1 = ", Гриша!"
// } else if (5 > 10) {
//    messEnd_1 = ", Петя!"
// } else if (5 > 3) {
//    messEnd_1 = ", Андрей!"
// } else {
//    messEnd_1 = ", Кеша!"
// }

messEnd_1 = 5 > 50 ? ", Вася!" :
   5 > 30 ? ", Гриша!" :
      5 > 10 ? ", Петя!" :
         5 > 3 ? ", Андрей!" :
            ", Кеша!";

mess_1 += messEnd_1;
console.log(mess_1);



2 > 1 ? console.log("Ё!") : console.log("Ю!");

if (2 > 1) { // Эти записи эдентичны по смыслу но для большей читабельности применяют второй вариант
   console.log("Yo!")
} else {
   console.log("FU!");
};

//! Условный оператор пртменяют когда надо вернуть то или иное значение
let userName = 2 > 3 ? "Настя" : "Ольга";
console.log(userName);




if (1 === "1") {
   console.log('Истина!');
} else {
   console.log('Ложь!');
}

if (4 == "4") {
   console.log('Истина!')
} else {
   console.log('Ложь!');
}

let mes = (93 > '11' && 59 < 100) ? 'Истина!' : 'Ложь!';
console.log(mes);

if (0) {
   console.log('Ложь!');
} else if (" ") {
   console.log('Истина!');
}


warn('=========== SWITCH ===========');
/*
 Конструкция switch заменяет собой сразу несколько if.
Она представляет собой более наглядный способ сравнить выражение сразу с несколькими вариантами.

Конструкция switch имеет один или более блок case и необязательный блок default.
*/
let x = 2 + 2;
switch (x) {
   case 3:
      console.log(`Мало`); // if (x === 2)
      break;
   case 4:
      console.log(`x = 4`); // if (x === 3)
      break;
   case 5:
      console.log(`Перебор`); // if (x === 4)
      break;
   default:
      console.log(`x = ?`);
      break;
}
/*
 Переменная x проверяется на строгое равенство первому значению value1, затем второму value2 и так далее.
Если соответствие установлено – switch начинает выполняться от соответствующей директивы case и далее,
до ближайшего break (или до конца switch).
Если ни один case не совпал – выполняется (если есть) вариант default.

 Если break нет, то выполнение пойдёт ниже по следующим case, при этом остальные проверки игнорируются.
В примере вышще вывод будет:
 x = 4
 Перебор
 x = ?


* Группировка «case»
 Несколько вариантов case, использующих один код, можно группировать.
Для примера, выполним один и тот же код для case 3 и case 5, сгруппировав их:
*/
let a = 2 + 2;

switch (a) {
   case 4:
      console.log('Правильно!');
      break;

   case 3: // (*) группируем оба case
   case 5:
      console.log('Неправильно!');
      console.log("Может вам посетить урок математики?");
      break;

   default:
      console.log('Результат выглядит странновато. Честно.');
}
/*
 Возможность группировать case – это побочный эффект того, как switch/case работает без break. 
Здесь выполнение case 3 начинается со строки (*) и продолжается в case 5, потому что отсутствует break.
*/



