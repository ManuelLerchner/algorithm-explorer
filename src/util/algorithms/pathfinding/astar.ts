import { Graph, GraphNode } from "../../../model/Graph";
import { GraphStep } from "../../../model/Steps/GraphStep";

const astarPseudoCode = [
  "// O(E + log V)",
  "function astar(graph, root, target) {",
  " let openSet = new PriorityQueue();",
  " let closedSet = new Set();",
  " let gScore = new Map();",
  " let predecessor = new Map();",
  " openSet.add({ node: root, distance: 0 });",
  " while (!openSet.isEmpty()) {",
  "   let { node, currentDistance } = openSet.poll();",
  "   closedSet.add(node);",
  "   if (node === target) break;",
  "   ",
  "   for (let [neighbor, edgeWeight] of graph.neighbours(node)) {",
  "     if (closedSet.has(neighbor)) continue;",
  "     let tentative_g = gScore[node] + edgeWeight;",
  "     if (openSet.has(neighbor) && tentative_g >= gScore[neighbor]) {",
  "       continue;",
  "     }",
  "     gScore[neighbor] = tentative_g;",
  "     predecessor[neighbor] = node;",
  "     let f = tentative_g + heuristic(neighbor, target);",
  "     if (openSet.has(neighbor)) {",
  "       openSet[neighbor].distance = f;",
  "     } else {",
  "       openSet.add({ node: neighbor, distance: f });",
  "     }",
  "   }",
  " }",
  " let path = traceBackPath(predecessor, target);",
  " return path;",
  "}",
];

function* traceBackPath(
  predecessor: Map<GraphNode, GraphNode>,
  target: GraphNode
): IterableIterator<GraphStep> {
  let path = [];
  let current = target;
  while (predecessor.has(current)) {
    path.push(current);

    yield {
      codeRow: 29,
      solutionpath: path.map((node) => node.id),
      description: {
        type: "Updated",
        description: `Add node ${current.id} to path`,
      },
      variables: {
        path: path.map((node) => node.id).join(" -> ") + " -> " + current.id,
      },
    };

    current = predecessor.get(current)!;
  }
  path.push(current);

  yield {
    codeRow: 29,
    solutionpath: path.map((node) => node.id),
    description: {
      type: "Updated",
      description: `Add node ${current.id} to path`,
    },
    variables: {
      path: path.map((node) => node.id).join(" -> "),
    },
  };

  yield {
    codeRow: 30,
    solutionpath: path.map((node) => node.id),
    description: {
      type: "Calculated",
      description: `Finished`,
    },
    variables: {
      path: path
        .reverse()
        .map((node) => node.id)
        .join(" -> "),
    },
  };
}

function heuristic(a: GraphNode, b: GraphNode): number {
  return Math.sqrt(Math.pow(a.x! - b.x!, 2) + Math.pow(a.y! - b.y!, 2)) / 100;
}

