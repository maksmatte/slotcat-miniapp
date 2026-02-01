// Берем глобальные данные
const playerName = window.SLOT_PLAYER_NAME || "Игрок Тест";
let balance = window.SLOT_BALANCE || 100;

// Имя игрока в слоте
document.getElementById("user").innerText = `Игрок: ${playerName}`;
const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

// Слот
const symbols = ["🍒","🍒","🍒","🍋","🍋","🔔","⭐","7️⃣"];
const slotEls = document.querySelectorAll("#slot span");
const playBtn = document.getElementById("play");

playBtn.onclick = () => {
  if (balance <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  balance -= 1;

  const result = [];
  slotEls.forEach(el => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    el.innerText = sym;
    result.push(sym);
  });

  if (result.every(s => s === result[0])) {
    balance += 10;
    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    else alert("🎉 Победа! +10 фишек");
  }

  balanceEl.innerText = balance;
  localStorage.setItem("balance", balance);

  // Обновляем глобальный баланс для меню и других слотов
  window.SLOT_BALANCE = balance;
};
