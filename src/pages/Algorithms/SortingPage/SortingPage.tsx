import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import AlgorithmController from "../../../components/AlgorithmController/AlgorithmController";
import ArrayHistory from "../../../components/ArrayVisualization/ArrayHistory";
import InputArray from "../../../components/ArrayVisualization/InputArray";

import { SortingStep } from "../../../model/SortingStep";
import { shiftIn } from "../../transitionProperties";
import { createArray } from "./ArrayHelper";
import GeneralSortingSettings from "./GeneralSortingSettings";

export default function SortingPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (A: number[]) => IterableIterator<SortingStep>;
  pseudoCode: string[];
}) {
  const currentSortingElement = useRef<HTMLHeadingElement>(null);
  const [arrayLength, setArrayLength] = useState(10);
  const [startArray, setStartArray] = useState<number[]>([]);
  const [totalHistory, setTotalHistory] = useState<SortingStep[]>([]);
  const [currentHistory, setCurrentHistory] = useState<SortingStep[]>([]);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [arrayType, setArrayType] = useState<
    "random" | "ascending" | "descending"
  >("random");
  const [inAutoMode, setInAutoMode] = useState(false);
  const [animationActivated, setAnimationActivated] = useState(true);

  const stepIterator = useMemo(
    () => algorithm([...startArray]),
    [startArray, algorithm]
  );

  // Initializes the start-array using random ordering
  useEffect(() => {
    setStartArray(createArray(arrayLength, arrayType));
  }, [arrayLength, arrayType]);

  /**
   * Resets the History-View
   */
  function reset() {
    setTotalHistory([]);
    setCurrentHistory([]);
    setInAutoMode(false);
    setStartArray(createArray(arrayLength, arrayType));
  }

  /**
   * Performs a single step of the Sorting-Calculation
   */
  const performStep = useCallback(() => {
    if (currentHistory.length >= totalHistory.length) {
      const step = stepIterator.next();
      if (step.done) {
        setInAutoMode(false);
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
    const newLength = currentHistory.length - 1;

    if (newLength >= 0) {
      const newHistory = totalHistory.slice(0, newLength);
      setCurrentHistory(newHistory);
      setInAutoMode(false);
    }
  }

  // Scrolls to the currently evaluated array element after a step
  useEffect(() => {
    currentSortingElement.current?.scrollIntoView({
      behavior: animationSpeed < 5 ? "smooth" : "auto",
      block: "start",
      inline: "center",
    });
  }, [currentHistory, animationSpeed]);

  // Runs the "performStep" loop when "auto-mode" is enabled
  useEffect(() => {
    if (inAutoMode) {
      let ms = 5000 / Math.pow(animationSpeed, 2);

      let timer = setTimeout(() => {
        if (inAutoMode) {
          performStep();
        }
      }, ms);
      return () => clearTimeout(timer);
    }
  }, [inAutoMode, performStep, animationSpeed]);

  // Performs initial sorting when the auto-mode is enabled
  useEffect(() => {
    if (inAutoMode) {
      performStep();
    }
    // eslint-disable-next-line
  }, [inAutoMode]);

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
      <div className="flex flex-col w-11/12 md:max-w-4xl md:mr-4 overflow-auto scroll-container h-full">
        <InputArray
          array={startArray}
          isLocked={totalHistory.length > 0}
          setArray={setStartArray}
        />

        <ArrayHistory
          steps={currentHistory}
          currentElementRef={currentSortingElement}
          animationActivated={animationActivated}
        />
      </div>

      <div className="flex flex-col w-10/12 sm:w-8/12 md:w-3/12 mb-12 justify-around">
        <AlgorithmController
          algorithmName={algorithmName}
          inAutoMode={inAutoMode}
          setInAutoMode={setInAutoMode}
          reset={reset}
          performStep={performStep}
          currentStep={currentHistory[currentHistory.length - 1]}
          undoStep={undoStep}
          pseudoCode={pseudoCode}
        />

        <GeneralSortingSettings
          arrayLength={arrayLength}
          setArrayLength={setArrayLength}
          setStartArray={setStartArray}
          reset={reset}
          setAnimationSpeed={setAnimationSpeed}
          setInAutoMode={setInAutoMode}
          setArrayType={setArrayType}
          animationActivated={animationActivated}
          setAnimationActivated={setAnimationActivated}
        />
      </div>
    </motion.div>
  );
}
