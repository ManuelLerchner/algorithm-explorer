import { Network, Node } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data";
import { Edge } from "vis-network";

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

  nodes_dataset: DataSet<Node> = new DataSet();
  edges_dataset: DataSet<Edge> = new DataSet();

  constructor(nodes: GraphNode[] = [], edges: Connection[] = []) {
    this.nodes = nodes;
    this.edges = edges;

    this.nodes.forEach((node) => {
      this.nodes_dataset.add({
        id: node.id,
        label: node.id.toString(),
      });
    });

    this.edges.forEach((edge) => {
      this.edges_dataset.add({
        from: edge.from.id,
        to: edge.to.id,
      });
    });
  }

  neighbours(from: GraphNode): GraphNode[] {
    return this.edges
      .filter((edge) => edge.from === from)
      .map((edge) => edge.to);
  }
}
