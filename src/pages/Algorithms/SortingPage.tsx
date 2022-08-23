import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { bubbleSort } from "../../algorithms/sorting/BubbleSort";
import { mapUrlToBreadcrumbs } from "../../components/BreadcrumbHelper";
import { SortingStep } from "../../model/SortingStep";
import { shiftIn } from "../transitionProperties";
import { renderHistory, renderArray } from "./ArrayVisualization";

/**
 * Resets the start-array
 * @param arrayOrder The ordering type of the new array
 */
function createArray(
  arrayLength: number,
  arrayOrder: "random" | "ascending" | "descending"
) {
  switch (arrayOrder) {
    case "random":
      return Array.from({ length: arrayLength }, (_) =>
        Math.floor(Math.random() * 100)
      );
    case "ascending":
      return Array.from({ length: arrayLength }, (_, i: number) => i + 1);
    case "descending":
      return Array.from(
        { length: arrayLength },
        (_, i: number) => arrayLength - i
      );
  }
}

export default function SortingPage() {
  const location = useLocation();
  const breadcrumbs = mapUrlToBreadcrumbs(location.pathname);
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

  const currentSortingElement = useRef<HTMLHeadingElement>(null);
  const [arrayLength, setArrayLength] = useState(10);
  const [startArray, setStartArray] = useState<number[]>([]);
  const [totalHistory, setTotalHistory] = useState<SortingStep[]>([]);
  const [currentHistory, setCurrentHistory] = useState<SortingStep[]>([]);
  const [inAutoMode, setInAutoMode] = useState(false);

  const stepIterator = useMemo(() => bubbleSort([...startArray]), [startArray]);

  // Initializes the start-array using random ordering
  useEffect(() => {
    setStartArray(createArray(10, "random"));
  }, []);

  /**
   * Resets the History-View
   */
  function resetHistory() {
    setTotalHistory([]);
    setCurrentHistory([]);
    setInAutoMode(false);
  }

  /**
   * Performs a single step of the Sorting-Calculation
   */
  const performStep = useCallback(() => {
    if (currentHistory.length >= totalHistory.length) {
      const step = stepIterator.next();
      if (step.done) {
        return;
      }
      const updateHistory = [...totalHistory, step.value];
      setTotalHistory(updateHistory);
      setCurrentHistory(updateHistory);
    } else {
      const newHistory = totalHistory.slice(0, currentHistory.length + 1);
      setCurrentHistory(newHistory);
    }
  }, [totalHistory, stepIterator, currentHistory.length]);

  /**
   * Goes back a step in the Sorting-Calculation
   */
  function undoStep() {
    const newHistory = totalHistory.slice(0, currentHistory.length - 1);
    setCurrentHistory(newHistory);
    setInAutoMode(false);
  }

  // Scrolls to the currently evaluated array element after a step
  useEffect(() => {
    currentSortingElement.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center",
    });
  }, [currentHistory]);

  // Runs the "performStep" loop when "auto-mode" is enabled
  useEffect(() => {
    if (inAutoMode) {
      let timer = setTimeout(() => {
        if (inAutoMode) {
          performStep();
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [inAutoMode, performStep]);

  return (
    <motion.div
      key="sorting-page"
      variants={shiftIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="container"
      className="flex flex-col-reverse justify-around md:flex-row w-full h-[80vh] my-auto p-4"
    >
      {/* Array - Window */}
      <div className="flex flex-col max-w-4xl  p-2 overflow-auto scroll-container  ">
        {/* Input Field */}
        {renderArray(startArray, (value: number, j: number) => (
          <input
            type="number"
            className="w-full h-full placeholder:text-black text-center"
            value={value}
            placeholder="0"
            disabled={totalHistory.length > 0}
            onChange={(e) => {
              const newArray = startArray.slice();
              var newValue = parseInt(e.target.value) || 0;
              newArray[j] = newValue;
              setStartArray(newArray);
            }}
          />
        ))}

        {/* Step by Step Solution */}
        {renderHistory(
          currentHistory,
          currentSortingElement,
          (value: number) => (
            <div className="w-full h-full flex items-center justify-center">
              <span>{value}</span>
            </div>
          )
        )}
      </div>

      {/* Input Windows */}
      <div className="flex flex-col justify-around w-3/12">
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

          <div className="flex justify-between items-center">
            <div className="flex my-4">
              <button
                className="mx-4"
                onClick={() => setInAutoMode(!inAutoMode)}
              >
                <h1>{inAutoMode ? "pause" : "run"}</h1>
              </button>
              <button className="mx-4" onClick={() => performStep()}>
                <h1>step</h1>
              </button>
              <button className="mx-4" onClick={() => undoStep()}>
                <h1>back</h1>
              </button>
            </div>
            <div className="flex my-4">
              <button className="mx-4 " onClick={() => resetHistory()}>
                <h1>clear</h1>
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="dark:text-white text-2xl sm:text-4xl my-4 ">
            Settings
          </h1>
          <div className="bg-white p-4 rounded-md shadow-lg flex flex-col font-semibold">
            <span>
              <label htmlFor="array-length" className=" mr-4">
                Array Length:
              </label>
              <input
                id="array-length"
                type="number"
                className=" h-full placeholder:text-black text-center"
                value={arrayLength.toString()}
                placeholder="0"
                onChange={(e) => {
                  var value = parseInt(e.target.value);
                  if (value < 0) value = 0;
                  if (value > 256) value = 256;
                  setArrayLength(value);
                  setStartArray(createArray(value, "random"));
                  resetHistory();
                }}
              />
            </span>
            <span>
              <label htmlFor="buttons" className="mr-4">
                Array Types:
              </label>
              <div
                id="buttons"
                className="flex flex-wrap justify-around items-center mt-1 "
              >
                <button
                  className=" bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-1 px-2 rounded"
                  onClick={() => {
                    setStartArray(createArray(arrayLength, "random"));
                  }}
                >
                  Random
                </button>
                <button
                  className=" bg-green-600 hover:bg-green-700 text-white font-bold m-1 py-1 px-2 rounded"
                  onClick={() => {
                    setStartArray(createArray(arrayLength, "ascending"));
                  }}
                >
                  Ascending
                </button>
                <button
                  className=" bg-rose-500 hover:bg-rose-600 text-white font-bold m-1 py-1 px-2 rounded"
                  onClick={() => {
                    setStartArray(createArray(arrayLength, "descending"));
                  }}
                >
                  Descending
                </button>
              </div>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
