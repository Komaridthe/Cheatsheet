let { warn } = console;

let x;

warn('===== МАТЕМЕТИЧЕСКИЕ ОПЕРАТОРЫ =====');
//Сложение +
x = 5 + 8;
console.log(`Результат сложения: ${x}`); // 13

//Вычитание -
x = 5 - 3;
console.log(`Результат вычитания: ${x}`); // 2

// Умножение *
x = 4 * 5;
console.log(`Результат умножения: ${x}`); // 20

// Деление /
x = 12 / 3;
console.log(`Результат деления: ${x}`); // 4

// Взятие остатка от деления %
x = 11 % 3;
console.log(`Результат взятия остатка после деления: ${x}`); // 2 - Остаток от полго числа после деления

// Возведение числа в степень **
x = 5 ** 3;
console.log(`Результат возведения в степень: ${x}`); // 125



warn('===== СПЕЦИАЛЛЬНЫЕ ВОЗМОЖНОСТИ ОПЕРАТОРОВ =====');
// Применение оператора сложения к строкам
let resultOne = "Куда" + " " + "ты" + " " + "лезешь" + "?";
console.log(resultOne); // Куда ты лезешь?

//! Если в выражении сложения хотя бы один операнд является строкой, то конечный резульнат тоже будет строкой
let resultTwo = "Мне " + 33;
console.log(resultTwo); // Мне 33
console.log(typeof resultTwo); // string

//* Казусы
let resultThree = 2 + "2";
console.log(resultThree); // 22
console.log(typeof resultThree); // string

//! При любом другом операторе результатом будет NUMBER
let resultThree_a = "23" - 3;
console.log(resultThree_a); // 20
console.log(typeof resultThree_a); // number

let resultThree_b = 10 * "3";
console.log(resultThree_b); // 30
console.log(typeof resultThree_b); // number

let resultThree_c = 12 * "somesing";
console.log(resultThree_c); // NaN
console.log(typeof resultThree_c); // number

// Оперфторы до сложения со строкой выполняются как обычно
let resultFour = 23 + 84 + " число";
console.log(resultFour); // 107 число



warn('===== УНАРНЫЙ ОПЕРАТОР СЛОЖЕНИЯ + =====');
// Со строками
let resultFive = +"54";
console.log(resultFive); // 54
console.log(typeof resultFive); // number

// С числами
let resultSix = +34;
console.log(resultSix); // 34
console.log(typeof resultSix); // number

// Ещё пример
let users = "34";
let admins = "13";
console.log(users + admins); // 3413
console.log(+users + +admins); // 47
// Другой вариант записи
console.log(Number(users) + Number(admins)); // 47



warn('===== ОПЕРАТОР ПРИСВОЕНИЯ =====');
let a = 1 + 2;
let b = 3;

let result = 8 - (a = b + 3);
console.log("Результат в скобках: " + a); // 6
console.log("Общий результат: " + result); // 2

// Присваивание по цепочке
let resultX = resultY = resultZ = 1 + 2;
console.log(resultX); // 3
console.log(resultY); // 3
console.log(resultZ); // 3

// Сокращённая запись вычислений с присвоением
let mans = 5;
mans = mans + 3;
mans = mans * 2;

// Можно записать так
let womans = 5;
console.log(womans); // 5
womans += 3;
console.log(womans); // 8
womans *= 2;
console.log(womans); // 16

// Вприоритете сначала сложение потом присвоение
let boys = 5;
console.log(boys); // 5
boys += 1 + 2;
console.log(boys); // 8



warn('===== ИНКРЕМЕНТ / ДЕКРИМЕНТ =====');
//! Используется только с переменной
// Инкремент ++
let addUser = 2;
addUser++;
console.log(addUser); // 3
/*
Работает так же как и 
addUser = addUser + 1;
или
addUser += 1;
*/
// Декремент --
let removeUser = 2;
removeUser--;
console.log(removeUser); // 1

