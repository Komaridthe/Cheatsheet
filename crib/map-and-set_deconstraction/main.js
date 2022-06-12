const { warn } = console;


warn('============= Map =============');
/*
 Map - это коллекция ключ/значение, как и Object.
Но основное отличие в том, что Map позволяет использовать ключи любого типа.
*/

//* Методы и свойства
// new Map() - создание новой коллекции
let map = new Map();
console.log(map);


/*
 map.set(key, value) - добавление значения (value) по ключу(key).
Ключём может являться любой тип данных (number, str, boolean..) даже NaN или Object.
В отличии от объектов ключи не будут приведены к строкам!
 Важная деталь! Если добавитть свойство с ключём, который уже есть в Map,
то действие будет проигнорировано!
*/
map.set(10, 'number 10');
map.set(10, 'number 10');
console.log(map);

map.set('10', 'string 10');
console.log(map);

map.set(false, 'boolean');
console.log(map);

/*
 Чтобы сравнивать ключи, объект Map использует алгоритм SameValueZero. Это почти такое же сравнение,
что и ===, с той лишь разницей, что NaN считается равным NaN. Так что NaN также может использоваться
в качестве ключа.
*/
map.set(NaN, '12mp');
console.log(map);

let obj = { name: 'Nick', };
map.set(obj, 'Kom');
console.log(map);


// map.get(key) - возвращает значение по ключу или undefined если ключ отсутствует
console.log(map.get(10));
console.log(map.get(NaN));
console.log(map.get('key')); // undefined


// map.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false
console.log(map.has(10));
console.log(map.has(false));
console.log(map.has('key'));
console.log(map.has(true));


// map.delete(key) – удаляет элемент по ключу key
console.log(map.delete('10')); // вернёт true
console.log(map);

// map.size – возвращает текущее количество элементов
console.log(map.size);


// map.clear() – очищает коллекцию от всех элементов
map.clear()
console.log(map);


//* Цепочка взовов
// Каждый вызов map.set возвращает объект map, так что мы можем объединить вызовы в цепочку
map.set('1', 'str1')
   .set(1, 'num1')
   .set(true, 'bool1');
console.log(map);


//* Перебор Map
// Для перебора коллекции Map есть 3 метода:
let recipeMap = new Map([
   ['Помидор', 500],
   ['Огурец', 350],
   ['Лук', 50]
]);

// map.keys() – возвращает итерируемый объект по ключам
for (let vegetable of recipeMap.keys()) {
   console.log(vegetable);
}


// map.values() – возвращает итерируемый объект по значениям
for (let amount of recipeMap.values()) {
   console.log(amount);
}


// map.entries() – возвращает итерируемый объект по парам вида [ключ, значение],
//  этот вариант используется по умолчанию в for..of
for (let entry of recipeMap.entries()) {
   console.log(entry);
}


// Так же, Map имеет встроенный метод forEach, схожий со встроенным методом массивов
recipeMap.forEach((value, key, map) => { // выполняем функцию для каждой пары (ключ, значение)
   console.log(`${key}: ${value}`);
})

/*
* Object.entries: Map из Object
 Если нам необходимо создать Map из объекта, то поможет встроенный метод Object.entries(obj),
который получает объект и возвращает массив пар ключ-значение для него.
*/
let user = {
   name: 'Micke',
   age: 34,
}
let userMap = Object.entries(user);
console.log(userMap);

/*
* Object.fromEntries: Object из Map
 Метод противоположен предыдущему. Получив массив пар вида [ключ, значение],
он создаёт из них объект.
*/
let prices = Object.fromEntries([
   ['banana', 46],
   ['orange', 60],
   ['meat', 300]
]);

console.log(prices);
console.log(prices.banana);


//* Array.from: Array из Map (и из Set!!)
// Соответсятвенно можно создавать массив из Map. Сделать это можно двумя способами
let arrMap = Array.from(userMap);
console.log(arrMap);

// Второй способ через оператор "..." (spread)
let arrUsersMap = new Map([
   ['name', 'John'],
   ['age', 40],
   [prices, 'fruits'],
]);
let arrUsers = [...arrUsersMap];
console.log(arrUsers);


warn('============= Set =============')
/*
 Это особый вид коллекции: «множество» значений (без ключей),
где каждое значение может появляться только один раз.


* Методы
 new Set(iterable) – создаёт Set, и если в качестве аргумента был предоставлен итерируемый объект
 (обычно это массив), то копирует его значения в новый Set.
*/
let array = [1, 2, 3, 4, 5];
let set = new Set(array);
console.log(array);
console.log(set);
/*
 set.add(value) – добавляет значение (если оно уже есть, то ничего не делает), возвращает тот же объект set.
Это является основной "изюминкой" объекта Set, за счёт этого свойства как раз и получается,
что каждое значение появляется только один раз.
*/
set.add(6);
console.log(set);
set.add(4);
console.log(set);

// set.delete(value) – удаляет значение, возвращает true, если value было в множестве на момент вызова, иначе false.
set.delete(6);
console.log(set);
console.log(set.delete(6)); // false т.к. уже удалено строкой выше

