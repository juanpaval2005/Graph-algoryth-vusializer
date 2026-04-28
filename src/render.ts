import { Graph } from "./graph";
import type { AlgorithmStep, NodeState } from "./algorythms/types";

export class GraphRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private graph: Graph;

    private readonly NODE_RADIUS = 25;
    private readonly TEXT_COLOR = "#ffffff";

    // Colores según estado del nodo
    private readonly COLORS = {
        unvisited: { fill: "#21262d", border: "#484f58" },
        "in-queue": { fill: "#1f6feb", border: "#58a6ff" },
        visiting:  { fill: "#bf8700", border: "#f0a500" },
        visited:   { fill: "#1a7f37", border: "#3fb950" },
        current:   { fill: "#bc4c00", border: "#fb8500" },
    };

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.graph = graph;
    }

    setGraph(graph: Graph): void {
        this.graph = graph;
    }

    // Dibuja el grafo SIN paso (todos los nodos en gris)
    render(): void {
        this.renderWithStep(null);
    }

    // Dibuja el grafo APLICANDO un paso del algoritmo
    renderWithStep(step: AlgorithmStep | null): void {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawEdges();
        this.drawNodes(step);
        if (step?.peso) this.drawDistances(step);
    }

    private drawEdges(): void {
        for (const edge of this.graph.edges) {
            const fromNode = this.graph.nodes.get(edge.from);
            const toNode = this.graph.nodes.get(edge.to);
            if (!fromNode || !toNode) continue;

            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.strokeStyle = "#484f58";
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Peso de la arista
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            this.ctx.fillStyle = "#8b949e";
            this.ctx.font = "12px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText(String(edge.weight), midX, midY - 5);
        }
    }

    private drawNodes(step: AlgorithmStep | null): void {
        for (const node of this.graph.nodes.values()) {
            const state: NodeState = step?.nodeStates.get(node.id) ?? "unvisited";
            const isCurrent = step?.currentNode === node.id;
            const colors = isCurrent ? this.COLORS.current : this.COLORS[state];

            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, this.NODE_RADIUS, 0, Math.PI * 2);
            this.ctx.fillStyle = colors.fill;
            this.ctx.fill();
            this.ctx.strokeStyle = colors.border;
            this.ctx.lineWidth = isCurrent ? 4 : 2;
            this.ctx.stroke();

            this.ctx.fillStyle = this.TEXT_COLOR;
            this.ctx.font = "bold 16px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(node.label, node.x, node.y);
        }
    }

    private drawDistances(step: AlgorithmStep): void {
        if (!step.peso) return;
        for (const node of this.graph.nodes.values()) {
            const dist = step.peso.get(node.id);
            if (dist === undefined) continue;
            const text = dist === Infinity ? "∞" : String(dist);
            this.ctx.fillStyle = "#79c0ff";
            this.ctx.font = "bold 12px monospace";
            this.ctx.textAlign = "center";
            this.ctx.fillText(text, node.x, node.y - this.NODE_RADIUS - 8);
        }
    }
}