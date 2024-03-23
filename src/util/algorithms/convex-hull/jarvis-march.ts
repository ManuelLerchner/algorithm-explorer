import { Graph, GraphNode } from "../../../model/Graph";
import { ConvexHullStep } from "../../../model/Steps/ConvexHullStep";

const jarvisMarchPseudoCode = [
  "function jarvisMarch(graph) {",
  "  let P = findLowestX(graph);",
  "  let Q = undefined;",
  "  let hull = [];",
  "  do {",
  "    hull.push(P);",
  "    let Q = graph.nodes[0];",
  "    for (let point of graph.nodes) {",
  "      if (Q === P || orientation(P, point, Q) === 'right') {",
  "        Q = point;",
  "      }",
  "    }",
  "    P = Q;",
  "  } while (P !== hull[0])",
  "  return hull;",
  "}",
];

function findLowestX(graph: Graph): GraphNode {
  return graph.nodes.reduce((acc, node) => {
    if (node.x! < acc.x!) return node;
    if (node.x === acc.x && node.y! < acc.y!) return node;
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

function* jarvisMarch(graph: Graph): IterableIterator<ConvexHullStep> {
  let P = findLowestX(graph);

  yield {
    codeRow: 2,
    description: {
      type: "Selected",
      description: "Selected the point with the lowest x-coordinate",
    },
    rootNode: P.id,
    labels: new Map(graph.nodes.map((node) => [node.id, "" + node.id])),
    stack: [],
    variables: {
      P: P.id,
    },
  };

  let Q: GraphNode | undefined;
  let hull: GraphNode[] = [];

  do {
    hull.push(P);

    yield {
      codeRow: 6,
      description: {
        type: "Updated",
        description: "Pushed the point to the hull",
      },
      rootNode: P.id,
      stack: hull.map((node) => node.id),
      markedNodes: Q ? [Q.id] : [],
      variables: {
        P: P.id,
        Q: Q?.id,
        hull: hull.map((node) => node.id),
      },
    };

    Q = graph.nodes[0];
    for (let point of graph.nodes) {
      yield {
        codeRow: 9,
        description: {
          type: "Selected",
          description: "Selected a point to compare",
        },
        rootNode: P.id,
        stack: hull.map((node) => node.id),
        markedNodes: [Q.id],
        currentNode: point.id,
        variables: {
          P: P.id,
          Q: Q?.id,
          point: point.id,
          hull: hull.map((node) => node.id),
        },
      };

      if (Q === P || orientation(P, point, Q) === "right") {
        Q = point;
        yield {
          codeRow: 10,
          description: {
            type: "Updated",
            description: "Found a new Q",
          },
          rootNode: P.id,
          stack: hull.map((node) => node.id),
          markedNodes: [Q.id],
          variables: {
            P: P.id,
            Q: point.id,
            point: point.id,
            hull: hull.map((node) => node.id),
          },
        };
      }
    }
    P = Q!;

    yield {
      codeRow: 13,
      description: {
        type: "Updated",
        description: "Updated P",
      },
      rootNode: P.id,
      stack: hull.map((node) => node.id),
      markedNodes: [Q.id],
      variables: {
        P: P.id,
        Q: Q?.id,
        hull: hull.map((node) => node.id),
      },
    };
  } while (P !== hull[0]);

  yield {
    codeRow: 15,
    description: {
      type: "Finished",
      description: "Finished the algorithm",
    },
    rootNode: P.id,
    stack: hull.map((node) => node.id),
    variables: {
      stack: hull.map((node) => node.id),
    },
  };

  return hull;
}

export const jarvisMarchInfo = {
  algorithmName: "Jarvis March",
  algorithm: jarvisMarch,
  pseudoCode: jarvisMarchPseudoCode,
};
