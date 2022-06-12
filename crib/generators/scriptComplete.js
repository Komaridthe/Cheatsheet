// Написать приме генератора с исключением
function* generatorThrow() {
   while (true) {
      try {
         yield console.log('Hello');
      } catch (e) {
         console.log(e);
      }
   }
}
let genThrow = generatorThrow();
genThrow.next();
genThrow.throw(new Error('Error!'));


// Написать перебор композиции генераторов методом for..of
function* generatorOne() {
   yield '1';
   yield* generatoorTwo();
}

function* generatoorTwo() {
   yield '2';
   yield '3';
   yield '4';
   yield '5';
}
let genForOf = generatorOne();
for (const count of genForOf) {
   console.log(count);
}



/*
 Написать «сеяный псевдослучайный генератор». Он получает «зерно», как первое значение,
и затем генерирует следующее, используя формулу. Так что одно и то же зерно даёт одинаковую 
последовательность.
 Пример такой формулы: "next = previous * 16807 % 2147483647"
Если использовать 1 как зерно, то значения будут:
 · 16807
 · 282475249
 · 1622650073
 · …и так далее…
 Задачей является создать функцию-генератор pseudoRandom(seed), которая получает seed 
и создаёт генератор с указанной формулой.
*/
function* pseudoRandom(seed) {
   while (true) yield seed = seed * 16807 % 2147483647;
}
let randomGenerator = pseudoRandom(1);
console.log(randomGenerator.next().value);
console.log(randomGenerator.next().value);
console.log(randomGenerator.next().value);


// Сделать объект итерабельным
let a = {
   start: 0,
   finish: 5,

   [Symbol.iterator]() {
      return {
         min: this.start,
         max: this.finish,
         next() {
            if (this.min <= this.max) {
               return { value: this.min++, done: false }
            } else {
               return { value: undefined, done: true }
            }
         }
      }
   }
}
for (const iterator of a) console.log(iterator);




















