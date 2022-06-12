/*
Напишите if..else, соответствующий следующему switch:
*/
let browser = 'Chrome';
switch (browser) {
   case 'Edge':
      console.log("You've got the Edge!");
      break;

   case 'Chrome':
   case 'Firefox':
   case 'Safari':
   case 'Opera':
      console.log('Okay we support these browsers too');
      break;

   default:
      console.log('We hope that this page looks ok!');
}

if (browser == 'Chrome' || browser == 'Firefox' || browser == 'Safari' || browser == 'Opera') {
   console.log('Okay we support these browsers too');
} else if (browser == 'Edge') {
   console.log("You've got the Edge!");
} else {
   console.log('We hope that this page looks ok!');
}

// Перепишите код с использованием одной конструкции switch:

// const number = +prompt('Введите число между 0 и 3', '');
/*
if (number === 0) {
  alert('Вы ввели число 0');
}
if (number === 1) {
  alert('Вы ввели число 1');
}
if (number === 2 || number === 3) {
  alert('Вы ввели число 2, а может и 3');
}
*/
switch(number){
   case 0:
      alert('Вы ввели число 0');
      break;
   case 1:
      alert('Вы ввели число 1');
      break;
   case 2:
   case 3:
      alert('Вы ввели число 2, а может и 3');
      break;
}

