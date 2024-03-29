import { IterationStep } from "./IterationStep";

export interface GraphStep extends IterationStep {
  stepNum?: number;
  hidden?: number[];
  variables?: {
    [key: string]: any;
  };
  labels?: Map<number, string>;
  solutionpath?: number[];
  currentNode?: number;
  visited?: number[];
  explored?: number[];
}
