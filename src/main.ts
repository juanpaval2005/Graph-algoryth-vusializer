import "./style.css";
import { Graph } from "./graph";
import type { GraphNode, GraphEdge } from "./graph";
import { GraphRenderer } from "./render";
import { bfs } from "./algorythms/bfs";
import { dfs } from "./algorythms/dfs";
import { dijkstra } from "./algorythms/dijkstra";
import type{ AlgorithmStep } from "./algorythms/types";

// ─── Estado global ──────────────────────────────────────────────────────
let graph: Graph;
let renderer: GraphRenderer;
let steps: AlgorithmStep[] = [];
let currentStepIndex: number = -1;
let playInterval: number | null = null;

// ─── Grafo inicial de ejemplo ──────────────────────────────────────────
const exampleGraph = {
    nodes: [
        { id: "A", x: 200, y: 100, label: "A" },
        { id: "B", x: 500, y: 100, label: "B" },
        { id: "C", x: 350, y: 250, label: "C" },
        { id: "D", x: 200, y: 400, label: "D" },
        { id: "E", x: 500, y: 400, label: "E" }
    ] as GraphNode[],
    edges: [
        { from: "A", to: "B", weight: 1 },
        { from: "A", to: "C", weight: 2 },
        { from: "B", to: "C", weight: 3 },
        { from: "C", to: "D", weight: 4 },
        { from: "C", to: "E", weight: 5 },
        { from: "D", to: "E", weight: 6 }
    ] as GraphEdge[]
};

// ─── Cargar grafo desde un objeto ──────────────────────────────────────
function loadGraph(data: { nodes: GraphNode[]; edges: GraphEdge[] }): void {
    graph = new Graph(false);
    data.nodes.forEach(n => graph.addNode(n));
    data.edges.forEach(e => graph.addEdge(e));
    renderer.setGraph(graph);
    resetSteps();
    renderer.render();
}

// ─── Resetear pasos ────────────────────────────────────────────────────
function resetSteps(): void {
    steps = [];
    currentStepIndex = -1;
    stopPlayback();
    updateUI();
}

// ─── Ejecutar algoritmo ────────────────────────────────────────────────
function runAlgorithm(algoName: "bfs" | "dfs" | "dijkstra"): void {
    const startId = (document.getElementById("start-node") as HTMLInputElement).value.trim();
    if (!graph.nodes.has(startId)) {
        alert(`El nodo "${startId}" no existe en el grafo.`);
        return;
    }

    if (algoName === "bfs") steps = bfs(graph, startId);
    else if (algoName === "dfs") steps = dfs(graph, startId);
    else steps = dijkstra(graph, startId);

    currentStepIndex = 0;

    // Marcar botón activo
    document.querySelectorAll(".algo-btn").forEach(b => b.classList.remove("active"));
    document.getElementById(`btn-${algoName}`)?.classList.add("active");

    showCurrentStep();
}

// ─── Mostrar el paso actual ────────────────────────────────────────────
function showCurrentStep(): void {
    if (currentStepIndex < 0 || currentStepIndex >= steps.length) {
        renderer.render();
        updateUI();
        return;
    }
    const step = steps[currentStepIndex];
    renderer.renderWithStep(step);

    document.getElementById("step-description")!.textContent = step.description;
    updateUI();
}

// ─── Actualizar contadores y estado de botones ─────────────────────────
function updateUI(): void {
    const stepInfo = document.getElementById("step-info")!;
    if (steps.length === 0) {
        stepInfo.textContent = "Selecciona un algoritmo";
    } else {
        stepInfo.textContent = `Paso ${currentStepIndex + 1} / ${steps.length}`;
    }

    (document.getElementById("btn-prev") as HTMLButtonElement).disabled = currentStepIndex <= 0;
    (document.getElementById("btn-next") as HTMLButtonElement).disabled =
        steps.length === 0 || currentStepIndex >= steps.length - 1;
}

// ─── Reproducción automática ───────────────────────────────────────────
function togglePlayback(): void {
    const playBtn = document.getElementById("btn-play")!;
    if (playInterval !== null) {
        stopPlayback();
        playBtn.textContent = "▶ Play";
    } else {
        playBtn.textContent = "⏸ Pausa";
        playInterval = window.setInterval(() => {
            if (currentStepIndex >= steps.length - 1) {
                stopPlayback();
                playBtn.textContent = "▶ Play";
                return;
            }
            currentStepIndex++;
            showCurrentStep();
        }, 800);
    }
}

function stopPlayback(): void {
    if (playInterval !== null) {
        clearInterval(playInterval);
        playInterval = null;
    }
    document.getElementById("btn-play")!.textContent = "▶ Play";
}

// ─── Cargar grafo desde el JSON del editor ─────────────────────────────
function loadGraphFromJson(): void {
    const textarea = document.getElementById("graph-json") as HTMLTextAreaElement;
    const errSpan = document.getElementById("json-error")!;
    errSpan.textContent = "";
    try {
        const parsed = JSON.parse(textarea.value);
        if (!Array.isArray(parsed.nodes) || !Array.isArray(parsed.edges)) {
            throw new Error('JSON debe tener "nodes" y "edges" como arrays.');
        }
        loadGraph(parsed);
    } catch (e) {
        errSpan.textContent = `Error: ${(e as Error).message}`;
    }
}

// ─── Inicialización ────────────────────────────────────────────────────
function init(): void {
    const canvas = document.getElementById("graph-canvas") as HTMLCanvasElement;
    graph = new Graph(false);
    renderer = new GraphRenderer(canvas, graph);

    loadGraph(exampleGraph);

    // Llenar el textarea con el JSON inicial
    (document.getElementById("graph-json") as HTMLTextAreaElement).value =
        JSON.stringify(exampleGraph, null, 2);

    // Conectar botones
    document.getElementById("btn-bfs")!.addEventListener("click", () => runAlgorithm("bfs"));
    document.getElementById("btn-dfs")!.addEventListener("click", () => runAlgorithm("dfs"));
    document.getElementById("btn-dijkstra")!.addEventListener("click", () => runAlgorithm("dijkstra"));

    document.getElementById("btn-prev")!.addEventListener("click", () => {
        stopPlayback();
        if (currentStepIndex > 0) {
            currentStepIndex--;
            showCurrentStep();
        }
    });

    document.getElementById("btn-next")!.addEventListener("click", () => {
        stopPlayback();
        if (currentStepIndex < steps.length - 1) {
            currentStepIndex++;
            showCurrentStep();
        }
    });

    document.getElementById("btn-play")!.addEventListener("click", togglePlayback);
    document.getElementById("btn-load-graph")!.addEventListener("click", loadGraphFromJson);

    updateUI();
}

init();