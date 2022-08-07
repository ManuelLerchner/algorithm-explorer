import { SortingStep } from "../../model/SortingStep";
import { swap } from "./Swap";

export function* bubbleSort(A: number[]): IterableIterator<SortingStep> {
  for (let n = A.length; n > 1; n--) {
    yield {
      codeRow: 0,
      leftBoundary: 0,
      rightBoundary: n,
      currentIndex: 0,
      array: [...A],
      locked: A.map((_, i) => i > n - 1),
    };
    for (let i = 0; i < n - 1; i++) {
      yield {
        codeRow: 1,
        leftBoundary: 0,
        rightBoundary: n,
        currentIndex: i,
        array: [...A],
        locked: A.map((_, i) => i > n - 1),
      };
      if (A[i] > A[i + 1]) {
        yield {
          codeRow: 2,
          leftBoundary: 0,
          rightBoundary: n,
          currentIndex: i,
          comparing: {
            from: i,
            to: i + 1,
          },
          array: [...A],
          locked: A.map((_, i) => i > n - 1),
        };
        swap(A, i, i + 1);
        yield {
          codeRow: 3,
          leftBoundary: 0,
          rightBoundary: n,
          currentIndex: i,
          array: [...A],
          locked: A.map((_, i) => i > n - 1),
        };
      }
    }
  }
}