// Постфиксная форма
let counter = 1;
console.log(counter++); // 1
console.log(counter--); // 2

// Префиксная форма
console.log(++counter); // 2
console.log(--counter); // 1 

//* Примеры:
// Постфиксная форма
// Переменная newUsers получает новое знечение ДО присвоения оператора
let usersCounter = 4;
let newUsers = usersCounter++;
console.log(newUsers); // 4

// Префиксная форма
// Переменная newUsers получает новое знечение ПОСЛЕ присвоения оператора
let usersCounterTwo = 4;
let newUsersTwo = ++usersCounterTwo;
console.log(newUsersTwo); // 5

//! Приоритет выполнения действия выше у оператора чем у Инкримента/Дикримента
let userCounter = 0;
let newUser = 2 * ++userCounter;
console.log(newUser); // 2



warn('===== ОПЕРАТОРЫ СРАВНЕНИЯ =====');
/*
! Операторы сравнения возвращают логический тип данных со значением true или false !!!
Больше: a > b
Меньше: a < b
Больше или равно: a >= b
Меньше или равно: a <= b
Равно: a == b
Не равно: a != b
Строгое равно: a === b
Строгое не равно: a !== b
*/
console.log(2 > 1); // true
console.log(4 < 2); // false
console.log(48 == 32); // false
console.log(9 != 3); // true

// Присваиваение результата переменной
let result_1 = 22 < 34;
console.log(result_1); // true

//* Сравнение строк    (Сначала алфавитный порядок, потом кол-во символов и в конце регистор)
// Алфавитный порядок
console.log("Б" > "А"); // true
console.log("Скрипт" > "Скрипка"); // true

// Кол-во символов
console.log("Слайдер" > "Слайд"); // true

// Регистор
console.log("Мама" > "мама"); // false
/*
 В JavaScript строки кодируются в UTF-16. Таким образом, у любого символа есть соответствующий код(числовой).
str.codePointAt(pos) возвращает код для символа, находящегося на позиции pos.
Одна и та же буква в нижнем и верхнем регистре будет иметь разные коды.
*/
console.log("z".codePointAt(0)); // 122
console.log("Z".codePointAt(0)); // 90
/*
 Латиница и ещё некоторые распространённые символы находятся в промежутке от 65 и до 220.
Их порядок выглядит так:
ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~
¡¢£¤¥¦§¨©ª«¬­®¯°±²³´µ¶·¸¹º»¼½¾¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜ
Соответственно раз код символа 'Z' равен 90, а символа 'z' 120
(90 < 120) == ('Z' < 'z')
*/



warn("======== СРАВНЕНИЕ РАЗНЫХ ТИПОВ   ========");
//* Преобразование в число
console.log('58' > 10); // true
console.log('007' > 7); // false

// Логическое значение 
// true  становится 1, а false - 0.
console.log(true == 1); // true
console.log(false == 0); // false               /* ОПЕРАТОР СРАВНЕНИЯ ПРЕОБРАЗУЕТ ОПЕРАНД В ЧИСЛО */

//* Интересная ситуация
let itemA = 0;
let itemB = '0';

console.log(Boolean(itemA)); // false
console.log(Boolean(itemB)); // true

console.log(itemA == itemB); // true

//* Строгое сравнение
//! Оператор строгого равенства или не равенства проверяет равенство без применения типов!!
console.log(0 === false); // false
console.log('008' === 8); // false
console.log('58' !== 58); // true

//* Сравнение NULL и UNDEFINED
// Строгое равенство
console.log(null === undefined); // false

// Не строгое равенство
console.log(null == undefined); // true

// Сравнение NULL и 0
console.log(null > 0); // false
console.log(null == 0); // false
console.log(null >= 0); //! true

// Сравнение UNDEFINED и 0
console.log(undefined > 0); // false
console.log(undefined == 0); // false
console.log(undefined >= 0); // false



