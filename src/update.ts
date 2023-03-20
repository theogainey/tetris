import { tetrominos, tetrominoSize, gameState } from "./constants";
import { spawn } from './utility'

function noVerticalCollisionCheck() {
  const offsets = tetrominos[gameState.typeCurrent].offsets; 
  const offsetsCurrent = offsets[gameState.rotation];
  if(!offsetsCurrent.every(([_x, y]) => y + gameState.yCurrent  + gameState.dy <= tetrominoSize * 19)) return false;
  const xStarts = offsetsCurrent.map(([xOffset]) => xOffset + gameState.xCurrent);
  const lockedCellsWithSameXStarts = gameState.lockedCells.filter(({ xStart } ) => xStarts.includes(xStart));
  return lockedCellsWithSameXStarts.every(({xStart, yStart}) => offsetsCurrent.every(([x, y]) =>{
    const collisionDetected = xStart < x + gameState.xCurrent + tetrominoSize &&
    xStart + tetrominoSize > x + gameState.xCurrent && 
    yStart < y +  gameState.yCurrent + gameState.dy + tetrominoSize &&
    tetrominoSize + yStart > y + gameState.yCurrent + gameState.dy;
    return !collisionDetected;
  }));

};

function shiftRows(yLowerBounds:number) {
  gameState.lockedCells = gameState.lockedCells.map((tetromino) => 
    tetromino.yStart < yLowerBounds
    ? {
      ...tetromino,
      yStart: tetromino.yStart + tetrominoSize
    }
    : tetromino
  )
}

function clearRows(){
  const offsets = tetrominos[gameState.typeCurrent].offsets; 
  const offsetsCurrent = offsets[gameState.rotation];
  const yStarts = offsetsCurrent.map(([yOffset]) => yOffset + gameState.yCurrent);
  const uniqueYs = [...new Set(yStarts)];
  const rowsToClear = uniqueYs.filter((y)=> {
    if(gameState.lockedCells.filter(({yStart})=> yStart === y).length === 10){
      return true;
    }
  });
  if(rowsToClear.length>0){
    const yDropFloor =  Math.min(...rowsToClear);
    gameState.lockedCells = gameState.lockedCells.filter(({yStart}) => !rowsToClear.includes(yStart));
    gameState.lockedCells = gameState.lockedCells.map((cell)=>{
      if(yDropFloor > cell.yStart){
        return {
          ...cell,
          yStart: cell.yStart + (tetrominoSize * rowsToClear.length)
        };
      }
      return cell;
    })
  }
}

export default function update():void{  
  if(noVerticalCollisionCheck()) {    
    gameState.yCurrent = gameState.yCurrent + gameState.dy; 
    return;
  };
  // lock delay sequence currently can move more than 1 space
  if(gameState.lockDelayFrame === -1) {
    gameState.lockDelayFrame =0;
    return
  } 
  if(gameState.lockDelayFrame <30){
    gameState.lockDelayFrame++;
    return;
  }
  gameState.lockDelayFrame = -1;

  // if hitting floor add to cells
  tetrominos[gameState.typeCurrent].offsets[gameState.rotation].forEach(([xOffset, yOffset]) => {    
    gameState.lockedCells.push({
      color: tetrominos[gameState.typeCurrent].color,
      xStart: gameState.xCurrent + xOffset,
      yStart: gameState.yCurrent + yOffset,
    });
  });
  
  clearRows();
  // start new block 
  const newTetromino = spawn();

  gameState.xCurrent = newTetromino.xCurrent;
  gameState.yCurrent = newTetromino.yCurrent;
  gameState.typeCurrent = newTetromino.typeCurrent;
  gameState.rotation = 0;
};
