import { draw } from "./draw.js";
// import { drawNext } from "./nextTetrominoField.js";

import {
  moveTetrominoDown,
  moveTetrominoLeft,
  moveTetrominoRight,
  onKeyDown,
} from "./move.js";

import { generatePlayfield } from "./generatePlayfield.js";
import { generateTetromino } from "./generateTetromino.js";
import { rotateTetromino } from "./rotateTetromino.js";
import { game } from "./game.js";
import { delayStep } from "./constants.js";
import { levelEl } from "./level.js";
import { scoreEl } from "./countScore.js";

import { setTetromino, setTetrominoNext } from "./generateTetromino.js";

const startBtn = document.querySelector("button[data-start]");
const pauseBtn = document.querySelector("button[data-pause]");
const restartBtn = document.querySelector("button[data-restart]");
const rotateBtn = document.querySelector("button[data-rotate]");
const leftBtn = document.querySelector("button[data-left]");
const rightBtn = document.querySelector("button[data-right]");
const downBtn = document.querySelector("button[data-down]");
const playerForm = document.querySelector(".player-form");
const startWindowEl = document.querySelector(".start-game");


export function initStart() {

  // startWindowEl.style.display = "none";

  playerForm.addEventListener("submit", onFormSubmit);

  pauseBtn.style.display = "none";

  startBtn.addEventListener("click", () => {
    

    document.addEventListener("keydown", onKeyDown);
    restartBtn.addEventListener("click", restartGame);
    rotateBtn.addEventListener("click", rotateTetromino);
    leftBtn.addEventListener("click", moveTetrominoLeft);
    rightBtn.addEventListener("click", moveTetrominoRight);
    downBtn.addEventListener("click", moveTetrominoDown);

    console.log("start");
    startLoop();
    pauseBtn.style.display = "block";
    startBtn.style.display = "none";
  });

  pauseBtn.addEventListener("click", () => {
    document.removeEventListener("keydown", onKeyDown);
    stopLoop();
    startBtn.style.display = "block";
    pauseBtn.style.display = "none";
  });
}





function onFormSubmit(evt) {
  evt.preventDefault();
  const player = evt.currentTarget.elements;
  if (player.name.value == "") {
    game.playerName = "Anonimus";
  } else {
    game.playerName = player.name.value;
  }

  console.log(player.name.value);
  startWindowEl.style.display = "none";
  console.log(game);
}

let timeoutId;
let requestId;

const gameOverBlock = document.querySelector(".game-over");

// gameOverBlock.style.display = "flex";

const gameOverName = document.querySelector(".player-name");
const gameOverLevel = document.querySelector(".player-level");
const gameOverScore = document.querySelector(".player-score");
const gameOverBestScore = document.querySelector(".best-score");

function gameOver() {
  stopLoop();
  gameOverBlock.style.display = "flex";
  gameOverName.textContent = `${game.playerName}`;
  gameOverLevel.textContent = `${game.level}`;
  gameOverScore.textContent = `${game.totalScore}`;
  // gameOverBestScore.textContent = `${game.level}`;
}

const btnRestart = document.querySelector(".restart");

function restartGame() {
  gameOverBlock.style.display = "none";
  game.isGameOver = false;
  generatePlayfield();
  setTetromino(generateTetromino());
  setTetrominoNext(generateTetromino());
  stopLoop();
  startBtn.style.display = "block";
  pauseBtn.style.display = "none";
  game.playerName = "Anonimus";
  game.totalScore = 0;
  game.level = 0;
  game.isGameOver = false;
  levelEl.textContent = `${game.level}`;
  scoreEl.textContent = `${game.totalScore}`;
  console.log(game);
}

btnRestart.addEventListener("click", restartGame);

function moveDown() {
  moveTetrominoDown();
  draw();
  // drawNext();
  stopLoop();
  startLoop();
  if (game.isGameOver) {
    gameOver();
  }
}

export function startLoop() {
  timeoutId = setTimeout(
    () => (requestId = requestAnimationFrame(moveDown)),
    700 - game.level * delayStep
  );
}

export function stopLoop() {
  cancelAnimationFrame(requestId);
  timeoutId = clearTimeout(timeoutId);
}
