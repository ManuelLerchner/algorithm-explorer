import math from "mathjs";
import { IterationStep } from "./IterationStep";

export interface FFTStep extends IterationStep {
  currentArray: math.Complex[];
  resultArray?: math.Complex[];
  parentArrays: math.Complex[][];
}
