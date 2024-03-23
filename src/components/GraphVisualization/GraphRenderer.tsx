import React, { useRef } from "react";
import { Data } from "vis-network";

import { Network, Options } from "vis-network/peer/esm/vis-network";
import { Graph } from "./../../model/Graph";

function GraphRenderer({ graph }: { graph: Graph }) {
  var networkRef = useRef<any>();

  var network: Network | undefined = undefined;

  if (networkRef.current !== undefined) {
    var data: Data = {
      nodes: graph.nodes_dataset,
      edges: graph.edges_dataset,
    };
    var options: Options = {
      layout: {
        hierarchical: false,
      },
      physics: {
        enabled: true,
      },
      edges: {
        chosen: false,
        arrows: {
          to: {
            enabled: true,
            scaleFactor: 1,
            type: "arrow",
          },
        },

        color: {
          inherit: false,
          color: "#848484",
        },

        width: 2,
        font: {
          color: "#000000",
          size: 20,
        },
      },
      nodes: {
        chosen: false,
        shape: "circle",
        margin: {
          top: 10,
          bottom: 10,
          left: 10,
          right: 10,
        },
        size: 20,
        color: "#ffffff",
        font: {
          size: 22,
        },
        widthConstraint: {
          minimum: 25,
        },
        borderWidth: 1,
      },
    };

    network = new Network(networkRef.current, data, options);

    network.on("afterDrawing", () => {
      const positions = network!.getPositions(graph.nodes.map((n) => n.id));
      graph.updatePosition(positions);
    });
  }

  return (
    <>
      <div
        className="h-full rounded-lg border border-stone-500"
        ref={networkRef}
      ></div>
      <div className="flex justify-end items-center mt-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="form-checkbox h-6 w-6"
            defaultChecked={true}
            onChange={(e) => {
              if (network !== undefined) {
                network.setOptions({
                  physics: {
                    enabled: e.target.checked,
                  },
                });
              }
            }}
          />
          <span className="text-lg">Physics</span>
        </label>
      </div>
    </>
  );
}

export default React.memo(GraphRenderer);
