// Глобальные данные игрока
const tg = window.Telegram?.WebApp;
tg?.expand();

const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// Главное меню
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playBtn = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");

// Показываем профиль игрока в меню
const menuProfile = document.createElement("div");
menuProfile.id = "menuProfile";
menuProfile.innerHTML = `<strong>Игрок:</strong> ${playerName} | <strong>Баланс:</strong> <span id="menuBalance">${balance}</span> 🐱`;
menu.insertBefore(menuProfile, menu.firstChild);

// Функция обновления баланса в меню
function updateMenuBalance() {
  document.getElementById("menuBalance").innerText = balance;
}

// ---------- Play ----------
playBtn.addEventListener("click", () => {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  // Передаем глобальные данные слоту
  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  // Подключаем слот динамически
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = "slot_classic.js";
  script.id = "slotScript";
  document.body.appendChild(script);

  // Баланс сразу обновляем в слоте
  document.getElementById("balance").innerText = window.SLOT_BALANCE;
});

// ---------- Назад ----------
backBtn.addEventListener("click", () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";

  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  // Обновляем глобальный баланс из слота
  balance = window.SLOT_BALANCE;
  updateMenuBalance();
});
