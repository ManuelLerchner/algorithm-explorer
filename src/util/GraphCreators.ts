import { GraphType } from "../model/CustomPresetTypes";
import { Connection, Graph, GraphNode } from "../model/Graph";
import { Edge, Node as VisNode } from "vis-network/peer/esm/vis-network";

const cartesian = (...a: any) =>
  a.reduce((a: any, b: any) =>
    a.flatMap((d: any) => b.map((e: any) => [d, e].flat()))
  );

/**
 * Creates a graph of the specified length, of the specified type
 * @param graphType The ordering type of the new graph
 */
export function createGraph(amountNodes: number, graphType: GraphType): Graph {
  switch (graphType) {
    default:
    case "fullyConnected":
      const indices = Array.from(
        { length: amountNodes },
        (_, i: number) => i + 1
      );

      const nodes = indices.map((index) => new GraphNode(index));
      const edges = cartesian(indices, indices)
        .filter(([a, b]: number[]) => a !== b)
        .map(
          ([a, b]: number[]) => new Connection(nodes[a - 1], nodes[b - 1], 1)
        );

      return new Graph(nodes, edges);

    case "grid":
      const gridNodes: GraphNode[] = [];
      const gridEdges: Connection[] = [];

      const len = Math.floor(Math.sqrt(amountNodes));

      for (let i = 0; i < amountNodes; i++) {
        gridNodes.push(new GraphNode(i));
      }

      //vertical edges
      for (let i = 0; i < amountNodes; i++) {
        if (i + len < amountNodes) {
          gridEdges.push(new Connection(gridNodes[i], gridNodes[i + len], 1));
          gridEdges.push(new Connection(gridNodes[i + len], gridNodes[i], 1));
        }
      }
      //horizontal edges
      for (let i = 0; i < amountNodes - 1; i++) {
        if (i % len !== len - 1) {
          gridEdges.push(new Connection(gridNodes[i], gridNodes[i + 1], 1));
          gridEdges.push(new Connection(gridNodes[i + 1], gridNodes[i], 1));
        }
      }

      return new Graph(gridNodes, gridEdges);
  }
}
