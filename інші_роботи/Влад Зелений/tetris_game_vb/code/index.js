// -------- Імпорти -----------------------------
// Імпорт компонентів.
import { PlayField } from './components/play-field.js';
import { Message } from './components/message.js';
import { Title } from './components/title.js';

// Імпорт допоміжних функцій.
import { onKeyDown, spedInterval, startLoop, stopLoop } from './functions.js';
import { convertPositionToIndex } from './util-functions.js';
// Імпорт об'єкта стану гри.
import { stateGame } from './stateGame.js';
// Імпорт змінних.
import { FIGURES, PLAYFIELD_COLUMNS, PLAYFIELD_ROWS } from './constants.js';
import { Image } from './components/image.js';

// ---------- Отримання елементів з DOM-дерева ------------

// Змінна елемету main_page.
const mainPage = document.querySelector('.main_page');
// Змінна елемету header.
const header = document.querySelector('.header_wrap');
// Змінна елемету ігрового поля.
const root = document.querySelector('.root');
// Змінна екрану наступної фігури.
const wrapNextFig = document.querySelector('.next-figure__wrap');

// Змінна елемету прогрес.
const maxProgress = document.querySelector('.max-progress');
maxProgress.textContent = stateGame.maxProgress.progress;
// Змінна елемету прогрес.max-progress
const progress = document.querySelector('.progress');
progress.textContent = stateGame.progress;
// Змінна кнопки "Почати гру".
const btnStartPage = document.querySelector('.start-section_btn-start');
// Змінна кнопки "Почати гру".
const btnHome = document.querySelector('.btn-home');
// Змінна кнопки старт.
const btnReStart = document.querySelector('.btn-restart');
// Змінна кнопки рестарт.
const btnStart = document.querySelector('.btn-start');
// Змінна кнопок рівеня гри.
const levelBtns = document.querySelectorAll('.btn-level');
const panelLevel = document.querySelector('.panel_level');
// Змінна кнопок керування.
const btns = document.querySelector('.btns');

// ------- Рендер основних компонентів ---------------------

// Додавання заголовку на сторінку.
header.insertAdjacentHTML('beforeend', Title());
// Додавання ігрового поля на сторінку.
root.append(PlayField(PLAYFIELD_COLUMNS, PLAYFIELD_ROWS, 'playing-field'));

// Додавання поля наступної фігури на сторінку.
wrapNextFig.append(PlayField(4, 4, 'field-next-fig')); 

// Змінна клітинок ігрового поля.
const cells = document.querySelectorAll('.playing-field div');
// Змінна клітинок поля наступної фігури.
const nextFigСells = document.querySelectorAll('.field-next-fig div');

// ------------- Функції які працюють з DOM-деревом ------------
const filedNext = new Array(4).fill().map(() => new Array(4).fill(0));

// Функція зміни кольру ігрового поля.
function drawPlayField() {
	stateGame.playfield.forEach((elRow, row) => {
		elRow.forEach((elCol, column) => {
			const name = elCol;
			const cellIndex = convertPositionToIndex(row, column);
			cells[cellIndex].classList.add(name);
		})
	})
};

// Функція зміни кольру наступної фігури.
function drawNextFigure(nameFigure,nextFigureColor) {
	const matrix = FIGURES[nameFigure];
	matrix.forEach((elRow, row) => {
		elRow.forEach((elCol, column) => {
			const cellIndex = row * 4 + column;
			if (elCol) {
				nextFigСells[cellIndex].classList.add(nextFigureColor);
			}
		});
	});
};

// Функція зміни кольру фігури.
function drawFigure() {
	const name = stateGame.figure.color;
	stateGame.figure.matrix.forEach((elRow, row) => {
		elRow.forEach((elCol, column) => {
			if (!elCol) {return;}
			// Перевірка чи гра не програна.
			if(stateGame.gameOver){return}
			// Змінює стилі для наступної фігури.
			drawNextFigure(stateGame.nextFigure, stateGame.nextFigColor);
			// Перевірка чи фігура з'явилась на екрані.
			const cellIndex = convertPositionToIndex(stateGame.figure.row + row, stateGame.figure.column + column);
			if (cellIndex < 0) {
				return;
			}
			// Змінює стилі для поточної фігури.
			cells[cellIndex].classList.add(stateGame.figure.color);
		})
	})
};

