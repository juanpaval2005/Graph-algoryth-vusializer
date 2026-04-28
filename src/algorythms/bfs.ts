import { Graph } from "../graph";
import type { AlgorithmStep, NodeState } from "./types";

export function bfs(graph: Graph, startId: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const nodeStates = new Map<string, NodeState>();
    const queue: string[] = [];
    const visitOrder: string[] = [];   // orden en que se visitan los nodos

    // Inicializar todos los nodos como "unvisited"
    for (const nodeId of graph.nodes.keys()) {
        nodeStates.set(nodeId, "unvisited");
    }

    // Estado inicial: meter el startId a la cola
    nodeStates.set(startId, "in-queue");
    queue.push(startId);

    // Guardar primer paso
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [...queue],
        description: `Inicio BFS desde ${startId}`,
        currentNode: null
    });

    // Loop principal
    while (queue.length > 0) {
        const currentId = queue.shift();
        if (currentId === undefined) break;

        // Marcar como "visiting"
        nodeStates.set(currentId, "visiting");
        visitOrder.push(currentId);   // registrar el orden de visita

        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [...queue],
            description: `Visitando ${currentId}`,
            currentNode: currentId
        });

        // Iterar vecinos
        const neighbors = graph.getNeighbors(currentId);
        for (const neighbor of neighbors) {
            if (nodeStates.get(neighbor.id) === "unvisited") {
                nodeStates.set(neighbor.id, "in-queue");
                queue.push(neighbor.id);
            }
        }

        // Marcar como "visited"
        nodeStates.set(currentId, "visited");
        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [...queue],
            description: `Marcando ${currentId} como visitado`,
            currentNode: null
        });
    }

    // Paso final con orden de visita
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [],
        description: `BFS completado. Orden de visita: ${visitOrder.join(" → ")}`,
        currentNode: null
    });

    return steps;
}