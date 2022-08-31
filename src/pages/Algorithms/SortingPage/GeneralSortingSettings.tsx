import { Slider, Stack } from "@mui/material";
import React from "react";
import { createArray } from "./ArrayHelper";

import { ReactComponent as Slow } from "../../../assets/slow.svg";
import { ReactComponent as Fast } from "../../../assets/fast.svg";

export default function GeneralSortingSettings({
  arrayLength,
  setArrayLength,
  setStartArray,
  reset,
  setAnimationSpeed,
  setInAutoMode,
  setArrayType,
}: {
  arrayLength: number;
  setArrayLength: React.Dispatch<React.SetStateAction<number>>;
  setStartArray: React.Dispatch<React.SetStateAction<number[]>>;
  reset: () => void;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  setInAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  setArrayType: React.Dispatch<
    React.SetStateAction<"random" | "ascending" | "descending">
  >;
}) {
  return (
    <div>
      <h1 className="dark:text-white text-2xl sm:text-4xl my-4 ">Settings</h1>
      <div className="bg-white p-4 rounded-md shadow-lg flex flex-col font-semibold">
        <section className="mb-2">
          <label htmlFor="array-length" className=" mr-4">
            Array Length:
          </label>
          <input
            id="array-length"
            type="number"
            min="0"
            max="16"
            className="placeholder:text-black text-center w-8/12"
            value={arrayLength.toString()}
            placeholder="0"
            onChange={(e) => {
              try {
                var value = parseInt(e.target.value);
                console.log(value);
                if (value < 1) value = 1;
                if (value > 16) value = 16;
                setArrayLength(value);
                setStartArray(createArray(value, "random"));
                setInAutoMode(false);
                reset();
              } catch (e) {
                console.log(e);
              }
            }}
          />
        </section>
        <section className="mb-2">
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
                setArrayType("random");
                setInAutoMode(false);
                reset();
              }}
            >
              Random
            </button>
            <button
              className=" bg-green-600 hover:bg-green-700 text-white font-bold m-1 py-1 px-2 rounded"
              onClick={() => {
                setArrayType("ascending");
                setInAutoMode(false);
                reset();
              }}
            >
              Ascending
            </button>
            <button
              className=" bg-rose-500 hover:bg-rose-600 text-white font-bold m-1 py-1 px-2 rounded"
              onClick={() => {
                setArrayType("descending");
                setInAutoMode(false);
                reset();
              }}
            >
              Descending
            </button>
          </div>
        </section>
        <section className="mb-2">
          <label htmlFor="animation" className="mr-4">
            Animation Speed:
          </label>
          <Stack id="animation" spacing={2} direction="row" alignItems="center">
            <Slow className="w-16 h-16" />
            <Slider
              size="medium"
              min={1}
              max={10}
              defaultValue={7}
              valueLabelDisplay="auto"
              onChange={(_, value) => {
                if (typeof value === "number") {
                  setAnimationSpeed(10 - value + 1);
                }
              }}
            />
            <Fast className="w-16 h-16" />
          </Stack>
        </section>
      </div>
    </div>
  );
}
