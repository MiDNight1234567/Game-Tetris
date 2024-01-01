const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = ['O', 'L', 'RL', 'J', 'S', 'Z', 'T', 'I'];

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
  RL: [
    [0, 0, 0],
    [1, 1, 1],
    [0, 0, 1],
  ],
  J: [
    [1, 1, 0],
    [0, 1, 0],
    [1, 1, 0],
  ],
  S: [
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
  ],
  Z: [
    [1, 1, 0],
    [0, 1, 0],
    [0, 1, 1],
  ],
  T: [
    [1, 1, 1],
    [0, 1, 0],
    [0, 0, 0],
  ],
  I: [
    [0, 0, 0, 0],
    [1, 1, 1, 1],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ],
};

let playField;
let tetromino;
let score = 0;
let isStarted = false;
let timerId;
displayMessage(`Score: ${score}`);

function randomGenerator(from, to) {
  return Math.floor(Math.random() * (to - from) + from);
}

function centeredTetromino(PLAYFIELD_COLUMNS, lengthTetromino) {
  return Math.floor((PLAYFIELD_COLUMNS - lengthTetromino) / 2);
}

function randomColor() {
  const r = randomGenerator(0, 256);
  const g = randomGenerator(0, 256);
  const b = randomGenerator(0, 256);
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return rgb;
}

function convertPositionToIndex(row, column) {
  // ****************************************
  return Math.abs(row * PLAYFIELD_COLUMNS + column);
  // ********************************************
  // return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayField() {
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement('div');
    document.querySelector('.tetris').append(div);
  }

  playField = new Array(PLAYFIELD_ROWS)
    .fill()
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
}

function randomTetromino() {
  const ammount = TETROMINO_NAMES.length;
  const randomtetro = randomGenerator(0, ammount);
  return TETROMINO_NAMES[randomtetro];
}

function generateTetromino() {
  const nameTetro = randomTetromino();
  const matrixTetro = TETROMINOES[nameTetro];
  const rowTetro = -2;
  const columnTetro = centeredTetromino(PLAYFIELD_COLUMNS, matrixTetro.length);
  const colorTetro = randomColor();

  tetromino = {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
    color: colorTetro,
  };
}

generatePlayField();
generateTetromino();
const cells = document.querySelectorAll('.tetris div');

function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      const name = playField[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells[cellIndex].classList.add(name);
    }
  }
}

function drawTetromino() {
  const name = tetromino.name;
  const color = tetromino.color;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.matrix[row][column] == 0) {
        continue;
      }

      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      // *********************************************
      console.log('cellIndex:', cellIndex);
      cells[cellIndex].classList.add(name);
      cells[cellIndex].style.setProperty('--color-tetromino', color);
      // }
    }
  }
}

drawTetromino();

function draw() {
  cells.forEach(function (cell) {
    cell.removeAttribute('class');
  });
  drawPlayField();
  drawTetromino();
}

document.addEventListener('keydown', onKeyDown);
// document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
  switch (event.key) {
    case 'ArrowDown':
      moveTetrominoDown();
      break;
    case 'ArrowLeft':
      moveTetrominoLeft();
      break;
    case 'ArrowRight':
      moveTetrominoRight();
      break;
    case 'ArrowUp':
      rotateTetromino();
      break;
    // ***********************
    case ' ':
      toggleGame();
      // console.log('space:', event.key);
      break;
    // ***********************
  }
  draw();
}

// ***************************
function toggleGame() {
  console.log('toggleGame');
  isStarted ? pause() : start();
}

function autoMove() {
  moveTetrominoDown();
  draw();
}

function start() {
  isStarted = true;
  timerId = setInterval(() => autoMove(), 1000);
}

function pause() {
  isStarted = false;
  clearInterval(timerId);
}
// ***************************

function moveTetrominoDown() {
  if (isStarted) {
    tetromino.row += 1;
  }
  if (isValid()) {
    tetromino.row -= 1;
    placeTetromino();
  }
}

function moveTetrominoLeft() {
  if (isStarted) {
    tetromino.column -= 1;
  }
  if (isValid()) {
    tetromino.column += 1;
  }
}

function moveTetrominoRight() {
  if (isStarted) {
    tetromino.column += 1;
  }
  if (isValid()) {
    tetromino.column -= 1;
  }
}

function isValid() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) {
        continue;
      }
      if (isOutsideOfGameBoard(row, column)) {
        return true;
      }
      if (hasCollisions(row, column)) {
        return true;
      }
    }
  }
  return false;
}

function isOutsideOfGameBoard(row, column) {
  if (
    tetromino.column + column < 0 ||
    tetromino.column + column >= PLAYFIELD_COLUMNS ||
    tetromino.row + row >= playField.length
  ) {
    return true;
  }

  return false;
}

function hasCollisions(row, column) {
  // console.log(column, tetromino.column);

  return playField[Math.abs(tetromino.row + row)][tetromino.column + column];
}

function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      playField[tetromino.row + row][tetromino.column + column] =
        TETROMINO_NAMES[0];
      // playField[tetromino.row + row][tetromino.column + column] =
      // TETROMINO_NAMES[0];
      // tetromino.name;
    }
  }
  const filledRows = findFilledRows();
  // console.log(filledRows);
  removeFillRows(filledRows);
  generateTetromino();
  generateTetromino();
}

function removeFillRows(filledRows) {
  filledRows.forEach((row) => {
    dropRowsAbove(row);
  });
}

function dropRowsAbove(rowDelete) {
  for (let row = rowDelete; row > 0; row--) {
    playField[row] = playField[row - 1];
  }

  playField[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}

// ***********************
function scoreCalculate(filledRows) {
  switch (filledRows.length) {
    case 1:
      return (score += 10);
      break;
    case 2:
      return (score += 30);
      break;
    case 3:
      return (score += 50);
      break;
    case 4:
      return (score += 100);
      break;
  }
}

function displayMessage(msg) {
  var messageArea = document.getElementById('messageAreaScore');
  messageArea.innerHTML = msg;
}
// **********************

function findFilledRows() {
  const filledRows = [];
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    let filledColumns = 0;

    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (playField[row][column] != 0) {
        filledColumns++;
      }
    }
    if (PLAYFIELD_COLUMNS == filledColumns) {
      filledRows.push(row);
    }
  }
  //************
  scoreCalculate(filledRows);
  displayMessage(`Score: ${score}`);

  //************
  console.log('score:', score);
  return filledRows;
}

// let array = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ];

function rotateTetromino() {
  if (isStarted) {
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
    tetromino.matrix = rotatedMatrix;
    if (isValid()) {
      tetromino.matrix = oldMatrix;
    }
  }
}

function rotateMatrix(matrixTetromino) {
  const N = tetromino.matrix.length;
  const rotateMatrix = [];
  for (let i = 0; i < N; i++) {
    rotateMatrix[i] = [];
    for (let j = 0; j < N; j++) {
      rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
    }
  }
  return rotateMatrix;
}
