import { IterationStep } from "./IterationStep";

export interface GraphTraversalStep extends IterationStep {
  currentIndex: number;
  comparing?: [number, number];
  swapping?: [number, number];
  highlightedIndex?: number;
  array: number[];
  locked: boolean[];
  stepNum?: number;
  hidden?: number[];
  variables?: {
    [key: string]: any;
  };
  currentNode?: string;
  visited?: string[];
}
