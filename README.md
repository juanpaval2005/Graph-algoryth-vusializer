# Graph-algoryth-vusializer
BFS, DFS and Dijkstra algorythm program for trees graphs navegation (pattern recognition).


// Limpiar todo el canvas (importante hacerlo antes de redibujar)
ctx.clearRect(0, 0, canvas.width, canvas.height);

// Dibujar una línea (de un punto A a un punto B)
ctx.beginPath();
ctx.moveTo(x1, y1);
ctx.lineTo(x2, y2);
ctx.strokeStyle = "#888";   // color del trazo
ctx.lineWidth = 2;
ctx.stroke();

// Dibujar un círculo (relleno + borde)
ctx.beginPath();
ctx.arc(x, y, radio, 0, Math.PI * 2);
ctx.fillStyle = "#1f6feb";  // color de relleno
ctx.fill();
ctx.strokeStyle = "#fff";
ctx.lineWidth = 2;
ctx.stroke();

// Dibujar texto
ctx.fillStyle = "#fff";
ctx.font = "16px sans-serif";
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.fillText("A", x, y);