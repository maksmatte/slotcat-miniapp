// Глобальные данные игрока
const tg = window.Telegram?.WebApp;
tg?.expand();

window.PLAYER_NAME = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
window.PLAYER_BALANCE = Number(localStorage.getItem("balance")) || 100;

const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const backBtn = document.getElementById("backBtn");

// Профиль в меню
const profile = document.createElement("div");
profile.id = "menuProfile";
profile.innerHTML = `<strong>Игрок:</strong> ${window.PLAYER_NAME} | <strong>Баланс:</strong> <span id="menuBalance">${window.PLAYER_BALANCE}</span> 🐱`;
menu.insertBefore(profile, menu.firstChild);

// Обновление баланса в меню
function updateMenuBalance() {
  document.getElementById("menuBalance").innerText = window.PLAYER_BALANCE;
}

// Кнопка Назад
backBtn.addEventListener("click", () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";
  updateMenuBalance();

  // Сброс слота
  const slotContainer = document.getElementById("slot");
  slotContainer.innerHTML = '<span>❓</span><span>❓</span><span>❓</span>';
});

// Функция для загрузки слота
function loadSlot(slotFunction) {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  // Передаем глобальные данные слоту
  window.SLOT_PLAYER_NAME = window.PLAYER_NAME;
  window.SLOT_BALANCE = window.PLAYER_BALANCE;

  slotFunction();

  // Баланс в слоте
  document.getElementById("balance").innerText = window.SLOT_BALANCE;
}

// Кнопки слотов
document.getElementById("playClassic").addEventListener("click", () => loadSlot(initClassicSlot));
document.getElementById("playBonus").addEventListener("click", () => loadSlot(initBonusSlot));

// Кнопки меню "Баланс" и "Скоро"
document.getElementById("balanceBtn").addEventListener("click", () => alert(`Ваш баланс: ${window.PLAYER_BALANCE} 🐱`));
document.getElementById("soonBtn").addEventListener("click", () => alert("Эта функция появится позже! ⏳"));
