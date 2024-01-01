

// ДЗ №1
// 1. Додати інші фігури
// 2. Стилізувати нові фігури на свій погляд
// 3. Додати функцію рандому котра буде видавати випадкову фігуру
// 4. Ценрування фігури коли вона з'являється
// 5. Додати функцію ранромних кольорів для кожної нової фігури

// ДЗ №2
// 1. Поставити const rowTetro = -2; прописати код щоб працювало коректно
// 2. Зверстати поле для розрахунку балів гри
// 3. Прописати логіку і код розрахунку балів гри (1 ряд = 10; 2 ряди = 30; 3 ряди = 50; 4 = 100)
// 4. Реалізувати самостійний рух фігур до низу

// ДЗ №3
// 1. Зробити розмітку висновків гри по її завершенню
// 2. Зверстати окрему кнопку рестарт, що перезапускатиме гру посеред гри
// 3. Додати клавіатуру на екрані браузеру для руху фігур

// 4. Створити секцію, що відображатиме наступну фігуру, що випадатиме
// 5. Додати рівні гри при котрих збільшується швидкість 
//    падіння фігур та виводити їх на екран
// 6. Зберігати і виводити найкращий власний результат
let level1 = document.querySelectorAll('.levvels');

let level_number = document.querySelector('.level_number');
let restartt = document.querySelector('.restarrt');
const PLAYFIELD_COLUMNS = 10;
const PLAYFIELD_ROWS = 20;

const gameOverBlock = document.querySelector('.game-over');
 const btnRestart    = document.querySelector('.restart');
 let count = 0;
 let combo = 0;
 let record = 0;
 let dom_count = document.querySelector('.count');
 let dom_combo = document.querySelector('.combo');
 let c = document.querySelector('.co');
 let s = document.querySelector('.so');
 let r = document.querySelector('.ro');
 let l = document.querySelector('.lo');
 let left= document.querySelector('.left');
 let right = document.querySelector('.right');
 let dawn1 = document.querySelector('.dawn');
 let rotait = document.querySelector('.rotait');
 let pauses = document.querySelector('.pauses');
 let Down= document.querySelector('.Down');
 let dom_record = document.querySelector('.record');
 let playfield;
 let tetromino;
 let isPaused = false, isGameOver = false;
 let cells = document.querySelectorAll('.tetris div'); 
 let spid = 1000;

lavels();

console.log(typeof level_spid);
function levele () {

    switch (level_number.textContent) {
        case '1':
            spid = 1600;
            break;
        case '2':
            spid = 1200;
            break;
        case '3':
            spid = 900;
            break;
        case '4':
            spid = 400;
            break;
        case '5':
            spid = 100;
            break;
    
    
    }
}
function init(){
    gameOverBlock.style.display = 'none';


    isGameOver = false;
    generatePlayfield();
    generateTetromino();
    startLoop();
    if (record<count) {
        record = count;
        dom_count.textContent= count;
        dom_record.textContent = record;
        count = 0;
    }
    cells = document.querySelectorAll('.tetris div'); 

}
restartt.addEventListener('click', function(){
    init();
});

pauses.addEventListener('click',()=>togglePauseGame());


    
left.addEventListener('click',()=>moveTetrominoLeft());
right.addEventListener('click',()=>moveTetrominoRight());
dawn1.addEventListener('click',()=>down());

