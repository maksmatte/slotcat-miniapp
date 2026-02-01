const playerName = window.SLOT_PLAYER_NAME || "Игрок";
let balance = window.SLOT_BALANCE || 100;

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

document.getElementById("user").innerText = `Игрок: ${playerName}`;

const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = ''; // очистим

// Массив картинок собак (raw ссылки)
const dogImgs = [
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog1.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog2.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog3.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog4.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog5.PNG"
];

// Создаем 5 слотов
for (let i = 0; i < 5; i++) {
  const span = document.createElement("span");
  span.innerHTML = '<img src="' + dogImgs[Math.floor(Math.random() * dogImgs.length)] + '" width="80" height="80">';
  slotContainer.appendChild(span);
}

// Крутить
document.getElementById("play").onclick = () => {
  if (balance <= 0) { alert("Нет фишек 😢"); return; }
  balance -= 1;

  const spans = slotContainer.querySelectorAll("span");
  const result = [];

  spans.forEach(el => {
    const idx = Math.floor(Math.random() * dogImgs.length);
    el.innerHTML = '<img src="' + dogImgs[idx] + '" width="80" height="80">';
    result.push(idx);
  });

  // Выигрыш если все совпало
  if (result.every((v) => v === result[0])) {
    balance += 20;
    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +20 фишек" });
    else alert("🎉 Победа! +20 фишек");
  }

  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
  window.SLOT_BALANCE = balance;
};