// set.has(value) – возвращает true, если значение присутствует в множестве, иначе false.
console.log(set.has(6));
console.log(set.has(5));

// set.size – возвращает количество элементов в множестве.
console.log(set.size);

// set.clear() – удаляет все имеющиеся значения.
set.clear();
console.log(set);


//* Перебор объекта Set
// Cодержимое объекта set как с помощью метода for..of, так и используя forEach
let newSet = new Set(["апельсин", "яблоко", "банан"]);
console.log(newSet);

for (let value of newSet) console.log(value);
/*
 Функция в forEach у Set имеет 3 аргумента: значение value, потом снова то же самое значение valueAgain,
и только потом целевой объект. Это сделано для совместимости с объектом Map,
в котором колбэк forEach имеет 3 аргумента (value, key, map).
*/
newSet.forEach((value, valueAgain, set) => {
   console.log(value);
});


// Set имеет те же встроенные методы перебора, что и Map
// set.values() – возвращает перебираемый объект для значений
for (let value of newSet.values()) console.log(value);

// set.keys() – то же самое, что и set.values(), присутствует для обратной совместимости с Map
for (let value of newSet.keys()) console.log(value); // тоже что и set.values()

//  set.entries() – возвращает перебираемый объект для пар вида [значение, значение],
// присутствует для обратной совместимости с Map.
for (let value of newSet.entries()) console.log(value);

/*
 Перебор Map и Set всегда осуществляется в порядке добавления элементов, так что нельзя сказать,
что это – неупорядоченные коллекции, но поменять порядок элементов
или получить элемент напрямую по его номеру нельзя.
*/


warn('========= WeakMap и WeakSet =========');
/*
* WeakMap
 Как известно, движок JavaScript хранит значения в памяти до тех пор, пока они достижимы
(то есть, эти значения не равны null или на них есть ссылки или они являются ключами в других объектах).
 WeakMap – принципиально другая структура в этом аспекте. Она не предотвращает удаление объектов
сборщиком мусора, когда эти объекты выступают в качестве ключей.

 И главное его отличие от Map в том, что ключи в WeakMap должны быть объектами, а не примитивными значениями.
*/
let weakMap = new WeakMap();
let john = { name: "John" };

weakMap.set(john, 'old'); // Если бы ключём был не объект это вызвало бы ошибку
console.log(weakMap);
/*
 Теперь, если мы используем объект в качестве ключа и если больше нет ссылок на этот объект,
то он будет удалён из памяти (и из объекта WeakMap) автоматически.
*/
john = undefined;
console.log(weakMap);

//* В WeakMap присутствуют только следующие методы:
// weakMap.get(key) - возвращает значение по ключу или undefined если ключ отсутствует
console.log(weakMap.get(john));

// weakMap.set(key, value) - добавление значения (value) по ключу(key)
let mark = { name: 'Mark' };
console.log(weakMap.set(mark, 'new'));

// weakMap.delete(key) – удаляет элемент по ключу key
console.log(weakMap.delete(mark));
console.log(weakMap);

// weakMap.has(key) – возвращает true, если ключ key присутствует в коллекции, иначе false
console.log(weakMap.has(mark));
/*
 Почему такие ограничения? Из-за особенностей технической реализации. Если объект станет недостижим
(как объект john в примере выше), то он будет автоматически удалён сборщиком мусора.
Но в какой момент произойдёт эта очистка не известно. Это решает движок JawaScript!

 В общем эти структуры используются для автоматического удаления данных дабы не перегружать память.
К примеру пользователь сайта удалил свою анкету. Чтобы лишние данные не лежали мёртвым грузом
WeakMap удалит их тем самым ослабив нагрузку на движок.

* WeakSet
 Коллекция WeakSet ведёт себя похоже:
 1) Она аналогична Set, но мы можем добавлять в WeakSet только объекты (не примитивные значения).
 2) Объект присутствует в множестве только до тех пор, пока доступен где-то ещё.
 3) Как и Set, она поддерживает add, has и delete, но не size, keys() и не является перебираемой.
*/


warn('======= Деструктурирующее присваивание =======');
/*
 Деструктурирующее присваивание - это специальный синтаксис, который позволяет «распаковать»
массивы или объекты во множество переменных.

* Деструктуризация массива
*/
let arr = ['Vasia', 'Ivanov'];
console.log(arr);

let [firstName, surname] = arr; // деструктурирующее присваивание
console.log(firstName); // Vasia
console.log(surname); // Ivanov
/*
 Грубо говоря это просто короткий вариант записи:
let firstName = arr[0];
let surname = arr[1];
*/

// Сочетается со split или другими методами, возвращающими массив.
let [a1, b1] = 'Lev Tolsloy'.split(' ');
console.log(a1); // Lev
console.log(b1); // Tolstoy


// Ненужные элементы массива также могут быть отброшены через запятую.
// Не нужен второй элемент и все после третьего.
let [firstNameTwo, , title] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(firstNameTwo); // Julius
console.log(title); // Consul


// Работает с любым перебираемым объектом.
let [x, y, z] = 'xyz';
console.log(x);
console.log(y);
console.log(z);

