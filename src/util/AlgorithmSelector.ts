import { bfsinfo } from "./algorithms/graph-traversal/breadthFirstSearch";
import { bubbleSortInfo } from "./algorithms/sorting/BubbleSort";
import { insertionSortInfo } from "./algorithms/sorting/InsertionSort";
import { quickSortInfo } from "./algorithms/sorting/QuickSort";
import { selectionSortInfo } from "./algorithms/sorting/SelectionSort";

export function getSortingAlgorithm(algorithmName: string) {
  switch (algorithmName) {
    case "Bubble Sort":
      return bubbleSortInfo;
    case "Selection Sort":
      return selectionSortInfo;
    case "Insertion Sort":
      return insertionSortInfo;
    case "Quick Sort":
      return quickSortInfo;
  }
}

export function getGraphTraversalAlgorithm(algorithmName: string) {
  switch (algorithmName) {
    case "Breadth First Search":
      return bfsinfo;
  }
}
