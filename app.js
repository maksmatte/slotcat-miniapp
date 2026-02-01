const tg = window.Telegram?.WebApp;
tg?.expand();

const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// Показываем профиль игрока
const menu = document.getElementById("menu");
const menuProfile = document.createElement("div");
menuProfile.id = "menuProfile";
menuProfile.innerHTML = `<strong>Игрок:</strong> ${playerName} | <strong>Баланс:</strong> <span id="menuBalance">${balance}</span> 🐱`;
menu.insertBefore(menuProfile, menu.firstChild);

// Элементы
const gameContainer = document.getElementById("gameContainer");
const playBtnMenu = document.getElementById("playBtn");
const backBtn = document.getElementById("backBtn");

playBtnMenu.addEventListener("click", () => {
  menu.style.display = "none";
  gameContainer.style.display = "block";
  initDogHuntSlot();
});

backBtn.addEventListener("click", () => {
  gameContainer.style.display = "none";
  menu.style.display = "flex";
  updateMenuBalance();
});

function updateMenuBalance() {
  document.getElementById("menuBalance").innerText = balance;
}

// ---------------- DogHunt слот ----------------
function initDogHuntSlot() {
  const slotContainer = document.getElementById("slot");
  slotContainer.innerHTML = "";

  // Массив картинок собак (пока с тестовыми URL)
  const dogs = [
    "https://i.imgur.com/1.png",
    "https://i.imgur.com/2.png",
    "https://i.imgur.com/3.png",
    "https://i.imgur.com/4.png",
    "https://i.imgur.com/5.png"
  ];

  for (let i = 0; i < 5; i++) {
    const img = document.createElement("img");
    img.src = dogs[Math.floor(Math.random() * dogs.length)];
    img.className = "slot-dog";
    slotContainer.appendChild(img);
  }

  // Кнопка крутить
  const playBtnSlot = document.getElementById("play");
  playBtnSlot.onclick = () => {
    if (balance <= 0) {
      alert("Нет фишек 😢");
      return;
    }

    balance -= 1;
    const slotImgs = document.querySelectorAll(".slot-dog");
    const result = [];

    slotImgs.forEach(img => img.classList.add("spin"));

    setTimeout(() => {
      slotImgs.forEach(img => {
        const dog = dogs[Math.floor(Math.random() * dogs.length)];
        img.src = dog;
        result.push(dog);
        img.classList.remove("spin");
      });

      // Выигрыш: если все одинаковые
      if (result.every(d => d === result[0])) {
        balance += 50;
        if (tg) tg.showPopup({ message: "🎉 Jackpot! +50 фишек" });
        else alert("🎉 Jackpot! +50 фишек");
      }

      updateSlotBalance();
    }, 800);
  };

  updateSlotBalance();
}

function updateSlotBalance() {
  document.getElementById("balance").innerText = balance;
  window.SLOT_BALANCE = balance;
  updateMenuBalance();
}