warn('===== ЛОГИЧЕСКИЕ ОПЕРАТОРЫ =====');
//* Оператор || (или)
//! Если есть хотя бы дин оператор true то возвращается значение true
console.log(true || true); // true
console.log(false || true); // true
console.log(true || false); // true
console.log(false || false); // false

//* Разные типы данных
// Первый true это 1
console.log(1 || 0); // 1
// Первый true это true
console.log(true || 'фрилансер'); // true
// Первый true это 58
console.log(null || 58); // 58
// Первый true это фрилансер
console.log(null || 'фрилансер' || 0); // фрилансер
// true нет совсем, вернёт последнее значение - 0
console.log(undefined || '' || null || 0); // 0

// Присвоения значения в переменную
let userName = '';
let userNickName = 'Alick';

let user = userName || userNickName || "Без имени";  /* Присвоит первое значение true */
console.log(user); // Alick

// Сокращённое вычисление. Условие
let mamas = 0;
let papas = 4;
console.log(mamas > papas || papas++); // 4
console.log(papas); // 5


//* Оператор && (и)
//! Если есть хотя бы дин оператор false то возвращается значение false
console.log(true && true); // true
console.log(false && true); // false
console.log(true && false); // false
console.log(false && false); // false

//* Разные типы данных
// 0 - false
console.log('Фрилансер' && 0 && 2 && 3); // 0
// null - false
console.log(1 && 2 && null && 3); // null
// Все true
console.log(15 && '42'); // 42 - возвращается последний true операнд

//! ПРИОРИТЕТ ОПЕРАТОРА && БОЛЬШЕ ЧЕМ У ОПЕРАТОРА ||
console.log(4 && 2 || 3 && 0);

// Подобие условия
let obuser = 1;
(obuser > 0) && console.log(`Пользовательский ${obuser}`); // Пользовательский 1

/*
* Оператор !(НЕ)
 · Сначала приводит операнд к логическому типо true/fulse
 · Затем меняет его значение на противоположное
*/
// Булевые значения
console.log(!true); // false

//* Разные типы
console.log(!null); // true
console.log(!20); // false
console.log(!'Nick'); // false
console.log(!''); // true

//! Оператор !(НЕ) имеет наивысший приоритет выполнения
console.log(!2 && 3 || !false && 19); // 19
console.log(!true && 48 || 13 && !1); // false

//! Оператор ! можно использовать для перевода операнда в boolean прописав его дважды
console.log(!!'Maxim'); // true
// или
console.log(Boolean('Maxim')); // true


//* Оператор объединения с null (??)
// Оператор возвращает первий аргумент, если он не null/undefined

let me = 'Nick'; // если бы переменной небыло присвоено значения то в консоль возвралилось бы 'Без имени'
console.log(me ?? 'Без имени'); // Nick


//* Примеры
console.log("" + 1 + 0); // 10 строка
console.log("" - 1 + 0); // -1
console.log(true + false); // 1
console.log(6 / "3"); // 2
console.log("2" * "3"); // 6
console.log(4 + 5 + 'px'); // 9px строка
console.log("$" + 4 + 5); // $45 сторока
console.log("4" - 2); // 2
console.log('4px' - 2); // NaN
console.log(7/0); // Infinity
console.log(" -9 " + 5); //  -9 5
console.log(" -9 " - 5); // -14
console.log(null + 1); // 1
console.log(undefined + 1); // NaN
console.log(" \t \n" -2); // -2

//---------------------------------------------------------

console.log('35' + - "22");
console.log('35' * '22');
//console.log('558' > 22++);
let ab = 0;
let bc = ab++;
console.log(ab);
console.log(!false && 48 || 13 && !'');


let block = document.querySelector('.block');
console.log(block)


 "use strict"
const obj = {
   foo: 10,
   bar: function() {
     console.log(this)
   },
   baz: () => {
    console.log(this)
   }
 }

 const bar = obj.bar
 obj.bar()
 obj.baz()
 bar()
