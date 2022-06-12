/*
 Написать пример прокси для защиты свойства, начинающиеся на _, от доступа извне.
 · get – для того, чтобы сгенерировать ошибку при чтении такого свойства (прописать возможность доступа собственного метода),
 · set – для того, чтобы сгенерировать ошибку при записи,
 · deleteProperty – для того, чтобы сгенерировать ошибку при удалении,
 · ownKeys – для того, чтобы исключить такие свойства из for..in и методов типа Object.keys.
Сделать проверки.
*/
let user = {
   name: 'Ivan',
   _password: '******'
};

user = new Proxy(user, {
   get(target, prop) {
      if (prop.startsWith('_')) {
         throw new Error('Protected property!');
      } else {
         let value = target[prop];
         return (typeof value === 'function') ? value.bind(target) : value;
      }
   },
   set(target, prop, val) {
      if (prop.startsWith('_')) {
         throw new Error('Protected property!');
      } else {
         target[prop] = val;
         return true;
      }
   },
   deleteProperty(target, prop) {
      if (prop.startsWith('_')) {
         throw new Error('Protected property!');
      } else {
         delete target[prop];
         return true;
      }
   },
   ownKeys(target) {
      return Object.keys(target).filter(key => !key.startsWith('_'));
   }
});

try {
   console.log(user._password);
} catch (e) {
   console.log(e.message);
};

try {
   user._password = '123456';
} catch (e) {
   console.log(e.message);
};

try {
   delete user._password;
} catch (e) {
   console.log(e.message);
}

for (key in user) console.log(key);


/*
 Обычно при чтении несуществующего свойства из объекта возвращается undefined.
Создайте прокси, который генерирует ошибку при попытке прочитать несуществующее свойство.
 Напишите функцию wrap(target), которая берёт объект target и возвращает прокси, 
добавляющий в него этот аспект функциональности.
*/
let userTwo = {
   name: "John"
};

function wrap(target) {
   return new Proxy(target, {
      get(target, prop, receiver) {
         if (prop in target) {
            return Reflect.get(target, prop, receiver);
         } else {
            throw new ReferenceError(`Свойство "${prop}" не существует!`);
         }
      }
   });
};

userTwo = wrap(userTwo);

console.log(userTwo.name); // John
// console.log(userTwo.age); // Ошибка: такого свойства не существует


/*
 В некоторых языках программирования возможно получать элементы массива, используя отрицательные индексы,
отсчитываемые с конца.
 let array = [1, 2, 3]; 
 array[-1]; // 3, последний элемент
 array[-2]; // 2, предпоследний элемент
 array[-3]; // 1, за два элемента до последнего
Другими словами, array[-N] – это то же, что и array[array.length - N].
Создайте прокси, который реализовывал бы такое поведение.
*/
let array = [1, 2, 3];

array = new Proxy(array, {
   get(target, prop, reciver) {
      if (prop < 0) {
         // даже если обращение к элементу идёт как arr[1] prop является строкой, нужно преобразовать её к числу
         prop = +prop + target.length;
      }
      return Reflect.get(...arguments);
   }
});
console.log(array[-1]); // 3
console.log(array[-2]); // 2






