import { GraphType } from "../model/CustomPresetTypes";
import { Connection, Graph, GraphNode } from "../model/Graph";

/**
 * Creates a graph of the specified length, of the specified type
 * @param graphType The ordering type of the new graph
 */
export function createGraph(amountNodes: number, graphType: GraphType): Graph {
  switch (graphType) {
    default:
    case "fullyConnected":
      const graph = new Graph();
      graph.nodes = Array.from(
        { length: amountNodes },
        (_, i: number) => new GraphNode(i + 1)
      );

      graph.edges = graph.nodes.flatMap((from) =>
        graph.nodes.map((to) => {
          return new Connection(from, to, 1);
        })
      );

      return graph;
  }
}
