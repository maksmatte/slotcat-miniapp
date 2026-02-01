// ---------- Инициализация профиля ----------
const tg = window.Telegram?.WebApp;
tg?.expand();

const user = tg?.initDataUnsafe?.user;
const playerName = user ? user.first_name : "Игрок Тест";

// Баланс (храним глобально)
let balance = Number(localStorage.getItem("balance")) || 100;

// ---------- Главный экран ----------
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playBtn = document.getElementById("playBtn");
const balanceBtn = document.getElementById("balanceBtn");
const soonBtn = document.getElementById("soonBtn");
const backBtn = document.getElementById("backBtn");

// Показываем имя и баланс в меню
const menuProfile = document.createElement("div");
menuProfile.id = "menuProfile";
menuProfile.innerHTML = `<strong>Игрок:</strong> ${playerName} | <strong>Баланс:</strong> <span id="menuBalance">${balance}</span> 🐱`;
menu.insertBefore(menuProfile, menu.firstChild);

// ---------- Обновление баланса в меню ----------
function updateMenuBalance() {
  document.getElementById("menuBalance").innerText = balance;
}

// ---------- Кнопка Play ----------
playBtn.addEventListener("click", () => {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  // Передаем данные слоту через глобальные переменные
  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  // Динамически загружаем слот
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();
  const script = document.createElement("script");
  script.src = "slot_classic.js"; // будущие слоты тоже могут использовать playerName и balance
  script.id = "slotScript";
  document.body.appendChild(script);
});

// ---------- Кнопка Баланс ----------
balanceBtn.addEventListener("click", () => {
  alert(`Ваш баланс: ${balance} 🐱`);
});

// ---------- Кнопка Скоро ----------
soonBtn.addEventListener("click", () => {
  alert("Эта функция появится позже! ⏳");
});

// ---------- Кнопка Назад ----------
backBtn.addEventListener("click", () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";

  // Удаляем слот
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  // Обновляем меню баланс после игры
  updateMenuBalance();
});
