import React from "react";
import { createArray } from "./ArrayHelper";

export default function GeneralSortingSettings({
  arrayLength,
  setArrayLength,
  setStartArray,
  resetHistory,
}: {
  arrayLength: number;
  setArrayLength: React.Dispatch<React.SetStateAction<number>>;
  setStartArray: React.Dispatch<React.SetStateAction<number[]>>;
  resetHistory: () => void;
}) {
  return (
    <div>
      <h1 className="dark:text-white text-2xl sm:text-4xl my-4 ">Settings</h1>
      <div className="bg-white p-4 rounded-md shadow-lg flex flex-col font-semibold">
        <span>
          <label htmlFor="array-length" className=" mr-4">
            Array Length:
          </label>
          <input
            id="array-length"
            type="number"
            className=" h-full placeholder:text-black text-center"
            value={arrayLength.toString()}
            placeholder="0"
            onChange={(e) => {
              var value = parseInt(e.target.value);
              if (value < 0) value = 0;
              if (value > 256) value = 256;
              setArrayLength(value);
              setStartArray(createArray(value, "random"));
              resetHistory();
            }}
          />
        </span>
        <span>
          <label htmlFor="buttons" className="mr-4">
            Array Types:
          </label>
          <div
            id="buttons"
            className="flex flex-wrap justify-around items-center mt-1 "
          >
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold m-1 py-1 px-2 rounded"
              onClick={() => {
                setStartArray(createArray(arrayLength, "random"));
              }}
            >
              Random
            </button>
            <button
              className=" bg-green-600 hover:bg-green-700 text-white font-bold m-1 py-1 px-2 rounded"
              onClick={() => {
                setStartArray(createArray(arrayLength, "ascending"));
              }}
            >
              Ascending
            </button>
            <button
              className=" bg-rose-500 hover:bg-rose-600 text-white font-bold m-1 py-1 px-2 rounded"
              onClick={() => {
                setStartArray(createArray(arrayLength, "descending"));
              }}
            >
              Descending
            </button>
          </div>
        </span>
      </div>
    </div>
  );
}
