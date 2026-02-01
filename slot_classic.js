// Получаем глобальные данные
const playerName = window.SLOT_PLAYER_NAME;
let balance = window.SLOT_BALANCE;

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

document.getElementById("user").innerText = `Игрок: ${playerName}`;

// Инициализация слотов после того, как слот виден
const slotEls = document.querySelectorAll("#slot span");

document.getElementById("play").onclick = () => {
  if (window.SLOT_BALANCE <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  // Используем глобальный баланс
  window.SLOT_BALANCE -= 1;
  balance = window.SLOT_BALANCE;

  const symbols = ["🍒","🍒","🍒","🍋","🍋","🔔","⭐","7️⃣"];
  const result = [];

  slotEls.forEach(el => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    el.innerText = sym;
    result.push(sym);
  });

  if (result.every(s => s === result[0])) {
    window.SLOT_BALANCE += 10;
    balance = window.SLOT_BALANCE;

    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    else alert("🎉 Победа! +10 фишек");
  }

  // Сохраняем и обновляем
  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
};
