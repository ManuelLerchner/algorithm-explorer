export interface SortingStep {
  codeRow: number;
  leftBoundary: number;
  rightBoundary: number;
  currentIndex: number;
  comparing?: [number, number];
  swapping?: [number, number];
  array: number[];
  locked: boolean[];
  stepNum: number;
}
