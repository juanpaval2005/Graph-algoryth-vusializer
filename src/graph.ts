//aqui estan las dos interfaces que se van a usar para el grafo, la de nodo y la de arista


//nodo
export interface GraphNode {
    id: string;
    x: number;
    y: number;
    label: string;
}
//arista
export interface GraphEdge {
    from: string;
    to: string;
    weight: number;
}

export class Graph {
    nodes: Map<string, GraphNode>;
    edges: GraphEdge[];
    directed: boolean;

    constructor(directed: boolean = false) {
        this.nodes = new Map();
        this.edges = [];
        this.directed = directed;
    }

    addNode(node: GraphNode): void {
        this.nodes.set(node.id, node);
    }

    addEdge(edge: GraphEdge): void {
        if (this.nodes.has(edge.from) && this.nodes.has(edge.to)) {
            this.edges.push(edge);
        } else {
            throw new Error("Both nodes must exist in the graph.");
        }
    }

    removeEdge(edge: GraphEdge): void {
        this.edges = this.edges.filter(e => {
            
            const sameDirection = e.from === edge.from && e.to === edge.to;
            const reverseDirection = e.from === edge.to && e.to === edge.from;
            const isMatch = this.directed
                ? sameDirection
                : sameDirection || reverseDirection;
            return !isMatch;
        });
    }

    removeNode(nodeId: string): void {
        this.nodes.delete(nodeId);
        this.edges = this.edges.filter(e => e.from !== nodeId && e.to !== nodeId);
    }

    getNode(nodeId: string): GraphNode | undefined {
        return this.nodes.get(nodeId);
    }

    getEdgesFrom(nodeId: string): GraphEdge[] {
        return this.edges.filter(e => e.from === nodeId);
    }

    getNeighbors(nodeId: string): GraphNode[] {
        const neighbors: GraphNode[] = [];

        for (const edge of this.edges) {
            let neighborId: string | null = null;

            if (edge.from === nodeId) {
                neighborId = edge.to;

            } else if (!this.directed && edge.to === nodeId) {
                neighborId = edge.from;
            }

            if (neighborId !== null) {
                const neighbor = this.nodes.get(neighborId);
                if (neighbor !== undefined) {
                    neighbors.push(neighbor);
                }
            }
        }

        return neighbors;
    }

}