//Pokémon and HP
let player = { name: "Obstagoon", hp: 150 };
let opponent = { name: "Charmander", hp: 100 };

// HTML <---> JS
const log = document.getElementById("battle-log");
const playerHp = document.getElementById("player-hp");
const opponentHp = document.getElementById("opponent-hp");
const scratchBtn = document.getElementById("scratch-btn");
const splashBtn = document.getElementById("splash-btn");

// Battle log 2 messages only
let logHistory = [];

// updates HP
function updateHp() {
  playerHp.textContent = player.hp;
  opponentHp.textContent = opponent.hp;
}

// 2 messages in LOG
function logMessage(message) {
  logHistory.push(message);
  if (logHistory.length > 2) logHistory.shift();
  log.textContent = logHistory.join("\n");
}

// Scratch
function useScratch() {
  disableButtons(); // letting you oneshot the enemy in one turn disabled
  const damage = getRandomDamage(10, 15); // RNG ENABLED
  opponent.hp -= damage;
  if (opponent.hp < 0) opponent.hp = 0;
  logMessage(`Obstagoon used Scratch! Charmander took ${damage} damage.`);
  endTurn();
}

// Splash
function useSplash() {
  disableButtons(); // letting you oneshot the enemy in one turn disabled
  logMessage("Obstagoon used Splash... But nothing happened!");
  endTurn();
}

// Opponent's turn
function opponentTurn() {
  if (opponent.hp <= 0) return;
  const damage = getRandomDamage(8, 12); // RNG ENABLED
  player.hp -= damage;
  if (player.hp < 0) player.hp = 0;
  logMessage(`Charmander used Scratch! Obstagoon took ${damage} damage.`);
  updateHp();
  checkBattleOutcome();
  enableButtons();
}

// End of turn
function endTurn() {
  updateHp();
  checkBattleOutcome();
  if (opponent.hp > 0 && player.hp > 0) {
    setTimeout(opponentTurn, 2000);
  }
}

// GAME OVER
function checkBattleOutcome() {
  if (opponent.hp <= 0) {
    logMessage("Charmander fainted! You win!");
    disableButtons();
  } else if (player.hp <= 0) {
    logMessage("Obstagoon fainted! You lose!");
    disableButtons();
  }
}

// ONESHOT DISABLER
function disableButtons() {
  scratchBtn.disabled = true;
  splashBtn.disabled = true;
}

// TURNBASED ENABLER
function enableButtons() {
  scratchBtn.disabled = false;
  splashBtn.disabled = false;
}

// RNGESUS
function getRandomDamage(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// buttons
scratchBtn.addEventListener("click", useScratch);
splashBtn.addEventListener("click", useSplash);

//..... updates the hp
updateHp();
MUSIC;
window.onload = function () {
  const audio = document.getElementById("background-music");
  audio.play();
};
