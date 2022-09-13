export class GraphNode {
  id: number;
  visited: boolean;

  constructor(id: number) {
    this.id = id;
    this.visited = false;
  }
}

export class Connection {
  from: GraphNode;
  to: GraphNode;
  weight: number;

  constructor(from: GraphNode, to: GraphNode, weight: number) {
    this.from = from;
    this.to = to;
    this.weight = weight;
  }
}

export class Graph {
  nodes: GraphNode[];
  edges: Connection[];

  constructor(nodes: GraphNode[] = [], edges: Connection[] = []) {
    this.nodes = nodes;
    this.edges = edges;
  }

  neighbours(from: GraphNode): GraphNode[] {
    return this.edges
      .filter((edge) => edge.from === from)
      .map((edge) => edge.to);
  }
}
