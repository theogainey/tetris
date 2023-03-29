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

function hardDrop() {
  const { offsets } = tetrominos[gameState.typeCurrent]; 
  const yOffsetsCurrent = offsets[gameState.rotation].map(([_x,y])=>y + gameState.yCurrent); 
  const xOffsetsCurrent = offsets[gameState.rotation].map(([x,_y])=>x + gameState.xCurrent);   
  const highestCurrentY = Math.max(...yOffsetsCurrent);
  const cellsToCheck = gameState.lockedCells.filter(({xStart, yStart}) => xOffsetsCurrent.includes(xStart) && yStart > highestCurrentY);
  if(cellsToCheck.length === 0){
    const referenceCell =  yOffsetsCurrent.find((y) => y === highestCurrentY) as number;
    const yOffset = referenceCell - gameState.yCurrent;
    gameState.yCurrent = 19 - yOffset;
    return
  }
  const newFloor = Math.min(...cellsToCheck.map(({yStart})=> yStart));
  const newFloorCells =  cellsToCheck.filter(({yStart})=> yStart === newFloor);
  const newFloorCellXs = newFloorCells.map(({xStart})=> xStart);
  const offsetsThatAlignWithNewFloorCell = offsets[gameState.rotation].filter(([x,_y]) => newFloorCellXs.includes(x + gameState.xCurrent));
  const yOffsetOfCellThatWillHitFloor = Math.max(...offsetsThatAlignWithNewFloorCell.map(([_x,y])=>y));
  gameState.yCurrent = newFloor - 1 - yOffsetOfCellThatWillHitFloor;
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
      case 'ArrowDown': 
        gameState.framesTillDrop = gameState.framesTillDrop - 48
      return
      case ' ':
        hardDrop();
        return;
      default:
        return;
    }
    });
};
