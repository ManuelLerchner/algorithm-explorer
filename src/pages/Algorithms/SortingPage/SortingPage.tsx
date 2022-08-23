import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { SortingStep } from "../../../model/SortingStep";
import { shiftIn } from "../../transitionProperties";
import { createArray } from "./ArrayHelper";
import { renderHistory, renderInputArrayField } from "./ArrayVisualization";

export default function SortingPage({
  algorithmName,
  algorithm,
}: {
  algorithmName: string;
  algorithm: (A: number[]) => IterableIterator<SortingStep>;
}) {
  const currentSortingElement = useRef<HTMLHeadingElement>(null);
  const [arrayLength, setArrayLength] = useState(10);
  const [startArray, setStartArray] = useState<number[]>([]);
  const [totalHistory, setTotalHistory] = useState<SortingStep[]>([]);
  const [currentHistory, setCurrentHistory] = useState<SortingStep[]>([]);
  const [inAutoMode, setInAutoMode] = useState(false);

  const stepIterator = useMemo(
    () => algorithm([...startArray]),
    [startArray, algorithm]
  );

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
      block: "start",
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
      className="flex flex-col-reverse justify-around md:flex-row md:items-start items-center w-full h-[95vh] md:h-[80vh] md:my-auto p-4"
    >
      {/* Array - Window */}
      <div className="flex flex-col w-11/12 md:max-w-4xl md:mr-4 overflow-auto scroll-container h-full">
        {/* Input Field */}
        {renderInputArrayField(
          startArray,
          totalHistory,
          startArray,
          setStartArray
        )}

        {/* Step by Step Solution */}
        {renderHistory(currentHistory, currentSortingElement)}
      </div>

      {/* Input Windows */}
      <div className="flex flex-col justify-around w-10/12 sm:w-8/12 md:w-3/12 mb-12">
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
