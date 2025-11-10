const { Engine, Render, Runner, Bodies, World } = Matter;

let currentDirection = 1;
let onGround = true;
let dashTimer = 0
let floor = 'floor';

const maxPlayerHealth = 5
const healthTokens = [maxPlayerHealth]
let playerHealth = maxPlayerHealth;

let keys = {
    w: false,
    a: false,
    d: false,
    x: false
}

//maximale geschwindigkeiten
const maxX = 8
const xSpeed = 0.0025
const jumpForce = 0.025
const wormForceUp = 0.0325
const wormForceDown = 0.025
//I-Frames
let iFrames = 0;
const maxIFrames = 30;

const engine = Engine.create();
const world = engine.world;
const canvas = document.getElementById("arena");
const width = canvas.width;
const height = canvas.height;
const platformWidth = width*0.125;
const platformHeight = height*0.025;

const startX = width*0.5
const startY = height*0.4

document.getElementById("start_robin").ondblclick = gamePlayLoop
document.getElementById("stop_robin").onclick = startGameOver
// Renderer (Canvas) erstellen
const render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
        width: canvas.width,
        height: canvas.height,
        wireframes: false,  // echte Farben statt Drahtgitter
        background: "#f0f0f0"
    }
});
const dashIndicator = Bodies.circle(80, 75, 15, {
    isStatic: true,
    isSensor: true,
    render: {
        fillStyle: "rgb(255 255 0)"
    }
});

const wormWidth = 300;
const wormHeight = 100;
const wormBody = Bodies.rectangle(width, height*1/2, wormWidth, wormHeight, {
    isStatic: false,
    isSensor: true,
    render: {
        fillStyle: "rgb(150 100 100)"
    }
})


//Creating boundaries and platform
const platformLeft = Bodies.rectangle(width*0.15, height*0.85, platformWidth, platformHeight, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});

const platformRight = Bodies.rectangle(width*0.85, height*0.85, platformWidth, platformHeight, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});

const platformTop = Bodies.rectangle(width*0.5, height*0.65, platformWidth, platformHeight, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});

const firePlatform = Bodies.rectangle(0, height, width*2, 25, {
    isStatic: true,
        render: { fillStyle: "rgb(255, 0, 0)" }
})

const rightWall = Bodies.rectangle(width-25, 0, 50, height*2, {
    isStatic: true,
    render: { fillStyle: "rgb(0, 0, 0)" }
});
const leftWall = Bodies.rectangle(25, 0, 50, height*2, {
    isStatic: true,
    render: { fillStyle: "rgb(0, 0, 0)" }
});
const player = Bodies.rectangle(startX, startY, 50, 50, {
    render: { fillStyle: "#3498db" }
});

Render.run(render);
Runner.run(Runner.create(), engine);


//Adds all necessary terrain for gameplay
function addTerrain() {
    //Arena Platformen hinzufügen
    World.add(world, platformLeft);
    World.add(world, platformRight);
    World.add(world, platformTop);
    World.add(world, firePlatform);
    platformLeft.type = floor
    platformRight.type = floor;
    platformTop.type = floor;
    //Adding walls around everywhere but the floor
    World.add(world, rightWall);
    World.add(world, leftWall);
    World.add(world, player);
    World.add(world, wormBody);
    addHealthBar()
}


function gamePlayLoop() {
    document.getElementById("container_robin").style.display = 'block';
    addTerrain()
    document.body.addEventListener('keydown', ev => {
        processKeyClick(ev);
    })
    Matter.Events.on(engine, "beforeUpdate", () => {
        checkInput()
        collisionDetector()
        dashManager()
        moveBossUpDown()
        if (iFrames > 0) iFrames--

    })
    document.body.addEventListener('keyup', ev => closeKeyClick(ev))

}
gamePlayLoop()

//Adding player
function addHealthBar() {
    for (let i = 0; i < maxPlayerHealth; i++) {
        const healthIndicator = Bodies.circle(80 + i * 40, 30, 15, {
            isStatic: true,
            isSensor: true,
            render: {
                fillStyle: "rgb(255 0 25)"
            }
        });
        if (i < playerHealth) {
            healthIndicator.render.fillStyle = "rgb(255 0 25)"
        } else {
            healthIndicator.render.fillStyle = "rgb(10, 10, 10)"
        }
        World.add(world, healthIndicator);
        healthTokens[i] = healthIndicator;
    }
    World.add(world, dashIndicator)
}
function updateHealthBar() {
    for (let i = 0; i < healthTokens.length; i++) {
        if (i >= playerHealth) {
            healthTokens[i].render.fillStyle = "rgb(10, 10, 10)"
        }
    }
}


function processKeyClick(e) {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = true;
    }
}
function closeKeyClick(e) {
    const key = e.key.toLowerCase();
    if (key in keys) {
        keys[key] = false;
    }
}

function checkInput() {
    if (keys.w) jump();
    if (keys.a) moveLeft();
    if (keys.x) dash();
    if (keys.d) moveRight();
}

function jump() {
    if (onGround === true) {
        Matter.Body.applyForce(player, player.position, {x: 0, y:-jumpForce});
        onGround = false;
    }

}
function moveRight() {
    if (player.velocity.x < maxX) {
        Matter.Body.applyForce(player, player.position,
            {
                x: xSpeed,
                y: 0
            });
    }
    currentDirection = 1;
}
function moveLeft() {
    if (player.velocity.x > -maxX) {
        Matter.Body.applyForce(player, player.position, {x: -xSpeed, y: 0});
    }
    currentDirection = -1;
}
function dash() {
    if (dashTimer === 0)  {
        Matter.Body.applyForce(player, player.position, {x: currentDirection*0.07, y:0});
        dashTimer = 100;
    }

}

function collisionDetector() {
    if (Matter.SAT.collides(player, platformTop)) {
        onGround = true;
    } else if (Matter.SAT.collides(player, platformRight)) {
        onGround = true;
    } else if (Matter.SAT.collides(player, platformLeft)) {
        onGround = true;
    } else if (Matter.SAT.collides(player, firePlatform)) {
        manageHit()
        resetPosition()

    }
}
function resetPosition() {
    Matter.Body.applyForce(player, player.position, {x: 0, y: -jumpForce*2} );
}

function manageHit() {
    if (iFrames === 0) {
        playerHealth--
        updateHealthBar();
        iFrames = maxIFrames;
        if (playerHealth <= 0) {
            startGameOver()
        }
    }
}
function startGameOver() {
    document.getElementById("container_robin").style.display = 'none';
    playerHealth = maxPlayerHealth

}

function debug(text) {
    document.getElementById("debug_text").textContent += text;
}

function dashManager() {
    let redValue = 255 - dashTimer*2
    let greenValue = 255 - dashTimer*2
    dashIndicator.render.fillStyle = "rgb(" + redValue + ", " + greenValue + ", 0)"
    if (dashTimer > 0) dashTimer--;
}
let goingUp = true;
const upperBound = 100
const lowerBound = height - 325
function moveBossUpDown() {
    if (goingUp) {
        if(wormBody.position.y > upperBound) {
            Matter.Body.applyForce(wormBody, wormBody.position, {x: 0, y: -wormForceUp});
        } else {
            goingUp = false;
        }
    } else {
        if(wormBody.position.y < lowerBound) {
            Matter.Body.applyForce(wormBody, wormBody.position, {x: 0, y: -wormForceDown});
        } else {
            goingUp = true;
        }
    }

}

