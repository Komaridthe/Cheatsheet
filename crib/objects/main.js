let {warn} = console;


warn("======== Создание объекта ========");
let userInf = new Object(); // синтаксис "Конструктор объекта"
let userInform = {}; // синтаксис "литерал объекта"


//* Свойства объектов. Ключ + значение
let userInfo = {
	name: "Вася", // Свойств объекта
	age: 30, // Последняя "висячая" запятая
};
console.log(userInfo);
console.log(userInfo.age);


warn("======== Имена свойств ========");
//* Имя из двух и более слов
let userInfa = {
	name: "Вася",
	age: 30,
	"I like JS": true,
};
console.log(userInfa.age);
console.log(userInfa["I like JS"]); // Ключ в одно слово тоже можно выводить через скобки.
console.log(userInfa["age"]);  // И он имеет преимущество перед точкой. Об этом далее.


//* Вычесляемое либо передаваемое имя
// вычисляем имя
let firstPart = "likes";
let userIn = {
	name: "Вася",
	age: 30,
	[firstPart + " js"]: true,
};
console.log(userIn["likes js"]);


// Передаём имя
let firstParts = "likes";
let userInc = {
	name: "Вася",
	age: 30,
	[firstParts]: true,
};
console.log(userInc[firstParts]);


//! Преимущество квадратных скобок
let key = "name";
console.log(userInc[key]); // Вася. Вывод значения через точку выдаст значение UNDEJINED


//* Зарезервированные слова в именах
let userInfor = {
	let: "Igor", // Как видно эти слова в имнах объектов писать можно
	for: 30,  // ошибки это не вызовет
};
console.log(userInfor.let);
console.log(userInfor.for);


//* Имена строки либо символы
userI = {
	0: "Vasia", // 0 тоже самое что и "0"
};
console.log(userI[0]);  // NUMBER превратится в STRING
console.log(userI["0"]);


warn("======== Тип данных SYMBOL ========");
//* Создаём символ id с описанием (именем) "id"
let id = Symbol("id");
let useInfo = {
	name: "Goga",
	age: 23,
	[id]: "Некое значение",
};
console.log(useInfo);
/*
* Основные применения символов:
 · "Скрытые" свойства объектов
    Символьное свойство не появится в for .. in
 · Использование системных символов
   Symbol.itarator, Symbol.toPrimitive и т.д.
*/

//* Вложенность
let userInff = {
	name: "Vitia",
	age: 40,
	address: {
		city: "SPb",
		street: "Lenina",
	}
};
console.log(userInff);
console.log(userInff.address);
console.log(userInff.address.city);


//* Свойство переменной
function makeUserInfo(name, age) {
	return {
		name: name,
		age: age,
		// ... и другие свойства
	};
}
let user = makeUserInfo("Маша", 31);
console.log(user);

//! Если имя объекта тоже, что и значение, то записть можно упростить
function makeUserInf(name, age) {
	return {
		name, // Тоже самое, что и name: name,
		age, // Тоже самое, что и age: age,
		"like JS": true,
		// ... и другие свойства
	};
}
let userData = makeUserInf("Маша", 31);
console.log(userData);


warn("======== Изменение объекта ========");
//* Добавление свойства
let userDataFiles = {
	name: "Kirill",
};
console.log(userDataFiles);

userDataFiles.age = 35;
console.log(userDataFiles);

userDataFiles["I like JS"] = true;
console.log(userDataFiles);

userDataFiles.address = {
	city: "Moskow",
	street: "Tverskaya",
};
console.log(userDataFiles);
console.log(userDataFiles.address);


//* Удаление свойства
let userIng = {
	name: "Vitia",
	age: 40,
	"Common files": 123,
	address: {
		city: "SPb",
		street: "Lenina",
	}
};
console.log(userIng);

delete userIng.age;
console.log(userIng);

delete userIng.address.city;
console.log(userIng);

