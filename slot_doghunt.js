const playerName = window.SLOT_PLAYER_NAME || "Игрок";
let balance = window.SLOT_BALANCE || 100;

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;
document.getElementById("user").innerText = `Игрок: ${playerName}`;

const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = ''; // очищаем контейнер

const symbols = [
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog1.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog2.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog3.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog4.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog5.PNG"
];

for (let i = 0; i < 5; i++) {
  const img = document.createElement("img");
  img.src = symbols[Math.floor(Math.random()*symbols.length)];
  slotContainer.appendChild(img);
}

document.getElementById("play").onclick = () => {
  if (balance <= 0) { alert("Нет фишек 😢"); return; }
  balance -= 1;

  const imgs = slotContainer.querySelectorAll("img");
  const result = [];
  imgs.forEach(el => {
    const sym = symbols[Math.floor(Math.random()*symbols.length)];
    el.src = sym;
    result.push(sym);
  });

  if (result.every(s=>s===result[0])) {
    balance += 10;
    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    else alert("🎉 Победа! +10 фишек");
  }

  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
  window.SLOT_BALANCE = balance;
};
