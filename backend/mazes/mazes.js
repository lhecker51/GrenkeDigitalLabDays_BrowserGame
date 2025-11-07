"use strict"

import {generator} from "./generator.js"
import {solver} from "./solver.js"
import {RandomStrategy} from "./strategies/random.js"
import {SemiRandomStrategy} from "./strategies/semi_random.js"
import {HoldLeftStrategy} from "./strategies/hold_left.js"
import {HoldRightStrategy} from "./strategies/hold_right.js"
import {DfsStrategy} from "./strategies/directed_dfs.js"
import {visualiser} from "./display.js"

document.getElementById("start_emilia").onclick = play
document.getElementById("stop_emilia").onclick = stop

let tickRate = 400  // milliseconds
let isRunning = false
let tick = 0
let playerPosition
let maze
let opponent_paths = []
const opponent_strategies = [
    new RandomStrategy(),
    new SemiRandomStrategy(),
    new SemiRandomStrategy(),
    new SemiRandomStrategy(),
    new HoldLeftStrategy(),
    new HoldRightStrategy(),
    new DfsStrategy()
]

let lastPressedKey = "w"
document.onkeydown = (e) => {
    if (e.key === "w" || e.key === "a" || e.key === "s" || e.key === "d") {
        lastPressedKey = e.key
    }
}

function stop() {
    isRunning = false
    visualiser.reset()
}

function play() {
    opponent_paths = []
    visualiser.reset()
    isRunning = true
    tick = 0

    maze = generator.generateWilson(25)
    const startingPosition = solver.getStartingPosition(maze)
    visualiser.setMaze(maze)

    visualiser.addPlayerObject(startingPosition, true)
    playerPosition = startingPosition
    for (let strategy of opponent_strategies) {
        opponent_paths.push(solver.solve(maze, strategy))
        visualiser.addPlayerObject(startingPosition, false)
    }

    const playerWon = processTick()
}

function processTick() {
    document.getElementById("debug").textContent += " debug"

    let playerDirection = calculatePlayerDirection()
    let playerWon = adjustPlayerPosition(playerDirection)

    let directions = [playerDirection]
    for (let opponent_path of opponent_paths) {
        if (tick >= opponent_path.length) {
            return false
        }
        directions.push(opponent_path[tick])
    }

    visualiser.movePlayerObjects(directions)
    if (playerWon) return true

    tick++
    if (isRunning) setTimeout(processTick, tickRate)
}

function calculatePlayerDirection() {
    console.log(maze)
    console.log(playerPosition)
    let environment = solver.getEnvironment(maze, playerPosition)
    return checkDirection(environment, lastPressedKey) ? getDirectionFromKey(lastPressedKey) : " "
}

function getDirectionFromKey(key) {
    switch (key) {
        case "w": return "U"
        case "a": return "L"
        case "s": return "D"
        case "d": return "R"
    }
}

function checkDirection(environment, direction) {
    switch (direction) {
        case "w": return environment.u !== "X"
        case "s": return environment.d !== "X"
        case "a": return environment.l !== "X"
        case "d": return environment.r !== "X"
    }
}

function adjustPlayerPosition(direction) {
    switch (direction) {
        case "U": playerPosition.y--; break
        case "D": playerPosition.y++; break
        case "L": playerPosition.x--; break
        case "R": playerPosition.x++; break
        case " ": break
    }
    return maze[playerPosition.y][playerPosition.x] === "E"
}
