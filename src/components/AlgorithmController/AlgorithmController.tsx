import React from "react";

export default function AlgorithmController({
  algorithmName,
  inAutoMode,
  setInAutoMode,
  reset,
  performStep,
  undoStep,
}: {
  algorithmName: string;
  inAutoMode: boolean;
  setInAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  reset: () => void;
  performStep: () => void;
  undoStep: () => void;
}) {
  return (
    <div>
      <h1 className="dark:text-white text-2xl sm:text-4xl my-4 ">
        {algorithmName}
      </h1>

      <div className="bg-white p-4 rounded-md shadow-lg">
        <p>code</p>
        <p>code</p>
        <p>code</p>
        <p>code</p>
        <p>code</p>

        <p>code</p>
      </div>

      <div className="flex justify-around items-center flex-wrap my-2">
        <button
          className="m-2 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setInAutoMode(!inAutoMode)}
        >
          {inAutoMode ? "Pause" : "Run"}
        </button>
        <button
          className="m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={performStep}
        >
          Step
        </button>
        <button
          className="m-2 bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-2 px-4 rounded"
          onClick={undoStep}
        >
          Back
        </button>

        <button
          className="m-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
