let { warn } = console;


//* JSON (JavaScript Object Notation) – это общий формат для представления значений и объектов.

warn("======== JSON.stringify и JSON.parse ========");
// JSON.stringify для преобразования объектов в JSON.
// JSON.parse для преобразования JSON обратно в объект.
let student = {
  name: "John",
  age: 30,
  isAdmin: false,
  courses: ["html", "css", "js"],
  wife: null,
};
console.log(student);

let json = JSON.stringify(student); // Метод JSON.stringify(...) берёт объект и преобразует его в строку.
console.log(json);
console.log(typeof json); // string
let parse = JSON.parse(json);
console.log(parse);

/*
! ОБРАТИТЬ ВНИМАНИЕ, что объект в формате JSON имеет несколько важных отличий от объектного литерала:
  1) Строки используют ТОЛЬКО двойные кавычки. Так 'John' становится "John".
  2) Имена свойств объекта также заключаются в двойные кавычки. ЭТО ОБЯЗАТЕЛЬНО. Так age:30 становится "age":30.

JSON поддерживает следующие типы данных:
· Объекты { ... }
· Массивы [ ... ]
· Примитивы:
 · строки,
 · числа,
 · логические значения true/false,
 · null.


 JSON является независимой от языка спецификацией для данных, поэтому JSON.stringify пропускает 
некоторые специфические свойства объектов JavaScript:
 · Свойства-функции (методы).
 · Символьные свойства.
 · Свойства, содержащие undefined.
*/
let userName = {
  sayHi() {
    // будет пропущено
    alert("Hello");
  },
  [Symbol("id")]: 123, // также будет пропущено
  something: undefined, // и это - пропущено
};
console.log(userName);
let userNameJson = JSON.stringify(userName);
console.log(userNameJson); // {}

// Вложенные объекты поддерживаются и конвертируются автоматически.
let meetup = {
  title: "Conference",
  room: {
    number: 23,
    participants: ["john", "ann"],
  },
};
console.log(meetup);
let meetupJson = JSON.stringify(meetup);
console.log(meetupJson);

//! ВАЖНОЕ ОГРАНИЧЕНИЕ: не должно быть циклических ссылок.
let room = {
  number: 23,
};

let meetup2 = {
  title: "Conference",
  participants: ["john", "ann"],
};

meetup2.place = room; // meetup2 ссылается на room
room.occupiedBy = meetup2; // room ссылается на meetup2

// JSON.stringify(meetup2); //! Ошибка: Преобразование цикличной структуры в JSON


warn("============ replaser =============");
/*
 Полный синтаксис JSON.stringify:
let json = JSON.stringify(value, [replacer, space])

 · value - значение для кодирования.
 · replacer - массив свойств для кодирования или функция соответствия function(key, value).
 · space - дополнительное пространство (отступы), используемое для форматирования.
*/
// room всё таже
let meetup3 = {
  title: "Conference",
  participants: [{ name: "John" }, { name: "Alice" }],
  place: room, // meetup ссылается на room
};

room.occupiedBy = meetup3; // room ссылается на meetup
console.log(JSON.stringify(meetup3, ["title", "participants"]));
// Список свойств применяется ко всей структуре объекта. Так что внутри participants – пустые объекты,
// потому что name нет в списке.
console.log(
  JSON.stringify(meetup2, ["title", "participants", "place", "name", "number"])
);

// В качестве replacer можно использовать функцию, а не массив.
console.log(
  JSON.stringify(meetup2, function replacer(key, value) {
    console.log(`${key} ${value}`);
    return key == "occupiedBy" ? undefined : value; // Чтобы игнорировать occupiedBy
  })
);


warn("============= space =============");
/*
 Третий аргумент в JSON.stringify(value, replacer, space) – это количество пробелов,
используемых для удобного форматирования.
 Аргумент space используется исключительно для вывода в удобочитаемом виде.
*/
let user = {
  name: "John",
  age: 25,
  roles: {
    isAdmin: false,
    isEditor: true,
  },
};
// space = 2 указывает JavaScript отображать вложенные объекты в несколько строк с отступом в 2 пробела
// внутри объекта:
console.log(JSON.stringify(user, null, 2));


warn("============= «toJSON» =============");
/*
 Как и toString для преобразования строк, объект может предоставлять метод toJSON для преобразования в JSON.
JSON.stringify автоматически вызывает его, если он есть.
*/
let place = {
  room: 23,
};

let meetup4 = {
  title: "Conference",
  date: new Date(Date.UTC(2017, 0, 1)),
  place,
};
console.log(JSON.stringify(meetup4));
/*
{"title":"Conference","date":"2017-01-01T00:00:00.000Z","place":{"room":23}}

 date стал строкой потому, что все объекты типа Date имеют встроенный метод toJSON,
который возвращает такую строку.
*/
// Добавляем собственную реализацию метода toJSON в объект place(roomNumber)
let roomNumber = {
  number: 23,
  toJSON() {
    return this.number;
  },
};

let meetup5 = {
  title: "Conference",
  roomNumber,
};
console.log(JSON.stringify(meetup5));
console.log(JSON.stringify(roomNumber));


warn("============= JSON.parse =============");
/* Метод используется для декодиррования JSON-строки обратно в объект
 let value = JSON.parse(str, [reviver]);
 · str - JSON для преобразования в объект.
 · reviver - Необязательная функция, которая будет вызываться для каждой пары (ключ, значение)
и может преобразовывать значение.
*/
let userTwo =
  '{ "name": "John", "age": 35, "isAdmin": false, "friends": [0,1,2,3] }';
userTwo = JSON.parse(userTwo);
console.log(userTwo.friends[1]);

// Использование reviver
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let strMeetup = JSON.parse(str);
console.log(strMeetup);
// console.log(strMeetup.date.getDate()); //! ERROR!!
/*
 Значением meetup.date является строка, а не Date объект. Как JSON.parse мог знать,
что он должен был преобразовать эту строку в Date?
 Для корректной работы необходимо в JSON.parse вторым аргументом передать функцию, которая
возвращает все значения «как есть», и date станет Date. 
*/

let reviverMeetup = JSON.parse(str, function (key, value) {
  if (key == "date") return (date = new Date(value));
  return value;
});
console.log(reviverMeetup);
console.log(reviverMeetup.date.getDate());
