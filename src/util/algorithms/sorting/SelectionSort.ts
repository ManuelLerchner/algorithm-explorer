
import { SortingStep } from "../../../model/Steps/SortingStep";
import { swap } from "./Swap";

const selectionSortPseudoCode = [
  "for (let n=0; n<A.length; n++) {",
  "  let minIndex = n;",
  "  for (let i=n+1; i<A.length; i++) {",
  "    if (A[i] < A[minIndex]) {",
  "      minIndex = i;",
  "    }",
  "  }",
  "  swap(A, n, minIndex);",
  "}",
];

function* selectionSort(A: number[]): IterableIterator<SortingStep> {
  for (let n = 0; n < A.length; n++) {
    let minIndex = n;

    for (let i = n + 1; i < A.length; i++) {
      yield {
        codeRow: 4,
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
          codeRow: 5,
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
      codeRow: 8,
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
  algorithmName: "Insertion Sort",
  algorithm: selectionSort,
  pseudoCode: selectionSortPseudoCode,
};
