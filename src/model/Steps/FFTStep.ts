import { IterationStep } from "./IterationStep";
import math from "mathjs";

export interface FFTStep extends IterationStep {
  currentArray: math.Complex[];
  resultArray?: math.Complex[];
  parentArrays: math.Complex[][];
}
