export interface SortingStep {
  codeRow: number;
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
  description?: {
    type:
      | "Compared"
      | "Swapped"
      | "Finished"
      | "Selected"
      | "Updated"
      | "Set"
      | "Shifted";

    description: string;
  };
}
