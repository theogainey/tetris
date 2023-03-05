import { tetrominos, tetrominoSize, gameState } from "./constants";
import { randomTetromino } from './utility'

function noVerticalCollisionCheck() {
  const { offsets } = tetrominos[gameState.typeCurrent]; 
  if(!offsets.every(([_x, y]) => y + gameState.yCurrent <= tetrominoSize * 19)) return false;
  const xStarts = offsets.map(([xOffset]) => xOffset + gameState.xCurrent);
  const lockedCellsWithSameXStarts = gameState.lockedCells.filter(({ xStart } ) => xStarts.includes(xStart));
  return lockedCellsWithSameXStarts.every(({xStart, yStart}) => offsets.every(([x, y]) =>{
    const collisionDetected = xStart < x + gameState.xCurrent + tetrominoSize &&
    xStart + tetrominoSize > x + gameState.xCurrent && 
    yStart < y +  gameState.yCurrent + gameState.dy + tetrominoSize &&
    tetrominoSize + yStart > y + gameState.yCurrent + gameState.dy;
    return !collisionDetected;
  }));

};

export default function update():void{    
  if(noVerticalCollisionCheck()) {    
    gameState.yCurrent = gameState.yCurrent + gameState.dy; 
    return;
  };

  // if hitting floor add to cells
  // Normalize the cells position meaning each start value is a multiple of tetromino size
  tetrominos[gameState.typeCurrent].offsets.forEach(([xOffset, yOffset]) => {
    gameState.lockedCells.push({
      color: tetrominos[gameState.typeCurrent].color,
      xStart: gameState.xCurrent + xOffset,
      yStart: gameState.yCurrent + yOffset,
    });
  });
  
  // start new block 
  gameState.xCurrent = 0;
  gameState.yCurrent = 0;
  gameState.typeCurrent = randomTetromino();
};
