const SIZE = 800;
const SCALE = 40;
const canvas = document.querySelector("canvas");
canvas.width = SIZE;
canvas.height = SIZE;
const context = canvas.getContext("2d");
context.setTransform(SCALE, 0, 0, SCALE, 0, 0);

let snakeBody = [
  [10, 10],
  [10, 11],
  [10, 12],
];
let food = [0, 10];

const directions = {
  right: [1, 0],
  left: [-1, 0],
  up: [0, -1],
  down: [0, 1],
};
let direction = directions.left;

let interval;

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      direction = directions.up;
      break;
    case "ArrowDown":
      direction = directions.down;
      break;
    case "ArrowLeft":
      direction = directions.left;
      break;
    case "ArrowRight":
      direction = directions.right;
      break;
    case " ":
      handleInterval();
    default:
      break;
  }
});

const initGame = () => {
  context.fillStyle = "red";
  snakeBody.map((piece) => context.fillRect(piece[0], piece[1], 1, 1));
  context.fillStyle = "pink";
  context.fillRect(food[0], food[1], 1, 1);
};

const updateFood = ([x, y]) => {
  const newFood = [
    Math.floor(Math.random() * 20),
    Math.floor(Math.random() * 20),
  ];
  if (x === newFood[0] && y === newFood[1]) updateFood([x, y]);
  else food = newFood;
};

const checkFoodHit = ([x, y]) => {
  if (x === food[0] && y === food[1]) {
    updateFood([x, y]);
    return true;
  }
  return false;
};

const handleInterval = () => {
  if (interval) clearInterval(interval), (interval = undefined);
  else interval = setInterval(() => moveSnake(), 1000);
};

const moveSnake = () => {
  context.clearRect(0, 0, SIZE, SIZE);
  const snakeDuplicate = [...snakeBody];
  const newHead = [
    snakeDuplicate[0][0] + direction[0],
    snakeDuplicate[0][1] + direction[1],
  ];
  snakeDuplicate.unshift(newHead);
  checkFoodHit(newHead) || snakeDuplicate.pop();
  snakeBody = snakeDuplicate;
  context.fillStyle = "red";
  snakeBody.forEach((piece) => context.fillRect(piece[0], piece[1], 1, 1));
  context.fillStyle = "yellow";
  context.fillRect(food[0], food[1], 1, 1);
};

initGame();
