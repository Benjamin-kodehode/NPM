//Start
const apiEndpointPokemon = `https://pokeapi.co/api/v2/pokemon/`;
let currentPokemon = null;
let health = 3;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// GAME START
function gameStart() {
  document.querySelector(".score").textContent = `Score: ${score}`;
  document.querySelector(".health").textContent = `Health: ${health}`;
  document.querySelector(
    ".high-score"
  ).textContent = `High Score: ${highScore}`;
  fetchRandomPokemon();
}

// Fetching API SHIT
async function fetchRandomPokemon() {
  try {
    const randomID = Math.floor(Math.random() * 151) + 1;
    const response = await fetch(`${apiEndpointPokemon}${randomID}`);
    const data = await response.json();
    currentPokemon = data;

    // IMAGE
    const pokemonImage = document.querySelector(".pokemon-image");
    pokemonImage.src = data.sprites.other["official-artwork"].front_default;

    // AUDIO
    const audio = new Audio("audio/whosthat.mp3");
    audio.play();
  } catch (error) {
    console.error("Failed to fetch Pokémon", error);
  }
}

// GUESS
function letCook() {
  const userGuess = document
    .querySelector(".guess-input")
    .value.toLowerCase()
    .trim();
  // WIN
  if (!currentPokemon) return;

  if (userGuess === currentPokemon.name) {
    score++;
    document.querySelector(".score").textContent = `Score: ${score}`;
    alert("Correct! It's " + currentPokemon.name + "!");
    fetchRandomPokemon();
    //LOSE
  } else {
    health--;
    document.querySelector(".health").textContent = `Health: ${health}`;

    // SKIPS THE POKEMON WHEN LOSE
    if (health > 0) {
      alert(`It was ${currentPokemon.name}, better luck next time!`);
      fetchRandomPokemon();
    }
  }

  // GAME OVER
  if (health <= 0) {
    alert("Game Over! Your final score is " + score);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore);
    }
    restartGame();
  }
  // Clear INPUT
  document.querySelector(".guess-input").value = "";
}

// RESTART
function restartGame() {
  score = 0;
  health = 3;
  gameStart();
}

// Event listeners
document.querySelector(".guess-button").addEventListener("click", letCook);
document
  .querySelector(".restart-button")
  .addEventListener("click", restartGame);

// Start the game
gameStart();
