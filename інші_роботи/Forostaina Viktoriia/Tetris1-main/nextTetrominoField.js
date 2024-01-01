import { tetrominoNext } from "./generateTetromino.js";
import {convertPositionToIndex} from './draw.js';




export function tetrominoNextField() {
  document.querySelector(".tetromino-field").innerHTML = "";
  for (let i = 0; i < tetrominoNext.row * tetrominoNext.column; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetromino-field").append(div);
  }
  playfield = new Array(tetrominoNext.row)
    .fill(5)
    .map(() => new Array(tetrominoNext.column).fill(0));
}
const cellsNextField = () => document.querySelectorAll(".tetromino-field div");

// export function drawtetrominoNextField() {
//   for (let row = 0; row < tetrominoNext.row; row++) {
//     for (let column = 0; column < tetrominoNext.column; column++) {
//       if (tetrominoNext[row][column] == 0) {
//         continue;
//       }
//       const name = tetrominoNext[row][column];
//       const cellIndex = convertPositionToIndex(row, column);
//       cellsNextField()[cellIndex].classList.add(name);
     
//     }
//   }
// }

export function drawTetrominoNext() {
  const name = tetrominoNext.name;
  const tetrominoMatrixSize = tetrominoNext.matrix.length;

  for (let row = 0; row < tetrominoMatrixSize; row++) {
    for (let column = 0; column < tetrominoMatrixSize; column++) {
      if (tetrominoNext.row + row < 0) {
        continue;
      }
      if (!tetrominoNext.matrix[row][column]) {
        continue;
      }
      const cellIndex = convertPositionToIndex(
        tetrominoNext.row + row,
        tetrominoNext.column + column
      );
      cellsNextField()[cellIndex].classList.add(name);
    
    }
  }
}

export function drawNext() {
//   cellsNextField().forEach(function (cell) {
//     cell.removeAttribute("class");

//   });

// drawtetrominoNextField();

  drawTetrominoNext();
}