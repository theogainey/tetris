import { randomTetromino } from "./utility";

export const tetrominoSize = 30;
export const gravity = 48; // frames it takes to fall 1 line;

export const tetrominos: Record<TetrominoTypes, TetrominoTypeDetails> = {
  I: {
    color: '#6EECEE',
    offsets: [[0,0], [tetrominoSize, 0],  [tetrominoSize * 2, 0],  [tetrominoSize * 3, 0]],
    vertices: [[0,0], [0, tetrominoSize], [tetrominoSize * 4, tetrominoSize],  [tetrominoSize * 4, 0]]
  },
  J: {
    color: '#0000E6',
    offsets: [[0,0], [0, tetrominoSize],  [tetrominoSize, tetrominoSize],  [tetrominoSize * 2, tetrominoSize]],
    vertices: [[0,0], [0, tetrominoSize * 2], [tetrominoSize * 3, tetrominoSize * 2], [tetrominoSize * 3, tetrominoSize], [tetrominoSize, tetrominoSize], [0, tetrominoSize]],
  },
  L: {
    color: '#E4A439',
    offsets: [[tetrominoSize * 2,0], [0, tetrominoSize],  [tetrominoSize, tetrominoSize],  [tetrominoSize * 2, tetrominoSize]],
    vertices: [[tetrominoSize * 2, 0], [tetrominoSize * 3, 0], [tetrominoSize * 3, tetrominoSize * 2], [0, tetrominoSize * 2], [0, tetrominoSize], [tetrominoSize * 2, tetrominoSize]],
  },
  O: {
    color: '#E3E34B',
    offsets: [[0,0], [0, tetrominoSize],  [tetrominoSize, 0],  [tetrominoSize, tetrominoSize]],
    vertices: [[0, 0], [0, tetrominoSize * 2], [tetrominoSize * 2, tetrominoSize * 2], [tetrominoSize * 2, 0],],
  },
  S: {
    color: '#6EEC47',
    offsets: [[tetrominoSize * 2, 0], [tetrominoSize, 0],  [tetrominoSize, tetrominoSize],  [0, tetrominoSize]],
    vertices: [[0, tetrominoSize], [0, tetrominoSize * 2], [tetrominoSize * 2, tetrominoSize * 2], [tetrominoSize * 2, tetrominoSize],[tetrominoSize * 3, tetrominoSize], [tetrominoSize * 3, 0],  [tetrominoSize, 0],   [tetrominoSize, tetrominoSize]],
  },
  T: {
    color: '#921CE7',
    offsets: [[tetrominoSize, 0], [tetrominoSize, tetrominoSize],  [0, tetrominoSize],  [tetrominoSize * 2, tetrominoSize]],
    vertices: [[tetrominoSize, 0], [tetrominoSize, tetrominoSize], [0, tetrominoSize], [0, tetrominoSize  * 2],[tetrominoSize * 3, tetrominoSize * 2], [tetrominoSize * 3, tetrominoSize],  [tetrominoSize * 2, tetrominoSize],   [tetrominoSize * 2, 0]],
  },
  Z: {
    color: '#DC2F21',
    offsets: [[0, 0], [tetrominoSize, 0],  [tetrominoSize, tetrominoSize],  [tetrominoSize * 2, tetrominoSize]],
    vertices: [[0, 0], [0, tetrominoSize], [tetrominoSize, tetrominoSize], [tetrominoSize, tetrominoSize  * 2],[tetrominoSize * 3, tetrominoSize * 2], [tetrominoSize * 3, tetrominoSize],  [tetrominoSize * 2, tetrominoSize],   [tetrominoSize * 2, 0]],
  },
}

export const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;


// gameState
export const gameState: GameState = {
  xCurrent: 0,
  yCurrent: 0, 
  typeCurrent: randomTetromino(),
  dy: tetrominoSize/gravity,
  lockedCells: [],
};
