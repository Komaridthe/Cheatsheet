
/*
 Имеется <select> id="genres".
 · Выведите значение и текст выбранного пункта.
 · Добавьте пункт: <option value="classic">Классика</option>.
 · Сделайте его выбранным.
*/
let genresSelectedOption = Array.from(genres.options).filter(option => option.selected);
console.log(genresSelectedOption.map(option => option.value));
console.log(genresSelectedOption.map(option => option.text));

// второй вариант
let selectedOption = genres.options[genres.selectedIndex];
console.log(selectedOption.value);
console.log(selectedOption.text);

let classicOption = new Option("Классика", "classic");
genres.add(classicOption); // genres.append(classicOption);
console.log(genres);

classicOption.selected = true;



/*
 Создать <div>, который превращается в <textarea>, если на него кликнуть.
<textarea> позволяет редактировать HTML в элементе <div>.
 Когда пользователь нажимает Enter или переводит фокус, <textarea> превращается обратно в <div>,
и его содержимое становится HTML-кодом в <div>.
*/
let area = null;
let view = document.getElementById('view');

view.onclick = () => editStart();

function editStart() {
   area = document.createElement('textarea');
   area.className = 'edit';
   area.value = view.innerHTML;

   area.onkeydown = (e) => {
      if (e.key == 'Enter') this.blur();
   };

   area.onblur = () => editEnd();

   view.replaceWith(area);
   area.focus();
};

function editEnd() {
   view.innerHTML = area.value;
   area.replaceWith(view);
};



/*
 · По клику – ячейка должна стать «редактируемой» (textarea появляется внутри), можено изменять HTML.
  Изменение размера ячейки должно быть отключено.
 · Кнопки OK и ОТМЕНА появляются ниже ячейки и, соответственно, завершают/отменяют редактирование.
 · Только одну ячейку можно редактировать за один раз. Пока <td> в «режиме редактирования»,
  клики по другим ячейкам игнорируются.
 · Таблица может иметь множество ячеек. Использовать делегирование событий.
*/
let table = document.getElementById('bagua-table');
let editingTd;

table.onclick = function (event) {
   // 3 возможных цели
   let target = event.target.closest('.edit-cancel,.edit-ok,td');

   if (!table.contains(target)) return;

   if (target.className == 'edit-cancel') {
      finishTdEdit(editingTd.elem, false);
   } else if (target.className == 'edit-ok') {
      finishTdEdit(editingTd.elem, true);
   } else if (target.nodeName == 'TD') {
      if (editingTd) return; // уже редактируется
      makeTdEditable(target);
   }
};

function makeTdEditable(td) {
   editingTd = {
      elem: td,
      data: td.innerHTML
   };
   td.classList.add('edit-td'); // td в состоянии редактирования, CSS применятся к textarea внутри ячейки

   let textArea = document.createElement('textarea');
   textArea.style.width = td.clientWidth + 'px';
   textArea.style.height = td.clientHeight + 'px';
   textArea.className = 'edit-area';

   textArea.value = td.innerHTML;
   td.innerHTML = '';
   td.appendChild(textArea);
   textArea.focus();

   td.insertAdjacentHTML("beforeEnd",
      '<div class="edit-controls"><button class="edit-ok">OK</button><button class="edit-cancel">CANCEL</button></div>'
   );
}

function finishTdEdit(td, isOk) {
   if (isOk) {
      td.innerHTML = td.firstChild.value;
   } else {
      td.innerHTML = editingTd.data;
   }
   td.classList.remove('edit-td');
   editingTd = null;
}


/*
 Установить фокус на мышь. Затем использовать клавиши со стрелками, чтобы её двигать.
P.S. Не добавлять обработчики никуда, кроме элемента #mouse.
P.P.S. Не изменять HTML/CSS, подход должен быть общим и работать с любым элементом.
*/
mouse.tabIndex = 0;

mouse.onclick = function () {
   this.style.left = this.getBoundingClientRect().left + 'px';
   this.style.top = this.getBoundingClientRect().top + 'px';

   this.style.position = 'fixed';
};


mouse.onkeydown = function (e) {
   switch (e.key) {
      case 'ArrowLeft':
         this.style.left = parseInt(this.style.left) - this.offsetWidth + 'px';
         return false;
      case 'ArrowUp':
         this.style.top = parseInt(this.style.top) - this.offsetHeight + 'px';
         return false;
      case 'ArrowRight':
         this.style.left = parseInt(this.style.left) + this.offsetWidth + 'px';
         return false;
      case 'ArrowDown':
         this.style.top = parseInt(this.style.top) + this.offsetHeight + 'px';
         return false;
   }
};


/*
 Создайте интерфейс, позволяющий ввести сумму банковского вклада и процент, а затем рассчитать,
какая это будет сумма через заданный промежуток времени.
*/
let form = document.forms.calculator;

form.money.oninput = calculate;
form.months.onchange = calculate;
form.interest.oninput = calculate;

function calculate() {
   let initial = +form.money.value;
   if (!initial) return;

   let interest = form.interest.value * 0.01;

   if (!interest) return;

   let years = form.months.value / 12;
   if (!years) return;

   let result = Math.round(initial * (1 + interest) ** years);

   let height = result / form.money.value * 100 + 'px';
   document.getElementById('height-after').style.height = height;
   document.getElementById('money-before').innerHTML = form.money.value;
   document.getElementById('money-after').innerHTML = result;
}
calculate();








































