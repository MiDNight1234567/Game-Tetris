import {
  TETROMINO_NAMES,
  TETROMINOES,
  PLAYFIELD_COLUMNS,
} from "./constants.js";
import { getRandomTetromino } from "./utility.js";



export let tetromino;
export let tetrominoNext;

export function setTetromino(t) {
  tetromino = t
}

export function setTetrominoNext(t) {
  tetrominoNext = t;
}

export function generateTetromino() {
  const nameTetro = TETROMINO_NAMES[getRandomTetromino(TETROMINO_NAMES.length)];
  const matrixTetro = TETROMINOES[nameTetro];

  const columnTetro = Math.floor((PLAYFIELD_COLUMNS - 3) / 2);
  const rowTetro = -2;

 return {
    name: nameTetro,
    matrix: matrixTetro,
    row: rowTetro,
    column: columnTetro,
  };
}


