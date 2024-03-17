import { IterationStep } from "./IterationStep";

export interface GrahamStep extends IterationStep {
  stepNum?: number;
  variables?: {
    [key: string]: any;
  };
  rootNode?: number;
  currentNode?: number;
  enumertatedNodes?: number[];
  stack?: number[];
}
