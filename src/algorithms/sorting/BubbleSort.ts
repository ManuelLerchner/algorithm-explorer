import { SortingStep } from "../../model/SortingStep";
import { swap } from "./Swap";

export const bubbleSortPseudoCode = [
  "for (let n=A.length-1; n>=1; n--) {",
  "  for (let i=0; i<n; i++) {",
  "    if (A[i] > A[i+1]) {",
  "      swap(A, i, i+1);",
  "    }",
  "  }",
  "}",
];

export function* bubbleSort(A: number[]): IterableIterator<SortingStep> {
  var step = 0;
  for (let n = A.length - 1; n >= 1; n--) {
    for (let i = 0; i < n; i++) {
      yield {
        codeRow: 3,
        leftBoundary: 0,
        rightBoundary: n,
        currentIndex: i,
        comparing: [i, i + 1],
        array: [...A],
        locked: A.map((_, i) => i > n),
        stepNum: step++,
        variables: {
          i,
          n,
        },
        description: {
          type: "Compared",
          description: `A[${i}] and A[${i + 1}]`,
        },
      };

      if (A[i] > A[i + 1]) {
        swap(A, i, i + 1);
        yield {
          codeRow: 4,
          leftBoundary: 0,
          rightBoundary: n,
          currentIndex: i,
          swapping: [i, i + 1],
          array: [...A],
          locked: A.map((_, i) => i > n),
          stepNum: step++,
          variables: {
            i,
            n,
          },
          description: {
            type: "Swapped",
            description: `A[${i}] and A[${i + 1}]`,
          },
        };
      }
    }
  }
  yield {
    codeRow: -1,
    leftBoundary: 0,
    rightBoundary: A.length - 1,
    currentIndex: -1,
    array: [...A],
    locked: A.map((_, i) => i >= 0),
    stepNum: step++,
    description: { type: "Finished", description: "" },
  };
}
