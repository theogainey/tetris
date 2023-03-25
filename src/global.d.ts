type TetrominoTypes = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

type TetrominoTypeDetails = {
  color: `#${string}`;
  offsets: number[][][];
};

type LockedTetrominos = {
  type: TetrominoTypes;
  xStart: number;
  yStart: number;
};

type LockedCell = {
  color: `#${string}`;
  xStart: number;
  yStart: number;
};

type GameState = {
  xCurrent: number;
  yCurrent: number;
  typeCurrent: TetrominoTypes;
  rotation: number;
  framesTillDrop: number;
  lockedCells: LockedCell[];
  lockDelayFrame: number;
}