Down.addEventListener('click',()=>moveTetrominoDown());
rotait.addEventListener('click',()=>rotateTetromino());



















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
        [0, 0, 0],
    ],
    "J": [
        [0, 1, 1],
        [0, 1, 0], 
        [0, 1, 0],
    ],
    S: [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    Z: [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    T: [
        [1, 1, 1],
        [0, 1, 0],
        [0, 0, 0],
    ],
    I: [
        [0,0,0,0],
        [1,1,1,1],
        [0,0,0,0],
        [0,0,0,0],
    ]
};


init();
document.addEventListener('keydown', onKeyDown)
btnRestart.addEventListener('click', function(){
    init();
});

function togglePauseGame(){
    isPaused = !isPaused;

    if(isPaused){
        stopLoop();
    } else{
        startLoop();
    }
    // if
}
nexttetromlno();
function onKeyDown(event) {
    // console.log(event);
    if(event.key == 'p'){  
        togglePauseGame();
    }
    // if event.key == 'p'
    if(isPaused){
        return
    }

    switch (event.key) {

        case 'ArrowUp':
            rotateTetromino();
            break;
        case 'ArrowDown':
            moveTetrominoDown();
            break;
        case 'ArrowLeft':
            moveTetrominoLeft();
            break;
        case 'ArrowRight':
            moveTetrominoRight();
            break;
        case ' ':
            down();
            break;
    }

    draw();
}


function moveTetrominoDown() {
    tetromino.row += 1;
    if (isValid()) {
        tetromino.row -= 1;
        placeTetromino();
    }else{
        gosttetro();
    }
}
function moveTetrominoLeft() {
    tetromino.column -= 1;
    if (isValid()) {
        tetromino.column += 1;
    }else{
        gosttetro();
    }
}
function moveTetrominoRight() {
    tetromino.column += 1;
    if (isValid()) {
        tetromino.column -= 1;
    }else{
        gosttetro();
    }
}
function drawghost(cells) {
    const tetrominoMatrixSize = tetromino.matrix.length;

    for (let row = 0; row < tetrominoMatrixSize; row++) {
        for (let column = 0; column < tetrominoMatrixSize; column++) {
            if (tetromino.matrix[row][column] == 0) { continue; }
            if (tetromino.gostrow + row < 0) continue;

            const cellIndex = convertPositionToIndex(tetromino.gostrow + row, tetromino.gostcolumn + column);

            if (cells[cellIndex] !== undefined) {
                cells[cellIndex].classList.add('ghost');
                
            }
        }
    }
    gosttetro()
}
function down () {
    tetromino.row =tetromino.gostrow;
    tetromino.row += 1;
    if (isValid()) {
        tetromino.row -= 1;
        placeTetromino();
    }else{
        gosttetro();
    }
}
function moveDown(){
    moveTetrominoDown();
    draw();
    stopLoop();
    startLoop();
    if(isGameOver){
        gameOver();
    }
}
function gosttetro(){
    if (!tetromino) {
        return;
    }

    let gostroW = tetromino.row;
    tetromino.row++;
    for (; !isValid();) {
        tetromino.row++;
    }
    tetromino.gostrow = tetromino.row -1;
    tetromino.gostcolumn = tetromino.column;
    tetromino.row = gostroW;
    
}

// functions generate playdields and tetromino

function generatePlayfield() {
    document.querySelector('.tetris').innerHTML = '';
    for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
        const div = document.createElement('div');
        document.querySelector('.tetris').append(div);
    }

    playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0))
    // console.log(playfield);
}
function generateTetromino() {

    const nameTetro = getRandomElement(TETROMINO_NAMES);
    const matrixTetro = TETROMINOES[nameTetro];

    // const rowTetro = 3;
    const rowTetro = -2;
    const columnTetro = Math.floor(PLAYFIELD_COLUMNS / 2 - matrixTetro.length / 2);

    tetromino = {
        name: nameTetro,
        matrix: matrixTetro,
        row: rowTetro,
        column: columnTetro,
        gostrow: this.row, 
        gostcolumn: this.column, 
    }
}

function lavels () {
    level1.forEach((item)=>{
        
        item.addEventListener('click',()=> level_number.textContent = item.textContent)

    }) 

}

// draw

function drawPlayField() {

    for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        for (let column = 0; column < PLAYFIELD_COLUMNS; column++) {
            // if(playfield[row][column] == 0) { continue };
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
            // cells[cellIndex].innerHTML = array[row][column];
            if (isOutsideTopBoard(row)) { continue }
            if (tetromino.matrix[row][column] == 0) { continue }
            const cellIndex = convertPositionToIndex(tetromino.row + row, tetromino.column + column);
            cells[cellIndex].classList.add(name);
        }
    }
}

function draw() {

    cells.forEach(function (cell) { cell.removeAttribute('class') });

    drawPlayField();
    drawTetromino();
    drawghost(cells);


}



function gameOver(){
    s.textContent = count;
    r.textContent = record;
    c.textContent = combo;
    stopLoop();
    gameOverBlock.style.display = 'flex';
}


