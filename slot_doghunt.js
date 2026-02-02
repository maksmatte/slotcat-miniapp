window.StartDogSlot = function(container, currentBalance, updateBalanceCallback) {
    // ВАЖЛИВО: Перевір назви файлів у папці img!
    // GitHub Pages чутливий до регістру (dog1.png і dog1.PNG - це різні файли)
    const dogs = [
        "img/dog1.PNG", 
        "img/dog2.PNG", 
        "img/dog3.PNG", 
        "img/dog4.PNG", 
        "img/dog5.PNG"
    ];

    // 1. Верстка
    container.innerHTML = `
        <div style="text-align: center;">
            <h3 style="margin-top:0;">🐶 Dog Hunt</h3>
            <div class="dogs-container">
                <img class="dog-img" src="${dogs[0]}">
                <img class="dog-img" src="${dogs[1]}">
                <img class="dog-img" src="${dogs[2]}">
                <img class="dog-img" src="${dogs[3]}">
                <img class="dog-img" src="${dogs[4]}">
            </div>
            <div id="dMsg" style="height: 20px; color: #ccc; margin-bottom: 10px;">Збери 5 однакових!</div>
            <button id="huntBtn" class="action-btn" style="background:#854d0e;">Полювати (-20)</button>
        </div>
    `;

    // 2. Змінні
    const btn = container.querySelector("#huntBtn");
    const msg = container.querySelector("#dMsg");
    const imgs = container.querySelectorAll(".dog-img");
    let isSpinning = false;

    // 3. Логіка
    function spin() {
        if (isSpinning) return;

        const currentMoney = parseInt(document.getElementById("balance").innerText);
        if (currentMoney < 20) {
            msg.innerText = "Мало корму!";
            return;
        }

        isSpinning = true;
        updateBalanceCallback(-20);
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('medium');

        let count = 0;
        const interval = setInterval(() => {
            imgs.forEach(img => {
                img.src = dogs[Math.floor(Math.random() * dogs.length)];
            });
            count++;
            if (count > 12) {
                clearInterval(interval);
                checkWin();
            }
        }, 80);
    }

    function checkWin() {
        isSpinning = false;
        const results = Array.from(imgs).map(img => img.getAttribute('src')); // Беремо поточні src
        
        // Перевірка: чи всі 5 однакові?
        const allSame = results.every(src => src === results[0]);

        if (allSame) {
            msg.innerText = "СУПЕР ЗГРАЯ! +500";
            msg.style.color = "gold";
            updateBalanceCallback(500);
            window.Telegram?.WebApp?.HapticFeedback?.notificationOccurred('success');
        } else {
            msg.innerText = "АХХААЫАХЫХА ТЫ ПРОЕБАЛ ДАУН!!";
            msg.style.color = "#ccc";
        }
    }

    btn.addEventListener("click", spin);

    return {
        destroy: () => {
            btn.removeEventListener("click", spin);
        }
    };
};
