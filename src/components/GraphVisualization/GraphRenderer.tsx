import React, { useEffect, useRef } from "react";
import { Data, Edge, Node } from "vis-network";

import { Network, Options } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Graph } from "./../../model/Graph";
import { GraphTraversalStep } from "../../model/Steps/GraphTraversalStep";

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
          color: "#ffffff",
        },

        width: 2,
        font: {
          color: "#ff0000",
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

    const positions = network!.getPositions(graph.nodes.map((n) => n.id));
    graph.updatePosition(positions);

    network.on("initRedraw", () => {
      const positions = network!.getPositions(graph.nodes.map((n) => n.id));
      graph.updatePosition(positions);
    });
  }

  return (
    <div
      className="h-full rounded-lg border border-stone-500"
      ref={networkRef}
    ></div>
  );
}

export default React.memo(GraphRenderer);
