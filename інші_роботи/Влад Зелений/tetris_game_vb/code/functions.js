import{FIGURES, PLAYFIELD_COLUMNS} from"./constants.js"
import { render, startPause } from "./index.js";
import { stateGame } from './stateGame.js';
import { randomColor } from "./util-functions.js";

// Функція створення об'екта фігури.
export function createFigure(nameFigure) {
	const matrixFigure = FIGURES[nameFigure]
	const rowFigure = -2;
	const columnFigure = Math.floor((PLAYFIELD_COLUMNS - matrixFigure.length) / 2);
	return {
		name: nameFigure,
		matrix: matrixFigure,
		row: rowFigure,
		column: columnFigure,
		color: randomColor()
	};
};

// Функція обертання матриці фігури.
export const rotateFigure = (matrix) => {
	const index = matrix.length - 1;
	const result = matrix.map((row, rowId) => {
		return row.map((col, colId) => {
			return matrix[index - colId][rowId];
		});
	});
	return result;
};

// Перевірка та видалення заповненого рядка.
export function removeFullRow() {
	// Кількість заповнених колонок за один раз.
	let numRows = 0;
	// Перевірка на заповнений рядок.
	for (let row = stateGame.playfield.length - 1; row > 0; ) {
		if (stateGame.playfield[row].every(cell => !!cell)) {
			stateGame.playfield.splice(row, 1);
			stateGame.playfield = [new Array(PLAYFIELD_COLUMNS).fill(0), ...stateGame.playfield];
			numRows++;
		} else {
			row--;
		}
	}
	// Оновлення рейтингу гри.
	if (numRows > 0) {
		stateGame.setProgress(numRows);
	}
}

// Функція розрахунку балів.
export const rating = num => {
	if (num === 1) {
		return 30;
	} else if (num === 2) {
		return 50;
	} else if (num === 3) {
		return 100;
	} else if (num >= 4) {
		return 200;
	}
};

// Функція обробки події клавіатури та клік.
export function onKeyDown(event, render) {
	if (stateGame.gameOver) { return }
	if (event === 'Escape') {
		startPause();
	}
	if (stateGame.pause) {
		return;
	}
	switch (event) {
		case 'Space':
			stateGame.dropFigureDown();
			break;
		case 'ArrowDown':
			stateGame.moveFigureDown();
			break;
		case 'ArrowLeft':
			stateGame.moveFigureLeft();
			break;
		case 'ArrowRight':
			stateGame.moveFigureRight();
			break;
		case 'ArrowUp':
			stateGame.rotateFigure();
			break;
		default:
			break;
	}
	render();
};

// Функція визначення рiвня гри.  
export function spedInterval() {
	let sped = 0;
	if (stateGame.level === 'noob') {
		sped = 1000;
	} else if (stateGame.level === 'middle') {
		sped = 700;
	} else if (stateGame.level === 'pro') {
		sped = 400;
	}
	stateGame.sped = sped
};

// Функція самостійного руху фігур.  
function moveDown(){
	onKeyDown('ArrowDown', render)
	stopLoop();
	startLoop();
}

let timeoutId;
let requestId;
// Функція старт руху фігур.  
export function startLoop() {
	timeoutId = setTimeout(
		() => (requestId = requestAnimationFrame(moveDown)),
		stateGame.sped
	);
};

// Функція стоп руху фігур.  
export function stopLoop(){
	cancelAnimationFrame(requestId);
	timeoutId = clearTimeout(timeoutId);
};