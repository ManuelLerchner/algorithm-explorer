import { Slider, Stack } from "@mui/material";
import React from "react";
import { createArray } from "../../../util/ArrayCreator";

import { ReactComponent as Slow } from "../../../assets/slow.svg";
import { ReactComponent as Fast } from "../../../assets/fast.svg";
import { ArrayType } from "../../../model/CustomPresetTypes";

export default function SortingSettings({
  arrayLength,
  setArrayLength,
  setStartArray,
  reset,
  setAnimationSpeed,
  setInAutoMode,
  setArrayType,
  animationActivated,
  setAnimationActivated,
}: {
  arrayLength: number;
  setArrayLength: React.Dispatch<React.SetStateAction<number>>;
  setStartArray: React.Dispatch<React.SetStateAction<number[]>>;
  reset: () => void;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  setInAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  setArrayType: React.Dispatch<React.SetStateAction<ArrayType>>;
  animationActivated: boolean;
  setAnimationActivated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <h1 className="dark:text-white text-2xl sm:text-4xl my-4 ">Settings</h1>
      <div className="bg-white p-4 rounded-md shadow-lg flex flex-col">
        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
          <label className="font-semibold">Array Length:</label>
          <input
            type="number"
            min="0"
            max="16"
            className="placeholder:text-black text-center"
            value={arrayLength.toString()}
            placeholder="0"
            onChange={(e) => {
              try {
                var value = parseInt(e.target.value);

                if (value < 1) value = 1;
                if (value > 16) value = 16;
                setArrayLength(value);
                setStartArray(createArray(value, "random"));
                setInAutoMode(false);
                reset();
              } catch (_) {}
            }}
          />

          <label className="font-semibold">Array Type:</label>
          <div className="flex flex-wrap justify-between items-center">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-1 px-2 rounded text-sm"
              onClick={() => {
                setArrayType("random");
                setInAutoMode(false);
                reset();
              }}
            >
              Random
            </button>
            <button
              className=" bg-green-600 hover:bg-green-700 text-white font-bold my-1 py-1 px-2 rounded text-sm mx-1 "
              onClick={() => {
                setArrayType("ascending");
                setInAutoMode(false);
                reset();
              }}
            >
              Ascending
            </button>
            <button
              className=" bg-rose-500 hover:bg-rose-600 text-white font-bold my-1 py-1 px-2 rounded text-sm "
              onClick={() => {
                setArrayType("descending");
                setInAutoMode(false);
                reset();
              }}
            >
              Descending
            </button>
            <button
              className=" bg-orange-500 hover:bg-orange-600 text-white font-bold my-1 py-1 px-2 rounded text-sm "
              onClick={() => {
                setArrayType("almostSorted");
                setInAutoMode(false);
                reset();
              }}
            >
              Amost Sorted
            </button>
          </div>

          <label className="font-semibold">Animations:</label>

          <button
            className="bg-cyan-500 hover:bg-cyan-700 text-white font-bold my-1 py-1 px-2 rounded text-sm w-22"
            onClick={() => {
              setAnimationActivated(!animationActivated);
            }}
          >
            {animationActivated ? "Disable" : "Enable"}
          </button>

          <label className="font-semibold">Speed:</label>
          <Stack spacing={1} direction="row" alignItems="center">
            <Slow className="w-12 h-min" />
            <Slider
              size="medium"
              sx={{
                color: "warning.light",
              }}
              min={1}
              max={10}
              defaultValue={4}
              valueLabelDisplay="auto"
              onChange={(_, value) => {
                if (typeof value === "number") {
                  setAnimationSpeed(value);
                }
              }}
            />
            <Fast className="w-[4.5rem]  h-min" />
          </Stack>
        </div>
      </div>
    </div>
  );
}
