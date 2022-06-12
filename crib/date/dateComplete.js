
// Создайть объект Date для даты: 20 февраля 2012 года, 3 часа 12 минут. Временная зона – местная.
let a = new Date('2012-02-20T15:12:00');
let b = new Date(2012, 1, 20, 3, 12);
console.log(a);

//=============================================================================
/*
 Написать функцию getWeekDay(date), показывающую день недели в коротком формате:
«ПН», «ВТ», «СР», «ЧТ», «ПТ», «СБ», «ВС».
Вывести ответ на страницу в параграф (p).
*/
let date2 = new Date(2012, 0, 3);
function getWeekDay(date) {
   let days = ['«ВС»', '«ПН»', '«ВТ»', '«СР»', '«ЧТ»', '«ПТ»', '«СБ»'];
   return days[date.getDay()];
}
let div = document.querySelector('div');
div.textContent = getWeekDay(date2);


//=============================================================================
/*
 В Европейских странах неделя начинается с понедельника (день номер 1), затем идёт вторник (номер 2)
и так до воскресенья (номер 7). Напишите функцию getLocalDay(date), которая возвращает
«европейский» день недели для даты date.
*/
function getLocalDay(date) {
   let day = date.getDay();
   if (day == 0) day == 7;
   return day;
}
console.log(getLocalDay(new Date()));


//=============================================================================
/*
 Создайте функцию getDateAgo(date, days), возвращающую число, которое было days дней назад от даты date.
К примеру, если сегодня двадцатое число, то getDateAgo(new Date(), 1) вернёт девятнадцатое.
*/
function getDateAgo(date, days) {
   return date.getDate(date.setDate(date.getDate() - days)); // добавляем к старой дате новое значение
}
console.log(getDateAgo(new Date(), 2));


//=============================================================================
/*
 Напишите функцию getLastDayOfMonth(year, month), возвращающую последнее число месяца.
Иногда это 30, 31 или даже февральские 28/29.
 Параметры:
year – год из четырёх цифр, например, 2012.
month – месяц от 0 до 11.
 К примеру, getLastDayOfMonth(2012, 1) = 29 (високосный год, февраль).
*/
function getLastDayOfMonth(year, month) {
   let date = new Date(year, month + 1, 0); // 0 откатывает день назад и JS сам исправляет дату
   return date.getDate();
}
console.log(getLastDayOfMonth(2021, 1));
/*
 Обычно даты начинаются с 1, но технически возможно передать любое число, и дата сама себя поправит.
Так что если передать 0, то это значение будет соответствовать «один день перед первым числом месяца»,
другими словами: «последнее число прошлого месяца».
*/

//=============================================================================

// Напишите функцию getSecondsToday(), возвращающую количество секунд с начала сегодняшнего дня.
// Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.
function getSecondsToday() {
   let now = new Date();
   let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

   return answer = Math.round((now - today) / 1000);
}
console.log(getSecondsToday());


//=============================================================================

// Создайте функцию getSecondsToTomorrow(), возвращающую количество секунд до завтрашней даты.
// Функция должна работать в любой день, т.е. в ней не должно быть конкретного значения сегодняшней даты.
function getSecondsToTomorrow() {
   let now = new Date();
   let sec = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
   return 24 * 3600 - sec;
}
console.log(getSecondsToTomorrow());


function getSecondsToTomorrowTwo() {
   let now = new Date();
   // завтрашняя дата
   let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

   let diff = tomorrow - now; // разница в миллисекундах
   return Math.round(diff / 1000); // преобразуем в секунды
}
console.log(getSecondsToTomorrowTwo());












