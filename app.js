document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const gameContainer = document.getElementById("gameContainer");
  const playBtn = document.getElementById("playBtn");
  const balanceBtn = document.getElementById("balanceBtn");
  const soonBtn = document.getElementById("soonBtn");
  const backBtn = document.getElementById("backBtn");

  let balance = Number(localStorage.getItem("balance")) || 100;

  playBtn.addEventListener("click", () => {
    menu.style.display = "none";
    gameContainer.style.display = "block";

    // Подключаем слот
    const script = document.createElement("script");
    script.src = "slot_classic.js";
    script.id = "slotScript";
    document.body.appendChild(script);

    document.getElementById("balance").innerText = balance;
  });

  balanceBtn.addEventListener("click", () => {
    alert(`Ваш баланс: ${balance} 🐱`);
  });

  soonBtn.addEventListener("click", () => {
    alert("Эта функция появится позже! ⏳");
  });

  backBtn.addEventListener("click", () => {
    gameContainer.style.display = "none";
    menu.style.display = "flex";

    // Удаляем слот
    const oldScript = document.getElementById("slotScript");
    if (oldScript) oldScript.remove();

    // Очищаем контейнер слота
    const slotContainer = document.getElementById("slot");
    slotContainer.innerHTML = '<span>❓</span><span>❓</span><span>❓</span>';
  });
});
