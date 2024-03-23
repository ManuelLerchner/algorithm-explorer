import vis from "vis-network/declarations/index-legacy-bundle";
import { Graph, GraphNode } from "../../../model/Graph";
import { GraphTraversalStep } from "../../../model/Steps/GraphTraversalStep";

const dijstraPseudoCode = [
  "function dijkstra(graph, root, target) {",
  " let priorityQueue = new PriorityQueue();",
  " let visited = new Set();",
  " let parents = new Map();",
  " ",
  " for (let node of graph.nodes) {",
  "   priorityQueue.add({ node, distance: Infinity });",
  " }",
  " priorityQueue[root].distance = 0;",
  " ",
  " while (!priorityQueue.isEmpty()) {",
  "   let { node, currentDistance } = priorityQueue.poll();",
  "   visited.add(node);",
  "   if (node === target) break;",
  "   ",
  "   for (let [neighbor, distance] of graph.neighbours(node)) {",
  "     if (visited.has(neighbor)) continue;",
  "     let newDistance = distance + currentDistance;",
  "     if (newDistance < priorityQueue[neighbor].distance) {",
  "       priorityQueue[neighbor].distance = newDistance;",
  "       parents.set(neighbor, node);",
  "     }",
  "   }",
  " }",
  " let path = traceBackPath(parents, target);",
  " return path;",
  "}",
];

function* traceBackPath(
  parents: Map<GraphNode, GraphNode>,
  target: GraphNode
): IterableIterator<GraphTraversalStep> {
  let path = [];
  let current = target;
  while (parents.has(current)) {
    path.push(current);

    yield {
      codeRow: 25,
      solutionpath: path.map((node) => node.id),
      description: {
        type: "Updated",
        description: `Add node ${current.id} to path`,
      },
      variables: {
        path: path.map((node) => node.id).join(" -> ") + " -> " + current.id,
      },
    };

    current = parents.get(current)!;
  }
  path.push(current);

  yield {
    codeRow: 25,
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
    codeRow: 26,
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

function* dijkstra(
  graph: Graph,
  root: number,
  target: number
): IterableIterator<GraphTraversalStep> {
  let priorityQueue = new Array<[GraphNode, number]>();
  let visited = new Set<number>();
  let parents = new Map();

  for (let node of graph.nodes) {
    priorityQueue.push([node, Infinity]);
  }
  priorityQueue.find(([node, _]) => node.id === root)![1] = 0;

  yield {
    codeRow: 9,
    visited: [...visited],
    description: {
      type: "Updated",
      description: `Initialize distances`,
    },
    labels: new Map(
      priorityQueue.map(([node, distance]) => [
        node.id,
        `${node.id} (${distance === Infinity ? "∞" : distance})`,
      ])
    ),

    variables: {
      priorityQueue: priorityQueue
        .sort((a, b) => a[1] - b[1])
        .map(
          ([node, distance]) =>
            `${node.id} (${distance === Infinity ? "∞" : distance})`
        ),
    },
  };

  while (priorityQueue.length > 0) {
    let [node, edgeWeight] = priorityQueue.reduce((a, b) =>
      a[1] < b[1] ? a : b
    );
    priorityQueue = priorityQueue.filter((n) => n[0].id !== node.id);

    yield {
      codeRow: 12,
      currentNode: node.id,
      visited: [...visited],
      description: {
        type: "Calculated",
        description: `Select node with smallest distance`,
      },
      variables: {
        priorityQueue: priorityQueue
          .sort((a, b) => a[1] - b[1])
          .map(
            ([node, distance]) =>
              `${node.id} (${distance === Infinity ? "∞" : distance})`
          ),
        node: node.id,
      },
    };
    visited.add(node.id);

    if (node.id === target) {
      yield {
        codeRow: 14,
        visited: [...visited],
        description: {
          type: "Updated",
          description: `Found target node`,
        },
        variables: {
          priorityQueue: priorityQueue
            .sort((a, b) => a[1] - b[1])
            .map(
              ([node, distance]) =>
                `${node.id} (${distance === Infinity ? "∞" : distance})`
            ),
        },
      };
      break;
    }

    for (let [neighbor, distance] of graph.neighbours(node)) {
      if (visited.has(neighbor.id)) continue;

      let newDistance = distance + edgeWeight;

      yield {
        codeRow: 18,
        visited: [...visited],
        explored: [neighbor.id],
        description: {
          type: "Calculated",
          description: `Explore neighbor ${neighbor.id} at distance ${distance}`,
        },
        currentNode: node.id,
        variables: {
          priorityQueue: priorityQueue
            .sort((a, b) => a[1] - b[1])
            .map(
              ([node, distance]) =>
                `${node.id} (${distance === Infinity ? "∞" : distance})`
            ),
          node: node.id,
          neighbor: neighbor.id,
          edgeWeight: edgeWeight,
          edgedistance: distance,
          newDistance: newDistance,
        },
      };

      if (
        newDistance < priorityQueue.find(([n, _]) => n.id === neighbor.id)![1]
      ) {
        priorityQueue.find(([n, _]) => n.id === neighbor.id)![1] = newDistance;
        parents.set(neighbor, node);

        yield {
          codeRow: 20,
          visited: [...visited],
          explored: [neighbor.id],
          currentNode: node.id,
          description: {
            type: "Updated",
            description: `Update distance of neighbor ${neighbor.id} to ${newDistance}`,
          },

          labels: new Map(
            priorityQueue.map(([node, distance]) => [
              node.id,
              `${node.id} (${distance === Infinity ? "∞" : distance})`,
            ])
          ),

          variables: {
            priorityQueue: priorityQueue
              .sort((a, b) => a[1] - b[1])
              .map(
                ([node, distance]) =>
                  `${node.id} (${distance === Infinity ? "∞" : distance})`
              ),
            node: node.id,
            neighbor: neighbor.id,
            newDistance: newDistance,
          },
        };
      }
    }
  }

  yield {
    codeRow: 25,
    visited: [...visited],
    description: {
      type: "Calculated",
      description: `Trace back path`,
    },
    variables: {
      priorityQueue: priorityQueue
        .sort((a, b) => a[1] - b[1])
        .map(
          ([node, distance]) =>
            `${node.id} (${distance === Infinity ? "∞" : distance})`
        ),
    },
  };

  yield* traceBackPath(
    parents,
    graph.nodes.find((node) => node.id === target)!
  );
}

export const dijkstraInfo = {
  algorithmName: "Dijkstra",
  algorithm: dijkstra,
  pseudoCode: dijstraPseudoCode,
};
