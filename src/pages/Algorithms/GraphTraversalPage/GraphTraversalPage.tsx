import React from "react";
import { Graph, GraphNode } from "../../../model/Graph";
import { GraphTraversalStep } from "../../../model/Steps/GraphTraversalStep";

export default function GraphTraversalPage({
  algorithmName,
  algorithm,
  pseudoCode,
}: {
  algorithmName: string;
  algorithm: (
    G: Graph,
    root: GraphNode
  ) => IterableIterator<GraphTraversalStep>;
  pseudoCode: string[];
}) {
  return <div>GraphTraversal</div>;
}
