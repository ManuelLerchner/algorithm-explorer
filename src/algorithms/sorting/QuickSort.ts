import { SortingStep } from "../../model/SortingStep";
import { swap } from "./Swap";

export const quickSortPseudoCode = [
  "function quickSort(A, start, end) {",
  "  if (start >= end) return;",
  "  let i = start, j = end - 1;",
  "  let pivot = A[end];",
  "  while (i < j) {",
  "    while (A[i] <= pivot && i < j) {",
  "      i++;",
  "    }",
  "    while (A[j] > pivot && i < j) {",
  "      j--;",
  "    }",
  "    if (i < j) swap(A, i, j);",
  "  }",
  "  if (A[i] > pivot) {",
  "    swap(A, i, end);",
  "  }",
  "  quickSort(A, start, i - 1);",
  "  quickSort(A, i + 1, end);",
  "}",
];

function* quickSortHelper(
  A: number[],
  start: number,
  end: number,
  locked: boolean[],
  depth: number
): IterableIterator<SortingStep> {
  if (start >= end) {
    for (let i = end; i <= start; i++) {
      locked[i] = true;
    }

    yield {
      codeRow: 2,
      currentIndex: start,
      array: [...A],
      locked: [...locked],
      variables: {
        start,
        end,
        depth,
      },
      description: {
        type: "Finished",
        description: `Completed`,
      },
    };

    return;
  }
  let i = start,
    j = end - 1;
  let pivot = A[end];

  yield {
    codeRow: 4,
    currentIndex: i,
    array: [...A],
    locked: [...locked],
    variables: {
      i,
      j,
      pivot,
      depth,
    },
    highlightedIndex: end,
    description: {
      type: "Selected",
      description: `pivot=${A[end]}`,
    },
  };

  while (i < j) {
    while (A[i] <= pivot && i < j) {
      i++;
      yield {
        codeRow: 7,
        currentIndex: i,
        array: [...A],
        locked: [...locked],
        variables: {
          i,
          j,
          pivot,
          depth,
        },
        highlightedIndex: end,
        description: {
          type: "Updated",
          description: `i=${i}`,
        },
      };
    }
    while (A[j] > pivot && i < j) {
      j--;
      yield {
        codeRow: 10,
        currentIndex: j,
        array: [...A],
        locked: [...locked],
        variables: {
          i,
          j,
          pivot,
          depth,
        },
        highlightedIndex: end,
        description: {
          type: "Updated",
          description: `j=${j}`,
        },
      };
    }
    if (i < j) {
      swap(A, i, j);
      yield {
        codeRow: 12,
        currentIndex: j,
        swapping: [i, j],
        array: [...A],
        locked: [...locked],
        variables: {
          i,
          j,
          pivot,
          depth,
        },
        highlightedIndex: end,
        description: {
          type: "Swapped",
          description: `A[${i}] ↔ A[${j}]`,
        },
      };
    }
  }
  if (A[i] > pivot) {
    swap(A, i, end);
    yield {
      codeRow: 15,
      currentIndex: i,
      comparing: [i, j],
      array: [...A],
      locked: [...locked],
      variables: {
        i,
        j,
        pivot,
        depth,
      },
      description: {
        type: "Swapped",
        description: `A[${i}] ↔ A[${end}]`,
      },
      highlightedIndex: i,
    };
  }
  locked[i] = true;

  yield* quickSortHelper(A, start, i - 1, locked, depth + 1);

  yield* quickSortHelper(A, i + 1, end, locked, depth + 1);
}

export function* quickSort(A: number[]): IterableIterator<SortingStep> {
  let locked = A.map((_) => false);
  yield* quickSortHelper(A, 0, A.length - 1, locked, 0);

  yield {
    codeRow: -1,
    currentIndex: -1,
    array: [...A],
    locked: A.map((_) => true),
    description: { type: "Finished", description: "" },
  };
}
