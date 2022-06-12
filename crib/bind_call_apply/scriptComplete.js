
/*
 Прописать в объекте "person" метод, принимающий "job" и "phoone" в качестве аргументов и
возвращающий вывод в консоль всей информации об объекте используя this.
 Добавить объект с другими данными и переадресовать вызов тремя разными способами.
*/
function hello() {
   console.log('hello', this);
};

let person = {
   name: 'Mike',
   age: 30,
   logInfo(job, phone) {
      console.group(`${this.name} info:`);
      console.log(`Name is: ${this.name}`);
      console.log(`Age is: ${this.age}`);
      console.log(`Job is: ${job}`);
      console.log(`Phone is: ${phone}`);
      console.groupEnd();
   }
};
person.logInfo('driver', '123-23-23');
let lena = {
   name: 'Elena',
   age: 23,
};

person.logInfo.bind(lena, 'manager', '123-45-67')();
person.logInfo.call(lena, 'manager', '123-45-67');
person.logInfo.apply(lena, ['manager', '123-45-67']);



/*
 Дописать метод в объект, который через foreach возвращщает в консоль запись вида:
 Our group: John
 Our group: Pete
 Our group: Alice
*/
let group = {
   title: "Our group",
   studients: ["John", "Pete", "Alice"],
   showList() {
      this.studients.forEach(
         studient => console.log(`${this.title}: ${studient}`)
      );
   }
};
group.showList();



// Создайте декоратор delay(f, ms), который задерживает каждый вызов f на ms миллисекунд.
function f(x) {
   console.log(x);
};

function delay(func, ms) {
   return function () {
      return setTimeout(() => func.apply(this, arguments), ms);
   }
};
let f1000 = delay(f, 1000);
let f2000 = delay(f, 2000);

f1000('test_1');
f2000('test_2');


/*\
 Создайте декоратор spy(func), который должен возвращать обёртку, которая сохраняет все вызовы функции в своём свойстве calls.
Каждый вызов должен сохраняться как массив аргументов. Вывести аргументы через for of.
*/
function work(a, b) {
   console.log(a + b);
};

function spy(func) {
   function wrapper(...args) {
      wrapper.calls.push(args);
      return func.apply(this, arguments);
   }
   wrapper.calls = [];
   return wrapper;
};
work = spy(work);

work(1, 2);
work(4, 5);

for (let args of work.calls) {
   console.log(`call: ${args.join()}`); // "call:1,2", "call:4,5"
};





