import { Slider, Stack } from "@mui/material";
import React from "react";
import { createArray } from "../../../util/ArrayCreator";

import { ReactComponent as Slow } from "../../../assets/slow.svg";
import { ReactComponent as Fast } from "../../../assets/fast.svg";
import { ArrayType, GraphType } from "../../../model/CustomPresetTypes";
import { Graph } from "../../../model/Graph";
import { createGraph } from "../../../util/GraphCreators";

export default function PathFindingSettings({
  amountNodes,
  graphType,
  startNode,
  endNode,
  setStartNode,
  setEndNode,
  setAmountNodes,
  setStartGraph,
  reset,
  setAnimationSpeed,
  setInAutoMode,
  setGraphType,
  animationActivated,
  setAnimationActivated,
}: {
  amountNodes: number;
  graphType: GraphType;
  startNode: number;
  endNode: number;
  setStartNode: React.Dispatch<React.SetStateAction<number>>;
  setEndNode: React.Dispatch<React.SetStateAction<number>>;
  setAmountNodes: React.Dispatch<React.SetStateAction<number>>;
  setStartGraph: React.Dispatch<React.SetStateAction<Graph>>;
  reset: () => void;
  setAnimationSpeed: React.Dispatch<React.SetStateAction<number>>;
  setInAutoMode: React.Dispatch<React.SetStateAction<boolean>>;
  setGraphType: React.Dispatch<React.SetStateAction<GraphType>>;
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
                setStartGraph(createGraph(value, graphType));
                setInAutoMode(false);
                setEndNode(value);
                reset();
              } catch (_) {}
            }}
          />

          <label className="font-semibold">Params:</label>
          <div className="flex flex-wrap justify-around items-center">
            <label className="font-semibold">Start:</label>
            <input
              type="number"
              min="0"
              max={amountNodes}
              className="placeholder:text-black text-center"
              value={startNode.toString()}
              placeholder="0"
              onChange={(e) => {
                try {
                  var value = parseInt(e.target.value);
                  if (value < 1) value = 1;
                  if (value > amountNodes) value = amountNodes;
                  setStartNode(value);
                  setInAutoMode(false);
                  reset();
                } catch (_) {}
              }}
            />

            <label className="font-semibold">Goal:</label>
            <input
              type="number"
              min="0"
              max={amountNodes}
              className="placeholder:text-black text-center"
              value={endNode.toString()}
              placeholder="0"
              onChange={(e) => {
                try {
                  var value = parseInt(e.target.value);
                  if (value < 1) value = 1;
                  if (value > amountNodes) value = amountNodes;
                  setEndNode(value);
                  setInAutoMode(false);
                  reset();
                } catch (_) {}
              }}
            />
          </div>

          <label className="font-semibold">Graph Type:</label>
          <div className="flex flex-wrap justify-between items-center">
            <button
              className=" bg-blue-500 hover:bg-blue-700 text-white font-bold my-1 py-1 px-2 rounded text-sm"
              onClick={() => {
                setGraphType("tree");
                setInAutoMode(false);
                reset();
              }}
            >
              Tree
            </button>
            <button
              className=" bg-green-600 hover:bg-green-700 text-white font-bold my-1 py-1 px-2 rounded text-sm mx-1 "
              onClick={() => {
                setGraphType("grid");
                setInAutoMode(false);
                reset();
              }}
            >
              Grid
            </button>

            <button
              className=" bg-rose-500 hover:bg-rose-600 text-white font-bold my-1 py-1 px-2 rounded text-sm "
              onClick={() => {
                setGraphType("random");
                setInAutoMode(false);
                reset();
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
