

/*
* Запись строк. Кавычки.
 Стороку тожно создать с потощью одинарных, двойных либо обратных кавычек:
*/
let someStringOne = 'Привет!'; // Одинарные
let someStringTwo = "Привет!"; // Двойные
let someStringThree = `Привет!`; // Обратные

console.log(someStringOne);
console.log(someStringTwo);
console.log(someStringThree);

/*
 Одинарные и двойные кавычки работают одинаково, но если использывать обратные то в такую строку 
можно будет вставлять произвольные вырадения, обернув их в ${...}:
*/
let textHi = "Привет";
let textAll = `${textHi}, чмо`
console.log(textAll);


function someSum(a, b) {
   return a + b;
}
console.log(`Сумма: ${someSum(3, 2)}`);

// Многострочная запись
let text = `Привет
прощай
и ничего не обещай`;
console.log(text);

//! Всё, что заключено в кавычки будет иметь тип данных строка

let someString = '189';
let someNum = 189;
console.log(someString);
console.log(typeof someString);
console.log(someNum);
console.log(typeof someNum);

console.log(someString + someNum);

/*
* Спецсимволы
 Внутри строк можно использовать ряд спецсимволов. Все спецсимволы начинаются с обратного слеша,
\ - так называемого "символа экранирования".
 Вот несколько из них:
*/
// Перевод (перенос) строки \n
let textN = `Привет
всем тем
кто меня знает!`;
console.log(textN);

let textNX = `Привет\nвсем тем\nкто меня знает!`;
console.log(textNX);

// Табуляция (отступ) \t
let textTab = `Привет\n\tвсем тем\n\t\tкто меня знает!`;
console.log(textTab); // Кол-во используемых символов влияет на величину отступа

// Обратный слеш \\
let textSlash = `Привет всем тем кто меня знает\\не знает!`;
console.log(textSlash);

// Кавычки \' или \"
let textK = `Привет всем тем кто меня \"не знает\"!`;
console.log(textK);

// Иконки, символы UTF-16 \uКОД, UTF-32 \u{КОД}
let textUTF = `Привет всем тем кто меня знает! \u00a9 \u{1F60D}`;
console.log(textUTF);


/*
* Работа со строками
 Длина строки. Свойство lenght считает кол-во символов в строке
*/
let textOne = "Hello!"
console.log(textOne.length);

// Получаем символы
let textSymbol = "Hello!"
let firstSymbol = textSymbol[0];
let lastSymbol = textSymbol[textSymbol.length - 1]; // Получение последнего символа

console.log(firstSymbol);
console.log(lastSymbol);

// Вовод каждого символа строки в отдельности
for (const char of textSymbol) {
   console.log(char);
}

// Изменение строки
let textChange = "Привет!";
textChange[6] = "."; // Поменять что либо в строке невозможно
console.log(textChange);

// Изиенение регистра
let textCase = "Привет!";
console.log(textCase.toUpperCase());
console.log(textCase.toLowerCase());

/*
* Поиск подстроки
 Метод str.indexOf(substr, pos)
 Он ищет подстроку substr в строке str, начиная с позиции pos,
и возвращает позицию на которой располагаестя совпадение,
либо -1 при отсутствии совпадений.
*/

let textPosition = "Програмист";
console.log(textPosition.indexOf("гр"));
console.log(textPosition.indexOf("гр", 6));

/*
* Методы includes, startsWith, endsWith
 Более современный метод str.includes(suvstr, pos) возвращает true,
если в строке есть искомая подстрока, либо false если её нет.
*/

let textInclud = "Програмист";
console.log(textInclud.includes('огр'));
console.log(textInclud.includes('огр', 4));

console.log(textInclud.startsWith('огр'));
console.log(textInclud.endsWith('ист'));

//! Регистр имеет значение
// Что бы найти строку надо приравнять её регистр с искомым

let textReg = "Програмист",
   searchText = "пР";

console.log(textReg.toLowerCase().includes(searchText.toLowerCase()));
/*
 В итоге indexOf можно использовать только тогда, когда нам 
нужна позиция искомого текста.
 В остальных случаях удобнее использовать includes.


* Получение части стоки (подстроки)
 Метод str.slice(start [, end]) - возвращает часть строки
от start до end (не включительно).
*/

let textSlice = "Програмист";
console.log(textSlice.slice(3, 4));
console.log(textSlice.slice(1, 4));
console.log(textSlice.slice(1));
console.log(textSlice.slice(-4));
console.log(textSlice.slice(-5, -3));

/*
* Метод substring
str.substring(start [, end]) возвращает часть строки между start и end
 Метод похож на slice, но в нём можно задавать slice больше end.
 Отрицательные значения substring, в отличие от slice, не поддерживает, они интерпретируются как 0.
*/

let textSubstring = 'stringify';

// для substring эти два примера одинаковы
console.log(textSubstring.substring(2, 6)); // "ring"
console.log(textSubstring.substring(6, 2)); // "ring"

// …но не для slice:
console.log(textSubstring.slice(2, 6)); // "ring" (то же самое)
console.log(textSubstring.slice(6, 2)); // "" (пустая строка)

/*
* Метод substr
str.substr(start [, length]) возвращает часть строки от start длины length.
 Это позволяет указать длину вместо конечной позиции
*/

let textSubstr = "stringify";

console.log(textSubstr.substr(2, 4)); // получаем 4 символа, начиная с позиции 2
console.log(textSubstr.substr(-4, 2)); // Если значение первого аргумента отрицательное то позиция определяется с конца




