import { Slider, Stack } from "@mui/material";
import React from "react";

import { ReactComponent as Fast } from "../../../assets/fast.svg";
import { ReactComponent as Slow } from "../../../assets/slow.svg";
import { Graph } from "../../../model/Graph";
import { createGraph } from "../../../util/GraphCreators";

export default function ConvexHullSettings({
  amountNodes,
  setAmountNodes,
  setStartGraph,
  reset,
  setAnimationSpeed,
  setInAutoMode,
  animationActivated,
  setAnimationActivated,
}: {
  amountNodes: number;
  setAmountNodes: React.Dispatch<React.SetStateAction<number>>;
  setStartGraph: React.Dispatch<React.SetStateAction<Graph>>;
  reset: () => void;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  setInAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  animationActivated: boolean;
  setAnimationActivated: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div>
      <div className="bg-white p-4 rounded-md shadow-lg flex flex-col">
        <div className="grid grid-cols-[auto_1fr] items-center gap-1">
          <label className="font-semibold">Nodes:</label>
          <input
            type="number"
            min="0"
            max="32"
            className="placeholder:text-black text-center"
            value={amountNodes.toString()}
            placeholder="0"
            onChange={(e) => {
              try {
                var value = parseInt(e.target.value);

                if (value < 1) value = 1;
                if (value > 32) value = 32;
                setAmountNodes(value);
                const graph = createGraph(amountNodes, "random");
                graph.clearEdges();
                graph.clearLabels();
                setStartGraph(graph);
                setInAutoMode(false);
                reset();
              } catch (_) {}
            }}
          />

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
