// ---------- Глобальные данные игрока ----------
const tg = window.Telegram?.WebApp;
tg?.expand();

const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// ---------- Элементы ----------
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playBtnClassic = document.getElementById("playClassic");
const playBtnDogHunt = document.getElementById("playDogHunt");
const balanceBtn = document.getElementById("balanceBtn");
const soonBtn = document.getElementById("soonBtn");
const backBtn = document.getElementById("backBtn");

// ---------- Профиль в меню ----------
const menuProfile = document.getElementById("menuProfile");
menuProfile.innerHTML = `<strong>Игрок:</strong> ${playerName} | <strong>Баланс:</strong> <span id="menuBalance">${balance}</span> 🐱`;

// Обновление баланса
function updateMenuBalance() {
  document.getElementById("menuBalance").innerText = balance;
}

// ---------- Функция запуска слота ----------
function startSlot(slotScriptName) {
  menu.style.display = "none";
  gameContainer.style.display = "block";

  // Передаем данные слоту
  window.SLOT_PLAYER_NAME = playerName;
  window.SLOT_BALANCE = balance;

  // Удаляем старый слот если есть
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  const script = document.createElement("script");
  script.src = slotScriptName;
  script.id = "slotScript";
  document.body.appendChild(script);

  // Обновляем баланс сразу
  document.getElementById("balance").innerText = balance;
}

// ---------- Слушатели кнопок ----------
playBtnClassic.addEventListener("click", () => startSlot("slot_classic.js"));
playBtnDogHunt.addEventListener("click", () => startSlot("slot_doghunt.js"));

balanceBtn.addEventListener("click", () => alert(`Ваш баланс: ${balance} 🐱`));
soonBtn.addEventListener("click", () => alert("Эта функция появится позже! ⏳"));

backBtn.addEventListener("click", () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";

  // Удаляем слот
  const oldScript = document.getElementById("slotScript");
  if (oldScript) oldScript.remove();

  // Сброс слота на дефолт
  const slotContainer = document.getElementById("slot");
  slotContainer.innerHTML = '<span>❓</span><span>❓</span><span>❓</span>';

  updateMenuBalance();
});
