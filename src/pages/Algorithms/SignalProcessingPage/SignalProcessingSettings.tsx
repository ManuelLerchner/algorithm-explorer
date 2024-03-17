import { Slider, Stack } from "@mui/material";
import React from "react";

import { ReactComponent as Slow } from "../../../assets/slow.svg";
import { ReactComponent as Fast } from "../../../assets/fast.svg";
import { ArrayType } from "../../../model/CustomPresetTypes";

export default function SignalProcessingSettings({
  arrayLength,
  reset,
  setAnimationSpeed,
  animationActivated,
  setAnimationActivated,
}: {
  arrayLength: number;
  reset: (arrayType: ArrayType, arrayLength: number) => void;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  animationActivated: boolean;
  setAnimationActivated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow-lg flex flex-col">
        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
          <label className="font-semibold">Array Length:</label>
          <input
            type="number"
            min="0"
            max="16"
            value={arrayLength.toString()}
            className="placeholder:text-black text-center"
            placeholder="0"
            onChange={(e) => {
              try {
                var value = parseInt(e.target.value);
                if (value < 1) value = 1;
                if (value > 16) value = 16;

                //check power of 2
                if ((value & (value - 1)) !== 0) {
                  value = Math.pow(2, Math.ceil(Math.log2(value)));
                }

                reset("random", value);
              } catch (_) {}
            }}
          />

          <label className="font-semibold">Array Type:</label>
          <div className="flex flex-wrap justify-between items-center">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-1 px-2 rounded text-sm"
              onClick={() => {
                reset("random", 8);
              }}
            >
              Random
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
              defaultValue={3}
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
