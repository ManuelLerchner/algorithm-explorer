import { grahamScanInfo } from "./algorithms/convex-hull/graham-scan";
import { jarvisMarchInfo } from "./algorithms/convex-hull/jarvis-march";
import { quickHullInfo } from "./algorithms/convex-hull/quick-hull";
import { bfsinfo } from "./algorithms/graph-traversal/breadthFirstSearch";
import { dfsinfo } from "./algorithms/graph-traversal/depthFirstSearch";
import { fftInfo } from "./algorithms/signal-processing/fft";
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
    case "Depth First Search":
      return dfsinfo;
  }
}

export function getSignalProcessingAlgorithm(algorithmName: string) {
  switch (algorithmName) {
    case "FFT":
      return fftInfo;
  }
}

export function getConvexHullAlgorithm(algorithmName: string) {
  switch (algorithmName) {
    case "Graham's Scan":
      return grahamScanInfo;
    case "Jarvis March":
      return jarvisMarchInfo;
    case "Quick Hull":
      return quickHullInfo;
  }
}
