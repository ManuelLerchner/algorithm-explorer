import { bubbleSort } from "../../algorithms/sorting/BubbleSort";
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
      return bubbleSort;
  }
}
