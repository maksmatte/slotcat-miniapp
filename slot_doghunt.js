const playerName = window.SLOT_PLAYER_NAME || "Игрок";
let balance = window.SLOT_BALANCE || 100;

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = `
  <img src="img/dog1.PNG" alt="">
  <img src="img/dog2.PNG" alt="">
  <img src="img/dog3.PNG" alt="">
  <img src="img/dog4.PNG" alt="">
  <img src="img/dog5.PNG" alt="">
`;
const slotEls = slotContainer.querySelectorAll("img");

document.getElementById("play").onclick = () => {
  if (balance <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  balance -= 1;

  const dogImgs = [
    "img/dog1.PNG",
    "img/dog2.PNG",
    "img/dog3.PNG",
    "img/dog4.PNG",
    "img/dog5.PNG"
  ];

  const result = [];

  slotEls.forEach(el => {
    const img = dogImgs[Math.floor(Math.random() * dogImgs.length)];
    el.src = img;
    result.push(img);
  });

  if (result.every(s => s === result[0])) {
    balance += 20;
    const tg = window.Telegram?.WebApp;
    if (tg) tg.showPopup({ message: "🎉 Победа! +20 фишек" });
    else alert("🎉 Победа! +20 фишек");
  }

  localStorage.setItem("balance", balance);
  balanceEl.innerText = balance;
  window.SLOT_BALANCE = balance;
};
