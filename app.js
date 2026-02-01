// ---------- Глобальные данные игрока ----------
const tg = window.Telegram?.WebApp;
tg?.expand();

const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// ---------- Элементы DOM ----------
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playBtn = document.getElementById("play");
const backBtn = document.getElementById("backBtn");

const playClassicBtn = document.getElementById("playClassic");
const playDogHuntBtn = document.getElementById("playDogHunt");
const balanceBtn = document.getElementById("balanceBtn");
const soonBtn = document.getElementById("soonBtn");

document.getElementById("user").innerText = `Игрок: ${playerName}`;
document.getElementById("balance").innerText = balance;

// ---------- Функция открытия слота ----------
function openSlot(slotScript) {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  // Передаем данные в слот
  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  // Удаляем старый скрипт
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  // Создаем новый
  const script = document.createElement("script");
  script.src = slotScript;
  script.id = "slotScript";
  script.onload = () => {
    document.getElementById("balance").innerText = balance;
  };
  document.body.appendChild(script);
}

// ---------- Привязка кнопок ----------
playClassicBtn.onclick = () => openSlot("slot_classic.js");
playDogHuntBtn.onclick = () => openSlot("slot_doghunt.js");

balanceBtn.onclick = () => alert(`Ваш баланс: ${balance} 🐱`);
soonBtn.onclick = () => alert("Эта функция появится позже! ⏳");

backBtn.onclick = () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";

  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  // Обновляем баланс
  document.getElementById("balance").innerText = balance;
};
