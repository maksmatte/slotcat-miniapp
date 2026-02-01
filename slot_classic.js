// Проверка Telegram API
const tg = window.Telegram?.WebApp;
if (tg) {
  tg.expand();
  const user = tg.initDataUnsafe.user;
  document.getElementById("user").innerText =
    user ? `Игрок: ${user.first_name}` : "Игрок";
} else {
  document.getElementById("user").innerText = "Игрок Тест";
}

// Баланс
let balanceEl = document.getElementById("balance");

// Слот
const symbols = ["🍒","🍒","🍒","🍋","🍋","🔔","⭐","7️⃣"];
const slotEls = document.querySelectorAll("#slot span");

document.getElementById("play").onclick = () => {
  let balance = Number(localStorage.getItem("balance")) || 100;

  if (balance <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  balance -= 1;

  const result = [];
  slotEls.forEach((el) => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    el.innerText = sym;
    result.push(sym);
  });

  // Выигрыш
  if (result.every((s) => s === result[0])) {
    balance += 10;
    if (tg) tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    else alert("🎉 Победа! +10 фишек");
  }

  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
};


