import { IterationStep } from "./IterationStep";

export interface GraphTraversalStep extends IterationStep {
  stepNum?: number;
  hidden?: number[];
  variables?: {
    [key: string]: any;
  };
  currentNode?: number;
  visited?: number[];
  explored?: number[];
}
