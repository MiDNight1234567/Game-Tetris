import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from "./constants.js";
import { createFigure, rating, rotateFigure } from "./functions.js";
import { randomColor, randomElement, setMaxResult } from "./util-functions.js";
import { isValid, placeFigure } from "./verification-functions.js";

// Iніціалізація результату.
const initResult = {
	progress: 0,
	date: new Date().toLocaleString('uk-UA', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	})
};

// Перевірка чи є збережені результати в localStorage
if (!localStorage.getItem('myMaxResult')) {
	localStorage.setItem('myMaxResult', JSON.stringify(initResult));
}
// localStorage.clear();


// --------- Об'єкт стану гри ---------
export const stateGame = {
	// Ігрове поле.
	playfield: new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill(0)),

	// Наступна фігура.
	nextFigure: randomElement(),

	// Колір наступної фігури.
	nextFigColor: randomColor(),

	// Поточна фігура.
	figure: { ...createFigure(randomElement()) },

	// Флаг кінець гри.
	gameOver: false,

	// Флаг 'старт'/'пауза' гри.
	pause: true,

	// Найкращий результат.
	maxProgress: JSON.parse(localStorage.getItem('myMaxResult')),

	// Лічильник досягнень.
	progress: 0,

	// Рівень гри.
	level: 'noob',

	// Інтервал руху фігур.
	sped: 1000,

	// ----- Методи Об'єкта гри ---------------------

	// Метод оновлення ігрового поля.
	updatePlayfield() {
		this.playfield = new Array(PLAYFIELD_ROWS).fill().map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
	},

	// Метод оновлення фігур.
	updateFigure() {
		this.figure = { ...createFigure(this.nextFigure) };
		this.figure.color = this.nextFigColor;
		this.nextFigure = randomElement(this.level);
		this.nextFigColor = randomColor();
	},

	// Метод "Рух фігури ліворуч".
	moveFigureLeft() {
		this.figure.column -= 1;
		if (isValid(this.figure, this.playfield)) {
			this.figure.column += 1;
		}
	},

	// Метод "Рух фігури праворуч".
	moveFigureRight() {
		this.figure.column += 1;
		if (isValid(this.figure, this.playfield)) {
			this.figure.column -= 1;
		}
	},

	// Метод "Рух фігури в низ".
	moveFigureDown() {
		this.figure.row += 1;
		if (isValid(this.figure, this.playfield)) {
			this.figure.row -= 1;
			placeFigure(this.figure, this.playfield);
		}
	},

	// Метод "Падіння фігури в низ".
	dropFigureDown() {
		while (!isValid(this.figure, this.playfield)) {
			this.figure.row++;
		}
		this.figure.row--;
		placeFigure(this.figure, this.playfield);
	},

	// Метод "Обертання фігури".
	rotateFigure() {
		// Попереднє положення фігури.
		const X = this.figure.matrix;
		this.figure.matrix = rotateFigure(this.figure.matrix);
		if (isValid(this.figure, this.playfield)) {
			this.figure.matrix = X;
		}
	},
	
	//  Метод збільшення прогресу.
	setProgress(num) {
		this.progress += rating(num);
		if (this.progress > 200 && this.progress < 500) {
			this.level = 'middle';
		} else if (this.progress > 500) {
			this.level = 'pro';
		}
		setMaxResult(this.progress);
	}
};
