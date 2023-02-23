import { tetrominoSize, gameState, tetrominos } from "./constants";


function wallCheck(key: string ):boolean{
  switch (key) {
    case 'ArrowRight':
      return (gameState.xCurrent + tetrominos[gameState.typeCurrent].rightExtreme < tetrominoSize * 10)
    case 'ArrowLeft' :
      return (gameState.xCurrent - tetrominoSize >= 0)
    default:
      return false;
  }
};

function horizontalMove(key: string):void {
  switch (key) {
    case 'ArrowRight':
      gameState.xCurrent = gameState.xCurrent + tetrominoSize;
      break;
    case 'ArrowLeft' :
      gameState.xCurrent = gameState.xCurrent - tetrominoSize
      break;
    default:
      gameState.xCurrent = gameState.xCurrent - tetrominoSize; 
      break;
  }

}
export default function eventListeners() {
  window.addEventListener("keydown", (event) => {
    if(wallCheck(event.key)){
      horizontalMove(event.key);
    }
  });
};
