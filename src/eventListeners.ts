import { tetrominoSize, gameState, tetrominos } from "./constants";

function noHorizontalCollisionCheck(newXCurrent: number) {
  return noWallCollision(newXCurrent) && noTetrominoCollisionCheck(newXCurrent);
};

function noTetrominoCollisionCheck(newXCurrent: number) {
  if(newXCurrent < 0) return false;
  const { offsets } = tetrominos[gameState.typeCurrent]; 
  // I can make this check less cells 
  return gameState.lockedCells.every(({xStart, yStart}) => offsets.every(([x, y]) =>{
    const collisionDetected = xStart < x + newXCurrent + tetrominoSize &&
    xStart + tetrominoSize > x + newXCurrent && 
    yStart < y +  gameState.yCurrent + tetrominoSize &&
    tetrominoSize + yStart > y + gameState.yCurrent;
    return !collisionDetected;
  }))
}
function noWallCollision(newXCurrent: number) {
  if(newXCurrent < 0) return false;
  return tetrominos[gameState.typeCurrent].offsets.every(([x]) =>{
    return x + newXCurrent + tetrominoSize <= tetrominoSize * 10
  });
}

export default function eventListeners() {
  window.addEventListener("keydown", (event) => {
    let newXCurrent = 0;
    switch (event.key) {
      case 'ArrowRight':
        newXCurrent = gameState.xCurrent + tetrominoSize;
        break;
      case 'ArrowLeft' :
        newXCurrent = gameState.xCurrent - tetrominoSize;
        break;
      default:
        break;
    }
  
    if(noHorizontalCollisionCheck(newXCurrent)){
      gameState.xCurrent = newXCurrent;
    }
  });
};