let [one, two, tree] = new Set([1, 2, 3]);
console.log(one);
console.log(two);
console.log(tree);


// Можно присвоить значение свойству объекта.
let user1 = {};
[user1.name, user1.age] = "Ivan Grozny".split(' ');
console.log(user1.name);
console.log(user1.age);


// Деструктуризацию можно использовать для цикличного перебора ключей и значений объекта.
let user2 = {
   name: 'John',
   age: 30
};

for (let [key, value] of Object.entries(user2)) {
   console.log(`${key}: ${value}`)
}

// …то же самое для Мap
let map2 = Object.entries(user2);
for (let [key, value] of map2) {
   console.log(`${key}: ${value}`)
}

/*
 Если необходимо не просто получить первые значения, но и собрать все остальные,
то можно добавить ещё один параметр, который получает остальные значения,
используя оператор "rest" – троеточие ("...").
*/
let [name1, name2, ...rest] = ["Julius", "Caesar", "Consul", "of the Roman Republic"];
console.log(rest); // Переменная rest является массивом из оставшихся элементов

/*
 Если в массиве меньше значений, чем в присваивании, то ошибки не будет.
Отсутствующие значения считаются неопределёнными.
*/
let [a, b] = [];
console.log(a); // undefined
console.log(b); // undefined


// Если необходимо указать значения по умолчанию, то можно использовать =.
let [guestName = "Guest", guestSurname = "Anonymous"] = ["Julius"];
console.log(guestName); // Julius
console.log(guestSurname); // Anonymous

/*
 Значения по умолчанию могут быть гораздо более сложными выражениями или даже функциями.
Они выполняются, только если значения отсутствуют.

let [userName = prompt('Введите имя'), userSurname = prompt('Введите фамилию')] = ['Иван'];
console.log(userName); // Иван
console.log(userSurname); // из запроса prompt



* Деструктуризация объекта
 Синтаксис: let {var1, var2} = {var1:…, var2:…}

 У нас есть существующий объект с правой стороны, который мы хотим разделить на переменные.
Левая сторона содержит «шаблон» для соответствующих свойств.
В простом случае это список названий переменных в {...}.
*/
let options = {
   titleTwo: "Menu",
   width: 100,
   height: 200
};

let { titleTwo, width, height } = options;
console.log(titleTwo);
console.log(width);
console.log(height);

/*
 Если необходимо присвоить свойство объекта переменной с другим названием, например,
свойство options.width присвоить переменной w, то используется двоеточие:
*/
let { width: w, height: h } = options;
// width -> w
// height -> h
console.log(w);
console.log(h);

// Для потенциально отсутствующих свойств можно установить значения по умолчанию, используя "="
let { age = 33, sex = 'man' } = options;
console.log(age);
console.log(sex);

//! Как и в случае с массивами, значениями по умолчанию могут быть любые выражения или даже функции.

/*
 Остаток объекта «…»
Можно использовать троеточие, как и для массивов. В некоторых старых браузерах (IE) это не поддерживается,
используйте Babel для полифила.
*/
let fru = {
   banana: 10,
   apple: 20,
   cherry: 30,
};

let { banana, ...frufru } = fru;
console.log(banana); // banana = свойство с именем banana
console.log(frufru); // frufru = объект с остальными свойствами
console.log(frufru.apple); // 20


/*
 Если нам нужно использовать уже существующие переменные, то придётся заключить выражение в 
круглые скобки. Иначе JavaScript будет думать, что это блок кода и выдаст ошибку.
*/
let size = {
   min: 0.1,
   max: 1,
   average: 0.5,
};

let min, max, average;
({ min, max, average } = size); // <= вот эти круглые скобки
console.log(min);
console.log(max);
console.log(average);

/*
* Вложенная деструктуризация
 Если объект или массив содержит другие вложенные объекты или массивы, то мы можем использовать
более сложные шаблоны с левой стороны, чтобы извлечь более глубокие свойства.
*/
let option_2 = {
   size_2: {
      width_2: 100,
      height_2: 200
   },
   items_2: ["Cake", "Donut"],
   extra_2: true
};
console.log(option_2);

// Деструктуризация разбита на несколько строк для большей читабельности
let {
   size_2: {
      width_2,
      height_2
   },
   items_2: [item_x, item_y], // добавим элементов к item
   title_2 = 'Menu',
} = option_2;
console.log(title_2);
console.log(width_2);
console.log(height_2);
console.log(item_x);
console.log(item_y);
/*
 В итоге у нас есть width, height, item1, item2 и title со значением по умолчанию.
Заметим, что переменные для size и items отсутствуют, так как мы взяли сразу их содержимое.
*/


//* Умные параметры функций
// Можно передавать параметры как объект, и функция деструктурирует его в переменные
let list = {
   title: 'Menu',
   items: ['hot', 'cold']
};

function showMenu({ title = "Untitled", width: w = 200, height: h = 100, items = [] }) { // {} внутри () !!!
   console.log(`${title} ${w} ${h}`); // так же можно использовать присваивание
   console.log(items);
}
showMenu(list);



