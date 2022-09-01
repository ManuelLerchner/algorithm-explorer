import { motion } from "framer-motion";
import React from "react";
import { SortingStep } from "../../model/SortingStep";
import { noPopUp, popUp } from "../../transitions";

export default function ArrayStep({
  step,
  totalSteps,
  currentElementRef,
  animationActivated,
}: {
  step: SortingStep;
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

        return (
          <motion.div
            key={"entry-" + step.stepNum + "-" + i}
            variants={animationActivated ? popUp : noPopUp}
            initial="hidden"
            animate="visible"
            exit="exit"
            ref={
              isCurrentIndex && step.stepNum === totalSteps - 1
                ? currentElementRef
                : null
            }
            className={
              "w-10 h-12 sm:w-12 md:w-16 border-2 bg-white mt-1" +
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
