/*
 Задачи:  
 · создать собственный базовый класс ошибкии (MyError), который будет автоматически прописывать имя нового класса ошибки
 · добавить класс ValidationError (наследует от MyError) и дополнить его более конкретными классами ошибок,
 которые будут нести дополнительную информацию о свойстве, которое отсутствует (PropertyRequiredError).
 · создать функцию readUser(json), которая должна читать данные пользователя в формате JSON, конвертировать их 
 в объект и проверять его на наличие свойств "name" и "age".
 · допустить ошибку в блоке try..catch: 
    a) readUser('{ bad jsoon }');
    b) readUser('{ "name": "John" }');
*/
let json = `{ "name": "John", "age": 30 }`;

class MyError extends Error {
   constructor(message) {
      super(message);
      this.name = this.constructor.name;
   }
};

class ValidationError extends MyError { };

class PropertyRequiredError extends ValidationError {
   constructor(property) {
      super("Нет свойства: " + property);
      this.property = property;
   }
};

function readUser(json) {
   let user = JSON.parse(json);
   if (!user.name) {
      throw new PropertyRequiredError(`"name"`);
   }
   if (!user.age) {
      throw new PropertyRequiredError(`"age"`);
   }
   return user;
};

try {
   readUser('{ "name": "Jhon" }'); // readUser('{ bad jsoon }');
} catch (err) {
   if (err instanceof ValidationError) {
      console.log("Неверные данные: " + err.message);
   } else if (err instanceof SyntaxError) {
      console.log("JSON Ошибка Синтаксиса: " + err.message);
   } else {
      throw err;
   }
};

















