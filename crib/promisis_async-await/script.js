
/*
 Встроенная функция setTimeout использует колбэк-функции. Создайте альтернативу, использующую промисы.
Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд,
так чтобы мы могли добавить к нему .then:
*/
function delay(ms) {
   // ваш код
}
delay(3000).then(() => console.log('выполнилось через 3 секунды'));


// Переписать fetch запрос с промисов на asinc/await
const url = 'https://jsonplaceholder.typicode.com/todos/1';

// function fetchTodos() {
//    console.log('FetchTodos started....');
//    return delay(2000) // эмитаыия задержки с ответом сервера
//       .then(() => fetch(url)) // реальный запрос на сервер
//       .then(responce => responce.json()) // вызываем метод json()
// }

// fetchTodos()
//    .then(data => console.log('Data:', data))
//    .catch((e) => console.log(e))
// ------------------------------------------------------------------



/*
 fetch запрос на сервер:
 · сделать запрос о пользователе на GitHab. Адрес: "https://api.github.com/users/komaridthe"
 · отобразить аватар пользователя в начале тега <body>
 · картинка должна исчезнуть чероз три секунды
*/



// Переписать, используя async/await
function loadJson(url) {
   return fetch(url)
      .then(response => {
         if (response.status == 200) {
            return response.json();
         } else {
            throw new Error(response.status);
         }
      })
}
// loadJson('no-such-user.json').catch(alert); // Error: 404

async function loadJson(url) {
   let response = await fetch(url);
   if (response.status == 200) {
      let json = response.json();
      return json;
   }
   throw new Error(response.status)
}