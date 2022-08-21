import { SortingStep } from "../../model/SortingStep";
import { swap } from "./Swap";

export function* bubbleSort(A: number[]): IterableIterator<SortingStep> {
  for (let n = A.length - 1; n >= 1; n--) {
    for (let i = 0; i < n; i++) {
      if (A[i] > A[i + 1]) {
        swap(A, i, i + 1);
        yield {
          codeRow: 2,
          leftBoundary: 0,
          rightBoundary: n,
          currentIndex: i,
          swapping: [i, i + 1],
          array: [...A],
          locked: A.map((_, i) => i > n),
        };
      } else {
        yield {
          codeRow: 2,
          leftBoundary: 0,
          rightBoundary: n,
          currentIndex: i,
          comparing: [i, i + 1],
          array: [...A],
          locked: A.map((_, i) => i > n),
        };
      }
    }
  }
  yield {
    codeRow: 3,
    leftBoundary: 0,
    rightBoundary: A.length - 1,
    currentIndex: -1,
    array: [...A],
    locked: A.map((_, i) => i >= 0),
  };
}
