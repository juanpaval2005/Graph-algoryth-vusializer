import { Graph } from "../graph";
import type { AlgorithmStep, NodeState } from "./types";

export function dfs(graph: Graph, startId: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const nodeStates = new Map<string, NodeState>();
    const stack: string[] = [];
    const visitOrder: string[] = [];   // orden en que se visitan los nodos

    // Inicializar todos los nodos como "unvisited"
    for (const nodeId of graph.nodes.keys()) {
        nodeStates.set(nodeId, "unvisited");
    }

    // Estado inicial: meter el startId a la pila
    nodeStates.set(startId, "in-queue");
    stack.push(startId);

    // Guardar primer paso
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [...stack],
        description: `Inicio DFS desde ${startId}`,
        currentNode: null
    });

    // Loop principal
    while (stack.length > 0) {
        const currentId = stack.pop();
        if (currentId === undefined) break;

        // Si ya fue visitado (puede pasar en DFS porque agregamos sin chequear), saltar
        if (nodeStates.get(currentId) === "visited") continue;

        // Marcar como "visiting"
        nodeStates.set(currentId, "visiting");
        visitOrder.push(currentId);   // registrar el orden de visita

        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [...stack],
            description: `Visitando ${currentId}`,
            currentNode: currentId
        });

        // Iterar vecinos
        const neighbors = graph.getNeighbors(currentId);
        for (const neighbor of neighbors) {
            if (nodeStates.get(neighbor.id) === "unvisited") {
                nodeStates.set(neighbor.id, "in-queue");
                stack.push(neighbor.id);
            }
        }

        // Marcar como "visited"
        nodeStates.set(currentId, "visited");
        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [...stack],
            description: `Marcando ${currentId} como visitado`,
            currentNode: null
        });
    }

    // Paso final con orden de visita
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [],
        description: `DFS completado. Orden de visita: ${visitOrder.join(" → ")}`,
        currentNode: null
    });

    return steps;
}