const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const TETROMINO_NAMES = [
    'O',
    'L',
    'J',
    'S',
    'Z',
    'T',
    'I'
];

const TETROMINOES = {
    'O': [
        [1, 1],
        [1, 1]
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0]
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    
};

let playfield;
let tetromino;
let lastName;
let speed = 1000;
let score = 0;
const scoreElement = document.querySelector('.text');
scoreElement.innerHTML = 'Score: 0';

function convertPositionToIndex(row, column){
    return row * PLAYFIELD_COLUMNS + column;
}

function generatePlayfield(){
    for(let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++){
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill().map(()=> new Array(PLAYFIELD_COLUMNS).fill(0))
    
}

function tetrominoRandom() {
    let randName;
    do {randName = TETROMINO_NAMES[Math.floor(Math.random() * TETROMINO_NAMES.length)];}
     while (randName == lastName)
        lastName = randName;
        return randName;
}

function generateTetromino() {
    const nameTetro = tetrominoRandom();
    const matrixTetro = TETROMINOES[nameTetro];

    const columnTetro =  Math.floor((PLAYFIELD_COLUMNS - TETROMINOES[nameTetro].length) / 2);
    const rowTetro = 0;

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        column: columnTetro,
        row: rowTetro
    }
}

generatePlayfield();
generateTetromino();

const cells = document.querySelectorAll('.tetris div');
// console.log(cells);

function drawPlayfield() {
    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            const name = playfield[row][column];
            const cellIndex = convertPositionToIndex(row, column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function drawTetromino() {
    const name = tetromino.name;
    const tetrominoMatrixSize = tetromino.matrix.length;
    
    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (tetromino.matrix[row][column]) {
                const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
                cells[cellIndex].classList.add(name);
            }
            
        }
    }
}

drawTetromino();

function draw() {
    cells.forEach(function (cell) { cell.removeAttribute('class')});
    drawPlayfield();
    drawTetromino();
}

document.addEventListener('keydown', onKeyDown);

function onKeyDown(event) {
    switch (event.key) {
        case 'ArrowUp':
            rotateTetramino();
            break;
        case 'ArrowDown':
            moveTetraminoDown();
            break;
        case 'ArrowLeft':
            moveTetraminoLeft();
            break;
        case 'ArrowRight':
            moveTetraminoRight();
            break;

        default:
            break;
    }
    draw();
}

function rotateTetramino() {
    const tetroSize = tetromino.matrix.length;
    const tempMatrix = new Array(tetroSize).fill().map(()=> new Array(tetroSize).fill(0));
    for (let row = 0; row < tetroSize; row++) {
        for (let column = 0; column < tetroSize; column++) {
            tempMatrix[row][column] = tetromino.matrix[row][column];
        }
    }

    for (let row = 0; row < tetroSize; row++) {
        for (let column = 0; column < tetroSize; column++) {
            
            tetromino.matrix[row][column] = tempMatrix[tetroSize - column - 1][row];
        }
    }
   
    if (checkCollision()) {
        tetromino.matrix = tempMatrix;
    }       
}

function moveTetraminoDown() {
    tetromino.row += 1;
    if (checkCollision()) {
        tetromino.row -= 1;
        placeTetromino();
    }       
}

function moveTetraminoLeft() {
    tetromino.column -= 1;
    if (checkCollision()) {
        tetromino.column += 1;
    }
}

function moveTetraminoRight() {
    tetromino.column += 1;
    if (checkCollision()) {
        tetromino.column -= 1;
    }
}

function checkCollision(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(!tetromino.matrix[row][column]){ continue; }
            if(isOutsideOfGameBoard(row, column) || isTakeFigures(row, column)){
                return true;
            }
        }
    }
    return false;
}

function isOutsideOfGameBoard(row, column){
    return tetromino.column + column < 0 ||
    tetromino.column + column >= PLAYFIELD_COLUMNS ||
    tetromino.row + row >= playfield.length;
}

function isTakeFigures(row, column){
    return playfield[tetromino.row + row][tetromino.column + column];
}

function placeTetromino(){
    const matrixSize = tetromino.matrix.length;
    for(let row = 0; row < matrixSize; row++){
        for(let column = 0; column < matrixSize; column++){
            if(!tetromino.matrix[row][column]) continue;

            playfield[tetromino.row + row][tetromino.column + column] = tetromino.name;
        }
    }
    checkFullRow();
    generateTetromino();
}

function checkFullRow() {
    let rowFull = 0;
    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        let column = 0;
        while (playfield[row][column]) {
            if (column == PLAYFIELD_COLUMNS - 1) {
                rowFull++;
                deleteFullRow(row);
                break;
            }
            column++        
        }
    }
    if (rowFull > 0) {
        score += rowFull * 100 + (rowFull - 1) * 100;
        scoreElement.innerHTML = 'Score: ' + score;
    }
    
}

function deleteFullRow(row) {
    playfield.splice(row, 1);
    playfield.unshift(new Array(PLAYFIELD_COLUMNS).fill(0));
}

let timerId = setInterval(dropFigure, speed);

function dropFigure() {
    tetromino.row += 1;
    clearInterval(timerId);
    speed -= 1;
    if (speed < 200) speed = 200;
    if (checkCollision()) {
        tetromino.row -= 1;
        placeTetromino();
    }
    draw();
    timerId = setInterval(dropFigure, speed);
}