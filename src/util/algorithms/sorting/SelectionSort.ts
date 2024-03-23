import { SortingStep } from "../../../model/Steps/SortingStep";
import { swap } from "./Swap";

const selectionSortPseudoCode = [
  "// Best: O(n^2), Average: O(n^2), Worst: O(n^2)",
  "function selectionSort(A) {",
  "  for (let n=0; n<A.length; n++) {",
  "    let minIndex = n;",
  "    for (let i=n+1; i<A.length; i++) {",
  "      if (A[i] < A[minIndex]) {",
  "        minIndex = i;",
  "      }",
  "    }",
  "    swap(A, n, minIndex);",
  "  }",
  "}",
];

function* selectionSort(A: number[]): IterableIterator<SortingStep> {
  for (let n = 0; n < A.length; n++) {
    let minIndex = n;

    for (let i = n + 1; i < A.length; i++) {
      yield {
        codeRow: 6,
        currentIndex: i,
        comparing: [i, minIndex],
        array: [...A],
        locked: A.map((_, i) => i < n),
        variables: {
          i,
          n,
          minIndex,
        },
        highlightedIndex: minIndex,
        description: {
          type: "Compared",
          description: `A[${i}] ${
            A[i] > A[minIndex] ? ">" : "≤"
          } A[${minIndex}]`,
        },
      };

      if (A[i] < A[minIndex]) {
        minIndex = i;
        yield {
          codeRow: 7,
          currentIndex: i,
          array: [...A],
          locked: A.map((_, i) => i < n),
          variables: {
            i,
            n,
            minIndex,
          },
          highlightedIndex: minIndex,
          description: {
            type: "Updated",
            description: `minIndex = ${minIndex}`,
          },
        };
      }
    }
    swap(A, n, minIndex);
    yield {
      codeRow: 10,
      currentIndex: n,
      swapping: [n, minIndex],
      array: [...A],
      locked: A.map((_, i) => i < n),

      variables: {
        minIndex,
        n,
      },
      description: {
        type: "Swapped",
        description: `A[${n}] ↔ A[${minIndex}]`,
      },
    };
  }
  yield {
    codeRow: -1,
    currentIndex: -1,
    array: [...A],
    locked: A.map((_) => true),
    description: { type: "Finished", description: "" },
  };
}

export const selectionSortInfo = {
  algorithmName: "Selection Sort",
  algorithm: selectionSort,
  pseudoCode: selectionSortPseudoCode,
};
