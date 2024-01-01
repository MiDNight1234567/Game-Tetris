import { PLAYFIELD_COLUMNS, PLAYFIELD_ROWS} from './constants.js';



export let playfield;

export function generatePlayfield() {
  document.querySelector('.tetris').innerHTML=""
  for (let i = 0; i < PLAYFIELD_ROWS * PLAYFIELD_COLUMNS; i++) {
    const div = document.createElement("div");
    document.querySelector(".tetris").append(div);
  }
  playfield = new Array(PLAYFIELD_ROWS)
    .fill(5)
    .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));

  
}
