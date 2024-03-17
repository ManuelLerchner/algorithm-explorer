import React from "react";

export default function InputArray<T>({
  array,
  isLocked,
  setArray,
}: {
  array: T[];
  isLocked: boolean;
  setArray: React.Dispatch<React.SetStateAction<T[]>>;
}) {
  return (
    <div className="flex w-max justify-center mx-auto items-center">
      {array.map((value: T, j: number) => (
        <div
          className={
            "w-10 h-12 sm:w-12 md:w-16 border-2" +
            (isLocked ? " bg-gray-400" : " bg-white ")
          }
          key={"entry-" + j}
        >
          <input
            type="number"
            className={"w-full h-full placeholder:text-black text-center"}
            value={value as unknown as string}
            placeholder="0"
            disabled={isLocked}
            onChange={(e) => {
              const newArray = array.slice();
              var newValue = parseInt(e.target.value) || 0;
              newArray[j] = newValue as unknown as T;
              setArray(newArray);
            }}
          />
        </div>
      ))}
    </div>
  );
}
