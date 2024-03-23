import { DataSet } from "vis-data/peer/esm/vis-data";
import { Edge } from "vis-network";
import { Node, Position } from "vis-network/peer/esm/vis-network";

export class GraphNode {
  id: number;
  x?: number;
  y?: number;
  visited: boolean;

  constructor(id: number, x?: number, y?: number) {
    this.id = id;
    this.visited = false;
    this.x = x;
    this.y = y;
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

  onMoveCallbacks: ((data: { [nodeId: string]: Position }) => void)[] = [];

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
        label: edge.weight.toString(),
      });
    });
  }

  neighbours(from: GraphNode): [GraphNode, number][] {
    return this.edges
      .filter((edge) => edge.from.id === from.id)
      .map((edge) => [edge.to, edge.weight]);
  }

  clearEdges() {
    this.edges_dataset.clear();
    this.edges = [];
  }

  updatePosition(data: { [nodeId: string]: Position }) {
    Object.entries(data).forEach(([id, position]) => {
      const node = this.nodes.find((node) => node.id === parseInt(id));
      if (!node) throw new Error("Node not found");
      node.x = position.x;
      node.y = position.y;
    });

    this.onMoveCallbacks.forEach((callback) => callback(data));
  }

  clearLabels() {
    this.nodes_dataset.forEach((node) => {
      this.nodes_dataset.update({
        id: node.id,
        label: "",
      });
    });
  }

  clearEdgesLabels() {
    this.edges_dataset.forEach((edge) => {
      this.edges_dataset.update({
        id: edge.id,
        label: "",
      });
    });
  }

  disableMovement() {
    this.nodes_dataset.forEach((node) => {
      this.nodes_dataset.update({
        id: node.id,
        fixed: true,
      });
    });
  }
}
