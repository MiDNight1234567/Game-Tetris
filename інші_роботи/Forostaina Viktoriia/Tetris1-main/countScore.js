import { game } from "./game.js";

 export const scoreEl = document.querySelector(".totalScore p");

const scorePoint = {
  1: 10,
  2: 25,
  3: 50,
  4: 100,
};

export function countScore(row) {
  game.totalScore += scorePoint[`${row}`];

  scoreEl.textContent = `${game.totalScore}`;
  return game.totalScore;
}
