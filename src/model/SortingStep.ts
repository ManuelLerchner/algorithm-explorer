export interface SortingStep {
  codeRow: number;
  leftBoundary: number;
  rightBoundary: number;
  currentIndex: number;
  comparing?: {
    from: number;
    to: number;
  };
  array: number[];
  locked: boolean[];
}
