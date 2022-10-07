import React from "react";
import { ArrayType } from "../../model/CustomPresetTypes";

export default function StepController({
  inAutoMode,
  setInAutoMode,
  reset,
  performStep,
  undoStep,
}: {
  inAutoMode: boolean;
  setInAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  reset: (arrayType: ArrayType, arrayLength: number) => void;
  performStep: () => void;
  undoStep: () => void;
}) {
  return (
    <div>
      <div className="flex justify-around items-center flex-wrap mt-1">
        <button
          className="my-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setInAutoMode(!inAutoMode)}
        >
          {inAutoMode ? "Pause" : "Run"}
        </button>
        <button
          className="my-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={performStep}
        >
          Step
        </button>
        <button
          className="my-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded"
          onClick={undoStep}
        >
          Back
        </button>

        <button
          className="my-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => reset("random", 10)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
