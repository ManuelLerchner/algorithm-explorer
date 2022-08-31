import { AnimatePresence } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/SortingStep";
import ArrayStep from "./ArrayStep";

export default function ArrayHistory({
  steps,
  currentElementRef,
}: {
  steps: SortingStep[];
  currentElementRef: React.RefObject<HTMLHeadingElement>;
}) {
  return (
    <div className="flex flex-col w-max mx-auto">
      <AnimatePresence>
        {steps.map((sortingStep) => (
          <ArrayStep
            key={"historyStep-" + sortingStep.stepNum}
            step={sortingStep}
            totalSteps={steps.length}
            currentElementRef={currentElementRef}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
