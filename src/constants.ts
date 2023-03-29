import { randomTetromino, spawn } from "./utility";

export const tetrominoSize = 30;
export const gravity = 48; // frames it takes to fall 1 line;

const tetrominoPositions = {
  I: {
    position1: [[-2, -1], [-1, -1],  [0, -1],  [1, -1]],
    position2: [[0, -2 ], [0, -1], [0,0], [0, 1]],
  },
  J: {
    position1: [[-1.5, -1.5], [-1.5, -0.5],  [-0.5, -0.5],  [0.5, -0.5]],
    position2: [[-0.5, -1.5], [0.5,  -1.5], [-0.5, -0.5], [-0.5, 0.5]],
    position3: [[-1.5, -0.5], [-0.5, -0.5], [0.5, -0.5], [0.5, 0.5]],
    position4: [[-0.5, -1.5], [-0.5, -0.5], [-0.5, 0.5], [-1.5, 0.5]]
  },
  L: {
    position1: [[-1.5, -0.5], [-0.5 , -0.5],  [0.5, -0.5],  [0.5, -1.5]],
    position2: [[-0.5, -1.5], [-0.5 , -0.5], [-0.5, 0.5], [0.5, 0.5]],
    position3: [[-1.5, -0.5], [-1.5 , 0.5], [-0.5, -0.5], [0.5, -0.5]],
    position4: [[-1.5, -1.5], [-0.5 , -1.5], [-0.5, -0.5], [-0.5, 0.5]],
  },
  O : {
    position1: [[-1, -1], [0, -1],  [-1, 0],  [0, 0]],
  },
  S: {
    position1: [[-1.5, -0.5], [-0.5, -0.5],  [-0.5, -1.5],  [0.5, -1.5]],
    position2: [[-0.5, -1.5], [-0.5, -0.5], [0.5, -0.5], [0.5, 0.5]],
  },
  T: {
    position1: [[-1.5, -.5], [-0.5, -0.5],  [-0.5, -1.5],  [0.5, -0.5]],
    position2: [[-0.5, -1.5], [-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5]],
    position3: [[-1.5, -0.5], [-0.5, -0.5], [0.5, -0.5], [-0.5, 0.5]],
    position4: [[-1.5, -0.5], [-0.5, -1.5], [-0.5, -0.5], [-0.5, 0.5]],
  },
  Z: {
    position1: [[-1.5, -1.5], [-0.5, -1.5],  [-0.5, -0.5],  [0.5, -0.5]],
    position2: [[-0.5, -0.5], [-0.5, 0.5], [0.5, -0.5], [0.5, -1.5]],
  }
}

export const tetrominos: Record<TetrominoTypes, TetrominoTypeDetails> = {
  I: {
    color: '#22d3ee',
    offsets: [tetrominoPositions['I'].position1, tetrominoPositions['I'].position2],
  },
  J: {
    color: '#818cf8',
    offsets: [tetrominoPositions['J'].position1, tetrominoPositions['J'].position2, tetrominoPositions['J'].position3, tetrominoPositions['J'].position4],
  },
  L: {
    color: '#fb923c',
    offsets: [tetrominoPositions['L'].position1, tetrominoPositions['L'].position2, tetrominoPositions['L'].position3, tetrominoPositions['L'].position4],
  },
  O: {
    color: '#facc15',
    offsets: [tetrominoPositions['O'].position1],
  },
  S: {
    color: '#4ade80',
    offsets: [tetrominoPositions['S'].position1, tetrominoPositions['S'].position2],
  },
  T: {
    color: '#c084fc',
    offsets: [tetrominoPositions['T'].position1, tetrominoPositions['T'].position2, tetrominoPositions['T'].position3, tetrominoPositions['T'].position4],
  },
  Z: {
    color: '#fb7185',
    offsets: [tetrominoPositions['Z'].position1,tetrominoPositions['Z'].position2],
  },
}

export const canvas = document.getElementById("playArea") as HTMLCanvasElement;

export const tetrominoHistory = {next: randomTetromino()};

// gameState
export const gameState: GameState = {
  ...spawn(),
  rotation: 0,
  framesTillDrop: gravity,
  lockedCells: [],
  lockDelayFrame: -1,
};
