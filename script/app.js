const canvas = document.querySelector("#game"),
  ctx = canvas.getContext("2d"),
  ground = new Image(),
  foodImg = new Image();

ground.src = "images/snake-field.png";
foodImg.src = "images/eat-snake.png";

let box = 32,
  score = 0;
(food = {
  x: Math.floor(Math.random() * 17 + 1) * box,
  y: Math.floor(Math.random() * 15 + 3) * box,
}),
  (snake = []);

(snake[0] = {
  x: 9 * box,
  y: 10 * box,
})

document.addEventListener("keydown", direction);
let dir;

function direction(event) {
  if (event.keyCode == (37 && 65) && dir !== "right") {
    dir = "left";
  } else if (event.keyCode == (38 && 87) && dir !== "up") {
    dir = "up";
  } else if (event.keyCode == (39 && 68) && dir !== "left") {
    dir = "right";
  } else if (event.keyCode == (40 && 83) && dir !== "down") {
    dir = "down";
  }
}

function eatTail(head, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (head.x == arr[i].x && head.y == arr[i].y) {
      clearInterval(game);
    }
  }
}

function drawGame() {
  ctx.drawImage(ground, 0, 0);

  ctx.drawImage(foodImg, food.x, food.y);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "rgb(1, 95, 1)" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // score style
  ctx.fillStyle = "white";
  ctx.font = "50px Roboto";
  ctx.fillText(score, box * 2.5, box * 1.7);

  let snakeX = snake[0].x,
    snakeY = snake[0].y;

  if (snakeX == food.x && snakeY == food.y) {
    score++;
    food = {
      x: Math.floor(Math.random() * 17 + 1) * box,
      y: Math.floor(Math.random() * 15 + 3) * box,
    };
  } else {
    snake.pop();
  }

  if (
    snakeX < box ||
    snakeX > box * 17 ||
    snakeY < 3 * box ||
    snakeY > box * 17
  ) {
    clearInterval(game);
  }

  if (dir == "left") snakeX -= box;
  if (dir == "right") snakeX += box;
  if (dir == "up") snakeY -= box;
  if (dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  eatTail(newHead, snake);

  snake.unshift(newHead);
}


let game = setInterval(drawGame, 100);
