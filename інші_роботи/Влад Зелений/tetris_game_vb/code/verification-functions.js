import { PLAYFIELD_COLUMNS } from "./constants.js";
import { removeFullRow, spedInterval, stopLoop } from "./functions.js";
import { stateGame } from "./stateGame.js";

// Функція перевірки чи торкається фігура краю екрану чи іншу фігуру.
export function isValid(figure, playfield) {
	let flag = false;
	figure.matrix.forEach((elRow, row) => {
		elRow.forEach((elCol, column) => {
			if (!elCol) {
				return;
			}
			if (isOutsideOfGameBoard(playfield, figure, row, column)) {
				flag = true;
				return;
			}
			
			if (hasCollisions(playfield, figure, row, column)) {
				flag = true;
				return;
			}
		});
	});
	return flag;
}

function isOutsideOfGameBoard(playfield, figure, row, column) {
	return (
		figure.column + column < 0 || figure.column + column >= PLAYFIELD_COLUMNS || figure.row + row >= playfield.length
	);
}

function hasCollisions(playfield, figure, row, column) {
	return playfield[figure.row + row]?.[figure.column + column];
}

 // Функція перевірки чи досягла фігура низу екрану.
export function placeFigure(figure, playfield) {
	figure.matrix.forEach((elRow, row) => {
		elRow.forEach((elCol, column) => {
			if (!elCol) return;
			// Перевірка чи фігура з'явилась на екрані.
			if (figure.row + row < 0) {return;}
			if (!playfield[figure.row + row][figure.column + column]) {
				playfield[figure.row + row][figure.column + column] = figure.color;
			}
		});
	});
	// Перевірка заповнення першого рядка програш.
	isGameOver();
	// Перевірка на заповнений рядок та оновлення рейтингу гри.
	removeFullRow();
	spedInterval()
	// Оновлення назви та кольору фігур.
	stateGame.updateFigure();
};

// Перевірка заповнення першого рядка програш.
export function isGameOver(){
	const flag = !!stateGame.playfield[0].find(item => item !== 0);
	if (flag) {
		stateGame.gameOver = true
		stopLoop()
	} else return
};