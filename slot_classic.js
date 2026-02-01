function initClassicSlot() {
  const balanceEl = document.getElementById("balance");
  const playerEl = document.getElementById("user");

  playerEl.innerText = `Игрок: ${window.SLOT_PLAYER_NAME}`;
  balanceEl.innerText = window.SLOT_BALANCE;

  const slotEls = document.querySelectorAll("#slot span");

  document.getElementById("play").onclick = () => {
    if (window.SLOT_BALANCE <= 0) return alert("Нет фишек 😢");

    window.SLOT_BALANCE -= 1;

    const symbols = ["🍒","🍋","🔔","⭐","7️⃣"];
    const result = [];

    slotEls.forEach(el => {
      const sym = symbols[Math.floor(Math.random() * symbols.length)];
      el.innerText = sym;
      result.push(sym);
    });

    if (result.every(s => s === result[0])) {
      window.SLOT_BALANCE += 10;
      alert("🎉 Победа! +10 фишек");
    }

    balanceEl.innerText = window.SLOT_BALANCE;
    window.PLAYER_BALANCE = window.SLOT_BALANCE;
    localStorage.setItem("balance", window.SLOT_BALANCE);
  };
}
