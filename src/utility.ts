export function randomTetromino() {
  const tetrominos:TetrominoTypes[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const rand = Math.floor(Math.random() * tetrominos.length); 
  return tetrominos[rand];
}
function shouldSpawnCenter(tetrominoType:TetrominoTypes) {
  return tetrominoType === 'I' || tetrominoType === 'O';
}
export function spawn() {
  const typeCurrent = randomTetromino();
  return {
    typeCurrent: typeCurrent,
    xCurrent: shouldSpawnCenter(typeCurrent) ? 5 : 4.5,
    yCurrent: shouldSpawnCenter(typeCurrent) ? 1 : 0.5,   
  }
} 
