import { levelStep } from "./constants.js";
import { game } from "./game.js";

export const levelEl = document.querySelector(".level p");

export function nextLevel() {
  game.level = Math.floor(game.totalScore / levelStep);
  levelEl.textContent = `${game.level}`;

  return game.level;
}
