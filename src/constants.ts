import { randomTetromino, spawn } from "./utility";

export const tetrominoSize = 30;
export const gravity = 48; // frames it takes to fall 1 line;

export const tetrominos: Record<TetrominoTypes, TetrominoTypeDetails> = {
  I: {
    color: '#6EECEE',
    offsets: [[-2 * tetrominoSize, -tetrominoSize], [-tetrominoSize, -tetrominoSize],  [0, -tetrominoSize],  [tetrominoSize, -tetrominoSize]],
  },
  J: {
    color: '#0000E6',
    offsets: [[-1.5 * tetrominoSize, -1.5 * tetrominoSize], [-1.5 * tetrominoSize, -0.5 * tetrominoSize],  [-0.5 * tetrominoSize, -0.5 * tetrominoSize],  [0.5 * tetrominoSize, -0.5 * tetrominoSize]],
  },
  L: {
    color: '#E4A439',
    offsets: [[-1.5 * tetrominoSize, -0.5 * tetrominoSize], [-0.5 * tetrominoSize, -0.5 * tetrominoSize],  [0.5 * tetrominoSize, -0.5 * tetrominoSize],  [0.5 * tetrominoSize, -1.5 * tetrominoSize]],
  },
  O: {
    color: '#E3E34B',
    offsets: [[-tetrominoSize, -tetrominoSize], [0, -tetrominoSize],  [-tetrominoSize, 0],  [0, 0]],
  },
  S: {
    color: '#6EEC47',
    offsets: [[-1.5 * tetrominoSize , -0.5 * tetrominoSize], [-0.5 * tetrominoSize, -0.5 * tetrominoSize],  [-0.5 * tetrominoSize, -1.5 * tetrominoSize],  [0.5 * tetrominoSize, -1.5 * tetrominoSize]],
  },
  T: {
    color: '#921CE7',
    offsets: [[-1.5 * tetrominoSize, -.5 * tetrominoSize], [-0.5 * tetrominoSize, -0.5 * tetrominoSize],  [-0.5 * tetrominoSize, -1.5 * tetrominoSize],  [0.5 * tetrominoSize, -0.5 * tetrominoSize]],
  },
  Z: {
    color: '#DC2F21',
    offsets: [[-1.5 * tetrominoSize, -1.5 * tetrominoSize], [-0.5 * tetrominoSize, -1.5 * tetrominoSize],  [-0.5 * tetrominoSize, -0.5 * tetrominoSize],  [0.5 * tetrominoSize, -0.5 * tetrominoSize]],
  },
}

export const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;


// gameState
export const gameState: GameState = {
  ...spawn(),
  dy: tetrominoSize/gravity,
  lockedCells: [],
  lockDelayFrame: -1,
};
