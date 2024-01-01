import { game } from "./game.js";

const playerForm = document.querySelector(".player-form");
const startWindowEl = document.querySelector(".start-game");


playerForm.addEventListener("submit", onFormSubmit);

function onFormSubmit(evt) {
  evt.preventDefault();
  const player = evt.currentTarget.elements;
 startWindowEl.style.display = 'none';
}
 console.log(player);
// function newPlayer () {

// }
