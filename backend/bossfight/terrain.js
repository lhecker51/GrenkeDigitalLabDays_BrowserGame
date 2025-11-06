
const { Engine, Render, Runner, Bodies, World } = Matter;

const engine = Engine.create();
const world = engine.world;
const canvas = document.getElementById("arena");
// 3️⃣ Renderer (Canvas) erstellen
const render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
        width: 800,
        height: 600,
        wireframes: false,  // echte Farben statt Drahtgitter
        background: "#f0f0f0"
    }
});

Render.run(render);
Runner.run(Runner.create(), engine);

// 4️⃣ Ein fallendes Rechteck hinzufügen
const box = Bodies.rectangle(400, 200, 80, 80, {
    render: { fillStyle: "#3498db" }
});
World.add(world, box);

// 5️⃣ Einen Boden hinzufügen (damit es nicht endlos fällt)
const ground = Bodies.rectangle(400, 580, 810, 40, {
    isStatic: true, // bewegt sich nicht
    render: { fillStyle: "#2ecc71" }
});
World.add(world, ground);

