const playerName = window.SLOT_PLAYER_NAME || "Игрок";
let balance = window.SLOT_BALANCE || 100;

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = '<span>❓</span><span>❓</span><span>❓</span>';
const slotEls = slotContainer.querySelectorAll("span");

document.getElementById("play").onclick = () => {
  if (balance <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  balance -= 1;

  const symbols = ["🍒","🍋","🔔","⭐","7️⃣"];
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

  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
  window.SLOT_BALANCE = balance;
};
