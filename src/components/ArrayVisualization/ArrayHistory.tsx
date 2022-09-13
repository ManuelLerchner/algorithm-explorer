import { AnimatePresence } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/Steps/SortingStep";
import ArrayStep from "./ArrayStep";

export default function ArrayHistory({
  steps,
  currentElementRef,
  animationActivated,
}: {
  steps: SortingStep[];
  currentElementRef: React.RefObject<HTMLHeadingElement>;
  animationActivated: boolean;
}) {
  return (
    <div className="flex flex-col w-max mx-auto">
      <AnimatePresence>
        {steps.map((sortingStep, stepNum) => (
          <ArrayStep
            key={"historyStep-" + stepNum}
            step={sortingStep}
            stepNum={stepNum}
            totalSteps={steps.length}
            currentElementRef={currentElementRef}
            animationActivated={animationActivated}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
