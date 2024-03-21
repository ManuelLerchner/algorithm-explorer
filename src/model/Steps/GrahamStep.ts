import { IterationStep } from "./IterationStep";

export interface GrahamStep extends IterationStep {
  stepNum?: number;
  variables?: {
    [key: string]: any;
  };
  rootNode?: number;
  currentNode?: number;
  markedNodes?: number[];
  labels?: Map<number, string>;
  stack?: number[];
}
