import {
  bubbleSort,
  bubbleSortPseudoCode,
} from "../../algorithms/sorting/BubbleSort";
import {
  insertionSort,
  insertionSortPseudoCode,
} from "../../algorithms/sorting/InsertionSort";
import {
  quickSort,
  quickSortPseudoCode,
} from "../../algorithms/sorting/QuickSort";
import {
  selectionSort,
  selectionSortPseudoCode,
} from "../../algorithms/sorting/SelectionSort";
import SortingPage from "./SortingPage/SortingPage";

export function getAlgorithmPage(category: string) {
  switch (category) {
    case "Sorting":
      return SortingPage;
  }
}

export function getAlgorithm(category: string, algorithmName: string) {
  switch (category) {
    case "Sorting":
      return getSortingAlgorithm(algorithmName);
  }
}

function getSortingAlgorithm(algorithmName: string) {
  switch (algorithmName) {
    case "Bubble Sort":
      return { algorithm: bubbleSort, pseudoCode: bubbleSortPseudoCode };
    case "Selection Sort":
      return { algorithm: selectionSort, pseudoCode: selectionSortPseudoCode };
    case "Insertion Sort":
      return { algorithm: insertionSort, pseudoCode: insertionSortPseudoCode };
    case "Quick Sort":
      return { algorithm: quickSort, pseudoCode: quickSortPseudoCode };
  }
}
