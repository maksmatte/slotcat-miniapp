// ======== Переменные ========
let userBalance = 1000; // пример стартового баланса

// ======== Элементы ========
const menu = document.getElementById('menu');
const gameContainer = document.getElementById('gameContainer');
const playBtn = document.getElementById('playBtn');
const balanceBtn = document.getElementById('balanceBtn');
const soonBtn = document.getElementById('soonBtn');
const backBtn = document.getElementById('backBtn');
const balanceValue = document.getElementById('balanceValue');

// ======== Кнопки меню ========
playBtn.addEventListener('click', () => {
  menu.style.display = 'none';
  gameContainer.style.display = 'block';
  updateBalanceDisplay();
});

balanceBtn.addEventListener('click', () => {
  alert(`Ваш баланс: ${userBalance} 🐱`);
});

soonBtn.addEventListener('click', () => {
  alert('Эта функция появится позже! ⏳');
});

// ======== Кнопка "Назад" ========
backBtn.addEventListener('click', () => {
  gameContainer.style.display = 'none';
  menu.style.display = 'flex';
});

// ======== Обновление баланса ========
function updateBalanceDisplay() {
  balanceValue.textContent = userBalance;
}

// ======== Здесь вставляется твоя текущая логика слота ========
// Пример:
const slotBtn = document.createElement('button');
slotBtn.textContent = 'Крутить 🎰';
slotBtn.addEventListener('click', () => {
  const win = Math.floor(Math.random() * 100);
  userBalance += win;
  updateBalanceDisplay();
  alert(`Вы выиграли ${win} 🐱`);
});
document.getElementById('slot').appendChild(slotBtn);
