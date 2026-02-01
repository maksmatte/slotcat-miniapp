const tg = window.Telegram.WebApp;
tg.expand();

// пользователь
const user = tg.initDataUnsafe.user;
document.getElementById("user").innerText =
    user ? `Игрок: ${user.first_name}` : "Игрок";

// баланс
let balance = localStorage.getItem("balance");
if (!balance) {
    balance = 100;
    localStorage.setItem("balance", balance);
}
balance = Number(balance);

const balanceEl = document.getElementById("balance");
balanceEl.innerText = balance;

// слот
const symbols = ["🍒", "🍋", "🔔", "⭐", "7️⃣"];
const slotEls = document.querySelectorAll("#slot span");

document.getElementById("play").onclick = () => {
    if (balance <= 0) {
        alert("Нет фишек 😢");
        return;
    }

    balance -= 1;

    const result = [];
    slotEls.forEach(el => {
        const sym = symbols[Math.floor(Math.random() * symbols.length)];
        el.innerText = sym;
        result.push(sym);
    });

    // выигрыш
    if (result.every(s => s === result[0])) {
        balance += 10;
        tg.showPopup({ message: "🎉 Победа! +10 фишек" });
    }

    localStorage.setItem("balance", balance);
    balanceEl.innerText = balance;
};
