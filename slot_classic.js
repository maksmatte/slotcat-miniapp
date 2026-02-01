const slotContainer = document.getElementById("slot");
slotContainer.innerHTML = "<span>❓</span><span>❓</span><span>❓</span>";

const slotEls = slotContainer.querySelectorAll("span");
const symbols = ["🍒","🍋","🔔","⭐","7️⃣"];

document.getElementById("play").onclick = () => {
  let balance = window.SLOT_BALANCE || 100;

  slotEls.forEach(el => {
    const sym = symbols[Math.floor(Math.random() * symbols.length)];
    el.innerText = sym;
  });

  const result = Array.from(slotEls).map(el => el.innerText);
  if (result.every(s => s === result[0])) {
    balance += 10;
    tg?.showPopup({ message: "🎉 Победа! +10 фишек" });
  }

  window.SLOT_BALANCE = balance;
  localStorage.setItem("balance", balance);
  document.getElementById("balance").innerText = balance;
};
