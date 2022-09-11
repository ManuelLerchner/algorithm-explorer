import { SortingStep } from "../../model/SortingStep";

export const insertionSortPseudoCode = [
  "for (let n=1; n<A.length; n++) {",
  "  let element = A[n];",
  "  let i = n;",
  "  while (i > 0 && A[i-1] > element) {",
  "    A[i] = A[i-1];",
  "    i--;",
  "  }",
  "  A[i] = element;",
  "}",
];

export function* insertionSort(A: number[]): IterableIterator<SortingStep> {
  for (let n = 1; n < A.length; n++) {
    let element = A[n];
    let i = n;

    yield {
      codeRow: 2,
      currentIndex: i,
      highlightedIndex: i,

      array: [...A],
      locked: A.map((_, i) => false),
      variables: {
        i,
        n,
        element,
      },
      description: {
        type: "Selected",
        description: `element=${A[i]}`,
      },
    };

    while (i > 0 && A[i - 1] > element) {
      A[i] = A[i - 1];
      i--;
      yield {
        codeRow: 5,
        currentIndex: i,
        comparing: [i - 1, -1],

        array: [...A],
        locked: A.map((_, i) => false),
        highlightedIndex: i,
        hidden: [i],
        variables: {
          i,
          n,
          element,
        },
        description: {
          type: "Shifted",
          description: `A[${i + 1}] = A[${i}]`,
        },
      };
    }
    A[i] = element;
    yield {
      codeRow: 8,
      currentIndex: i,
      array: [...A],
      locked: A.map((_, i) => false),
      variables: {
        i,
        n,
      },
      highlightedIndex: i,
      description: {
        type: "Set",
        description: `A[${i}]=${element}`,
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
