const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ["O", "L", "J", "S", "Z", "I", "T", "D"];

const TETROMINOES = {
  O: [
    [1, 1],
    [1, 1],
  ],
  L: [
    [0, 0, 1],
    [1, 1, 1],
    [0, 0, 0],
  ],
  J: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  S: [
    [0, 1, 1],
    [1, 1, 0],
    [0, 0, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 1],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
    [0, 0, 1, 0],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  D: [[1]],
};

let playfield;
let tetromino;
let timeOutId;
let requestId;
let score = 0;
let isPaused = false;
let isGameOver = false;
let isGameReady = false;



const gameOverBlock = document.querySelector(".game-over");

function getRandomElement(array) {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield() {
  document.querySelector(".tetris").innerHTML = "";
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }

  playfield = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

function generateTetromino() {
  const nameTetro = getRandomElement(TETROMINO_NAMES);
  const matrixTetro = TETROMINOES[nameTetro];
  const columnTetro = Math.floor(
    PLAYFIELD_COLUMNS / 2 - matrixTetro.length / 2
  );
  const rowTetro = -2;

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    column: columnTetro,
    row: rowTetro,
  };
}

let cells;

init();

function init() {
  gameOverBlock.style.display = "none";
  generatePlayfield();
  isGameOver = false;
  cells = document.querySelectorAll(".tetris div");
  score = 0;
    countScore(null);
  if (isGameReady) {
    startLoop();
    generateTetromino();
    pauseButton.innerHTML = pauseText;
    
  }
}

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      const name = playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetramino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.row + row < 0) continue;
      if (tetromino.matrix[row][column] === 0) continue;

      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells[cellIndex].classList.add(name);
    }
  }
}

startLoop();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute("class");
  });
  drawPlayField();
  drawTetramino();
}

document.addEventListener("keydown", onKeyDown);

const startButton = document.querySelector("#start");
const startNewGameButton = document.querySelector("#startNewGame");
const pauseButton = document.querySelector("#pause");
let pauseText = "pause";
let playText = "play again";

pauseButton.innerHTML = pauseText;

const rotateButton = document.querySelector("#rotate");
const leftButton = document.querySelector("#left");
const rightButton = document.querySelector("#right");
const downButton = document.querySelector("#down");
const extraDownButton = document.querySelector("#extraDown");

function togglePauseGame() {
  isPaused = !isPaused;
  if (isPaused) {
    stopLoop();
    pauseButton.innerHTML = playText;
  } else {
    startLoop();
    
  }
  document.activeElement.blur();
}

pauseButton.addEventListener("click", togglePauseGame);

startButton.addEventListener("click", function () {
  isGameReady = true;
  init();
  document.activeElement.blur();
});

startNewGameButton.addEventListener("click", function () {
  isGameReady = true;
  init();
  pauseButton.innerHTML = pauseText;
  document.activeElement.blur();
});

function onKeyDown(event) {
  if (event.key === " ") {
    event.preventDefault();
    dropTetrominoDown();
    return;
  }

  if (event.key === "Pause") {
    togglePauseGame();
  }
  if (isPaused) {
    return;
  }

  switch (event.key) {
    case "ArrowUp":
      rotateTetromino();
      break;
    case "ArrowDown":
      moveTetrominoDown();
      break;
    case "ArrowLeft":
      moveTetrominoLeft();
      break;
    case "ArrowRight":
      moveTetrominoRight();
      break;
  }
  draw();
}

rotateButton.addEventListener("click", rotateTetromino);
leftButton.addEventListener("click", moveTetrominoLeft);
rightButton.addEventListener("click", moveTetrominoRight);
downButton.addEventListener("click", moveTetrominoDown);
extraDownButton.addEventListener("click", dropTetrominoDown);

function dropTetrominoDown() {
  while (!isValid()) {
    tetromino.row++;
  }
  tetromino.row--;
  document.activeElement.blur();
}

function moveTetrominoDown() {
  tetromino.row += 1;
  if (isValid()) {
    tetromino.row -= 1;
    placeTetromino();
  }
  document.activeElement.blur();
}

function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isValid()) {
    tetromino.column += 1;
  }
  document.activeElement.blur();
}

function moveTetrominoRight() {
  tetromino.column += 1;
  if (isValid()) {
    tetromino.column -= 1;
  }
  document.activeElement.blur();
}

function isValid() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (tetromino.matrix[row][column] === 0) continue;
      if (isOutsideOfGameBoard(row, column)) return true;
      if (hasCollisions(row, column)) return true;
    }
  }
  return false;
}

function isOutsideOfGameBoard(row, column) {
  return (
    tetromino.column + column < 0 ||
    tetromino.column + column >= PLAYFIELD_COLUMNS ||
    tetromino.row + row >= playfield.length
  );
}

function hasCollisions(row, column) {
  return playfield[tetromino.row + row]?.[tetromino.column + column];
}

function moveDown() {
  moveTetrominoDown();
  draw();
  stopLoop();
  startLoop();
  if (isGameOver) {
    gameOver();
  }
}

const animatedBlock = document.querySelector(".animatedBlock");

function gameOver() {
  stopLoop();
  gameOverBlock.style.display = "flex";
  animatedBlock.classList.add("animatedBlock");
  document.querySelector("#finalScore").innerHTML = score;
}

function isOutsideTopBoard(row) {
  return tetromino.row + row < 0;
}

function startLoop() {
  timeOutId = setTimeout(
    () => (requestId = requestAnimationFrame(moveDown)),
    700
  );
}

function stopLoop() {
  cancelAnimationFrame(requestId);
  timeOutId = clearTimeout(timeOutId);
}

function rotateTetromino() {
  const oldMatrix = tetromino.matrix;
  const rotatedMatrix = rotateMatrix(tetromino.matrix);
  tetromino.matrix = rotatedMatrix;
  if (isValid()) {
    tetromino.matrix = oldMatrix;
  }
}

function rotateMatrix(matrixTetromino) {
  const N = matrixTetromino.length;
  const rotateMatrix = [];
  for (let i = 0; i < N; i++) {
    rotateMatrix[i] = [];
    for (let j = 0; j < N; j++) {
      rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
    }
  }
  return rotateMatrix;
}

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      if (isOutsideTopBoard(row)) {
        isGameOver = true;
        return;
      }

      playfield[tetromino.row + row][tetromino.column + column] =
        tetromino.name;
    }
  }
  const filledRows = findFilledRows();
  removeFillRows(filledRows);
  generateTetromino();
}

function countScore(destroyRows) {
  switch (destroyRows) {
    case 1:
      score += 10;
      break;
    case 2:
      score += 30;
      break;
    case 3:
      score += 50;
      break;
    case 4:
      score += 100;
      break;
  }
  document.querySelector("p").innerHTML = score;
}

function removeFillRows(filledRows) {
  filledRows.forEach((row) => {
    dropRowsAbove(row);
  });
  countScore(filledRows.length);
}

function dropRowsAbove(rowDelete) {
  for (let row = rowDelete; row > 0; row--) {
    playfield[row] = playfield[row - 1];
  }
  playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}

function findFilledRows() {
  const filledRows = [];
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    let filledColumns = 0;
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (playfield[row][column] != 0) {
        filledColumns++;
      }
    }
    if (PLAYFIELD_COLUMNS === filledColumns) {
      filledRows.push(row);
    }
  }
  return filledRows;
}
