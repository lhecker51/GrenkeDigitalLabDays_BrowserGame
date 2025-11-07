const { Engine, Render, Runner, Bodies, World } = Matter;

let currentDirection = 1;
let onGround = true;
let floor;

const playerHealth = 5;

//maximale geschwindigkeiten
const maxX = 5

const engine = Engine.create();
const world = engine.world;
const canvas = document.getElementById("arena");
const width = canvas.width;
const height = canvas.height;
const platformWidth = 125;
const platformHeight = 25;
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
//Creating boundaries and platform
const platformLeft = Bodies.rectangle(width*0.15, height*0.85, platformWidth, platformHeight, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});
platformLeft.type = floor
const platformRight = Bodies.rectangle(width*0.85, height*0.85, platformWidth, platformHeight, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});
const platformTop = Bodies.rectangle(width*0.5, height*0.65, platformWidth, platformHeight, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});
const rightWall = Bodies.rectangle(width-25, 0, 50, 1200, {
    isStatic: true,
    render: { fillStyle: "rgb(0, 0, 0)" }
});
const leftWall = Bodies.rectangle(25, 0, 50, 1200, {
    isStatic: true,
    render: { fillStyle: "rgb(0, 0, 0)" }
});
const player = Bodies.rectangle(width*0.5, height*0.4, 50, 50, {
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
    //Adding walls around everywhere but the floor
    World.add(world, rightWall);
    World.add(world, leftWall);
    World.add(world, player);
    addHealthBar()
}

function gamePlayLoop() {
}

//Adding player
function addHealthBar() {
    for (let i = 0; i < playerHealth; i++) {
        const healthIndicator = Bodies.circle(80 +i*40, 30, 15, {
            isStatic: true,
            isSensor: true,
            render: { fillStyle: "rgb(255 0 25)" }
        });
        World.add(world, healthIndicator);
    }
}

document.body.addEventListener('keydown', ev => checkInput(ev.key))

function checkInput(input) {
    switch (input) {
        case 'w' : jump(); break;
        case 'a' : moveLeft(); break;
        case 'd' : moveRight(); break;
        case 'x' : dash();break;
    }
}

function jump() {
    Matter.Body.applyForce(player, player.position, {x: 0, y:-0.13});
}
function moveRight() {
    if (player.velocity.x < maxX) {
        Matter.Body.applyForce(player, player.position,
            {
                x: 0.05,
                y: 0
            });
        document.getElementById("debug_text").textContent = player.velocity.x.toString();
    }
    currentDirection = 1;
}
function moveLeft() {
    if (player.velocity.x > -maxX) {
        Matter.Body.applyForce(player, player.position, {x: -0.05, y: 0});
    }
    currentDirection = -1;
}
function dash() {
    Matter.Body.applyForce(player, player.position, {x: currentDirection*0.15, y:0});
}
addTerrain()


