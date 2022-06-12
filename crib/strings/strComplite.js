
// Написать функцию ucFirst(str), возвращающую строку str с заглавным первым символом
function ucFirst(str) {
   if (!str == str) return str;
   return str[0].toUpperCase() + str.slice(1);
}
console.log(ucFirst('вася'));



// Написать функцию проверки на спам. Функция должна возвращать true, если str 
// содержит 'viagra' или 'xxx'. Функция должна быть нечувствительна к регистру.
function checkSpam(str) {
   let lowerStr = str.toLowerCase();
   return lowerStr.includes('viagra') || lowerStr.includes('xxx')
}
console.log(checkSpam('ldkXXXs;ldfj'));



/*
Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и,
 если она превосходит maxlength, заменяет конец str на "…", так, чтобы её длина стала равна maxlength.
*/
function truncate(str, maxlength) {
   return (str.length > maxlength) ? str.substr(0, maxlength - 1) + '…' : str; // подойдёт и slice
}
console.log(truncate('У попа была собака, он её любил', 20));


// Создайте функцию extractCurrencyValue(str), которая будет из строки выделять числовое значение
// и возвращать его.
function extractCurrencyValue(str) {
   let value = '';

   for (let char of str) {
      if (str.codePointAt(0) > 47 && str.codePointAt(0) < 58) {
         value += char;
      }
   } return value; // Не работает!!!
}
console.log(extractCurrencyValue('s123'));