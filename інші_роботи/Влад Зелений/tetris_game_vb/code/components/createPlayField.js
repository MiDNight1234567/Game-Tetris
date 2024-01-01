import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "../constants.js";

// Функція створення ігрового поля.
export function createPlayField() {
	const playingField = document.createElement('div');
	playingField.classList.add('playing-field');
	for (let i = 0; i < PLAYFIELD_COLUMNS * PLAYFIELD_ROWS; i++) {
		playingField.append(document.createElement('div'));
  }
  return playingField
}
