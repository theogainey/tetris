import { tetrominoSize, gameState, canvas } from "./constants";

export default function eventListeners() {
  window.addEventListener("keydown", (event) => {
    if(event.key === 'ArrowRight'){
      if(gameState.xCurrent + tetrominoSize < canvas.width) gameState.xCurrent = gameState.xCurrent + tetrominoSize; 
    }
    if(event.key === 'ArrowLeft'){
      if(gameState.xCurrent - tetrominoSize >= 0) gameState.xCurrent = gameState.xCurrent - tetrominoSize; 
    }
  });
};
