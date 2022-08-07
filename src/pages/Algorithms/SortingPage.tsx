import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { bubbleSort } from "../../algorithms/sorting/BubbleSort";
import { mapUrlToBreadcrumbs } from "../../components/BreadcrumbHelper";
import { SortingStep } from "../../model/SortingStep";

function renderHistory(steps: SortingStep[]) {
  return (
    <>
      {steps.map((sortingStep, i) => (
        <div key={"history-" + i}>{renderArray(sortingStep.array)}</div>
      ))}
    </>
  );
}

function renderArray(array: number[]) {
  return (
    <div
      className="grid gap-0 grid-cols-10  justify-center items-center my-2"
      key={"" + array}
    >
      {array.map((value: number, j: number) => (
        <div
          key={"entry-" + j}
          className="aspect-square bg-white  max-w-16 max-h-16 flex items-center justify-center border "
        >
          <div>
            <span>{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function SortingPage() {
  const location = useLocation();
  const breadcrumbs = mapUrlToBreadcrumbs(location.pathname);
  const algorithmName = breadcrumbs[breadcrumbs.length - 1].name;

  const arrayLength = 10;

  function reset() {
    setStartArray(randomizeArray());
    setHistory([]);
  }

  const randomizeArray = () => {
    return Array.from({ length: arrayLength }, () =>
      Math.floor(Math.random() * 100)
    );
  };

  const [startArray, setStartArray] = useState(randomizeArray());
  const [history, setHistory] = useState<SortingStep[]>([]);

  function performStep(iterator: IterableIterator<SortingStep>) {
    const step = iterator.next();
    console.log(step);
    if (step.done) {
      return;
    }
    setHistory([...history, step.value]);
  }

  const stepIterator = useMemo(() => bubbleSort(startArray), [startArray]);

  return (
    <div className="flex flex-col-reverse justify-around items-center sm:flex-row m-auto w-full">
      <div className="w-11/12 sm:w-7/12 m-4 ">
        {/* Input Field */}
        <div className="flex  flex-row my-2  justify-center">
          {startArray.map((value: number, j: number) => (
            <input
              key={"entry-" + j}
              className=" bg-white  w-16 h-16 flex items-center justify-center border  text-center  placeholder:text-black "
              type="number"
              value={value}
              placeholder="0"
              disabled={history.length > 0}
              onChange={(e) => {
                const newArray = startArray.slice();
                var newValue = parseInt(e.target.value) || 0;
                newArray[j] = newValue;
                setStartArray(newArray);
              }}
            ></input>
          ))}
        </div>

        {/* Step by Step Solution */}
        {renderHistory(history)}
      </div>

      <div className="w-8/12 sm:w-4/12 m-4 self-end my-64">
        <h1 className="dark:text-white text-2xl sm:text-4xl my-4">
          {algorithmName}
        </h1>

        <div className="bg-white p-4 rounded-md shadow-lg">
          <p>code</p>
          <p>code</p>
          <p>code</p>
          <p>code</p>
          <p>code</p>

          <p>code</p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex my-4">
            <button className="mx-4">
              <h1>run</h1>
            </button>
            <button className="mx-4" onClick={() => performStep(stepIterator)}>
              <h1>step</h1>
            </button>
            <button className="mx-4">
              <h1>back</h1>
            </button>
          </div>
          <div className="flex my-4">
            <button className="mx-4 " onClick={reset}>
              <h1>reset</h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
