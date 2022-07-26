import { motion } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/Steps/SortingStep";
import { noPopUp, popUp } from "../../util/Transitions";

export default function ArrayStep({
  step,
  stepNum,
  totalSteps,
  currentElementRef,
  animationActivated,
}: {
  step: SortingStep;
  stepNum: number;
  totalSteps: number;
  currentElementRef: React.RefObject<HTMLHeadingElement>;
  animationActivated: boolean;
}) {
  return (
    <div className="flex">
      {step.array.map((value: number, i: number) => {
        let isBeingCompared = step.comparing?.includes(i);
        let isBeingSwapped = step.swapping?.includes(i);
        let isCurrentIndex = step.currentIndex === i;
        let isLocked = step.locked?.[i];
        let isHighlighted = step.highlightedIndex === i;
        let isHiddened = step.hidden?.includes(i);

        return (
          <motion.div
            key={"entry-" + stepNum + "-" + i}
            variants={animationActivated ? popUp : noPopUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={
              isCurrentIndex && stepNum === totalSteps - 1
                ? currentElementRef
                : null
            }
            className={
              "w-10 h-12 sm:w-12 md:w-16 border-2 bg-white mt-1" +
              (isCurrentIndex ? " border-red-400 border-4 rounded-sm " : " ") +
              (isBeingCompared ? " bg-yellow-500 rounded-md " : "") +
              (isBeingSwapped ? " bg-blue-400 rounded-md " : "") +
              (isLocked ? " bg-green-400 " : "") +
              (isHighlighted ? " bg-purple-400 rounded-md " : "")
            }
          >
            <div className="w-full h-full flex items-center justify-center">
              <span>{isHiddened ? "" : value}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
