

/*
 Создайте список, в котором элементы могут быть выделены, как в файловых менеджерах.
 · При клике на элемент списка выделяется только этот элемент (добавляется класс .selected), отменяется выделение остальных элементов.
 · Если клик сделан вместе с Ctrl (Cmd для Mac), то выделение переключается на элементе, но остальные элементы при этом не изменяются.
*/
ul.onclick = e => {
   if (e.target.tagName != 'LI') return;

   if (e.ctrlKey || e.mataKey) {
      toggleSelect(e.target);
   } else {
      singleSelect(e.target);
   }
}
ul.onmousedown = () => {
   return false;
}

let toggleSelect = (li) => {
   li.classList.toggle('selected');
}

let singleSelect = (li) => {
   let selected = ul.querySelectorAll('.selected');

   for (let item of selected) {
      item.classList.remove('selected');
   }
   li.classList.add('selected');
}


/*
 Напишите JavaScript код, который показывает подсказку над элементом с атрибутом data-tooltip.
 · Значение атрибута должно становиться текстом подсказки.
 · Элементы с подсказками могут быть вложены друг в друга. Показываться должна подсказка на самом глубоко вложенном элементе.
 · Только одна подсказка может быть показана в любой момент времени.
*/
let tip;
house.onmouseover = e => {
   let target = e.target.closest('[data-tooltip]');
   if (!house.contains(target)) return;

   tip = document.createElement('div');
   tip.innerHTML = target.dataset.tooltip;
   tip.classList.add('tooltip');
   document.body.append(tip);

   let left = target.getBoundingClientRect().left + (target.offsetWidth - tip.offsetWidth) / 2;
   let top = target.getBoundingClientRect().top - tip.offsetHeight - 5;

   if (left < 0) left = 0;
   if (top < 0) top = target.getBoundingClientRect().bottom + 5;

   tip.style.left = left + 'px';
   tip.style.top = top + 'px';
}
house.onmouseout = () => tip.remove();


/*
 Запустить слайдер:
 · Слайдер должен нормально работать при резком движении мыши влево или вправо за пределы полосы.
  При этом бегунок должен останавливаться чётко в нужном конце полосы.
 · При нажатом бегунке мышь может выходить за пределы полосы слайдера, но слайдер пусть все равно работает.
*/
let thumb = document.querySelector('.thumb');
thumb.onmousedown = e => {
   e.preventDefault(); // предотвратить запуск выделения (действие браузера)

   let shiftX = e.clientX - thumb.getBoundingClientRect().left;

   document.addEventListener('mousemove', onMouseMove);
   document.addEventListener('mouseup', onMouseUp);

   function onMouseMove(e) {
      let newLeft = e.clientX - shiftX - slider.getBoundingClientRect().left;

      if (newLeft < 0) newLeft = 0;
      let rightEdge = slider.offsetWidth - thumb.offsetWidth;
      if (newLeft > rightEdge) newLeft = rightEdge;

      thumb.style.left = newLeft + 'px';
   }

   function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', onMouseMove);
   }
};
thumb.ondragstart = () => false;


/*
 Расставьте супергероев по полю.
Супергерои и мяч - это элементы с классом "draggable". Сделайте так, чтобы их можно было переносить.

 · Ограничить перетаскивание границами окна. Если супергероя подносят к верхней или нижней границе страницы,
  она должна автоматически прокручиваться.
 · Если страница помещается на вашем экране целиком и не имеет вертикальной прокрутки -- сделайте окно браузера меньше,
  чтобы протестировать эту возможность.
 · В этой задаче достаточно справиться с вертикальной прокруткой. Обычно нет горизонтальной прокрутки,
  и она обрабатывается аналогичным образом, если это необходимо.
 · Супергерои не должны попасть за край экрана.
*/
let isDragging = false;

