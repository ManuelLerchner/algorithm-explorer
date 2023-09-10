import { GraphType } from "../model/CustomPresetTypes";
import { Connection, Graph, GraphNode } from "../model/Graph";
import { Edge, Node as VisNode } from "vis-network/peer/esm/vis-network";

/**
 * Creates a graph of the specified length, of the specified type
 * @param graphType The ordering type of the new graph
 */
export function createGraph(amountNodes: number, graphType: GraphType): Graph {
  switch (graphType) {
    case "tree": {
      const indices = Array.from(
        { length: amountNodes },
        (_, i: number) => i + 1
      );

      const nodes = indices.map((index) => new GraphNode(index));
      const edges = indices
        .slice(1)
        .flatMap((index) => [
          new Connection(nodes[index - 1], nodes[Math.floor(index / 2) - 1], 1),
          new Connection(nodes[Math.floor(index / 2) - 1], nodes[index - 1], 1),
        ]);

      return new Graph(nodes, edges);
    }

    case "grid": {
      const gridNodes: GraphNode[] = [];
      const gridEdges: Connection[] = [];

      const len = Math.floor(Math.sqrt(amountNodes));

      for (let i = 0; i < amountNodes; i++) {
        gridNodes.push(new GraphNode(i + 1));
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

    case "random": {
      const indices = Array.from(
        { length: amountNodes },
        (_, i: number) => i + 1
      );

      const nodes = indices.map((index) => new GraphNode(index));

      // create random edges
      const edges: Connection[] = [];

      for (let i = 0; i < amountNodes; i++) {
        const numEdges = Math.floor(Math.random() * amountNodes * 0.5);

        var connectionSet = new Set<number>();
        for (let j = 0; j < numEdges; j++) {
          const randomNode = Math.floor(Math.random() * amountNodes);
          if (randomNode === i) {
            j--;
            continue;
          }
          connectionSet.add(randomNode);
        }

        for (let randomNode of connectionSet) {
          edges.push(new Connection(nodes[i], nodes[randomNode], 1));
        }
      }

      return new Graph(nodes, edges);
    }
  }
}
