type TetrominoTypes = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

type TetrominoTypeDetails = {
  color: `#${string}`;
  offsets: number[][];
  rightExtreme: number;
  downExtreme: number;
  vertices: number[][];
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
  dy: number;
  lockedTetrominos: LockedTetrominos[];
  lockedCells: LockedCell[];
  collisionPath:Map<number, number[]>;
}