document.addEventListener('mousedown', function (event) {

   let dragElement = event.target.closest('.draggable');

   if (!dragElement) return;

   event.preventDefault();

   dragElement.ondragstart = function () {
      return false;
   };

   let coords, shiftX, shiftY;

   startDrag(dragElement, event.clientX, event.clientY);

   function onMouseUp(event) {
      finishDrag();
   };

   function onMouseMove(event) {
      moveAt(event.clientX, event.clientY);
   }

   // в начале перемещения элемента:
   //   запоминаем место клика по элементу (shiftX, shiftY),
   //   переключаем позиционирование элемента (position:fixed) и двигаем элемент
   function startDrag(element, clientX, clientY) {
      if (isDragging) {
         return;
      }

      isDragging = true;

      document.addEventListener('mousemove', onMouseMove);
      element.addEventListener('mouseup', onMouseUp);

      shiftX = clientX - element.getBoundingClientRect().left;
      shiftY = clientY - element.getBoundingClientRect().top;

      element.style.position = 'fixed';

      moveAt(clientX, clientY);
   };

   // переключаемся обратно на абсолютные координаты
   // чтобы закрепить элемент относительно документа
   function finishDrag() {
      if (!isDragging) {
         return;
      }

      isDragging = false;

      dragElement.style.top = parseInt(dragElement.style.top) + pageYOffset + 'px';
      dragElement.style.position = 'absolute';

      document.removeEventListener('mousemove', onMouseMove);
      dragElement.removeEventListener('mouseup', onMouseUp);
   }

   function moveAt(clientX, clientY) {
      // вычисляем новые координаты (относительно окна)
      let newX = clientX - shiftX;
      let newY = clientY - shiftY;

      // проверяем, не переходят ли новые координаты за нижний край окна:
      // сначала вычисляем гипотетический новый нижний край окна
      let newBottom = newY + dragElement.offsetHeight;

      // затем, если новый край окна выходит за пределы документа, прокручиваем страницу
      if (newBottom > document.documentElement.clientHeight) {
         // координата нижнего края документа относительно окна
         let docBottom = document.documentElement.getBoundingClientRect().bottom;

         // простой скролл документа на 10px вниз имеет проблему -
         // он может прокручивать документ за его пределы,
         // поэтому используем Math.min(расстояние до конца, 10)
         let scrollY = Math.min(docBottom - newBottom, 10);

         // вычисления могут быть не совсем точны - случаются ошибки при округлении,
         // которые приводят к отрицательному значению прокрутки. отфильтруем их:
         if (scrollY < 0) scrollY = 0;

         window.scrollBy(0, scrollY);

         // быстрое перемещение мыши может поместить курсор за пределы документа вниз
         // если это произошло -
         // ограничиваем новое значение Y максимально возможным исходя из размера документа:
         newY = Math.min(newY, document.documentElement.clientHeight - dragElement.offsetHeight);
      }

      // проверяем, не переходят ли новые координаты за верхний край окна (по схожему алгоритму)
      if (newY < 0) {
         // прокручиваем окно вверх
         let scrollY = Math.min(-newY, 10);
         if (scrollY < 0) scrollY = 0; // проверяем ошибки точности

         window.scrollBy(0, -scrollY);
         // быстрое перемещение мыши может поместить курсор за пределы документа вверх
         newY = Math.max(newY, 0); // newY не может быть меньше нуля
      }

      // ограничим newX размерами окна
      // согласно условию, горизонтальная прокрутка отсутствует, поэтому это не сложно:
      if (newX < 0) newX = 0;
      if (newX > document.documentElement.clientWidth - dragElement.offsetWidth) {
         newX = document.documentElement.clientWidth - dragElement.offsetWidth;
      }

      dragElement.style.left = newX + 'px';
      dragElement.style.top = newY + 'px';
   }
});


/*
 Создайте функцию runOnKeys(func, code1, code2, ... code_n), которая запускает func при одновременном нажатии клавиш
с кодами code1, code2, …, code_n.
Например, код ниже выведет alert при одновременном нажатии клавиш "Q" и "W" (в любом регистре, в любой раскладке)
*/
function runOnKeys(func, ...codes) {
   let pressed = new Set();

   document.addEventListener('keydown', function (event) {
      pressed.add(event.code);

      for (let code of codes) { // все ли клавиши из набора нажаты?
         if (!pressed.has(code)) {
            return;
         }
      }
      /*
       Во время показа alert, если посетитель отпустит клавиши - не возникнет keyup
      при этом JavaScript "пропустит" факт отпускания клавиш, а pressed[keyCode] останется true
      чтобы избежать "залипания" клавиши -- обнуляем статус всех клавиш, пусть нажимает всё заново
      */
      pressed.clear();

      func();
   });

   document.addEventListener('keyup', function (event) {
      pressed.delete(event.code);
   });
}

// вариант № 2
function runOnKeys(func, ...codes) {
   let set = new Set();
   document.addEventListener('keydown', e => {
      for (let code of codes) if (code === e.code) set.add(code);
      if (codes.length === set.size) {
         func();
         set.clear();
      }
   });
   document.addEventListener('keyup', e => { if (set.has(e.code)) set.delete(e.code); });
}
runOnKeys(
   () => alert("Привет!"),
   "KeyQ",
   "KeyW"
);



/*
 Создайте кнопку «наверх», чтобы помочь с прокруткой страницы.
 · Пока страница не прокручена вниз хотя бы на высоту окна – кнопка невидима.
 · Когда страница прокручена вниз больше, чем на высоту окна – появляется стрелка «наверх» в левом верхнем углу.
  Если страница прокручивается назад, стрелка исчезает.
 · Когда нажимается стрелка, страница прокручивается вверх.
*/
arrowTop.onclick = function () {
   matrix.scrollTo(matrix.pageXOffset, 0);
};
matrix.addEventListener('scroll', function () {
   arrowTop.hidden = (this.scrollTop <= this.clientHeight);
});
// или
matrix.addEventListener('scroll', function () {
   return (this.scrollTop >= this.clientHeight) ? arrowTop.style.display = 'block' : arrowTop.style.display = 'none';
}
);

































