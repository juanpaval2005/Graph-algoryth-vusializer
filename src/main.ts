import "./style.css";
import { Graph } from "./graph";
import { GraphRenderer } from "./render";


// Crear el grafo
const g = new Graph(false);

g.addNode({ id: "A", x: 200, y: 150, label: "A" });
g.addNode({ id: "B", x: 500, y: 150, label: "B" });
g.addNode({ id: "C", x: 350, y: 300, label: "C" });
g.addNode({ id: "D", x: 200, y: 450, label: "D" });
g.addNode({ id: "E", x: 500, y: 450, label: "E" });

g.addEdge({ from: "A", to: "B", weight: 1 });
g.addEdge({ from: "A", to: "C", weight: 2 });
g.addEdge({ from: "B", to: "C", weight: 3 });
g.addEdge({ from: "C", to: "D", weight: 4 });
g.addEdge({ from: "C", to: "E", weight: 5 });
g.addEdge({ from: "D", to: "E", weight: 6 });

// Crear el renderer
const canvas = document.getElementById("graph-canvas") as HTMLCanvasElement;
const renderer = new GraphRenderer(canvas, g);

// Dibujar
renderer.render();

import { bfs } from "./algorythms/bfs";
// Ejecutar BFS desde A
const pasos = bfs(g, "A");
console.log(`BFS generó ${pasos.length} pasos:`);

pasos.forEach((paso, i) => {
    console.log(`\nPaso ${i}: ${paso.description}`);
    console.log(`  Cola: [${paso.queue.join(", ")}]`);
    console.log(`  Nodo actual: ${paso.currentNode}`);
    console.log(`  Estados:`, Object.fromEntries(paso.nodeStates));
});

// Exponer en window para experimentar
(window as any).g = g;
(window as any).renderer = renderer;
(window as any).bfs = bfs;
(window as any).pasos = pasos;

import { dfs } from "./algorythms/dfs";

const pasosDfs = dfs(g, "A");
console.log(`\nDFS generó ${pasosDfs.length} pasos:`);
pasosDfs.forEach((paso, i) => {
    console.log(`Paso ${i}: ${paso.description}`);
});
(window as any).dfs = dfs;

import { dijkstra } from "./algorythms/dijkstra";

const pasosDijkstra = dijkstra(g, "A");
console.log(`\nDijkstra generó ${pasosDijkstra.length} pasos:`);
pasosDijkstra.forEach((paso, i) => {
    console.log(`Paso ${i}: ${paso.description}`);
});
console.log("Distancias finales:", Object.fromEntries(pasosDijkstra[pasosDijkstra.length - 1].peso!));
(window as any).dijkstra = dijkstra;