// ======== Элементы меню ========
const menu = document.getElementById('menu');
const gameContainer = document.getElementById('gameContainer');
const playBtn = document.getElementById('playBtn');
const balanceBtn = document.getElementById('balanceBtn');
const soonBtn = document.getElementById('soonBtn');
const backBtn = document.getElementById('backBtn');
const balanceValue = document.getElementById('balanceValue');

let userBalance = 1000; // пример стартового баланса

// ======== Обновление баланса ========
function updateBalanceDisplay() {
  balanceValue.textContent = userBalance;
}

// ======== Кнопки меню ========
playBtn.addEventListener('click', () => {
  menu.style.display = 'none';
  gameContainer.style.display = 'block';

  // Подключаем слот
  const script = document.createElement('script');
  script.src = 'slot_classic.js'; // здесь можно менять слот
  script.id = 'slotScript';
  document.body.appendChild(script);
});

balanceBtn.addEventListener('click', () => {
  alert(`Ваш баланс: ${userBalance} 🐱`);
});

soonBtn.addEventListener('click', () => {
  alert('Эта функция появится позже! ⏳');
});

// ======== Кнопка назад ========
backBtn.addEventListener('click', () => {
  gameContainer.style.display = 'none';
  menu.style.display = 'flex';

  // Удаляем предыдущий слот
  const oldScript = document.getElementById('slotScript');
  if (oldScript) oldScript.remove();

  // Очищаем контейнер слота
  document.getElementById('slot').innerHTML = '';
});
