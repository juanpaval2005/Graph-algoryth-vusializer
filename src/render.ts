import { Graph } from "./graph";

export class GraphRenderer {
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private graph: Graph;

    //constantes de estilo

    private readonly NODE_RADIUS = 25;
    private readonly NODE_COLOR = "#083a5b";
    private readonly NODE_BORDER = "#86c0e7";
    private readonly EDGE_COLOR = "#86c0e7";
    private readonly TEXT_COLOR = "#ffffff";

    constructor(canvas: HTMLCanvasElement, graph: Graph) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d")!;
        this.graph = graph;
    }

    render(): void {

        // Limpiar el canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Dibujar aristas PRIMERO (para que queden debajo de los nodos)
        this.drawEdges();

        // Dibujar nodos encima
        this.drawNodes();
    }

    private drawEdges(): void {
        for (const edge of this.graph.edges) {
            const fromNode = this.graph.nodes.get(edge.from);
            const toNode = this.graph.nodes.get(edge.to);
            
            if (!fromNode || !toNode) continue;
            
            this.ctx.beginPath();
            this.ctx.moveTo(fromNode.x, fromNode.y);
            this.ctx.lineTo(toNode.x, toNode.y);
            this.ctx.strokeStyle = this.EDGE_COLOR;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
        }
    }


     private drawNodes(): void {
        for (const node of this.graph.nodes.values()) {
            // Círculo del nodo
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, this.NODE_RADIUS, 0, Math.PI * 2);
            this.ctx.fillStyle = this.NODE_COLOR;
            this.ctx.fill();
            this.ctx.strokeStyle = this.NODE_BORDER;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();
            
            // Texto del label
            this.ctx.fillStyle = this.TEXT_COLOR;
            this.ctx.font = "bold 16px sans-serif";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(node.label, node.x, node.y);
        }
    }


}    