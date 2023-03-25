import { gameState, tetrominos } from "./constants";

function noHorizontalCollisionCheck(newXCurrent: number) {
  return noWallCollision(newXCurrent) && noTetrominoCollisionCheck(newXCurrent);
};

function noTetrominoCollisionCheck(newXCurrent: number) {
  if(newXCurrent < 0) return false;
  const { offsets } = tetrominos[gameState.typeCurrent]; 
  const offsetsCurrent = offsets[gameState.rotation];  
  return offsetsCurrent.every(([x, y])=> {
    const lockedCellsWithSameXStart: LockedCell[] = gameState.lockedCells.filter(({ xStart } ) => xStart === newXCurrent + x);
    return lockedCellsWithSameXStart.every(({yStart}) => y + gameState.yCurrent !== yStart)
  })
}

function noWallCollision(newXCurrent: number) {
  return tetrominos[gameState.typeCurrent].offsets[gameState.rotation].every(([x]) =>{
    return x + newXCurrent <= 9 && x + newXCurrent >= 0
  });
}

export default function eventListeners() {
  window.addEventListener("keydown", (event) => {
    switch (event.key) {
      case 'ArrowRight':
        if(noHorizontalCollisionCheck(gameState.xCurrent + 1)){
          gameState.xCurrent = gameState.xCurrent + 1;
        }    
        return;
      case 'ArrowLeft' :
        if(noHorizontalCollisionCheck(gameState.xCurrent - 1)){
          gameState.xCurrent = gameState.xCurrent - 1;
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
