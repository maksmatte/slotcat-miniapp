// ---------- Глобальные данные ----------
const tg = window.Telegram?.WebApp;
tg?.expand();

const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// Главное меню
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playClassicBtn = document.getElementById("playClassic");
const playDoghuntBtn = document.getElementById("playDoghunt");
const balanceBtn = document.getElementById("balanceBtn");
const soonBtn = document.getElementById("soonBtn");
const backBtn = document.getElementById("backBtn");

// Профиль в меню
const menuProfile = document.getElementById("menuProfile");
function updateMenuProfile() {
  menuProfile.innerHTML = `<strong>Игрок:</strong> ${playerName} | <strong>Баланс:</strong> <span id="menuBalance">${balance}</span> 🐱`;
}
updateMenuProfile();

// ---------- Функции ----------
function loadSlot(slotFile) {
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = slotFile;
  script.id = "slotScript";
  document.body.appendChild(script);

  // Показываем баланс в слоте
  document.getElementById("balance").innerText = balance;
}

// ---------- Кнопки меню ----------
playClassicBtn.addEventListener("click", () => {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  // Передаем данные слоту
  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  loadSlot("slot_classic.js");
});

playDoghuntBtn.addEventListener("click", () => {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  loadSlot("slot_doghunt.js");
});

balanceBtn.addEventListener("click", () => {
  alert(`Ваш баланс: ${balance} 🐱`);
});

soonBtn.addEventListener("click", () => {
  alert("Эта функция появится позже! ⏳");
});

backBtn.addEventListener("click", () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";

  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  // Обновляем профиль и баланс
  updateMenuProfile();
});
