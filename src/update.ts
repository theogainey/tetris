import { tetrominos, tetrominoSize, gameState, canvas } from "./constants";

function floorCheck({typeCurrent, yCurrent, dy}: GameState, { height }:HTMLCanvasElement){
  if(yCurrent + dy + tetrominos[typeCurrent].offsets[0][1] > height - tetrominoSize) return true;
  if(yCurrent + dy + tetrominos[typeCurrent].offsets[1][1] > height - tetrominoSize) return true;
  if(yCurrent + dy + tetrominos[typeCurrent].offsets[2][1] > height - tetrominoSize) return true;
  if(yCurrent + dy + tetrominos[typeCurrent].offsets[3][1] > height - tetrominoSize) return true;
  return false;
};


export default function update():void{    
  // if hitting nothing no update
  // check if hitting floor 
  // check each y offset point  to see if 
  if(!floorCheck(gameState, canvas)) {
    gameState.yCurrent = gameState.yCurrent + gameState.dy; 
    return;
  }
  // if hitting floor add to lockedTetrominos
  gameState.lockedTetrominos.push({
    type: gameState.typeCurrent,
    xStart: gameState.xCurrent,
    yStart: gameState.yCurrent,
  });

  // start new block 
  gameState.xCurrent = 0;
  gameState.yCurrent = 0;
};
