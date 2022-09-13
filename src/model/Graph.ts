export interface GraphNode {
  id: string;
  outConnections: Connection[];
  visited: boolean;
}

export interface Connection {
  from: GraphNode;
  to: GraphNode;
  weight: number;
}

export interface Graph {
  [key: string]: GraphNode;
}
