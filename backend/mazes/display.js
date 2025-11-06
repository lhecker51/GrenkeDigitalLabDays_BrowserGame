"use strict";

export class visualiser {
    static visualizeMaze(field) {
        const canvas = document.getElementById('maze_canvas');
        const ctx = canvas.getContext('2d');

        const rows = field.length;
        const cols = field[0].length;

        const minCellSize = 10;
        const preferredCellSize = 30;
        const maxViewportRatio = 0.8;

        const maxViewportWidth = window.innerWidth * maxViewportRatio;
        const maxViewportHeight = window.innerHeight * maxViewportRatio;

        let cellSize = Math.min(
            maxViewportWidth / cols,
            maxViewportHeight / rows,
            preferredCellSize
        );

        cellSize = Math.max(minCellSize, cellSize);

        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;


        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const char = field[y][x];
                switch (char.toUpperCase()) {
                    case 'X':
                        ctx.fillStyle = '#3e2353';
                        break;
                    case 'S':
                        ctx.fillStyle = '#A53E36';
                        break;
                    case 'E':
                        ctx.fillStyle = '#93B56CD9';
                        break;
                    case ' ':
                        ctx.fillStyle = '#DDAECE';
                        break;
                    default:
                        ctx.fillStyle = '#ddd'; //
                }
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                ctx.strokeStyle = '#fbf8be';
                ctx.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }
}
