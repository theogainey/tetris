export function randomTetromino() {
  const tetrominos:TetrominoTypes[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const rand = Math.floor(Math.random() * tetrominos.length); 
  return tetrominos[rand];
}
