import React, { useEffect, useRef } from "react";
import { Data, DataSet, Edge, Network, Node } from "vis-network";

export default function GraphRenderer() {
  var nodes: Node[] = [
    { id: 1, label: "1" },
    { id: 2, label: "2" },
    { id: 3, label: "3" },
    { id: 4, label: "4" },
    { id: 5, label: "5" },
  ];

  var edges: Edge[] = [
    { from: 1, to: 2 },
    { from: 1, to: 3, label: "1" },
    { from: 2, to: 4 },
    { from: 2, to: 3 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
  ];

  var networkRef = useRef<any>();

  useEffect(() => {
    if (networkRef.current !== undefined) {
      var data: Data = {
        nodes: nodes,
        edges: edges,
      };
      var options = {
        layout: {
          hierarchical: false,
        },
        edges: {
          color: "#ffffff",
          font: {
            color: "#ff0000",
            size: 20,
            border: 0,
          },
        },
        nodes: {
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
          widthConstraint: 25,
          borderWidth: 2,
        },
      };
      new Network(networkRef.current, data, options);
    }
  }, []);

  return (
    <div
      className="h-full rounded-lg mx-2  border border-stone-500"
      ref={networkRef}
    ></div>
  );
}