delete userIng["Common files"];
console.log(userIng);


//* Изменение свойства
let userDatFiles = {
	name: "Maxim",
	age: 33,
};
console.log(userDatFiles);

userDatFiles.age = 18;
console.log(userDatFiles);


//* Изменение свойства в константе
const infoUser = {
	name: "Peter",
	age: 30,
}
console.log(infoUser);

infoUser.age = 31;
console.log(infoUser);

/*
* Копирование объектов
!  При копировании объекта в другую переменную сам объект не дублируется, а копируестя только ссылка на него.
! При изменеии "нового" объека изменится и "старый"
*/
let usInfo = {
	name: "Irina",
	age: 19,
};
console.log(usInfo);

let userIrina = usInfo;
console.log(userIrina);

userIrina.age = 20;
console.log(userIrina);
console.log(usInfo);

//* Дублирование объектов (Object.assign)
// Синтаксис: Object.assign(куда(объект), что(свойство №1), что(свойство №2), ...)
let userInfoData = {
	name: "Maria",
	age: 18,
};

let maria = Object.assign({}, userInfoData);

maria.age = 19;
console.log(userInfoData);
console.log(maria);


//* Добавление значений через Object.assign
let katia = {
	name: "Ekaterina",
	age: 20,
};

Object.assign(katia, { ["lovly pet"]: "Dog", address: { city: "SPb", street: "Mira" } });
console.log(katia);
console.log(katia.address);


//* Проверка существования свойства
let uInfo = {
	name: "Goga",
	age: 5,
};
console.log(uInfo.age);

if (uInfo.age) { // true или false
	console.log(uInfo.age);
};

//* Опциональная цепочка
let myInfo = {
	name: "Nick",
	age: 33,
	// address:{
	// 	city: "Sestroretsk",
	// 	street: "Transportnaya",
	// }
};
// console.log(myInfo.address.city);  // Данный синтаксис запускает проверку и выдаст ошибку.
console.log(myInfo?.address?.city);   // В этом случае выдаст undefined


//* Оператор "in"
let myInform = {
	name: "Nick",
	age: 33,
	address: {
		city: "Sestroretsk",
		street: "Transportnaya",
	}
};

if ("name" in myInform) {
	console.log(myInform.name);
}
/*
 В большенстве случаев сработает сравнение с undefined либо опционалльная зепочка ?.
Но есть особый случай, когда свойство существует, но содержит свойство undefined.
! В этом случае необходимо использовать "in".
*/
let myInfrm = {
	name: undefined,
	age: 33,
};
// if(myInfrm.name){  // false
// 	console.log(myInfrm.name);
// }
if ("name" in myInfrm) { // true
	console.log(myInfrm.name);
}


warn("======== Цикл 'for..in' ========"); 
/*
 Цикл используется для перебора всех свойств объекта

for (let key in object) {
	Тело цикла выполняется для каждого свойства объекта
}
*/
let iid = Object("id");
let myInformation = {
	name: "Nick",
	age: 33,
	[id]: "qwerty", //! Не будет выведен в консоль
	address: {
		city: "Sestroretsk",
		street: "Transportnaya",
	}
};

for (let key in myInformation) {
	// Ключи
	console.log(key); //! name, age, address, но не [id] !!!!
	// Значения ключей
	console.log(myInformation[key]); // Nick, 33, Object {}
}

for (let key in myInformation.address) {
	// Ключи
	console.log(key); // city, streeet
	// Значения ключей
	console.log(myInformation.address[key]); // Sestroretsk, Transportnaya
}


//* Методы объекта
let myInformationn = {
	name: "Nick",
	age: 33,
	address: {
		city: "Sestroretsk",
		street: "Transportnaya",
	},
	// showInfo: function(){
	// 	console.log(`${myInformationn.name}, ${myInformationn.age} лет., Адрес г. ${myInformationn.address.city}, ул. ${myInformationn.address.street}`)
	// }
	showInfo() {
		console.log(`${myInformationn.name}, ${myInformationn.age} лет., Адрес г. ${myInformationn.address.city}, ул. ${myInformationn.address.street}`)
	}
};
myInformationn.showInfo();


