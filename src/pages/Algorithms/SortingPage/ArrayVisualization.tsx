import { AnimatePresence, motion } from "framer-motion";
import { SortingStep } from "../../../model/SortingStep";
import { popUp } from "../../transitionProperties";

export function renderInputArrayField(
  array: number[],
  totalHistory: SortingStep[],
  startArray: number[],
  setStartArray: React.Dispatch<React.SetStateAction<number[]>>
) {
  return (
    <div className="flex justify-center">
      {array.map((value: number, j: number) => (
        <div
          className={
            "h-10 sm:h-12 w-16 border-2" +
            (totalHistory.length > 0 ? " bg-gray-400" : " bg-white ")
          }
          key={"entry-" + j}
        >
          <input
            type="number"
            className={"w-full h-full placeholder:text-black text-center"}
            value={value}
            placeholder="0"
            disabled={totalHistory.length > 0}
            onChange={(e) => {
              const newArray = startArray.slice();
              var newValue = parseInt(e.target.value) || 0;
              newArray[j] = newValue;
              setStartArray(newArray);
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function renderHistory(
  steps: SortingStep[],
  currentElementRef: React.RefObject<HTMLHeadingElement>
) {
  return (
    <AnimatePresence>
      {steps.map((sortingStep) => (
        <div
          key={"historyStep-" + sortingStep.stepNum}
          className="flex flex-col justify-center"
        >
          {renderStep(sortingStep, steps.length, currentElementRef)}
        </div>
      ))}
    </AnimatePresence>
  );
}

function renderStep(
  step: SortingStep,
  totalSteps: number,
  currentElementRef: React.RefObject<HTMLHeadingElement>
) {
  return (
    <div className="flex justify-center">
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
