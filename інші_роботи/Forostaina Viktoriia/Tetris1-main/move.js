import { isValid } from "./isValid.js";
import { placeTetromino } from "./placeTetromino.js";
import { tetromino } from "./generateTetromino.js";
import { draw } from "./draw.js";
import { rotateTetromino } from "./rotateTetromino.js";

import { startLoop, stopLoop } from "./initStart.js";

let isPaused = false;

function togglePauseGame() {
  isPaused = !isPaused;

  if (isPaused) {
    stopLoop();
  } else {
    startLoop();
  }
}

export function onKeyDown(event) {
  if (event.key == "p") {
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

    case " ":
      dropTetraminoDown();
      break;
  }
  draw();
}

function dropTetraminoDown() {
  while (!isValid()) {
    tetromino.row++;
  }
  tetromino.row--;
}

export function moveTetrominoDown() {
  tetromino.row += 1;
  if (isValid()) {
    tetromino.row -= 1;
    placeTetromino();
  }
}

export function moveTetrominoLeft() {
  tetromino.column -= 1;
  if (isValid()) {
    tetromino.column += 1;
  }
}
export function moveTetrominoRight() {
  tetromino.column += 1;
  if (isValid()) {
    tetromino.column -= 1;
  }
}
