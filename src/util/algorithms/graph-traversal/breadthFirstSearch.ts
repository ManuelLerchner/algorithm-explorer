import { Graph, GraphNode } from "../../../model/Graph";
import { GraphTraversalStep } from "../../../model/Steps/GraphTraversalStep";

const breadthFirstSearchPseudoCode = [
  "function BFS(G, root) {",
  "  let Q = [root]; // queue",
  "  root.visited = true;",
  "  while (Q.length > 0) {",
  "    let current = Q.shift();",
  "    if (current == target) {",
  "      return;",
  "    }",
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
  root: number,
  target: number
): IterableIterator<GraphTraversalStep> {
  var rootnode = graph.nodes.find((node) => node.id === root)!;

  const queue = [rootnode];

  yield {
    codeRow: 3,
    currentNode: root,
    visited: [root],
    description: {
      type: "Updated",
      description: `Set root.visited = true`,
    },
    variables: {
      Q: queue.map((node) => node.id),
    },
  };
  rootnode.visited = true;

  while (queue.length > 0) {
    const current = queue.shift()!;

    yield {
      codeRow: 5,
      currentNode: current.id,
      explored: [current.id],
      description: {
        type: "Selected",
        description: `Get current from queue`,
      },
      variables: {
        Q: queue.map((node) => node.id),
        current: current.id,
      },
    };

    if (current.id === target) {
      yield {
        codeRow: 7,
        currentNode: current.id,
        visited: [current.id],
        description: {
          type: "Compared",
          description: `current == target`,
        },
        variables: {
          Q: queue.map((node) => node.id),
          current: current.id,
        },
      };
      break;
    }

    for (let [neighbor, _] of graph.neighbours(current)) {
      if (!neighbor.visited) {
        yield {
          codeRow: 11,
          currentNode: current.id,
          description: {
            type: "Updated",
            description: `Set neighbor.visited = true`,
          },
          variables: {
            Q: queue.map((node) => node.id),
            current: current.id,
            neighbor: neighbor.id,
          },
        };

        neighbor.visited = true;

        yield {
          codeRow: 12,
          currentNode: current.id,
          visited: [current.id, neighbor.id],
          description: {
            type: "Updated",
            description: `Add neighbor to queue`,
          },
          variables: {
            Q: queue.map((node) => node.id),
            current: current.id,
            neighbor: neighbor.id,
          },
        };

        queue.push(neighbor);
      }
    }
  }
  yield {
    codeRow: -1,
    description: { type: "Finished", description: "" },
  };
}

export const bfsinfo = {
  algorithmName: "Breadth First Search",
  algorithm: breadthFirstSearch,
  pseudoCode: breadthFirstSearchPseudoCode,
};
