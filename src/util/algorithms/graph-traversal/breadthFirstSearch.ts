import { Graph } from "../../../model/Graph";
import { GraphStep } from "../../../model/Steps/GraphStep";

const breadthFirstSearchPseudoCode = [
  "// O(V+E)",
  "function BFS(G, root) {",
  "  let Q = new Queue([root]);",
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
): IterableIterator<GraphStep> {
  var rootnode = graph.nodes.find((node) => node.id === root)!;

  const queue = [rootnode];

  yield {
    codeRow: 4,
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
      codeRow: 6,
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
        codeRow: 8,
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

    for (let [neighbor] of graph.neighbours(current)) {
      if (!neighbor.visited) {
        yield {
          codeRow: 12,
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
          codeRow: 13,
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
