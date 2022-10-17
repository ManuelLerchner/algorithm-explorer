import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ArrayHistory from "../../../components/ArrayVisualization/ArrayHistory";
import InputArray from "../../../components/ArrayVisualization/InputArray";
import AlgoPageLayout from "../../../components/Layout/AlgoPageLayout";
import StepController from "../../../components/StepController/StepController";
import { useInterval } from "../../../hooks/useInterval";
import { ArrayType } from "../../../model/CustomPresetTypes";
import { SortingStep } from "../../../model/Steps/SortingStep";
import { createArray } from "../../../util/ArrayCreator";
import SortingSettings from "./SortingSettings";

export default function SortingPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (A: number[]) => IterableIterator<SortingStep>;
  pseudoCode: string[];
}) {
  const [numberArray, setNumberArray] = useState<number[]>([]);
  const [totalHistory, setTotalHistory] = useState<SortingStep[]>([]);
  const [currentHistoryLength, setCurrentHistoryLength] = useState(0);
  const [animationSpeed, setAnimationSpeed] = useState(3);
  const [inAutoMode, setInAutoMode] = useState(false);
  const [animationActivated, setAnimationActivated] = useState(true);
  const currentSortingElement = useRef<HTMLHeadingElement>(null);

  // Create a Iterartor for the algorithm
  const stepIterator = useMemo(
    () => algorithm([...numberArray]),
    [numberArray, algorithm]
  );

  // Reset-Function
  const reset = useCallback((arrayType: ArrayType, arrayLength: number) => {
    setAnimationActivated(false);
    setTotalHistory([]);
    setCurrentHistoryLength(0);
    setInAutoMode(false);
    setNumberArray(createArray(arrayLength, arrayType));
  }, []);

  // PerformStep-Function
  const performStep = useCallback(() => {
    if (currentHistoryLength >= totalHistory.length) {
      const step = stepIterator.next();
      if (step.done) {
        setInAutoMode(false);
      } else {
        setTotalHistory([...totalHistory, step.value]);
      }
    }
    setCurrentHistoryLength(currentHistoryLength + 1);
  }, [totalHistory, stepIterator, currentHistoryLength]);

  // UndoStep-Function
  const undoStep = useCallback(() => {
    const newLength = currentHistoryLength - 1;
    if (newLength >= 0) {
      setCurrentHistoryLength(newLength);
      setInAutoMode(false);
    }
  }, [currentHistoryLength]);

  // Initializes the start-array using random ordering
  useEffect(() => {
    reset("random", 10);
  }, [reset]);

  // Scrolls to the currently evaluated array element after a step
  useEffect(() => {
    currentSortingElement.current?.scrollIntoView({
      behavior: animationSpeed >= 5 ? "auto" : "smooth",
      block: "start",
      inline: "center",
    });
  }, [currentHistoryLength, animationSpeed]);

  //Deactivate animation if to fast
  useEffect(() => {
    if (animationSpeed >= 5) {
      setAnimationActivated(false);
    } else {
      setAnimationActivated(true);
    }
  }, [animationSpeed]);

  // Runs the "performStep" loop when "auto-mode" is enabled
  useInterval(() => {
    if (inAutoMode) {
      performStep();
    }
  }, 5000 / Math.pow(animationSpeed, 2));

  return (
    <AlgoPageLayout
      algorithmName={algorithmName}
      pseudoCode={pseudoCode}
      currentStep={totalHistory[currentHistoryLength - 1]}
      MainContent={
        <>
          <InputArray
            array={numberArray}
            isLocked={totalHistory.length > 0}
            setArray={setNumberArray}
          />
          <ArrayHistory
            steps={totalHistory.slice(0, currentHistoryLength)}
            currentElementRef={currentSortingElement}
            animationActivated={animationActivated}
          />
        </>
      }
      Controller={
        <StepController
          inAutoMode={inAutoMode}
          setInAutoMode={setInAutoMode}
          reset={reset}
          performStep={performStep}
          undoStep={undoStep}
        />
      }
      GeneralSettings={
        <SortingSettings
          arrayLength={numberArray.length}
          reset={reset}
          setAnimationSpeed={setAnimationSpeed}
          animationActivated={animationActivated}
          setAnimationActivated={setAnimationActivated}
        />
      }
    />
  );
}
