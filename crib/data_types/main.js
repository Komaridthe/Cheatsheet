
let userAge = 33;
console.log(userAge); // 33
console.log(typeof userAge); // number

userAge = String(userAge);

console.log(userAge); // '33'
console.log(typeof userAge); // string

let userTrue = true;
console.log(userTrue); // true
console.log(typeof userTrue); // boolean

userTrue = Object(userTrue); /*можно поменять на String*/

console.log(userTrue); // Boolean{true}
console.log(typeof userTrue); // object


let userHeight = 135 / 0; 
console.log(userHeight); // Infiniti
console.log(typeof userTrue); // object

let userSize = "58" / "8";
console.log(userSize); // 7.25
console.log(typeof userSize); // number

let bigint = 1234567890123456789012345678901234567890n;
let sameBigint = BigInt("1234567890123456789012345678901234567890");
let bigintFromNumber = BigInt(10); // то же самое, что и 10n
console.log(bigint); // 1234567890123456789012345678901234567890n
console.log(typeof bigint); // bigint
console.log(sameBigint); // 1234567890123456789012345678901234567890n
console.log(bigintFromNumber); // 10n













