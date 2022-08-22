import { SortingStep } from "../../model/SortingStep";

export function renderHistory(
  steps: SortingStep[],
  amount: number,
  currentElementRef: React.RefObject<HTMLHeadingElement>,
  contentBox: (value: number, j: number) => JSX.Element
) {
  return (
    <>
      {steps
        .filter((_, i) => i < amount)
        .map((sortingStep, i) => (
          <div key={"history-" + i}>
            {renderStep(sortingStep, currentElementRef, contentBox)}
          </div>
        ))}
    </>
  );
}

export function renderStep(
  step: SortingStep,
  currentElementRef: React.RefObject<HTMLHeadingElement>,
  contentBox: (value: number, j: number) => JSX.Element
) {
  console.log(step.array.length);
  return (
    <div className="flex my-1">
      {step.array.map((value: number, j: number) => {
        let isBeingCompared = step.comparing?.includes(j);
        let isBeingSwapped = step.swapping?.includes(j);
        let isCurrentIndex = step.currentIndex === j;
        let isLocked = step.locked?.[j];

        return (
          <div
            ref={isCurrentIndex ? currentElementRef : null}
            className={
              "aspect-square w-10 h-10 md:w-12 md:h-12 lg:w-16 border-2 bg-white" +
              (isCurrentIndex ? " border-red-400 " : " ") +
              (isBeingCompared ? " bg-yellow-500 rounded-md " : "") +
              (isBeingSwapped ? " bg-blue-400 rounded-md " : "") +
              (isLocked ? " bg-green-400 " : "")
            }
            key={"entry-" + j}
          >
            {contentBox(value, j)}
          </div>
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
