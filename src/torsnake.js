const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const playButton = document.getElementById("playButton");
const restartButton = document.getElementById("restartButton");

let scale = 20; // Initial scale
let rows = canvas.height / scale;
let columns = canvas.width / scale;

let snake;
let fruit;
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let gameInterval;

(function setup() {
  playButton.addEventListener("click", startGame);
  restartButton.addEventListener("click", restartGame);
  updateScoreboard();
  updateCanvasDimensions(); // Adjust rows and columns initially
})();

function updateCanvasDimensions() {
  // Dynamically calculate rows and columns based on the current canvas size
  rows = canvas.height / scale;
  columns = canvas.width / scale;
}

function startGame() {
  playButton.disabled = true;
  restartButton.disabled = false;
  score = 0;
  updateCanvasDimensions(); // Recalculate grid dimensions
  snake = new Snake();
  fruit = new Fruit();
  gameInterval = setInterval(update, 100);
}

function restartGame() {
  score = 0;
  updateScoreboard();
  updateCanvasDimensions(); // Recalculate grid dimensions
  snake = new Snake();
  fruit = new Fruit();
  clearInterval(gameInterval); // Stop the current game
  gameInterval = setInterval(update, 100); // Start a new game
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  snake.update();
  snake.draw();
  fruit.draw();

  if (snake.eat(fruit)) {
    fruit = new Fruit();
    score++;
    updateScoreboard();
  }

  if (snake.checkCollision()) {
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("highScore", highScore); // Save high score to localStorage
    }
    score = 0; // Reset score
    updateScoreboard();
    clearInterval(gameInterval); // Stop the game
    playButton.disabled = false; // Enable the Play button again
  }
}

function updateScoreboard() {
  document.getElementById("score").textContent = score;
  document.getElementById("highScore").textContent = highScore;
}

function Snake() {
  this.snakeArray = [{ x: 5, y: 5 }];
  this.direction = "right";
  this.length = 1;

  this.draw = function () {
    ctx.fillStyle = "green";
    for (let i = 0; i < this.snakeArray.length; i++) {
      ctx.fillRect(
        this.snakeArray[i].x * scale,
        this.snakeArray[i].y * scale,
        scale,
        scale
      );
    }
  };

  this.update = function () {
    let head = { ...this.snakeArray[0] };

    if (this.direction === "right") head.x++;
    if (this.direction === "left") head.x--;
    if (this.direction === "up") head.y--;
    if (this.direction === "down") head.y++;

    this.snakeArray.unshift(head);
    if (this.snakeArray.length > this.length) {
      this.snakeArray.pop();
    }
  };

  this.changeDirection = function (event) {
    if (event.keyCode === 37 && this.direction !== "right") this.direction = "left";
    if (event.keyCode === 38 && this.direction !== "down") this.direction = "up";
    if (event.keyCode === 39 && this.direction !== "left") this.direction = "right";
    if (event.keyCode === 40 && this.direction !== "up") this.direction = "down";
  };

  this.eat = function (fruit) {
    if (this.snakeArray[0].x === fruit.x && this.snakeArray[0].y === fruit.y) {
      this.length++;
      return true;
    }
    return false;
  };

  this.checkCollision = function () {
    if (
      this.snakeArray[0].x < 0 ||
      this.snakeArray[0].x >= columns ||
      this.snakeArray[0].y < 0 ||
      this.snakeArray[0].y >= rows
    ) {
      return true;
    }

    for (let i = 1; i < this.snakeArray.length; i++) {
      if (
        this.snakeArray[0].x === this.snakeArray[i].x &&
        this.snakeArray[0].y === this.snakeArray[i].y
      ) {
        return true;
      }
    }

    return false;
  };
}

function Fruit() {
  this.x = Math.floor(Math.random() * columns);
  this.y = Math.floor(Math.random() * rows);

  this.draw = function () {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x * scale, this.y * scale, scale, scale);
  };
}

window.addEventListener("keydown", (event) => {
  snake.changeDirection(event);
});
