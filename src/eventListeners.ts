import { tetrominoSize, gameState, tetrominos } from "./constants";

function noHorizontalCollisionCheck(newXCurrent: number) {
  return noWallCollision(newXCurrent) && noTetrominoCollisionCheck(newXCurrent);
};

function noTetrominoCollisionCheck(newXCurrent: number) {
  if(newXCurrent < 0) return false;
  const { offsets } = tetrominos[gameState.typeCurrent]; 
  // I can make this check less cells 
  return gameState.lockedCells.every(({xStart, yStart}) => offsets[gameState.rotation].every(([x, y]) =>{
    const collisionDetected = xStart < x + newXCurrent + tetrominoSize &&
    xStart + tetrominoSize > x + newXCurrent && 
    yStart < y +  gameState.yCurrent + tetrominoSize &&
    tetrominoSize + yStart > y + gameState.yCurrent;
    return !collisionDetected;
  }))
}
function noWallCollision(newXCurrent: number) {
  return tetrominos[gameState.typeCurrent].offsets[gameState.rotation].every(([x]) =>{
    return x + newXCurrent + tetrominoSize <= tetrominoSize * 10 && x + newXCurrent >= 0
  });
}

export default function eventListeners() {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case 'ArrowRight':
        if(noHorizontalCollisionCheck(gameState.xCurrent + tetrominoSize)){
          gameState.xCurrent = gameState.xCurrent + tetrominoSize;
        }    
        return;
      case 'ArrowLeft' :
        if(noHorizontalCollisionCheck(gameState.xCurrent - tetrominoSize)){
          gameState.xCurrent = gameState.xCurrent - tetrominoSize;
        }
        return;
      case 'ArrowUp': 
        const oldRotation = gameState.rotation;
        let newRotation = gameState.rotation + 1;
        if(newRotation === tetrominos[gameState.typeCurrent].offsets.length){
          newRotation = 0;
        }
        gameState.rotation = newRotation
        if(!noHorizontalCollisionCheck(gameState.xCurrent)){
          gameState.rotation = oldRotation;
        }
      return;
      default:
        return;
    }
    });
};
