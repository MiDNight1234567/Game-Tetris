
export function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

export function getRandomTetromino(max) {
  return Math.floor(Math.random() * max);
}