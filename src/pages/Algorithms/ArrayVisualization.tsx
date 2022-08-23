import { AnimatePresence, motion } from "framer-motion";
import { SortingStep } from "../../model/SortingStep";
import { popUp, shiftIn } from "../transitionProperties";

export function renderHistory(
  steps: SortingStep[],
  currentElementRef: React.RefObject<HTMLHeadingElement>,
  contentBox: (value: number, j: number) => JSX.Element
) {
  return (
    <AnimatePresence>
      {steps.map((sortingStep) => (
        <div
          key={"historyStep-" + sortingStep.stepNum}
          className="flex flex-col justify-center items-center"
        >
          {renderStep(sortingStep, steps.length, currentElementRef, contentBox)}
        </div>
      ))}
    </AnimatePresence>
  );
}

export function renderStep(
  step: SortingStep,
  totalSteps: number,
  currentElementRef: React.RefObject<HTMLHeadingElement>,
  contentBox: (value: number, j: number) => JSX.Element
) {
  return (
    <div className="flex my-1">
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
              "aspect-square w-10 h-10 md:w-12 md:h-12 lg:w-16 border-2 bg-white" +
              (isCurrentIndex ? " border-red-400 " : " ") +
              (isBeingCompared ? " bg-yellow-500 rounded-md " : "") +
              (isBeingSwapped ? " bg-blue-400 rounded-md " : "") +
              (isLocked ? " bg-green-400 " : "")
            }
          >
            {contentBox(value, i)}
          </motion.div>
        );
      })}
    </div>
  );
}

export function renderArray(
  array: number[],
  contentBox: (value: number, j: number) => JSX.Element
) {
  return (
    <div className="flex my-1">
      {array.map((value: number, j: number) => (
        <div
          className="aspect-square bg-white w-10 h-10 md:w-12 md:h-12 lg:w-16 border-2 "
          key={"entry-" + j}
        >
          {contentBox(value, j)}
        </div>
      ))}
    </div>
  );
}
