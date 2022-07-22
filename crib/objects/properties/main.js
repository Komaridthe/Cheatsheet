let {warn} = console;

warn('======= Флаги и дескрипторы свойств =======')
/*
* Помимо значения value, свойства объекта имеют три специальных атрибута (так называемые «флаги»).
 · writable – если true, свойство можно изменить, иначе оно только для чтения.
 · enumerable – если true, свойство перечисляется в циклах, в противном случае циклы его игнорируют.
 · configurable – если true, свойство можно удалить, иначе этого делать нельзя.
*/
// Метод Object.getOwnPropertyDescriptor() позволяет получить полную информацию о свойстве.
// Object.getOwnPropertyDescriptor(obj, propertyName);
let user = {
   name: 'Nick',
   age: 34,
};
console.log(Object.getOwnPropertyDescriptor(user, 'name')); // {value: 'Nick', writable: true, enumerable: true, configurable: true}

/*
* Изменить флаги можно использовав метод Object.defineProperty.
Object.defineProperty(obj, propertyName, descriptor);

 Если свойство существует, defineProperty обновит его флаги. В противном случае метод создаёт новое свойство с указанным значением
и флагами;
! Если какой-либо флаг не указан явно, ему присваивается значение false.
*/
console.log(Object.defineProperty(user, 'name', {
   value: "John",
}));
console.log(Object.getOwnPropertyDescriptors(user)); // {name: {value: 'John', writable: true,…}, age: {…}}


warn("======== writable ========");
//* Read only
// Сделать свойство доступным ТОЛЬКО ДЛЯ ЧТЕНИЯ можно изменив флаг writable:
Object.defineProperty(user, 'name', { writable: false });
user.name = 'Nick';
console.log(user.name); // имя осталось прежнем ('John') 


// Пример создания свойства "с нуля" (через defineProrerty)
let obj = {};
Object.defineProperty(obj, 'name', {
   value: "Jack",
   //! для нового свойства необходимо явно указывать все флаги, для которых значение true
   enumerable: true,
   configurable: true
})
obj.name = "Bill";
console.log(obj.name); // остался Jack


warn("======== enumerable ========");
/*
* Неперечислимое свойство
 Встроенный метод toString в объектах – неперечислимый, его не видно в цикле for..in.
Но если мы напишем свой собственный метод toString, цикл for..in будет выводить его по умолчанию.
*/
let jack = {
   name: 'Jack',
   toString() {
      return this.name;
   }
}
// По умолчанию оба свойства выведутся:
for (const key in jack) console.log(key); // name, toString

// Можно установить для свойства enumerable:false. Тогда оно перестанет появляться в цикле for..in аналогично встроенному toString:
Object.defineProperty(jack, 'toString', { enumerable: false });
for (const key in jack) console.log(key); // name

// Неперечислимые свойства также не возвращаются Object.keys
console.log(Object.keys(jack)); // ['name']


warn("======== configurable ========");
/*
* Неконфигурируемое свойство
 Флаг неконфигурируемого свойства (configurable:false) иногда предустановлен для некоторых встроенных объектов и свойств.
Неконфигурируемое свойство не может быть удалено.
 Например, свойство Math.PI – только для чтения, неперечислимое и неконфигурируемое.
*/
let descriptor = Object.getOwnPropertyDescriptor(Math, 'PI');
console.log(JSON.stringify(descriptor, null, 2));
/*
 Соответственно изменить значение Math.PI или перезаписать его невозможно. delete Math.PI тоже не сработает.

! Если свойство определено как неконфигурируемое - то изменить это уже невозможно!
 Мы не сможем отменить это действие, потому что defineProperty не работает с неконфигурируемыми свойствами.
Проще говоря неконфигурируемое свойство - это константа.
*/
let michael = {};
Object.defineProperty(michael, 'name', {
   value: 'Michael',
   configurable: false,
});
// Object.defineProperty(michael, 'name', {writable: true}); //! Ошибка!


//* Object.defineProperties(obj, descriptors) позволяет определять множество свойств сразу.
let johnSmith = {};
Object.defineProperties(johnSmith, {
   name: { value: 'John', enumerable: true, /* ... */ },
   surName: { value: 'Smith', enumerable: true },
   // ...
});


/*
* Object.getOwnPropertyDescriptors возвращает дескрипторы всех свойств, включая свойства-символы.
При клонировании объекта через присвоение копируются свойства без флагов и без символьных свойств.
*/

