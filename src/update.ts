import { tetrominos, tetrominoSize, gameState } from "./constants";
import { randomTetromino } from './utility'
// if y value is small than smallest y at x point in collision point then no collision is possible even with a jagged path
// returns true if no collision
function minCollisionCheck(y: number, yCollisionPoints: number[]) {
  const minY = Math.min(...yCollisionPoints)
  return y < minY;
}

function noVerticalCollisionCheck() {
  const {offsets} = tetrominos[gameState.typeCurrent]; 
  const potentialCollisionPoints = offsets.map(([xOffset, yOffset]) => ({
    y: yOffset + tetrominoSize + gameState.yCurrent,
    xStart: xOffset + gameState.xCurrent,
    xEnd: xOffset + tetrominoSize + gameState.xCurrent,
  }));
  return potentialCollisionPoints.every(({xStart, xEnd, y}) => {
    // right now this assumes no jagged stacks. Fix this next
    const xStartCollisionPoints =  gameState.verticalCollisionPoints.get(xStart) ?? [tetrominoSize * 20];    
    const xEndCollisionPoints =  gameState.verticalCollisionPoints.get(xEnd) ?? [tetrominoSize * 20];    
    const matchingLedges = xStartCollisionPoints.filter((x) => xEndCollisionPoints.includes(x));
    return minCollisionCheck(y, matchingLedges) // || jagged check
  })
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
  
  // //add to verticalCollisionPoints and horizontalCollisionPoints
  tetrominos[gameState.typeCurrent].offsets.forEach(([x, y]) => {
    const verticalCollisionStartPoints = gameState.verticalCollisionPoints.get(x + gameState.xCurrent);
    const verticalCollisionEndPoints = gameState.verticalCollisionPoints.get(x + tetrominoSize + gameState.xCurrent);
    verticalCollisionStartPoints 
    ? gameState.verticalCollisionPoints.set(x + gameState.xCurrent, verticalCollisionStartPoints.concat(y + gameState.yCurrent))
    : gameState.verticalCollisionPoints.set(x + gameState.xCurrent, [y + gameState.yCurrent])
    verticalCollisionEndPoints 
    ? gameState.verticalCollisionPoints.set(x + tetrominoSize + gameState.xCurrent, verticalCollisionEndPoints.concat(y + gameState.yCurrent))
    : gameState.verticalCollisionPoints.set(x + tetrominoSize + gameState.xCurrent, [y + gameState.yCurrent])
  });

  // start new block 
  gameState.xCurrent = 0;
  gameState.yCurrent = 0;
  gameState.typeCurrent = randomTetromino();
};
