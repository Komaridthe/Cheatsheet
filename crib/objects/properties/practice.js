

//  Получить полную информацию о свойствах обьекта user.
let user = {
   name: 'Nick',
   age: 34,
};


// Проверить флаги встроенного свойства Math.PI. Вывести в консоли JSONоном.


// Изменить свойство name на неизменяемое.


// Создать новое свойство sername через defineProperty. Сделать его только для чтения.


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


// Добавить обьекту user геттор и сеттор fullName через defineProoperty
Object.defineProperty(user, 'fullName', {
   get() {
      return `${this.name} ${this.sername}`
   }
})


// Добавить обьекту rockStar геттор и сеттор fullName через defineProoperty
let rockStar = {
   name: 'Mick',
   sername: 'Jagger'
};



// Добавить геттером в обьекте возраст(аge) изходя из дня рождения(birthday) 
function User(name, birthday) {
   this.name = name;
   this.birthday = birthday;
   // код

}
let john = new User('John', new Date(1980, 7, 29));
console.log(john.birthday);
console.log(john.age);
console.log(Object.getOwnPropertyDescriptors(john));


