// Роміри ігрового поля.
export const PLAYFIELD_COLUMNS = 10;
export const PLAYFIELD_ROWS = 18;
// Масив кольорів.
export const COLORS = ['W', 'P', 'R', 'B', 'Y', 'LY', 'I', 'O', 'V', 'G', 'LG'];
// Масив назв фігур в залежності від рівня гри.
export const FIGURE_NAMES_MIDLE = ['O', 'L', 'J', 'S', 'T', 'I', 'N', 'X'];
export const FIGURE_NAMES_NOOB = ['I','O', 'L', 'J','O', 'S', 'T', 'I', 'N'];
export const FIGURE_NAMES_PRO = ['O', 'L', 'J', 'S', 'T', 'I', 'N', 'Z', 'X'];
// Масив матриць фігур.
export const FIGURES = {
	O: [
		[1, 1],
		[1, 1]
	],
	L: [
		[0, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	J: [
		[0, 1, 0],
		[0, 1, 0],
		[1, 1, 0]
	],
	S: [
		[0, 1, 1],
		[1, 1, 0],
		[0, 0, 0]
	],
	Z: [
		[1, 1, 0],
		[0, 1, 0],
		[0, 1, 1]
	],
	T: [
		[1, 1, 1],
		[0, 1, 0],
		[0, 0, 0]
	],
	I: [
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0],
		[0, 1, 0, 0]
	],
	X: [
		[0, 1, 0],
		[1, 1, 1],
		[0, 1, 0]
	],
	N: [
		[0, 1, 0],
		[1, 1, 0],
		[1, 0, 0]
	]
};