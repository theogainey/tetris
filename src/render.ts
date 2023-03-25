import { tetrominos, tetrominoSize, gameState, canvas } from "./constants";

function drawCell(ctx: CanvasRenderingContext2D, color: string, x:number, y: number) {
    const xStart = x * tetrominoSize;
    const yStart = y * tetrominoSize;
    ctx.fillStyle = color;
    ctx.fillRect(xStart, yStart, tetrominoSize, tetrominoSize);
    ctx.strokeRect(xStart, yStart, tetrominoSize, tetrominoSize);
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#323232';
    ctx.fillRect(xStart + 5, yStart + 5, tetrominoSize - 10, tetrominoSize - 10);
    ctx.shadowBlur = 0;
}

function drawTetromino(ctx: CanvasRenderingContext2D, type: TetrominoTypeDetails, x:number, y: number) {
  type.offsets[gameState.rotation].forEach(([xOffset, yOffset])=>{
    drawCell(ctx, type.color, x + xOffset, y + yOffset)
  })
}


export default function render() {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTetromino(ctx, tetrominos[gameState.typeCurrent], gameState.xCurrent, gameState.yCurrent);
  
  gameState.lockedCells.forEach(({color, xStart, yStart})=> {
    drawCell(ctx, color, xStart, yStart);
  });
};
