import { gameState, tetrominoHistory } from "./constants";

export function randomTetromino() {
  const tetrominos:TetrominoTypes[] = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];
  const rand = Math.floor(Math.random() * tetrominos.length); 
  return tetrominos[rand];
}
function shouldSpawnCenter(tetrominoType:TetrominoTypes) {
  return tetrominoType === 'I' || tetrominoType === 'O';
}

export function score(lines:number){
  const {score, level} = gameState;
  if(lines === 1){
    gameState.score = score + (level * 40);
    return;
  }
  if(lines === 2){
    gameState.score = score + (level * 100);
    return;
  }
  if(lines === 3){
    gameState.score = score + (level * 300);
    return;
  }
  if(lines === 4){
    gameState.score = score + (level * 1200);
    return;
  }
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
