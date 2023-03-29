import { tetrominoHistory } from "./constants";

export function randomTetromino() {
  const tetrominos:TetrominoTypes[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const rand = Math.floor(Math.random() * tetrominos.length); 
  return tetrominos[rand];
}
function shouldSpawnCenter(tetrominoType:TetrominoTypes) {
  return tetrominoType === 'I' || tetrominoType === 'O';
}

export function spawn() {
  const typeCurrent = tetrominoHistory.next;
  tetrominoHistory.next = randomTetromino();  
  return {
    typeCurrent: typeCurrent,
    typeNext: tetrominoHistory.next,
    xCurrent: shouldSpawnCenter(typeCurrent) ? 5 : 4.5,
    yCurrent: shouldSpawnCenter(typeCurrent) ? -2 : -1.5,   
  }
} 
