// Баланс и имя
const balanceEl = document.getElementById("balance");
const playerEl = document.getElementById("user");

// Берем глобальные данные
const playerName = window.SLOT_PLAYER_NAME;
playerEl.innerText = `Игрок: ${playerName}`;
balanceEl.innerText = window.SLOT_BALANCE;

// Крутить слот
document.getElementById("play").onclick = () => {
  if (window.SLOT_BALANCE <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  window.SLOT_BALANCE -= 1;

  // Выбираем элементы слота **каждый раз при клике**, чтобы точно были в DOM
  const slotEls = document.querySelectorAll("#slot span");

  const symbols = ["🍒","🍒","🍒","🍋","🍋","🔔","⭐","7️⃣"];
  const result = [];

  slotEls.forEach(el => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    el.innerText = sym;
    result.push(sym);
  });

  // Выигрыш
  if (result.every(s => s === result[0])) {
    window.SLOT_BALANCE += 10;
    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    else alert("🎉 Победа! +10 фишек");
  }

  balanceEl.innerText = window.SLOT_BALANCE;
  localStorage.setItem("balance", window.SLOT_BALANCE);
};