warn("======== Глубокое клонирование ========");
// Вместе с Object.defineProperties этот метод можно использовать для клонирования объекта вместе с его флагами.
let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(johnSmith));
console.log(clone); // {name: 'John', surName: 'Smith'}


//* Методы доступа к объекту
Object.preventExtensions(obj); // Запрещает добавлять новые свойства в объект.

Object.seal(obj); // Запрещает добавлять/удалять свойства. Устанавливает configurable: false для всех существующих свойств.

Object.freeze(obj); // Запрещает добавлять/удалять/изменять свойства. Устанавливает configurable: false, writable: false
// для всех существующих свойств.


//* Методы проверки доступа
Object.isExtensible(obj); // Возвращает false, если добавление свойств запрещено, иначе true.

Object.isSealed(obj); // Возвращает true, если добавление/удаление свойств запрещено и для всех
// существующих свойств установлено configurable: false.

Object.isFrozen(obj); // Возвращает true, если добавление/удаление/изменение свойств запрещено,
// и для всех текущих свойств установлено configurable: false, writable: false.



warn("===== Свойства - геттеры и сеттеры =====");
/*
* Есть два типа данных, это:
 · свойства-данные (data properties).
 · свойства-аксессоры (accessor properties).
 Вторые, по своей сути это функции, которые используются для присвоения(set) и получения(get) значения, но во внешнем коде
они выглядят как обычные свойства объекта.

* Свойства-аксессоры представлены методами: «геттер» – для чтения и «сеттер» – для записи. 
При литеральном объявлении объекта они обозначаются get и set.
*/
let star = {
   name: 'Alice',
   surname: 'Cooper',
   get fullName() {
      return `${this.name} ${this.surname}`; // геттер срабатывает при чтении obj.propName (star.fullName в данном примере)
   },
   set fullName(value) {
      [this.name, this.surname] = value.split(' '); // сеттер срабатывает при записи obj.propName = value
   }
}
console.log(star.fullName); // Alice Cooper
star.fullName = 'Nick Nolty';
console.log(star.fullName); // Nick Nolty

//! Геттер срабатывает, когда obj.propName читается, сеттер – когда значение присваивается.

/*
* Дескрипторы свойств доступа (свойств-аксессоров)
 Свойства-аксессоры не имеют value и writable, но взамен предлагают функции get и set.
То есть, дескриптор аксессора может иметь:
 · get – функция без аргументов, которая сработает при чтении свойства
 · set – функция, принимающая один аргумент, вызываемая при присвоении свойства
 · enumerable – то же самое, что и для свойств-данных
 · configurable – то же самое, что и для свойств-данных
*/
let userInfo = {
   name: 'Alex',
   serName: 'Jones'
}
Object.defineProperty(userInfo, 'fullName', {
   get() {
      return `${this.name} ${this.serName}`;
   },
   set(value) {
      [this.name, this.serName] = value.split(' ');
   }
})
console.log(userInfo.fullName); // Alex Jones
userInfo.fullName = 'Michael Jackson';
console.log(userInfo.fullName); // Michael Jackson


/*
* Умные геттеры/сеттеры
 Геттеры/сеттеры можно использовать как обёртки над «реальными» значениями свойств, 
чтобы получить больше контроля над операциями с ними.
*/

// Запрет на установку имени, короче четырёх символов
let userInf = {
   get name() {
      return this._name;
   },
   set name(value) {
      if (value.length < 4) {
         alert('Это имя слишком короткое.');
         return;
      } this._name = value;
   }
}
// userInf.name = 'Ira'; //! вызовет alert
userInf.name = 'Irina';
console.log(userInf.name); // Irina
console.log(Object.getOwnPropertyDescriptors(userInf)); // {name: {…}, _name: {…}}


/*
* Замена дня рожденья(birthday) на возраст(аge)
		function User(name, birthday) {         function User(name, age) {
		   this.name = name;              =>       this.name = name;
		   this.birthday = birthday;               this.age = age;
		}                                       }
* Чтобы не потерять свойство "age" в старом коде, можно добавить для него геттер.
*/
function User(name, birthday) {
   this.name = name;
   this.birthday = birthday;

   Object.defineProperty(this, "age", {
      get() {		
         let todayYear = new Date().getFullYear();
         return todayYear - this.birthday.getFullYear();
      }
   })
}
let john = new User("John", new Date(1980, 6, 1));
console.log(john.birthday); // Tue Jul 01 1980 00:00:00…
console.log(john.age); // 42
console.log(Object.getOwnPropertyDescriptors(john)); // {name: {…}, birthday: {…}, age: {…}}


