import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy as codeStyle } from "react-syntax-highlighter/dist/esm/styles/prism";
import { IterationStep } from "../../model/Steps/IterationStep";

export default function PseudoCodeBox({
  currentStep,
  pseudoCode,
  controller,
}: {
  pseudoCode: string[];
  currentStep: IterationStep | null;
  controller: React.ReactNode;
}) {
  let { type, description } = currentStep?.description ?? {
    type: "Waiting",
    description: "",
  };

  return (
    <div className="flex flex-col bg-white p-4 rounded-md shadow-lg">
      <SyntaxHighlighter
        customStyle={{
          padding: "0.5rem",
          paddingLeft: "0rem",
          marginTop: 0,
          marginBottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid #ccc",
          borderRadius: "0.5rem",
        }}
        language="javascript"
        style={codeStyle}
        showLineNumbers
        wrapLines
        lineProps={(lineNumber) => {
          const style: any = { display: "block", width: "100%" };
          if (lineNumber === currentStep?.codeRow) {
            style.backgroundColor = "#FFDB81";
          }
          return { style };
        }}
      >
        {pseudoCode.join("\n")}
      </SyntaxHighlighter>

      {controller}

      <div className="grid grid-cols-[auto_1fr] items-center mt-2 gap-2">
        <label className="font-semibold mr-4">Description:</label>
        <div className="flex flex-col justify-between items-start">
          <span className="font-semibold text-green-600">{type}</span>
          <span className="font-medium">{description}</span>
        </div>

        <label className="font-semibold mr-4">Variables:</label>
        <div className="flex items-center flex-wrap">
          {Object.entries(currentStep?.variables ?? {}).map(
            ([variable, value]) => (
              <div key={variable} className=" mr-4">
                <span className="font-bold">{variable + ": "}</span>
                <span>{JSON.stringify(value)}</span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
