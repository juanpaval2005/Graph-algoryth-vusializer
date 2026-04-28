import { Graph } from "../graph";
import type { AlgorithmStep, NodeState } from "./types";

export function dijkstra(graph: Graph, startId: string): AlgorithmStep[] {
    const steps: AlgorithmStep[] = [];
    const nodeStates = new Map<string, NodeState>();
    const peso = new Map<string, number>();
    const visited = new Set<string>();

    // Inicializar: todas las distancias en infinito, excepto el origen
    for (const nodeId of graph.nodes.keys()) {
        nodeStates.set(nodeId, "unvisited");
        peso.set(nodeId, Infinity);
    }
    peso.set(startId, 0);
    nodeStates.set(startId, "in-queue");

    // Primer paso
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [],
        description: `Inicio Dijkstra desde ${startId}. Distancia 0.`,
        currentNode: null,
        peso: new Map(peso)
    });

    while (visited.size < graph.nodes.size) {
        // Encontrar el nodo NO visitado con MENOR distancia
        let currentId: string | null = null;
        let minDist = Infinity;

        for (const [nodeId, dist] of peso.entries()) {
            if (!visited.has(nodeId) && dist < minDist) {
                minDist = dist;
                currentId = nodeId;
            }
        }

        // Si no hay nodo alcanzable, terminamos
        if (currentId === null) break;

        // Marcar como "visiting"
        nodeStates.set(currentId, "visiting");
        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [],
            description: `Visitando ${currentId} (distancia ${minDist})`,
            currentNode: currentId,
            peso: new Map(peso)
        });

        // Revisar vecinos y actualizar distancias
        const edges = graph.getEdgesFrom(currentId);
        for (const edge of edges) {
            if (visited.has(edge.to)) continue;

            const newDist = minDist + edge.weight;
            const oldDist = peso.get(edge.to) ?? Infinity;

            if (newDist < oldDist) {
                peso.set(edge.to, newDist);
                nodeStates.set(edge.to, "in-queue");
                steps.push({
                    nodeStates: new Map(nodeStates),
                    queue: [],
                    description: `Actualizar ${edge.to}: distancia ${oldDist === Infinity ? "∞" : oldDist} → ${newDist}`,
                    currentNode: currentId,
                    peso: new Map(peso)
                });
            }
        }

        // Marcar como visitado
        visited.add(currentId);
        nodeStates.set(currentId, "visited");
        steps.push({
            nodeStates: new Map(nodeStates),
            queue: [],
            description: `${currentId} marcado como visitado (distancia final: ${minDist})`,
            currentNode: null,
            peso: new Map(peso)
        });
    }

    // Paso final
    steps.push({
        nodeStates: new Map(nodeStates),
        queue: [],
        description: "Dijkstra completado",
        currentNode: null,
        peso: new Map(peso)
    });

    return steps;
}