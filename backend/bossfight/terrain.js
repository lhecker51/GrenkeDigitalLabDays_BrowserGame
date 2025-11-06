
const { Engine, Render, Runner, Bodies, World } = Matter;

const engine = Engine.create();
const world = engine.world;
const canvas = document.getElementById("arena");
const width = canvas.width;
const height = canvas.height;
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

Render.run(render);
Runner.run(Runner.create(), engine);

// Arena Platformen hinzufügen
const platformLeft = Bodies.rectangle(150, 500, 125, 25, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});
const platformRight = Bodies.rectangle(650, 500, 125, 25, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});
const platformTop = Bodies.rectangle(400, 350, 150, 25, {
    isStatic: true,
    render: { fillStyle: "#2ecc71" }
});
World.add(world, platformLeft);
World.add(world, platformRight);
World.add(world, platformTop);
//
//Adding walls around everywhere but the floor
const rightWall = Bodies.rectangle(775, 0, 50, 1200, {
    isStatic: true,
    render: { fillStyle: "rgb(0, 0, 0)" }
});
World.add(world, rightWall);
const leftWall = Bodies.rectangle(25, 0, 50, 1200, {
    isStatic: true,
    render: { fillStyle: "rgb(0, 0, 0)" }
});
World.add(world, leftWall);

//Adding player
const playerHealth = 5;
for (let i = 0; i < playerHealth; i++) {
    const healthIndicator = Bodies.circle(30 +i*40, 30, 15, {
        isStatic: true,
        isSensor: true,
            render: { fillStyle: "rgb(255 0 25)" }
    });
    World.add(world, healthIndicator);
}

const player = Bodies.rectangle(400, 200, 50, 50, {
    render: { fillStyle: "#3498db" }
});



World.add(world, player);


