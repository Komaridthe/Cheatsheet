/*
 Встроенная функция setTimeout использует колбэк-функции. Создайте альтернативу, использующую промисы.
Функция delay(ms) должна возвращать промис, который перейдёт в состояние «выполнен» через ms миллисекунд,
так чтобы мы могли добавить к нему .then:
*/
function delay(ms) {
   // ваш код
   return new Promise(resolve => setTimeout(resolve, ms))
}

delay(2000).then(() => console.log('выполнилось через 2 секунды'));


// Переписать fetch запрос с промисов на asinc/await
const url = 'https://jsonplaceholder.typicode.com/todos/1';
/*
function fetchTodos() {
   console.log('FetchTodos started....');
   return delay(2000) // / эмитаыия задержки с ответом сервера
      .then(() => fetch(url)) // реальный запрос на сервер
      .then(responce => responce.json()) // вызываем метод json()
}

fetchTodos()
   .then(data => console.log('Data:', data))
   .catch((e) => console.log(e))
*/

async function fetchTodos() {
   console.log('FetchTodos started....');
   try {
      await delay(2000); // некая задержка с ответом сервера
      let responce = await fetch(url);  // берём ответ в переменную 
      let data = await responce.json(); // берём переведённый json() в переменную
      console.log('Data:', data);
   } catch (e) {
      console.error(e);
   }
}
fetchTodos();


/*
 fetch запрос на сервер:
 · сделать запрос о пользователе на GitHab. Адрес: "https://api.github.com/users/komaridthe"
 · отобразить аватар пользователя в начале тега <body>
 · картинка должна исчезнуть чероз три секунды
*/
async function gitRequest() {
   let gitResponse = await fetch(`https://api.github.com/users/komaridthe`);
   let gitData = await gitResponse.json();

   let img = document.createElement('img');
   img.src = gitData.avatar_url;
   img.style.height = 300 + 'px';
   document.body.prepend(img);

   await new Promise(r => setTimeout(r => img.remove(), 3000));
};
gitRequest();


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




// loadJsonAsync('no-such-user.json').catch(alert); // Error: 404













