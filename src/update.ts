import { tetrominos, gameState, gravity } from "./constants";
import { spawn } from './utility'

function noVerticalCollisionCheck() {
  const offsets = tetrominos[gameState.typeCurrent].offsets; 
  const offsetsCurrent = offsets[gameState.rotation];  
  if(!offsetsCurrent.every(([_x, y])=> y + gameState.yCurrent <19)) return false;
  return offsetsCurrent.every(([x, y])=> {
    const lockedCellsWithSameXStart: LockedCell[] = gameState.lockedCells.filter(({ xStart } ) => xStart === x + gameState.xCurrent);
    return lockedCellsWithSameXStart.every(({yStart}) => y + gameState.yCurrent + 1 !== yStart)
  })
};

function clearRows(){
  const offsets = tetrominos[gameState.typeCurrent].offsets; 
  const offsetsCurrent = offsets[gameState.rotation];
  const yS = offsetsCurrent.map(([_x,y])=> y + gameState.yCurrent);
  const uniqueYs = [...new Set(yS)];
  const rowsToClear:number[] = [];
  uniqueYs.forEach((y)=>{
    const cellsInRow = gameState.lockedCells.filter(({yStart})=> yStart === y);
    if(cellsInRow.length === 10) {
      gameState.lockedCells = gameState.lockedCells.filter(({yStart})=> yStart !== y);
      rowsToClear.push(y)
    }
  })
  gameState.lockedCells = gameState.lockedCells.map((cell) => {
    const rowsClearedBelowCell = rowsToClear.filter((y)=> y > cell.yStart);
    return{
      ...cell,
      yStart: cell.yStart + rowsClearedBelowCell.length,
    }
  })
}

export default function update():void{ 
  if(noVerticalCollisionCheck()){
    if(gameState.framesTillDrop > 0 && gameState.lockDelayFrame === -1) {
      gameState.framesTillDrop = gameState.framesTillDrop -1;
      return;
    }
    if(gameState.lockDelayFrame === -1){
      gameState.framesTillDrop = gravity;
      gameState.yCurrent = gameState.yCurrent + 1;  
      return;
    }
  }
  if(gameState.lockDelayFrame === -1) {
    gameState.lockDelayFrame = 0;
    return
  } 
  if(gameState.lockDelayFrame <30){
    gameState.lockDelayFrame++;
    return;
  }
  gameState.lockDelayFrame = -1;
  if(noVerticalCollisionCheck()) return;
  // if hitting floor add to cells
  tetrominos[gameState.typeCurrent].offsets[gameState.rotation].forEach(([xOffset, yOffset]) => {    
    gameState.lockedCells.push({
      color: tetrominos[gameState.typeCurrent].color,
      xStart: gameState.xCurrent + xOffset,
      yStart: gameState.yCurrent + yOffset,
    });
  });
  clearRows();

  const newTetromino = spawn();

  gameState.xCurrent = newTetromino.xCurrent;
  gameState.yCurrent = newTetromino.yCurrent;
  gameState.typeCurrent = newTetromino.typeCurrent;
  gameState.typeNext = newTetromino.typeNext;
  gameState.rotation = 0;

};
