import { IterationStep } from "./IterationStep";

export interface SortingStep extends IterationStep {
  currentIndex: number;
  comparing?: [number, number];
  swapping?: [number, number];
  highlightedIndex?: number;
  array: number[];
  locked: boolean[];
  hidden?: number[];
}
