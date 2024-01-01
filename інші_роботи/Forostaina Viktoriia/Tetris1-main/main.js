import { generatePlayfield } from "./generatePlayfield.js";
import { generateTetromino, setTetromino, setTetrominoNext } from "./generateTetromino.js";
import { initStart } from "./initStart.js";


generatePlayfield();
setTetromino(generateTetromino());
setTetrominoNext(generateTetromino());

// let nextTetromino = generateTetromino();

// console.log(tetromino);
// console.log(nextTetromino) ;

initStart();


