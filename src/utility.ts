import { tetrominoSize } from "./constants";

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
    xCurrent: shouldSpawnCenter(typeCurrent) ? 5 * tetrominoSize : 4.5 * tetrominoSize,
    yCurrent: -2 * tetrominoSize,   
  }
} 