function* astar(
  graph: Graph,
  root: number,
  target: number
): IterableIterator<GraphStep> {
  let openSet = new Array<[GraphNode, number]>();
  let closedSet = new Set<number>();
  let gScore = new Map<number, number>();
  let predecessor = new Map();

  gScore.set(root, 0);
  openSet.push([graph.nodes.find((n) => n.id === root)!, 0]);

  yield {
    codeRow: 7,
    visited: [...closedSet],
    description: {
      type: "Updated",
      description: `Add root node to openSet`,
    },
    labels: new Map(
      openSet.map(([node, distance]) => [
        node.id,
        `${node.id} (${
          distance === Infinity ? "∞" : "" + Math.round(distance * 10) / 10
        })`,
      ])
    ),

    variables: {
      openSet: openSet
        .sort((a, b) => a[1] - b[1])
        .map(
          ([node, distance]) =>
            `${node.id} (${
              distance === Infinity ? "∞" : Math.round(distance * 10) / 10
            })`
        ),
      gScore: Array.from(gScore.entries()).map(
        ([node, distance]) => `${node} (${distance})`
      ),
    },
  };

  while (openSet.length > 0) {
    let [node] = openSet.reduce((a, b) => (a[1] < b[1] ? a : b));
    openSet = openSet.filter(([n]) => n.id !== node.id);
    closedSet.add(node.id);

    yield {
      codeRow: 9,
      currentNode: node.id,
      visited: [...closedSet],
      description: {
        type: "Calculated",
        description: `Select node with smallest distance`,
      },
      variables: {
        openSet: openSet
          .sort((a, b) => a[1] - b[1])
          .map(
            ([node, distance]) =>
              `${node.id} (${
                distance === Infinity ? "∞" : Math.round(distance * 10) / 10
              })`
          ),
        gScore: Array.from(gScore.entries()).map(
          ([node, distance]) => `${node} (${distance})`
        ),
        node: node.id,
      },
    };

    if (node.id === target) {
      yield {
        codeRow: 11,
        visited: [...closedSet],
        description: {
          type: "Updated",
          description: `Found target node`,
        },
        variables: {
          openSet: openSet
            .sort((a, b) => a[1] - b[1])
            .map(
              ([node, distance]) =>
                `${node.id} (${
                  distance === Infinity ? "∞" : Math.round(distance * 10) / 10
                })`
            ),
          gScore: Array.from(gScore.entries()).map(
            ([node, distance]) => `${node} (${distance})`
          ),
        },
      };
      break;
    }

    for (let [neighbor, edgeWeight] of graph.neighbours(node)) {
      if (closedSet.has(neighbor.id)) continue;

      let tentative_g = gScore.get(node.id)! + edgeWeight;

      yield {
        codeRow: 15,
        visited: [...closedSet],
        explored: [neighbor.id],
        description: {
          type: "Calculated",
          description: `Explore neighbor ${neighbor.id} at distance ${edgeWeight}`,
        },
        currentNode: node.id,
        variables: {
          openSet: openSet
            .sort((a, b) => a[1] - b[1])
            .map(
              ([node, distance]) =>
                `${node.id} (${
                  distance === Infinity ? "∞" : Math.round(distance * 10) / 10
                })`
            ),
          gScore: Array.from(gScore.entries()).map(
            ([node, distance]) => `${node} (${distance})`
          ),
          node: node.id,
          neighbor: neighbor.id,
          edgeWeight: edgeWeight,
          tentative_g: Math.round(tentative_g * 10) / 10,
        },
      };

      if (
        openSet.find(([n, _]) => n.id === neighbor.id) !== undefined &&
        tentative_g >= gScore.get(neighbor.id)!
      ) {
        continue;
      }

      gScore.set(neighbor.id, tentative_g);
      predecessor.set(neighbor, node);

      yield {
        codeRow: 19,
        visited: [...closedSet],
        explored: [neighbor.id],
        currentNode: node.id,
        description: {
          type: "Updated",
          description: `Update gScore of neighbor ${neighbor.id} to ${tentative_g}`,
        },

        labels: new Map(
          openSet.map(([node, distance]) => [
            node.id,
            `${node.id} (${
              distance === Infinity ? "∞" : Math.round(distance * 10) / 10
            })`,
          ])
        ),

        variables: {
          openSet: openSet
            .sort((a, b) => a[1] - b[1])
            .map(
              ([node, distance]) =>
                `${node.id} (${
                  distance === Infinity ? "∞" : Math.round(distance * 10) / 10
                })`
            ),
          gScore: Array.from(gScore.entries()).map(
            ([node, distance]) => `${node} (${distance})`
          ),
          node: node.id,
          neighbor: neighbor.id,
          tentative_g: Math.round(tentative_g * 10) / 10,
        },
      };

      let h = heuristic(neighbor, graph.nodes.find((n) => n.id === target)!);
      let f = tentative_g + h;

      yield {
        codeRow: 21,
        visited: [...closedSet],
        explored: [neighbor.id],
        currentNode: node.id,
        description: {
          type: "Calculated",
          description: `Calculate f(${neighbor.id}) = ${tentative_g} + h(${
            neighbor.id
          }, ${target}) = ${Math.round(f * 10) / 10}`,
        },
        variables: {
          openSet: openSet
            .sort((a, b) => a[1] - b[1])
            .map(
              ([node, distance]) =>
                `${node.id} (${
                  distance === Infinity ? "∞" : Math.round(distance * 10) / 10
                })`
            ),
          gScore: Array.from(gScore.entries()).map(
            ([node, distance]) => `${node} (${distance})`
          ),
          node: node.id,
          neighbor: neighbor.id,
          tentative_g: Math.round(tentative_g * 10) / 10,
          h: Math.round(h * 10) / 10,
          f: Math.round(f * 10) / 10,
        },
      };

      if (openSet.find(([n, _]) => n.id === neighbor.id)) {
        openSet.find(([n, _]) => n.id === neighbor.id)![1] = f;

        yield {
          codeRow: 23,
          visited: [...closedSet],
          explored: [neighbor.id],
          currentNode: node.id,
          labels: new Map(
            openSet.map(([node, distance]) => [
              node.id,
              `${node.id} (${
                distance === Infinity ? "∞" : Math.round(distance * 10) / 10
              })`,
            ])
          ),

          description: {
            type: "Updated",
            description: `Update distance of neighbor ${neighbor.id} to ${f}`,
          },
          variables: {
            openSet: openSet
              .sort((a, b) => a[1] - b[1])
              .map(
                ([node, distance]) =>
                  `${node.id} (${distance === Infinity ? "∞" : distance})`
              ),
            gScore: Array.from(gScore.entries()).map(
              ([node, distance]) => `${node} (${distance})`
            ),
            node: node.id,
            neighbor: neighbor.id,
            f: f,
          },
        };
      } else {
        openSet.push([neighbor, f]);

        yield {
          codeRow: 25,
          visited: [...closedSet],
          explored: [neighbor.id],
          currentNode: node.id,
          labels: new Map(
            openSet.map(([node, distance]) => [
              node.id,
              `${node.id} (${
                distance === Infinity ? "∞" : Math.round(distance * 10) / 10
              })`,
            ])
          ),
          description: {
            type: "Updated",
            description: `Add neighbor ${neighbor.id} to openSet`,
          },
          variables: {
            openSet: openSet
              .sort((a, b) => a[1] - b[1])
              .map(
                ([node, distance]) =>
                  `${node.id} (${
                    distance === Infinity ? "∞" : Math.round(distance * 10) / 10
                  })`
              ),
            gScore: Array.from(gScore.entries()).map(
              ([node, distance]) => `${node} (${distance})`
            ),
            node: node.id,
            neighbor: neighbor.id,
            f: Math.round(f * 10) / 10,
          },
        };
      }
    }
  }

  yield {
    codeRow: 29,
    visited: [...closedSet],
    description: {
      type: "Calculated",
      description: `Trace back path`,
    },
    variables: {
      openSet: openSet
        .sort((a, b) => a[1] - b[1])
        .map(
          ([node, distance]) =>
            `${node.id} (${
              distance === Infinity ? "∞" : Math.round(distance * 10) / 10
            })`
        ),
    },
  };

  yield* traceBackPath(predecessor, graph.nodes.find((n) => n.id === target)!);
}

export const astarInfo = {
  algorithmName: "A*",
  algorithm: astar,
  pseudoCode: astarPseudoCode,
};
