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


function renderNext() {
  const nextCanvas = document.getElementById("next") as HTMLCanvasElement;

  const nextCanvasCTX = nextCanvas.getContext("2d") as CanvasRenderingContext2D;
  const tetrominoType = tetrominos[gameState.typeNext];
  const yStart = gameState.typeNext === 'O' ?  1.5 : 2;
  nextCanvasCTX.clearRect(0, 0, canvas.width, canvas.height);
  tetrominoType.offsets[0].forEach(([xOffset, yOffset])=>{
    drawCell(nextCanvasCTX, tetrominos[gameState.typeNext].color, 2.5 + xOffset, yStart + yOffset)
  })

}

export default function render() {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawTetromino(ctx, tetrominos[gameState.typeCurrent], gameState.xCurrent, gameState.yCurrent);
  renderNext();
  gameState.lockedCells.forEach(({color, xStart, yStart})=> {
    drawCell(ctx, color, xStart, yStart);
  });
};
