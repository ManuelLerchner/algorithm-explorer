import { motion } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/SortingStep";
import { popUp } from "../../pages/transitionProperties";

export default function ArrayStep({
  step,
  totalSteps,
  currentElementRef,
}: {
  step: SortingStep;
  totalSteps: number;
  currentElementRef: React.RefObject<HTMLHeadingElement>;
}) {
  return (
    <div className="flex">
      {step.array.map((value: number, i: number) => {
        let isBeingCompared = step.comparing?.includes(i);
        let isBeingSwapped = step.swapping?.includes(i);
        let isCurrentIndex = step.currentIndex === i;
        let isLocked = step.locked?.[i];

        return (
          <motion.div
            key={"entry-" + step.stepNum + "-" + i}
            variants={popUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={
              isCurrentIndex && step.stepNum === totalSteps - 1
                ? currentElementRef
                : null
            }
            className={
              "h-12 w-16 border-2 bg-white mt-1" +
              (isCurrentIndex ? " border-red-400 " : " ") +
              (isBeingCompared ? " bg-yellow-500 rounded-md " : "") +
              (isBeingSwapped ? " bg-blue-400 rounded-md " : "") +
              (isLocked ? " bg-green-400 " : "")
            }
          >
            <div className="w-full h-full flex items-center justify-center">
              <span>{value}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
