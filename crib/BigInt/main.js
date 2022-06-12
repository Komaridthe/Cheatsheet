let { warn } = console;

warn('============= BigInt =============');
/*
 BigInt – это специальный числовой тип, который предоставляет
возможность работать с целыми числами произвольной длины.
 Чтобы создать значение типа BigInt, необходимо добавить n в конец числового литерала
или вызвать функцию BigInt, которая создаст число типа BigInt из переданного аргумента.
 Аргументом может быть число, строка и др.
*/
const bigint = 1234567890123456789012345678901234567890n;
const sameBigint = BigInt("1234567890123456789012345678901234567890");
const bigintFromNumber = BigInt(10); // то же самое, что и 10n

console.log(typeof bigint); // bigint
console.log(typeof sameBigint); // bigint
console.log(typeof bigintFromNumber); // bigint


warn("============= Математические операторы =============");
console.log(1n + 2n); // 3n
console.log(3n * 2n); // 6n
console.log(3n / 2n); // 1n Операция деления 3/2 возвращает округлённый результат без дробной части!!!
/*
 В математических операциях нельзя смешивать bigint и обычные числа.
Их необходимо конвертировать: используя либо BigInt(), либо Number().
*/
// console.log(1n + 2); // Error: Cannot mix BigInt and other types

const number = 2;
const bi = 1n;

console.log(BigInt(number) + bi); // конвертируем number в bigint => 3n
console.log(number + Number(bi)); // конвертируем bigint в number => 3

// К BigInt числам нельзя применить унарный оператор +
// console.log(+bigint); // TypeError


warn("============= Операции сравнения =============");
// Операции сравнения, такие как <, >, работают с bigint и обычными числами как обычно:
console.log(1n < 2n); // true
console.log(2n > 1); // true

// Обычные и bigint числа принадлежат к разным типам
console.log(1n == 1); // true
console.log(1n === 1); // false


warn("============= Логические операции =============");
// В if или любом другом логическом операторе bigint число ведёт себя как обычное число.
if (0n) {
   // т.к. 0n это fulse действие не выполнится
}

// Логические операторы ||, && и другие также работают с bigint числами как с обычными числами:
console.log(1n || 2); // 1n
console.log(0n || 2); // 2






