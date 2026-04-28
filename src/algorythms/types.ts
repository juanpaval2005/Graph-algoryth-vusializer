// Estado de un nodo durante la ejecución de un algoritmo
export type NodeState = "unvisited" | "in-queue" | "visiting" | "visited";

// Una "foto" del estado del algoritmo en un momento dado
export interface AlgorithmStep {
    nodeStates: Map<string, NodeState>;   // estado de cada nodo en este paso
    queue: string[];                       // estado actual de la cola (BFS) o pila (DFS)
    description: string;                   // descripción legible para mostrar al usuario
    currentNode: string | null;            // qué nodo se está procesando AHORA
}