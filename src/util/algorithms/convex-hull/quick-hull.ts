import { Graph, GraphNode } from "../../../model/Graph";
import { ConvexHullStep } from "../../../model/Steps/ConvexHullStep";

const quickHullPsuedoCode = [
  "// Best: O(n log n), Average: O(n log n), Worst: O(n^2)",
  "function quickHull(graph) {",
  "  let P = findLowestX(graph);",
  "  let Q = findHighestX(graph);",
  "  let convexHull = [P, Q];",
  "  findHull(graph, P, Q, convexHull);",
  "  findHull(graph, Q, P, convexHull);",
  "  return convexHull;",
  "}",

  "function findHull(graph, P, Q, hull) {",
  "  let C = pointFarthestLeftFromLine(P, Q, graph);",
  "  if (C === undefined) return;",
  "  hull.splice(hull.indexOf(P), 0, C);",
  "  findHull(graph, P, C, hull);",
  "  findHull(graph, C, Q, hull);",
  "}",
];

function findLowestX(graph: Graph): GraphNode {
  return graph.nodes.reduce((acc, node) => {
    if (node.x! > acc.x!) return node;
    if (node.x === acc.x && node.y! < acc.y!) return node;
    return acc;
  });
}

function findHighestX(graph: Graph): GraphNode {
  return graph.nodes.reduce((acc, node) => {
    if (node.x! < acc.x!) return node;
    if (node.x === acc.x && node.y! > acc.y!) return node;
    return acc;
  });
}

function orientation(
  p: GraphNode,
  q: GraphNode,
  r: GraphNode
): "left" | "right" | "collinear" {
  let val = (q.y! - p.y!) * (r.x! - q.x!) - (q.x! - p.x!) * (r.y! - q.y!);

  if (val === 0) return "collinear";
  return val > 0 ? "left" : "right";
}

function distanceFromLine(P: GraphNode, Q: GraphNode, R: GraphNode): number {
  return (
    Math.abs(
      (Q.y! - P.y!) * R.x! - (Q.x! - P.x!) * R.y! + Q.x! * P.y! - Q.y! * P.x!
    ) / Math.sqrt(Math.pow(Q.y! - P.y!, 2) + Math.pow(Q.x! - P.x!, 2))
  );
}

function pointFarthestLeftFromLine(
  P: GraphNode,
  Q: GraphNode,
  graph: Graph
): GraphNode | undefined {
  return graph.nodes.reduce(
    (
      acc: {
        node: GraphNode | undefined;
        dist: number;
      },
      node
    ) => {
      if (node === P || node === Q) return acc;

      let dist = distanceFromLine(P, Q, node);
      if (orientation(P, Q, node) === "left" && dist > acc.dist) {
        return { node, dist };
      }

      return acc;
    },
    { node: undefined, dist: -1 }
  ).node;
}

function* findHull(
  graph: Graph,
  P: GraphNode,
  Q: GraphNode,
  hull: GraphNode[]
): IterableIterator<ConvexHullStep> {
  let C = pointFarthestLeftFromLine(P, Q, graph);

  yield {
    codeRow: 1,
    description: {
      type: "Selected",
      description: "Selected the point farthest from the line",
    },
    markedNodes: [P.id, Q.id],
    stack: hull.map((node) => node.id),
    currentNode: C?.id,
    variables: {
      P: P.id,
      Q: Q.id,
      C: C?.id,
    },
  };

  if (C === undefined) {
    yield {
      codeRow: 12,
      description: {
        type: "Finished",
        description: "No point found left of the line",
      },
      markedNodes: [P.id, Q.id],
      stack: hull.map((node) => node.id),
      variables: {
        P: P.id,
        Q: Q.id,
      },
    };
    return;
  }

  hull.splice(hull.indexOf(P), 0, C);

  yield {
    codeRow: 13,
    description: {
      type: "Updated",
      description: "Added the point farthest from the line to the hull",
    },
    stack: hull.map((node) => node.id),
    currentNode: C.id,
    variables: {
      P: P.id,
      Q: Q.id,
      C: C?.id,
    },
  };

  yield {
    codeRow: 14,
    description: {
      type: "Call",
      description: `Call findHull with P: ${P.id} and C: ${C.id}`,
    },
    stack: hull.map((node) => node.id),
    markedNodes: [P.id, C.id],
    variables: {
      P: P.id,
      C: C.id,
    },
  };

  yield* findHull(graph, P, C, hull);

  yield {
    codeRow: 15,
    description: {
      type: "Call",
      description: `Call findHull with C: ${C.id} and Q: ${Q.id}`,
    },
    stack: hull.map((node) => node.id),
    markedNodes: [C.id, Q.id],
    variables: {
      C: C.id,
      Q: Q.id,
    },
  };

  yield* findHull(graph, C, Q, hull);
}

function* quickHull(graph: Graph): IterableIterator<ConvexHullStep> {
  let Q = findLowestX(graph);
  let P = findHighestX(graph);

  let convexHull: GraphNode[] = [P, Q];
  yield {
    codeRow: 5,
    description: {
      type: "Calculated",
      description: "Add first two points to the convex hull",
    },
    labels: new Map(graph.nodes.map((node) => [node.id, "" + node.id])),
    stack: convexHull.map((node) => node.id),
    variables: {
      P: P.id,
      Q: Q.id,
      convexHull: convexHull.map((node) => node.id),
    },
  };

  yield {
    codeRow: 6,
    description: {
      type: "Call",
      description: `Call findHull with P: ${P.id} and Q: ${Q.id}`,
    },
    stack: convexHull.map((node) => node.id),
    markedNodes: [P.id, Q.id],
    variables: {
      P: P.id,
      Q: Q.id,
    },
  };

  yield* findHull(graph, P, Q, convexHull);

  yield {
    codeRow: 7,
    description: {
      type: "Call",
      description: `Call findHull with Q: ${Q.id} and P: ${P.id}`,
    },
    stack: convexHull.map((node) => node.id),
    markedNodes: [Q.id, P.id],
    variables: {
      Q: Q.id,
      P: P.id,
    },
  };

  yield* findHull(graph, Q, P, convexHull);

  yield {
    codeRow: 8,
    description: {
      type: "Finished",
      description: "Finished finding the convex hull",
    },
    stack: convexHull.map((node) => node.id),
    variables: {
      convexHull: convexHull.map((node) => node.id),
    },
  };

  return convexHull;
}

export const quickHullInfo = {
  algorithmName: "Quick Hull",
  algorithm: quickHull,
  pseudoCode: quickHullPsuedoCode,
};
