
//  Получить полную информацию о свойствах обьекта user.
let user = {
   name: 'Nick',
   age: 34,
};
console.log(Object.getOwnPropertyDescriptors(user));

// Проверить флаги встроенного свойства Math.PI. Вывести в консоли JSONоном.
let pi = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log(JSON.stringify(pi, null, 2));

// Изменить свойство name на неизменяемое.
Object.defineProperty(user, 'name', { writable: false });
user.name = 'Michel';
console.log(user.name);

// Создать новое свойство sername через defineProperty. Сделать его только для чтения.
Object.defineProperty(user, 'sername', {
   value: 'Komarov',
   enumerable: true,
   configurable: true
});
console.log(Object.getOwnPropertyDescriptors(user));

/*
 При помощи методов доступа запретить объекту obj 
 · "разширение"
 · добавлять и удалять свойства
 · добавлять, удалять и изменять свойства
*/
let obj = {
   a: 'a',
   b: 'b'
};
Object.preventExtensions(obj);
Object.seal(obj);
Object.freeze(obj);


// Добавить обьекту rockStar геттор и сеттор fullName через defineProoperty
let rockStar = {
   name: 'Mick',
   sername: 'Jagger'
};
Object.defineProperty(rockStar, 'fullName', {
   get() {
      return `${this.name} ${this.sername}`;
   },
   set(value) {
      [this.name, this.sername] = value.split(' ');
   }
})
console.log(rockStar.fullName);
user.fullName = 'Ivan Ivanov';
console.log(user.fullName);


// Добавить геттером в обьекте возраст(аge) изходя из дня рождения(birthday)
function User(name, birthday) {
   this.name = name;
   this.birthday = birthday;

   Object.defineProperty(this, 'age', {
      get() {
         let todayYear = new Date().getFullYear();
         return todayYear - this.birthday.getFullYear();
      },
      enumerable: true
   })
}
let john = new User('John', new Date(1980, 7, 29));
console.log(john.birthday);
console.log(john.age);
console.log(Object.getOwnPropertyDescriptors(john));





