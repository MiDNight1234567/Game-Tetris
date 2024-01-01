import { COLORS, FIGURE_NAMES_MIDLE, FIGURE_NAMES_NOOB, FIGURE_NAMES_PRO, PLAYFIELD_COLUMNS } from "./constants.js";
import { stateGame } from "./stateGame.js";

// Функція повертає випадкове число від мін до макс.
export function numRandomMaxMin(max, min = 0) {
	return Math.floor(Math.random() * (max - min) + min);
};

// Функція повертає випадковий елемент з масиву.
export function randomElement(level='noob') {
	if (level === 'noob') {
		return FIGURE_NAMES_NOOB[numRandomMaxMin(FIGURE_NAMES_NOOB.length)];
	} else if (level === 'middle') {
		return FIGURE_NAMES_MIDLE[numRandomMaxMin(FIGURE_NAMES_MIDLE.length)];
	} else if (level === 'pro') {
		return FIGURE_NAMES_PRO[numRandomMaxMin(FIGURE_NAMES_PRO.length)];
	}
};

// Функція повертає випадковий колір.
export function randomColor() {
	return COLORS[numRandomMaxMin(COLORS.length)];
};

// Функція повертає індекс позиції елемента.
export function convertPositionToIndex(row, column) {
	return row * PLAYFIELD_COLUMNS + column;
};

// Функція перевірки та запису рейтингу localStorage.
export function setMaxResult(res) {
	if (res > stateGame.maxProgress.progress) {
	const arr = {
		progress: res,
		date: new Date().toLocaleString('uk-UA', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			second: '2-digit'
		})
	};
	stateGame.maxProgress = arr
	localStorage.setItem('myMaxResult', JSON.stringify(arr));	
	};
};