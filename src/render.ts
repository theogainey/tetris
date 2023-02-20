import { tetrominos, tetrominoSize, gameState, canvas } from "./constants";
const tetrominoInset = 3;

function drawTetromino(ctx: CanvasRenderingContext2D, type: TetrominoTypeDetails, x:number, y: number) {
  type.offsets.forEach(([xOffset, yOffset])=>{
    ctx.beginPath();
    ctx.rect(x + xOffset, y + yOffset, tetrominoSize, tetrominoSize);
    ctx.fillStyle = type.color;
    ctx.fill();
    ctx.stroke();
    ctx.closePath(); 
  })
}


export default function render() {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // draw each tetromino 
  drawTetromino(ctx, tetrominos[gameState.typeCurrent], gameState.xCurrent, gameState.yCurrent);
  gameState.lockedTetrominos.forEach(({type, xStart, yStart})=> {
    drawTetromino(ctx, tetrominos[type], xStart, yStart);
  });
};
