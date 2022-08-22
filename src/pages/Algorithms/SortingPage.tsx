import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { bubbleSort } from "../../algorithms/sorting/BubbleSort";
import { mapUrlToBreadcrumbs } from "../../components/BreadcrumbHelper";
import { SortingStep } from "../../model/SortingStep";
import { pageVariant } from "../transitionProperties";
import { renderHistory, renderArray } from "./ArrayVisualization";
import { scroller } from "react-scroll";
var Scroll = require("react-scroll");

const randomizeArray = () => {
  const arrayLength = 30;
  return Array.from({ length: arrayLength }, (v, i: number) =>
    Math.floor(Math.random() * 100)
  );
};

export default function SortingPage() {
  const location = useLocation();
  const breadcrumbs = mapUrlToBreadcrumbs(location.pathname);
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

  function reset() {
    setStartArray(randomizeArray());
    setHistory([]);
    setHistoryIndex(0);
  }
  const currentElementRef = useRef<HTMLHeadingElement>(null);

  function performStep() {
    if (historyIndex >= history.length) {
      const step = stepIterator.next();
      if (step.done) {
        return;
      }
      setHistory([...history, step.value]);
    }
    setHistoryIndex(historyIndex + 1);

    setTimeout(() => {
      currentElementRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }, 5);
  }

  function undoStep() {
    setHistoryIndex(historyIndex - 1);
  }

  const [startArray, setStartArray] = useState(randomizeArray());
  const [history, setHistory] = useState<SortingStep[]>([]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [inAutoMode, setInAutoMode] = useState(false);
  const [autoInterval, setAutoInterval] = useState<NodeJS.Timer | null>(null);
  const stepIterator = useMemo(() => bubbleSort([...startArray]), [startArray]);

  useEffect(() => {
    console.log(inAutoMode);
    if (inAutoMode) {
      const intervallId = setTimeout(() => {
        performStep();
      }, 1000);
      setAutoInterval(intervallId);
    } else {
      clearTimeout(autoInterval ?? 0);
    }
  }, [inAutoMode, historyIndex]);

  return (
    <motion.div
      key="sorting-page"
      variants={pageVariant}
      initial="hidden"
      animate="visible"
      exit="exit"
      id="container"
      className="flex flex-col-reverse justify-around md:flex-row w-full h-[80vh] my-auto"
    >
      <div className="flex flex-col m-4 p-2 overflow-auto scroll-container">
        {/* Input Field */}
        {renderArray(startArray, (value: number, j: number) => (
          <input
            type="number"
            className="w-full h-full placeholder:text-black text-center"
            value={value}
            placeholder="0"
            disabled={history.length > 0}
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
          history,
          historyIndex,
          currentElementRef,
          (value: number) => (
            <div className="w-full h-full flex items-center justify-center">
              <span>{value}</span>
            </div>
          )
        )}
      </div>

      <div className="md:w-4/12 w-8/12 m-4 self-center ">
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
            <button className="mx-4" onClick={() => setInAutoMode(!inAutoMode)}>
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
            <button className="mx-4 " onClick={reset}>
              <h1>reset</h1>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
