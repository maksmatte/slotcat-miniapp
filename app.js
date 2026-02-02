// Ініціалізація Telegram
const tg = window.Telegram?.WebApp;
tg?.expand();

// Дані користувача
const user = tg?.initDataUnsafe?.user;
const playerName = user?.first_name || "Гравець";
const userId = user?.id || "local_test";

// Баланс (завантажуємо або ставимо 1000)
let balance = Number(localStorage.getItem(`balance_${userId}`)) || 1000;
let currentGameInstance = null; // Тут зберігаємо активну гру

// Елементи
const menu = document.getElementById("menu");
const gameScreen = document.getElementById("gameScreen");
const gameContainer = document.getElementById("activeSlotContainer");
const uiBalance = document.getElementById("balance");
const uiUser = document.getElementById("user");

// Початкове відображення
uiUser.innerText = playerName;
uiBalance.innerText = balance;

// --- Функція зміни балансу (передається в ігри) ---
function updateBalance(amount) {
    balance += amount;
    uiBalance.innerText = balance;
    localStorage.setItem(`balance_${userId}`, balance);
}

// --- Функція запуску гри ---
function launchGame(gameStarter) {
    // 1. Інтерфейс
    menu.style.display = "none";
    gameScreen.style.display = "flex";
    
    // 2. Очистка попередньої гри
    if (currentGameInstance && currentGameInstance.destroy) {
        currentGameInstance.destroy();
    }
    gameContainer.innerHTML = ""; // Чистимо HTML

    // 3. Запуск нової
    if (typeof gameStarter === 'function') {
        // Передаємо контейнер, баланс і функцію оновлення балансу
        currentGameInstance = gameStarter(gameContainer, balance, updateBalance);
    }
}

// --- Кнопка "Назад" ---
document.getElementById("backBtn").onclick = () => {
    // Зупиняємо гру
    if (currentGameInstance && currentGameInstance.destroy) {
        currentGameInstance.destroy();
    }
    currentGameInstance = null;
    gameContainer.innerHTML = "";

    // Показуємо меню
    gameScreen.style.display = "none";
    menu.style.display = "flex";
};

// --- Прив'язка кнопок меню ---
// Перевіряємо, чи завантажились файли ігор
document.getElementById("playClassic").onclick = () => {
    if (window.StartClassicSlot) launchGame(window.StartClassicSlot);
    else alert("Помилка: Файл slot_classic.js не знайдено!");
};

document.getElementById("playDogHunt").onclick = () => {
    if (window.StartDogSlot) launchGame(window.StartDogSlot);
    else alert("Помилка: Файл slot_doghunt.js не знайдено!");
};

document.getElementById("balanceBtn").onclick = () => tg.showAlert(`Твій баланс: ${balance}`);
document.getElementById("soonBtn").onclick = () => tg.showAlert("Скоро буде!");
