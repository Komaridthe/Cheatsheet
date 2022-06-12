

// Одной сторокой преобразовать user в JSON, затем прочитать этот JSON в другую переменную.
let user = {
   name: "Василий Иванович",
   age: 35,
   info: {
      occupation: 'Царь Всея Руси',
      property: 'Русь'
   }
};
let user2 = JSON.parse(JSON.stringify(user));
console.log(user2);

// Перевести объект в формат JSON исключив функцией данные постояльцев .
let meetup = {
   title: "Conference",
   participants: [{ name: "John" }, { name: "Alice" }],
   place: 'room_23',
};

console.log(JSON.stringify(meetup, function (key, value) {
   return (key == 'name') ? undefined : value;
}));


// Вывести в "log" объект "user" в формате JSON с отступоми
let user3 = JSON.stringify(user, null, 2);
console.log(user3);



// Написать фукцию в reviver, которая переведёт строчную дату в объект Date
let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';

console.log(JSON.parse(str, function (key, value) {
   if (key == 'date') return date = new Date(value);
   return value;
}));




























