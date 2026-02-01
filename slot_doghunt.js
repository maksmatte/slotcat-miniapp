// ---------------- Глобальные данные игрока ----------------
const playerName = window.SLOT_PLAYER_NAME || "Игрок Тест";
let balance = window.SLOT_BALANCE || 100;

document.getElementById("user").innerText = `Игрок: ${playerName}`;
const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

// ---------------- Массив картинок собак ----------------
const dogs = [
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog1.png",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog2.png",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog3.png",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog4.png",
  "https://raw.githubusercontent.com/maksmatte/slotcat-miniapp/main/img/dog5.png" // джекпот
];

// ---------------- Создаем слот 5 в ряд ----------------
const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = "";
for (let i = 0; i < 5; i++) {
  const img = document.createElement("img");
  img.src = dogs[Math.floor(Math.random() * dogs.length)];
  img.className = "slot-dog";
  slotContainer.appendChild(img);
}

// ---------------- Кнопка Крутить ----------------
document.getElementById("play").onclick = () => {
  if (balance <= 0) {
    alert("Нет фишек 😢");
    return;
  }

  balance -= 1;

  const slotImgs = document.querySelectorAll(".slot-dog");
  const result = [];

  // Анимация вращения
  slotImgs.forEach(img => {
    img.classList.add("spin");
  });

  setTimeout(() => {
    slotImgs.forEach(img => {
      const dog = dogs[Math.floor(Math.random() * dogs.length)];
      img.src = dog;
      result.push(dog);
      img.classList.remove("spin");
    });

    // ---------------- Проверка выигрыша ----------------
    const jackpotDog = dogs[4]; // dog5.png
    if (result.every(d => d === jackpotDog)) {
      balance += 50; // супер-выигрыш
      const tg = window.Telegram?.WebApp;
      if (tg) tg.showPopup({ message: "🎉 JACKPOT! +50 фишек" });
      else alert("🎉 JACKPOT! +50 фишек");
    } else if (result.every(d => d === result[0])) {
      balance += 20; // обычный выигрыш
      const tg = window.Telegram?.WebApp;
      if (tg) tg.showPopup({ message: "🎉 Победа! +20 фишек" });
      else alert("🎉 Победа! +20 фишек");
    }

    // ---------------- Сохраняем баланс ----------------
    localStorage.setItem("balance", balance);
    balanceEl.innerText = balance;
    window.SLOT_BALANCE = balance;

  }, 800); // время вращения 0.8 секунды
};
