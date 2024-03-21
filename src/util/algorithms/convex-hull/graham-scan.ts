import { Graph, GraphNode } from "../../../model/Graph";
import { GrahamStep } from "../../../model/Steps/GrahamStep";

const grahamScanPseudoCode = [
  "let P = findLowestY(graph)",
  "let sorted = sortPointsByAngle(P, graph)",
  "let stack = []",
  "stack.push(sorted[0])",
  "stack.push(sorted[1])",
  "for i = 2 to sorted.length",
  "  while stack.length > 1 and orientation(stack[stack.length - 2], stack[stack.length - 1], sorted[i]) != 'left'",
  "    stack.pop()",
  "  stack.push(sorted[i])",
  "return stack",
];

function findLowestY(graph: Graph): GraphNode {
  return graph.nodes.reduce((acc, node) => {
    if (node.y! > acc.y!) return node;
    if (node.y === acc.y && node.x! < acc.x!) return node;
    return acc;
  });
}

function sortPointsByAngle(P: GraphNode, graph: Graph): GraphNode[] {
  return graph.nodes.sort((a, b) => {
    let orientationVal = orientation(P, a, b);
    if (orientationVal === "collinear") {
      return (
        Math.pow(a.x! - P.x!, 2) +
        Math.pow(a.y! - P.y!, 2) -
        (Math.pow(b.x! - P.x!, 2) + Math.pow(b.y! - P.y!, 2))
      );
    }
    return orientationVal === "right" ? 1 : -1;
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

function* grahamScan(graph: Graph): IterableIterator<GrahamStep> {
  let P = findLowestY(graph);

  yield {
    codeRow: 1,
    description: {
      type: "Selected",
      description: "Selected the point with the lowest y-coordinate",
    },
    rootNode: P.id,
  };

  let sorted = sortPointsByAngle(P, graph);

  yield {
    codeRow: 2,
    description: {
      type: "Calculated",
      description: "Sorted the points by angle",
    },
    rootNode: P.id,
    labels: new Map(sorted.map((node, idx) => [node.id, "" + idx])),
  };

  let stack: GraphNode[] = [];

  stack.push(sorted[0]);
  stack.push(sorted[1]);

  yield {
    codeRow: 5,
    description: {
      type: "Updated",
      description: "Added the first two points to the stack",
    },
    rootNode: P.id,
    stack: stack.map((node) => node.id),
    variables: {
      stack: stack.map((node) => node.id),
    },
  };

  for (let i = 2; i < sorted.length; i++) {
    while (
      stack.length > 1 &&
      orientation(
        stack[stack.length - 2],
        stack[stack.length - 1],
        sorted[i]
      ) !== "left"
    ) {
      stack.pop();

      yield {
        codeRow: 8,
        description: {
          type: "Updated",
          description: "Removed a point from the stack",
        },
        rootNode: P.id,
        stack: stack.map((node) => node.id),
        variables: {
          stack: stack.map((node) => node.id),
        },
      };
    }
    stack.push(sorted[i]);

    yield {
      codeRow: 9,
      description: {
        type: "Updated",
        description: "Added a point to the stack",
      },
      rootNode: P.id,
      stack: stack.map((node) => node.id),
      variables: {
        stack: stack.map((node) => node.id),
      },
    };
  }

  yield {
    codeRow: 10,
    description: {
      type: "Finished",
      description: "Finished the algorithm",
    },
    rootNode: P.id,
    stack: stack.map((node) => node.id),
    variables: {
      stack: stack.map((node) => node.id),
    },
  };
}

export const grahamScanInfo = {
  algorithmName: "Graham Scan",
  algorithm: grahamScan,
  pseudoCode: grahamScanPseudoCode,
};
