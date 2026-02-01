// --- Telegram ---
const tg = window.Telegram?.WebApp;
tg?.expand();

// --- Профиль игрока ---
const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// --- Элементы DOM ---
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playClassicBtn = document.getElementById("playClassic");
const playDogHuntBtn = document.getElementById("playDogHunt");
const balanceBtn = document.getElementById("balanceBtn");
const soonBtn = document.getElementById("soonBtn");
const backBtn = document.getElementById("backBtn");
const balanceEl = document.getElementById("balance");

// --- Показываем профиль в меню ---
const menuProfile = document.createElement("div");
menuProfile.id = "menuProfile";
menuProfile.innerHTML = `<strong>Игрок:</strong> ${playerName} | <strong>Баланс:</strong> <span id="menuBalance">${balance}</span> 🐱`;
menu.insertBefore(menuProfile, menu.firstChild);

function updateMenuBalance() {
  document.getElementById("menuBalance").innerText = balance;
}

// --- Общая функция открытия слота ---
function openSlot(slotScript) {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = slotScript;
  script.id = "slotScript";
  document.body.appendChild(script);

  balanceEl.innerText = balance;
}

// --- Кнопки ---
playClassicBtn.onclick = () => openSlot("slot_classic.js");
playDogHuntBtn.onclick = () => openSlot("slot_doghunt.js");

balanceBtn.onclick = () => alert(`Ваш баланс: ${balance} 🐱`);
soonBtn.onclick = () => alert("Эта функция появится позже! ⏳");

backBtn.onclick = () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";

  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  updateMenuBalance();
};
