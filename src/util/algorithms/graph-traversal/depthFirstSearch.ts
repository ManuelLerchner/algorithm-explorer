import { Graph } from "../../../model/Graph";
import { GraphStep } from "../../../model/Steps/GraphStep";

const depthFirstSearchPseudoCode = [
  "// O(V+E)",
  "function DFS(G, root) {",
  "  let S = new Stack([root]);",
  "  while (S.length > 0) {",
  "    let current = S.pop();",
  "    if (current == target) {",
  "      return;",
  "    }",
  "    if (!current.visited) {",
  "      current.visited = true;",
  "      for (let neighbor of current.neighbors) {",
  "        S.push(neighbor);",
  "      }",
  "    }",
  "  }",
  "}",
];

function* depthFirstSearch(
  graph: Graph,
  root: number,
  target: number
): IterableIterator<GraphStep> {
  var rootnode = graph.nodes.find((node) => node.id === root)!;

  const stack = [rootnode];

  yield {
    codeRow: 3,
    currentNode: root,
    visited: [root],
    description: {
      type: "Updated",
      description: `Add root to stack`,
    },
    variables: {
      S: stack.map((node) => node.id),
    },
  };

  while (stack.length > 0) {
    const current = stack.pop()!;

    yield {
      codeRow: 5,
      currentNode: current.id,
      explored: [current.id],
      description: {
        type: "Selected",
        description: `Get current from stack`,
      },
      variables: {
        S: stack.map((node) => node.id),
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
          S: stack.map((node) => node.id),
          current: current.id,
        },
      };
      break;
    }

    if (!current.visited) {
      yield {
        codeRow: 10,
        currentNode: current.id,
        description: {
          type: "Updated",
          description: `Set current.visited = true`,
        },
        variables: {
          S: stack.map((node) => node.id),
          current: current.id,
        },
      };

      current.visited = true;

      for (let [neighbor, _] of graph.neighbours(current)) {
        yield {
          codeRow: 11,
          currentNode: current.id,
          description: {
            type: "Selected",
            description: `Get neighbor from stack`,
          },
          variables: {
            S: stack.map((node) => node.id),
            current: current.id,
          },
        };

        yield {
          codeRow: 12,
          currentNode: current.id,
          description: {
            type: "Updated",
            description: `Add neighbor to stack`,
          },
          variables: {
            S: stack.map((node) => node.id),
            current: current.id,
            neighbor: neighbor.id,
          },
        };
        stack.push(neighbor);
      }
    }
  }
  yield {
    codeRow: -1,
    description: { type: "Finished", description: "" },
  };
}

export const dfsinfo = {
  algorithmName: "Depth First Search",
  algorithm: depthFirstSearch,
  pseudoCode: depthFirstSearchPseudoCode,
};
