# Graph-algoryth-vusializer
BFS, DFS and Dijkstra algorythm program for trees graphs navegation (pattern recognition).

Conclusión:

En la presente practica, se realizo la creación de un programa de reconocimiento de patrones o navegación de grafos.
Al ejecutar el programa, se muestra una interfaz en la que el usuario puede interactuar con el programa para probar distintos algoritmos de reconocimiento de patrones, como BFS, DFS y el algoritmo de dijkstra.

    Funcionmiento logico del proyecto:
    Gracias a los conocimientos adquiridos durante el curso de Logica de programación y Programación orientada a objetos (POO), decidi realizar es



//jsons de ejemplo
    // grafo tipo arbol
            {
        "nodes": [
            { "id": "1", "x": 400, "y": 60,  "label": "1" },
            { "id": "2", "x": 200, "y": 180, "label": "2" },
            { "id": "3", "x": 600, "y": 180, "label": "3" },
            { "id": "4", "x": 100, "y": 320, "label": "4" },
            { "id": "5", "x": 300, "y": 320, "label": "5" },
            { "id": "6", "x": 500, "y": 320, "label": "6" },
            { "id": "7", "x": 700, "y": 320, "label": "7" }
        ],
        "edges": [
            { "from": "1", "to": "2", "weight": 1 },
            { "from": "1", "to": "3", "weight": 1 },
            { "from": "2", "to": "4", "weight": 1 },
            { "from": "2", "to": "5", "weight": 1 },
            { "from": "3", "to": "6", "weight": 1 },
            { "from": "3", "to": "7", "weight": 1 }
        ]
        }

//Grafo complejo

      {
  {
  "nodes": [
    { "id": "1", "x": 100, "y": 100, "label": "1" },
    { "id": "2", "x": 350, "y": 80,  "label": "2" },
    { "id": "3", "x": 600, "y": 100, "label": "3" },
    { "id": "4", "x": 200, "y": 280, "label": "4" },
    { "id": "5", "x": 450, "y": 280, "label": "5" },
    { "id": "6", "x": 700, "y": 280, "label": "6" },
    { "id": "7", "x": 350, "y": 450, "label": "7" }
  ],
  "edges": [
    { "from": "1", "to": "2", "weight": 4 },
    { "from": "1", "to": "4", "weight": 2 },
    { "from": "2", "to": "3", "weight": 3 },
    { "from": "2", "to": "5", "weight": 5 },
    { "from": "3", "to": "6", "weight": 2 },
    { "from": "4", "to": "5", "weight": 6 },
    { "from": "4", "to": "7", "weight": 8 },
    { "from": "5", "to": "6", "weight": 4 },
    { "from": "5", "to": "7", "weight": 3 },
    { "from": "6", "to": "7", "weight": 5 }
  ]
}




//notas clave

npm install — para instalar las dependencias después de clonar el repo
npm run dev — para arrancar el servidor de desarrollo (Vite) mientras programas
npm run build — para generar la versión final de producción en dist/