// let array = [
//     [1,2,3],
//     [4,5,6],
//     [7,8,9],
// ]

function getRandomElement(array){
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
}

function convertPositionToIndex(row, column) {
    return row * PLAYFIELD_COLUMNS + column;
}

function isOutsideTopBoard(row){
    return tetromino.row + row < 0;
}

function placeTetromino() {
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if (!tetromino.matrix[row][column]) continue;
            if(isOutsideTopBoard(row)){ 
                isGameOver = true;
                return;
            }
            playfield[tetromino.row + row][tetromino.column + column] = tetromino.name;
        }
    }
    const filledRows = findFilledRows();
    // console.log(filledRows);
    removeFillRows(filledRows);
    generateTetromino();
}

function removeFillRows(filledRows){
    // filledRows.forEach(row => {
    //     dropRowsAbove(row);
    // })

    for(let i = 0; i < filledRows.length; i++){
        const row = filledRows[i];
        dropRowsAbove(row);
    }

}

function dropRowsAbove(rowDelete){
    for(let row = rowDelete; row > 0; row--){
        playfield[row] = playfield[row - 1];
    }

    playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}

function findFilledRows(){
    filledRows = [];
    for(let row = 0; row < PLAYFIELD_ROWS; row++){
        let filledColumns = 0;
        for(let column = 0; column < PLAYFIELD_COLUMNS; column++){
            if(playfield[row][column] != 0){
                filledColumns++;
            }
        }
        if(PLAYFIELD_COLUMNS == filledColumns){
            filledRows.push(row);
        }
    }
    scout();
    return filledRows;
}

function scout () {
    console.log(filledRows);
    gconbo= filledRows.length;

switch (filledRows.length) {
    case 2:
        count += 300;
        break;
    case 3:
        count += 500;
        break;
    case 4:
        count += 800;
        break;
    case 5:
        count += 1000;
        break;
    case 6:
        count += 1400;
        break;

    case 1:
        count += 100;
        break;
}
    console.log(count);
    console.log(combo);
    if (gconbo>=2 ) { 
        combo = filledRows.length;
        gconbo = 0;

    }

    dom_combo.textContent = combo;
    dom_count.textContent= count;
}
function moveDown(){
    moveTetrominoDown();
    draw();
    stopLoop();
    startLoop();
    if(isGameOver){
        gameOver();
    }
}

function startLoop() {
    console.log(spid);
    console.log(level_number.textContent);
    levele();
    timeoutId = setTimeout(
        
        () => (requestId = requestAnimationFrame(moveDown)),
        spid
    );
}

function stopLoop(){
    cancelAnimationFrame(requestId);
    timeoutId = clearTimeout(timeoutId);
}

function rotateTetromino(){
    const oldMatrix = tetromino.matrix;
    const rotatedMatrix = rotateMatrix(tetromino.matrix);
    // array = rotateMatrix(array);
    tetromino.matrix = rotatedMatrix;
    if(isValid()){
        tetromino.matrix = oldMatrix;
    }else{
        gosttetro();
    }
}

function rotateMatrix(matrixTetromino){
    const N = matrixTetromino.length;
    const rotateMatrix = [];
    for(let i = 0; i < N; i++){
        rotateMatrix[i] = [];
        for(let j = 0; j < N; j++){
            rotateMatrix[i][j] = matrixTetromino[N - j - 1][i];
        }
    }
    return rotateMatrix;
};



function isValid(){
    const matrixSize = tetromino.matrix.length;
    for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
            if (!tetromino.matrix[row][column]) { continue; }
            // if(tetromino.matrix[row][column] == 0){ continue; }
            if(isOutsideOfGameBoard(row, column)){ return true}
            if(hasCollisions(row, column)){ return true}
        }
    }
    return false;
}

function isOutsideOfGameBoard(row, column) {
    return tetromino.column + column < 0 ||
           tetromino.column + column >= PLAYFIELD_COLUMNS ||
           tetromino.row + row >= playfield.length
}

function hasCollisions(row, column){
    return playfield[tetromino.row + row]?.[tetromino.column +column]
}











