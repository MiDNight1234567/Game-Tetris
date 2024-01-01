import { tetromino, tetrominoNext, generateTetromino, setTetrominoNext, setTetromino } from "./generateTetromino.js";
import { playfield } from "./generatePlayfield.js";
import { removeFillRows } from "./removeFillRows.js";
import { findFilledRows } from "./findFilledRows.js";
import { countScore } from "./countScore.js";
import { isOutsideTopBoard } from "./isValid.js";
import { game } from "./game.js";

import { nextLevel } from "./level.js";

export function placeTetromino() {
  const matrixSize = tetromino.matrix.length;
  for (let row = 0; row < matrixSize; row++) {
    for (let column = 0; column < matrixSize; column++) {
      if (!tetromino.matrix[row][column]) continue;
      if (isOutsideTopBoard(row)) {
        game.isGameOver = true;

        return;
      }
      playfield[tetromino.row + row][tetromino.column + column] =
        tetromino.name;
    }
  }
  const filledRows = findFilledRows();
  console.log(filledRows);
  removeFillRows(filledRows);
  if (filledRows != 0) {
    countScore(filledRows.length);
    nextLevel();
  }
  setTetromino(tetrominoNext);
  setTetrominoNext(generateTetromino());
  console.log(tetromino);
  console.log(tetrominoNext);
}
