window.StartClassicSlot = function(container, currentBalance, updateBalanceCallback) {
    // 1. Верстка
    container.innerHTML = `
        <div style="text-align: center;">
            <div class="classic-reels">
                <span id="r1">🍒</span>
                <span id="r2">🍒</span>
                <span id="r3">🍒</span>
            </div>
            <div id="msg" style="height: 20px; color: #ccc; margin-bottom: 10px;"></div>
            <button id="spinBtn" class="action-btn">Крутити (-10)</button>
        </div>
    `;

    // 2. Змінні
    const btn = container.querySelector("#spinBtn");
    const msg = container.querySelector("#msg");
    const reels = [
        container.querySelector("#r1"),
        container.querySelector("#r2"),
        container.querySelector("#r3")
    ];
    const symbols = ["🍒", "🍋", "7️⃣", "💎"];
    let isSpinning = false;

    // 3. Логіка спіна
    function spin() {
        if (isSpinning) return;
        
        // Перевірка балансу через UI (найпростіший спосіб отримати актуальне значення)
        const currentMoney = parseInt(document.getElementById("balance").innerText);
        if (currentMoney < 10) {
            msg.innerText = "Немає грошей!";
            return;
        }

        isSpinning = true;
        msg.innerText = "Удачі!";
        updateBalanceCallback(-10); // Списати

        // Анімація
        let count = 0;
        const interval = setInterval(() => {
            reels.forEach(r => r.innerText = symbols[Math.floor(Math.random() * symbols.length)]);
            count++;
            if (count > 10) {
                clearInterval(interval);
                checkWin();
            }
        }, 100);
    }

    function checkWin() {
        isSpinning = false;
        const res = reels.map(r => r.innerText);
        
        if (res[0] === res[1] && res[1] === res[2]) {
            msg.innerText = "ДЖЕКПОТ! +100";
            msg.style.color = "#facc15";
            updateBalanceCallback(100);
            window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
        } else {
            msg.innerText = "Пусто...";
            msg.style.color = "#ccc";
        }
    }

    btn.addEventListener("click", spin);

    // 4. Функція очистки (викликається при виході)
    return {
        destroy: () => {
            btn.removeEventListener("click", spin);
        }
    };
};
