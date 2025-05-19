import express from "express";
import cors from "cors";
import { connectDB } from "./src/common/db.js";
import peliculaRoutes from "./src/pelicula/routes.js";
import actorRoutes from "./src/actor/routes.js";

const app = express();
const PORT = process.env.PORT || 3000;


// Midlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", peliculaRoutes);
app.use("/api", actorRoutes);

// Ruta base
app.get("/", (req, res) => {
    res.send("Bienvenido al cine en Iplacex");
});


// Conexión a MongoDB
try {
    const db = await connectDB();
    app.locals.db = db;

    app.listen(PORT, () => {
        console.log(`[Express] Server running at http://localhost:${PORT}`);
    });
} catch (error) {
    console.error("[Startup] Failed to start server:", error.message);
}
