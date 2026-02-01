const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = ""; // очистка
const images = [
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog1.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog2.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog3.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog4.PNG",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog5.PNG"
];

// создаём 5 img
for (let i = 0; i < 5; i++) {
  const img = document.createElement("img");
  img.src = images[i % images.length];
  slotContainer.appendChild(img);
}

const slotEls = slotContainer.querySelectorAll("img");

document.getElementById("play").onclick = () => {
  let balance = window.SLOT_BALANCE || 100;

  slotEls.forEach(el => {
    const img = images[Math.floor(Math.random() * images.length)];
    el.src = img;
  });

  const result = Array.from(slotEls).map(el => el.src);
  if (result.every(s => s === result[0])) {
    balance += 15;
    tg?.showPopup({ message: "🐶 Dog Hunt! +15 фишек" });
  }

  window.SLOT_BALANCE = balance;
  localStorage.setItem("balance", balance);
  document.getElementById("balance").innerText = balance;
};
