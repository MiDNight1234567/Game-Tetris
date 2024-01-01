import { playfield } from "./generatePlayfield.js";
import { PLAYFIELD_COLUMNS } from "./constants.js";


export function removeFillRows(filledRows) {
  
  for (let i = 0; i < filledRows.length; i++) {
    const row = filledRows[i];
    dropRowsAbove(row);
  }
  
}

function dropRowsAbove(rowDelete) {
  for (let row = rowDelete; row > 0; row--) {
    playfield[row] = playfield[row - 1];
  }

  playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
}
