import React from "react";

export default function InputArray({
  array,
  isLocked,
  setArray,
}: {
  array: number[];
  isLocked: boolean;
  setArray: React.Dispatch<React.SetStateAction<number[]>>;
}) {
  return (
    <div className="flex w-max justify-center mx-auto items-center">
      {array.map((value: number, j: number) => (
        <div
          className={
            "w-8 h-10 sm:h-12 sm:w-16 border-2" +
            (isLocked ? " bg-gray-400" : " bg-white ")
          }
          key={"entry-" + j}
        >
          <input
            type="number"
            className={"w-full h-full placeholder:text-black text-center"}
            value={value}
            placeholder="0"
            disabled={isLocked}
            onChange={(e) => {
              const newArray = array.slice();
              var newValue = parseInt(e.target.value) || 0;
              newArray[j] = newValue;
              setArray(newArray);
            }}
          />
        </div>
      ))}
    </div>
  );
}
