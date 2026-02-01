// ---------- Глобальные данные ----------
const tg = window.Telegram?.WebApp;
tg?.expand();

const playerName = tg?.initDataUnsafe?.user?.first_name || "Игрок Тест";
let balance = Number(localStorage.getItem("balance")) || 100;

// ---------- Элементы ----------
const menu = document.getElementById("menu");
const gameContainer = document.getElementById("gameContainer");
const playClassic = document.getElementById("playClassic");
const playDogHunt = document.getElementById("playDogHunt");
const balanceBtn = document.getElementById("balanceBtn");
const soonBtn = document.getElementById("soonBtn");
const backBtn = document.getElementById("backBtn");
const slotContainer = document.getElementById("slot");
const playBtn = document.getElementById("play");
const balanceEl = document.getElementById("balance");
const userEl = document.getElementById("user");

// Показываем профиль
userEl.innerText = `Игрок: ${playerName}`;
balanceEl.innerText = balance;

// ---------- Функции слотов ----------
function initClassicSlot() {
    slotContainer.innerHTML = `<span>❓</span><span>❓</span><span>❓</span>`;
    const symbols = ["🍒","🍋","🔔","⭐","7️⃣"];
    const slotEls = slotContainer.querySelectorAll("span");

    playBtn.onclick = () => {
        if (balance <= 0) return alert("Нет фишек 😢");
        balance -= 1;

        const result = [];
        slotEls.forEach(el => {
            const sym = symbols[Math.floor(Math.random() * symbols.length)];
            el.innerText = sym;
            result.push(sym);
        });

        if (result.every(s => s === result[0])) {
            balance += 10;
            tg?.showPopup({message:"🎉 Победа! +10 фишек"});
        }

        balanceEl.innerText = balance;
        localStorage.setItem("balance", balance);
    };
}

function initDogHuntSlot() {
    // 5 слотов
    slotContainer.innerHTML = "";
    const dogImgs = [
        "dog1.png","dog2.png","dog3.png","dog4.png","dog5.png"
    ];
    const slotEls = [];
    for (let i=0;i<5;i++){
        const img = document.createElement("img");
        img.src = dogImgs[i]; // заменим на реальные ссылки
        img.style.width="80px";
        img.style.height="80px";
        img.style.margin="5px";
        slotContainer.appendChild(img);
        slotEls.push(img);
    }

    playBtn.onclick = () => {
        if (balance <= 0) return alert("Нет фишек 😢");
        balance -= 1;

        const result = [];
        slotEls.forEach(el=>{
            const randDog = dogImgs[Math.floor(Math.random()*dogImgs.length)];
            el.src = randDog;
            result.push(randDog);
        });

        // Выигрыш: все 5 одинаковые
        if (result.every(s=>s===result[0])){
            balance += 20;
            tg?.showPopup({message:"🐶 Победа! +20 фишек"});
        }

        balanceEl.innerText = balance;
        localStorage.setItem("balance", balance);
    };
}

// ---------- Меню ----------
playClassic.addEventListener("click", () => {
    menu.style.display = "none";
    gameContainer.style.display = "block";
    initClassicSlot();
});

playDogHunt.addEventListener("click", () => {
    menu.style.display = "none";
    gameContainer.style.display = "block";
    initDogHuntSlot();
});

balanceBtn.addEventListener("click", ()=>alert(`Ваш баланс: ${balance} 🐱`));
soonBtn.addEventListener("click", ()=>alert("Эта функция появится позже! ⏳"));

backBtn.addEventListener("click", ()=>{
    gameContainer.style.display="none";
    menu.style.display="flex";
});
