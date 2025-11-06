"use strict"

import {generator} from "./generator.js"
import {solver} from "./solver.js"
import {RandomStrategy} from "./strategies/random.js"
import {SemiRandomStrategy} from "./strategies/semi_random.js"
import {HoldLeftStrategy} from "./strategies/hold_left.js"
import {HoldRightStrategy} from "./strategies/hold_right.js"
import {DfsStrategy} from "./strategies/directed_dfs.js"
import {visualiser} from "./display.js"

document.getElementById("play_maze_btn").onclick = play

let tickRate = 400  // milliseconds
const opponent_strategies = [
    new RandomStrategy(),
    new SemiRandomStrategy(),
    new HoldLeftStrategy(),
    new HoldRightStrategy(),
    new DfsStrategy()
]

let lastPressedKey = "w"
document.onkeydown = (e) => {
    lastPressedKey = e.key
}

function play() {
    const maze = generator.generateWilson(25)
    let opponent_paths = []
    for (let strategy of opponent_strategies) {
        opponent_paths.push(solver.solve(maze, strategy))
    }

    visualiser.visualizeMaze(maze)
}
