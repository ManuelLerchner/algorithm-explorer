export interface IterationStep {
  codeRow: number;
  variables?: {
    [key: string]: any;
  };
  description: {
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
