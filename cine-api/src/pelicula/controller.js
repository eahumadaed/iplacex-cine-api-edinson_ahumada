import { ObjectId } from "mongodb";
import { Pelicula } from "./pelicula.js";

const DB_NAME = "cine-db";
const COLLECTION_NAME = "peliculas";

// Agregar película
export async function handleInsertPeliculaRequest(req, res) {
    const db = req.app.locals.db;
    const nuevaPelicula = Pelicula(req.body);

    try {
        const result = await db.collection(COLLECTION_NAME).insertOne(nuevaPelicula);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error al insertar película:", err.message);
        res.status(500).json({ error: "No se pudo insertar la película" });
    }
}

// Obtener todas las películas
export async function handleGetPeliculasRequest(req, res) {
    const db = req.app.locals.db;

    try {
        const peliculas = await db.collection(COLLECTION_NAME).find({}).toArray();
        res.json(peliculas);
    } catch (err) {
        console.error("Error al obtener películas:", err.message);
        res.status(500).json({ error: "No se pudieron obtener las películas" });
    }
}

// Obtener película por ID
export async function handleGetPeliculaByIdRequest(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;

    try {
        const pelicula = await db.collection(COLLECTION_NAME).findOne({ _id: new ObjectId(id) });
        if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });

        res.json(pelicula);
    } catch (err) {
        console.error("ID mal formado:", err.message);
        res.status(400).json({ error: "ID inválido" });
    }
}

// Actualizar película por ID
export async function handleUpdatePeliculaByIdRequest(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;
    const datos = req.body;

    try {
        const result = await db.collection(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: datos }
        );

        if (result.matchedCount === 0)
            return res.status(404).json({ error: "Película no encontrada para actualizar" });

        res.json({ mensaje: "Película actualizada correctamente" });
    } catch (err) {
        console.error("Error al actualizar película:", err.message);
        res.status(400).json({ error: "ID inválido o datos incorrectos" });
    }
}

// Eliminar película por ID
export async function handleDeletePeliculaByIdRequest(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;

    try {
        const result = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0)
            return res.status(404).json({ error: "Película no encontrada para eliminar" });

        res.json({ mensaje: "Película eliminada exitosamente" });
    } catch (err) {
        console.error("Error al eliminar película:", err.message);
        res.status(400).json({ error: "ID inválido" });
    }
}
