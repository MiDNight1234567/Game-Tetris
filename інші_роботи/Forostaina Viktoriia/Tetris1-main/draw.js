import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./constants.js";
import { playfield } from "./generatePlayfield.js";

import { tetromino } from "./generateTetromino.js";

export function convertPositionToIndex(row, column) {
  return row * PLAYFIELD_COLUMNS + column;
}

const cells = () => document.querySelectorAll(".tetris div");

export function drawPlayField() {
  for (let row = 0; row < PLAYFIELD_ROWS; row++) {
    for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
      if (playfield[row][column] == 0) {
        continue;
      }
      const name = playfield[row][column];
      const cellIndex = convertPositionToIndex(row, column);
      cells()[cellIndex].classList.add(name);
      // cells()[cellIndex].style.backgroundColor = tetromino.color;
    }
  }
}

export function drawTetromino() {
  const name = tetromino.name;
  const tetrominoMatrixSize = tetromino.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetromino.row + row < 0) { continue }
      if (!tetromino.matrix[row][column]) {
        continue;
      }
      const cellIndex = convertPositionToIndex(
        tetromino.row + row,
        tetromino.column + column
      );
      cells()[cellIndex].classList.add(name);
      // cells()[cellIndex].style.backgroundColor = tetromino.color;
    }
  }
}
export function draw() {
  cells().forEach(function (cell) {
    cell.removeAttribute("class");
    // cell.style.backgroundColor = "rgba(97, 75, 75, 0.2)";
  });

  drawPlayField();

  drawTetromino();
}

