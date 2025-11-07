"use strict";

import {PlayerObject} from "./utils.js";

const canvas = document.getElementById('maze_canvas')
const context = canvas.getContext("2d")
let playerObjects = []
let field
let cellSize

export class visualiser {
    static reset() {
        playerObjects = []
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    static setMaze(maze) {
        field = maze
    }

    static visualizeMaze() {
        const rows = field.length;
        const cols = field[0].length;

        const minCellSize = 10;
        const preferredCellSize = 30;
        const maxViewportRatio = 0.8;

        const maxViewportWidth = window.innerWidth * maxViewportRatio;
        const maxViewportHeight = window.innerHeight * maxViewportRatio;

        cellSize = Math.min(
            maxViewportWidth / cols,
            maxViewportHeight / rows,
            preferredCellSize
        );

        cellSize = Math.max(minCellSize, cellSize);

        canvas.width = cols * cellSize;
        canvas.height = rows * cellSize;

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const char = field[y][x];
                switch (char.toUpperCase()) {
                    case 'X':
                        context.fillStyle = '#3e2353';
                        break;
                    case 'S':
                        context.fillStyle = '#A53E36';
                        break;
                    case 'E':
                        context.fillStyle = '#93B56CD9';
                        break;
                    case ' ':
                        context.fillStyle = '#DDAECE';
                        break;
                    default:
                        context.fillStyle = '#ddd'; //
                }
                context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
                context.strokeStyle = '#fbf8be';
                context.strokeRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
    }

    static addPlayerObject(startingPosition, isHumanPlayer) {
        playerObjects.push(new PlayerObject(startingPosition, isHumanPlayer ? "#d000a0" : "#204080"))
    }

    static movePlayerObjects(directions) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.visualizeMaze()

        let i = 0
        for (let playerObject of playerObjects) {
            switch (directions[i]) {
                case "U":
                    playerObject.position.y--;
                    break
                case "D":
                    playerObject.position.y++;
                    break
                case "L":
                    playerObject.position.x--;
                    break
                case "R":
                    playerObject.position.x++;
                    break
                case " ":
                    break
            }

            context.fillStyle = playerObject.colour
            context.arc(
                (playerObject.position.x + 0.5) * cellSize,
                (playerObject.position.y + 0.5) * cellSize,
                cellSize * 0.4,
                0,
                Math.PI * 2
            )
            context.fill()

            i++
        }
    }
}
