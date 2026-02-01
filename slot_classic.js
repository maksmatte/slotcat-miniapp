const playerName = window.SLOT_PLAYER_NAME || "Игрок";
let balance = window.SLOT_BALANCE || 100;

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

document.getElementById("user").innerText = `Игрок: ${playerName}`;

const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = ''; // очищаем контейнер

const symbols = ["🍒","🍒","🍒","🍋","🍋","🔔","⭐","7️⃣"];

// Создаем 3 символа сразу
for (let i = 0; i < 3; i++) {
  const span = document.createElement("span");
  span.innerText = symbols[Math.floor(Math.random() * symbols.length)];
  slotContainer.appendChild(span);
}

document.getElementById("play").onclick = () => {
  if (balance <= 0) { alert("Нет фишек 😢"); return; }
  balance -= 1;

  const spans = slotContainer.querySelectorAll("span");
  const result = [];

  spans.forEach(el => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    el.innerText = sym;
    result.push(sym);
  });

  // Выигрыш если все одинаковые
  if (result.every(s => s === result[0])) {
    balance += 10;
    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    else alert("🎉 Победа! +10 фишек");
  }

  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
  window.SLOT_BALANCE = balance;
};