//* Использование "this"
// "this" подразумевает текущий объект(обращение к родительскому объекту)
let myInfa = {
	name: "Nick",
	age: 33,
	address: {
		city: "Sestroretsk",
		street: "Transportnaya",
	},
	showInfo() {
		// console.log(`${myInfa.name}, ${myInfa.age} лет., Адрес г. ${myInfa.address.city}, ул. ${myInfa.address.street}`)
		console.log(`${this.name}, ${this.age} лет., Адрес г. ${this.address.city}, ул. ${this.address.street}`)
	}
};
myInfa.showInfo();


//! У стрелочной функции как бы не существует вложенности и возможен только такой синтаксис (обёртывание)
let myInfara = {
	name: "Nick",
	age: 33,
	address: {
		city: "Sestroretsk",
		street: "Transportnaya",
	},
	showMyInf() {
		let show = () => console.log(`${this.name}, ${this.age} лет., Адрес г. ${this.address.city}, ул. ${this.address.street}`)
		show();
	}
};
myInfara.showMyInf();


warn("======== Функция-конструктор ========");
/*
 Обычный синтаксис создания объекта {..} позволяет создать только один объект.
Но за частую нам нужно создать множество однотипных объектов, таких как пользователи,
элементы меню и т.д. Это можно создать при помощи функции - конструктора и оператора "new".

* Функции конструкторы являтся обычнвми функциями но есть два правила:
 · Имя функции-конструктора начинается с большой буквы
 · Функция-конструктор должна вызываться при помощи оператора "new".
*/
function UserInfo(name) {
	// this = {}; Автоматически создаётся пустой объект (неявно)

	this.name = name;
	// return this;
	this.age = 39;

	// returne this; Автоматически возвращает объект (неявно)
}
console.log(new UserInfo('Вася'));
console.log(new UserInfo('Петя'));


warn("===== Преобразование объектов в примитивы =====");
/*
 Любой объект имеет свойство valueOf() и toString().
Всякий раз, при создании объекта, необходимо переопределять эти методы.

 · toString() - возвращает строковое значение обьекта
 · valueOf() - возвращает с типом number или когда способ не определен.

 Функция alert() всегда возвращает строковое значение и нужно, чтобы обьект выглядел понятнее,
то его можно представить в нужном виде.
 Если же с этим объектом часто происходят математические операции, то можно сказать
с каким числом можно выполнять операции.
 Например:
*/

let car = {
	model: "HONDA",
	year: 2000,

	// вывести объект с названием авто
	toString() {
		return this.model;
	},

	// вывести год выпуска авто
	valueOf() {
		return this.year;
	},
};

// alert(car); // HONDA. Функция alert неявно преобразовала объект в строку
// происходит car.toString();

let newCarYear = car + 21; // складываем год и число 21.
// так как нам нужно число, то происходит car.valueOf();
// alert(newCarYear); // 2021 (2000 + 21)


//! [Symbol.toPrimitive](hint) - запись, объединяющая оба метода переопределения

let user1 = {
	name: 'John',
	money: 1000,

	[Symbol.toPrimitive](hint) {
		console.log(`hint: ${hint}`);
		return hint == 'string' ? this.name : this.money;
	},

	// Код выше переопределяет сразу два метода вывода
	// Код ниже переопределяет возвращает либо строковое(toString()) значение объекта,
	// либо либо с типом number (valueOf())

	toString() {
		return `{name: "${this.name}"}`;
	},
	valueOf() {
		return this.money;
	}
};

console.log(user1);
console.log(+user1);
console.log(user1 + 500);
console.log(user1 + 'KJh');




























