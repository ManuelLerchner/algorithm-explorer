import React from "react";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

import { coy as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { SortingStep } from "../../model/SortingStep";

export default function AlgorithmController({
  algorithmName,
  inAutoMode,
  pseudoCode,
  currentStep,
  setInAutoMode,
  reset,
  performStep,
  undoStep,
}: {
  algorithmName: string;
  inAutoMode: boolean;
  pseudoCode: string[];
  currentStep: SortingStep | null;
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

      <div className="flex flex-col bg-white p-4 rounded-md shadow-lg">
        <SyntaxHighlighter
          customStyle={{
            padding: 0,
            marginTop: 0,
            marginBottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          language="javascript"
          style={codeStyle}
          showLineNumbers
          wrapLines
          lineProps={(lineNumber) => {
            const style: any = { display: "block", width: "fit-content" };
            if (lineNumber === currentStep?.codeRow) {
              style.backgroundColor = "#FFDB81";
            }
            return { style };
          }}
        >
          {pseudoCode.join("\n")}
        </SyntaxHighlighter>

        <div className="mt-4">
          <div className="flex  items-center">
            <h2 className="text-lg mr-4">Description:</h2>{" "}
            {currentStep?.description}
          </div>
          <div className="flex  items-center">
            <h2 className="text-lg mr-4">Variables:</h2>
            {Object.entries(currentStep?.variables ?? {}).map(
              ([variable, value]) => (
                <span key={variable} className="mr-4">
                  <span className="font-bold">{variable + ": "}</span>
                  <span>{value}</span>
                </span>
              )
            )}
          </div>
        </div>
      </div>

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
          onClick={reset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
