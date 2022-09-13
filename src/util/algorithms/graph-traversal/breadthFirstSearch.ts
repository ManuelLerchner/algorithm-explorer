import { Graph, GraphNode } from "../../../model/Graph";
import { GraphTraversalStep } from "../../../model/Steps/GraphTraversalStep";

const breadthFirstSearchPseudoCode = [
  "function BFS(G, root) {",
  "  let Q = [root];",
  "  root.visited = true;",
  "  while (Q.length > 0) {",
  "    let current = Q.shift();",
  "    for (let neighbor of current.neighbors) {",
  "      if (!neighbor.visited) {",
  "        neighbor.visited = true;",
  "        Q.push(neighbor);",
  "      }",
  "    }",
  "  }",
  "}",
];

function* breadthFirstSearch(
  graph: Graph,
  root: GraphNode
): IterableIterator<GraphTraversalStep> {
  const queue = [root];
  root.visited = true;
  yield {
    codeRow: 2,
    currentIndex: -1,
    array: [],
    locked: [],
    currentNode: root.id,
    visited: [root.id],
    description: {
      type: "Set",
      description: `root.visited = true`,
    },
  };
  while (queue.length > 0) {
    const current = queue.shift()!;
    yield {
      codeRow: 4,
      currentIndex: -1,
      array: [],
      locked: [],
      currentNode: current.id,
      visited: [current.id],
      description: {
        type: "Selected",
        description: `current = Q.shift()`,
      },
    };
    for (let neighbor of graph.neighbours(current)) {
      if (!neighbor.to.visited) {
        neighbor.to.visited = true;
        queue.push(neighbor.to);
        yield {
          codeRow: 6,
          currentIndex: -1,
          array: [],
          locked: [],
          currentNode: current.id,
          visited: [current.id, neighbor.to.id],
          description: {
            type: "Updated",
            description: `neighbor.visited = true`,
          },
        };
        yield {
          codeRow: 7,
          currentIndex: -1,
          array: [],
          locked: [],
          currentNode: current.id,
          visited: [current.id, neighbor.to.id],
          description: {
            type: "Set",
            description: `Q.push(neighbor)`,
          },
        };
      }
    }
  }
  yield {
    codeRow: -1,
    currentIndex: -1,
    array: [],
    locked: [],
    description: { type: "Finished", description: "" },
  };
}

export const bfsinfo = {
  algorithmName: "Breadth First Search",
  algorithm: breadthFirstSearch,
  pseudoCode: breadthFirstSearchPseudoCode,
};
