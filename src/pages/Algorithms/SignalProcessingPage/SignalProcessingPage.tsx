import * as math from "mathjs";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import FFTRecursiveStack from "../../../components/ArrayVisualization/FFTRecursiveStack";
import InputArray from "../../../components/ArrayVisualization/InputArray";
import AlgoPageLayout from "../../../components/Layout/AlgoPageLayout";
import StepController from "../../../components/StepController/StepController";
import { useInterval } from "../../../hooks/useInterval";
import { ArrayType } from "../../../model/CustomPresetTypes";
import { FFTStep } from "../../../model/Steps/FFTStep";
import { createArray } from "../../../util/ArrayCreator";
import SignalProcessingSettings from "./SignalProcessingSettings";

export default function SignalProcessingPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (A: math.Complex[]) => IterableIterator<FFTStep>;
  pseudoCode: string[];
}) {
  const [numberArray, setNumberArray] = useState<math.Complex[]>([]);
  const [totalHistory, setTotalHistory] = useState<FFTStep[]>([]);
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
    setNumberArray(
      createArray(arrayLength, arrayType).map((x) => math.complex(x))
    );
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
    reset("random", 8);
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
      currentStep={
        currentHistoryLength < totalHistory.length
          ? [...totalHistory][currentHistoryLength]
          : [...totalHistory][totalHistory.length - 1]
      }
      MainContent={
        <>
          <InputArray
            array={numberArray}
            isLocked={totalHistory.length > 0}
            setArray={setNumberArray}
          />
          {totalHistory.length > 0 && (
            <FFTRecursiveStack
              step={
                currentHistoryLength < totalHistory.length
                  ? [...totalHistory][currentHistoryLength]
                  : [...totalHistory][totalHistory.length - 1]
              }
              currentElementRef={currentSortingElement}
              animationActivated={animationActivated}
            />
          )}
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
        <SignalProcessingSettings
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
