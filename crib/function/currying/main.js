let { warn } = console;
import lodash from 'lodash'

warn('=========== Каррирование =============');
/*
 Каррирование – это трансформация функций таким образом,
чтобы они принимали аргументы не как f(a, b, c), а как f(a)(b)(c).
 Каррирование не вызывает функцию. Оно просто трансформирует её.
*/
function curryng(f) {
   return function (a) {
      return function (b) {
         return f(a, b);
      }
   }
}

// использование
function summ(a, b) {
   return a + b;
}
let curredSumm = curryng(summ);
console.log(curredSumm(1)(2));

let curSum = _.curry(summ); // функция зи lodash
console.log(curSum(2)(3));
console.log(curSum(2, 3));


// Пример функции логирования 
function log(date, importance, message) {
   console.log(`[${date.getHours()}:${date.getMinutes()}] [${importance}] ${message}`);
}
log = _.curry(log); // применяем каррирование из lodash

log(new Date(), "DEBUG", "some text"); // log(a, b, c)
// так же можно записать по другому
log(new Date())("DEBUG")("some text"); // log(a)(b)(c)

// Переделка в функцию для логов с текущим временем:
let logNow = log(new Date());
logNow("Ivan Ivanov", "some message");
/*
 Теперь logNow – это log с фиксированным первым аргументом, иначе говоря,
«частично применённая» или «частичная» функция.

 Можно пойти дальше и сделать удобную функцию для именно отладочных логов с текущим временем:
*/
let debugNow = logNow("DEBUG");
debugNow("One, Two, Three");


warn('=== Продвинутая реализация каррирования ===');
// Продвинутая реализация каррирования
// Это «продвинутая» реализация каррирования для функций с множеством аргументов
function curryUp(f) {
   return function curried(...args) {
      if (args.length >= f.length) {
         return f.apply(this, args);
      } else {
         return function (...args2) {
            return curried.apply(this, args.concat(args2));
         }
      }
   }
}
// Примеры использования

function summTwo(a, b, c) {
   return a + b + c;
}
let curiedSumm = curryUp(summTwo);

console.log(curiedSumm(1, 2, 3));
console.log(curiedSumm(1)(2, 3));
console.log(curiedSumm(1)(2)(3));