// Функція оновлення відображення поля та фігури.
export function render() {
	cells.forEach(cell => {
		cell.removeAttribute('class');
	});
	nextFigСells.forEach(cell => {
		cell.removeAttribute('class');
	});
	drawPlayField();
	drawFigure();
	progress.textContent = stateGame.progress;
	maxProgress.textContent = stateGame.maxProgress.progress;
	if (stateGame.gameOver) {
		root.insertAdjacentHTML('beforeend', Message('Game Over'));
		btnReStart.classList.add('active')
	}
	levelBtns.forEach(el => {
		el.classList.remove('check');
		if (stateGame.level === el.dataset.id) {
			el.classList.add('check');
		}
	});
};
render();

// Функція рестарт гри.  
function restartGame() {
	stateGame.gameOver = false;
	stateGame.progress = 0;
	stateGame.updatePlayfield();
	stateGame.pause ? btnStart.classList.remove('active') : btnStart.classList.add('active') 
	btnStart.innerHTML = stateGame.pause
		? Image('music-play.svg',"btn-start-img","play")
		: Image('music-pause.svg',"btn-start-img","pause");
	btnReStart.classList.remove('active')
	const message = document.querySelector('.message');
	message && message.remove();
	stateGame.updateFigure()
	spedInterval(); 
	startLoop()
	render();
}

// Функція обрбник події старт пауза рестарт гри.
export function startPause() {
	if (stateGame.pause) {
		stateGame.pause = false;
		startLoop()
		btnStart.innerHTML = Image('music-pause.svg',"btn-start-img","pause");
		btnStart.classList.add('active')
		const message = document.querySelector('.message');
		message && message.remove();
	} else {
		stateGame.pause = true;
		stopLoop()
		btnStart.innerHTML = Image('music-play.svg',"btn-start-img","play");
		btnStart.classList.remove('active')
		root.insertAdjacentHTML('beforeend', Message('Пауза'));
	}
};

// Функція обрбник події кнопки "Почати гру".
function startGame() {
	mainPage.classList.remove('__hiden');
	mainPage.classList.add('__game');
};

// Функція обрбник події кнопки "На головну сторінку".
function goHome() {
	mainPage.classList.remove('__game');
	mainPage.classList.add('__hiden');
	stateGame.pause = true;
	btnStart.innerHTML = Image('music-play.svg',"btn-start-img","play");
	btnStart.classList.remove('active')
	root.insertAdjacentHTML('beforeend', Message('Пауза'));
};

// ------------ Слухачі подій.--------------------

// Слухач події клік кнопки "Почати гру".
btnStartPage.addEventListener('click', () => { startGame() });

// Слухач події клік кнопки "На головну сторінку".
btnHome.addEventListener('click', () => { goHome() });

// Слухач події клік кнопок рівень гри.
panelLevel.addEventListener('click', ev => {
	if (ev.target.dataset.id) {
		stateGame.level = ev.target.dataset.id;
		spedInterval();
		render();
	}
	else ev.preventDefault();
});

// Слухач події клік кнопки старт/стоп.
btnStart.addEventListener('click', () => { startPause() });
// Слухач події клік кнопки рестарт.
btnReStart.addEventListener('click', () => { restartGame() });


// Слухач події клавіатури.
document.addEventListener('keydown', ev => {
	onKeyDown(ev.code, render);
});

// Слухач події клік кнопок положення фігури.
btns.addEventListener('click', ev => {
	ev.target.dataset.id ? onKeyDown(ev.target.dataset.id, render) : ev.preventDefault();
});
