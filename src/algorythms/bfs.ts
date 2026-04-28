import { Graph } from "../graph";
import type { AlgorithmStep, NodeState } from "./types";

export function bfs(graph: Graph, startId: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const nodeStates = new Map<string, NodeState>();
    const queue: string[] = [];

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
        // TODO 1: sacar el primer elemento de la cola con shift().
       
        const currentId = queue.shift();
        if (currentId === undefined) break;

        // TODO 2: marcar currentId como "visiting"
        // (una sola línea: actualizar nodeStates)

        nodeStates.set(currentId, "visiting");


        // TODO 3: guardar el paso "Visitando {currentId}"
        // (similar al primer paso, pero con currentNode = currentId)
        steps.push({
        nodeStates: new Map(nodeStates),
        queue: [...queue],
        description: `Visitando ${currentId}`,
        currentNode: currentId
    });

        // Iterar vecinos
        const neighbors = graph.getNeighbors(currentId);
        for (const neighbor of neighbors) {
            // TODO 4: si el vecino está "unvisited", marcarlo como "in-queue"
            // y meterlo a la cola. Si ya tiene otro estado, no hacer nada.

            if (nodeStates.get(neighbor.id) === "unvisited") {
                nodeStates.set(neighbor.id, "in-queue");
                queue.push(neighbor.id);
            }


        }

        // TODO 5: marcar currentId como "visited" y guardar el paso
        // "Marcando {currentId} como visitado"
        nodeStates.set(currentId, "visited");
        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [...queue],
            description: `Marcando ${currentId} como visitado`,
            currentNode: null
        });

    }

    // Paso final
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [],
        description: "BFS completado",
        currentNode: null
    });

    return steps;
}