import { SortingStep } from "../../../model/Steps/SortingStep";
import { swap } from "./Swap";

const bubbleSortPseudoCode = [
  "function bubbleSort(A) {",
  "  for (let n=A.length-1; n>=1; n--) {",
  "    for (let i=0; i<n; i++) {",
  "      if (A[i] > A[i+1]) {",
  "        swap(A, i, i+1);",
  "      }",
  "    }",
  "  }",
  "}",
];

function* bubbleSort(A: number[]): IterableIterator<SortingStep> {
  for (let n = A.length - 1; n >= 1; n--) {
    for (let i = 0; i < n; i++) {
      yield {
        codeRow: 4,
        currentIndex: i,
        comparing: [i, i + 1],
        array: [...A],
        locked: A.map((_, i) => i > n),
        variables: {
          i,
          n,
        },
        description: {
          type: "Compared",
          description: `A[${i}] ${A[i] > A[i + 1] ? ">" : "≤"} A[${i + 1}]`,
        },
      };

      if (A[i] > A[i + 1]) {
        swap(A, i, i + 1);
        yield {
          codeRow: 5,
          currentIndex: i,
          swapping: [i, i + 1],
          array: [...A],
          locked: A.map((_, i) => i > n),

          variables: {
            i,
            n,
          },
          description: {
            type: "Swapped",
            description: `A[${i}] ↔ A[${i + 1}]`,
          },
        };
      }
    }
  }
  yield {
    codeRow: -1,
    currentIndex: -1,
    array: [...A],
    locked: A.map((_) => true),
    description: { type: "Finished", description: "" },
  };
}

export const bubbleSortInfo = {
  algorithmName: "Bubble Sort",
  algorithm: bubbleSort,
  pseudoCode: bubbleSortPseudoCode,
};
