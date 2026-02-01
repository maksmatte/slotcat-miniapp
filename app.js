document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const gameContainer = document.getElementById("gameContainer");
  const playBtn = document.getElementById("playBtn");
  const balanceBtn = document.getElementById("balanceBtn");
  const soonBtn = document.getElementById("soonBtn");
  const backBtn = document.getElementById("backBtn");

  let balance = Number(localStorage.getItem("balance")) || 100;

  // ---------- Кнопка Play ----------
  playBtn.addEventListener("click", () => {
    menu.style.display = "none";
    gameContainer.style.display = "block";

    // --- Telegram WebApp ---
    const tg = window.Telegram.WebApp;
    tg.expand(); // разворачиваем на весь экран

    const user = tg.initDataUnsafe.user; // получаем имя игрока
    document.getElementById("user").innerText =
      user ? `Игрок: ${user.first_name}` : "Игрок";

    // Подключаем слот динамически
    const oldScript = document.getElementById("slotScript");
    if (oldScript) oldScript.remove(); // удаляем старый скрипт если был
    const script = document.createElement("script");
    script.src = "slot_classic.js"; // твой слот
    script.id = "slotScript";
    document.body.appendChild(script);

    // Отображаем баланс
    document.getElementById("balance").innerText = balance;
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

    // Очищаем контейнер слота
    const slotContainer = document.getElementById("slot");
    slotContainer.innerHTML = '<span>❓</span><span>❓</span><span>❓</span>';
  });
});
