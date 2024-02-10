import {Nodes, Edges, Layouts} from "v-network-graph"

export interface Graph {
  id: string,
  name?: string,
  description?: string,
  created_at?: string,
  updated_at?: string,
  nodes: Nodes,
  edges: Edges,
  layouts: Layouts
}
