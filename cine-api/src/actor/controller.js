import { ObjectId } from "mongodb";
import { Actor } from "./actor.js";

const DB_NAME = "cine-db";
const COLLECTION = "actores";

// Agregar actor
export async function handleInsertActorRequest(req, res) {
    const db = req.app.locals.db;
    const data = Actor(req.body);

    try {
        const pelicula = await db.collection("peliculas").findOne({ nombre: data.nombrePelicula });

        if (!pelicula) {
            return res.status(404).json({ error: "Película no encontrada para asignar al actor" });
        }

        data.idPelicula = pelicula._id.toString();
        delete data.nombrePelicula;


        const result = await db.collection(COLLECTION).insertOne(data);
        res.status(201).json(result);
    } catch (err) {
        console.error("Error al insertar actor:", err.message);
        res.status(500).json({ error: "No se pudo insertar el actor" });
    }
}

// Obtener todos los actores
export async function handleGetActoresRequest(req, res) {
    const db = req.app.locals.db;

    try {
        const actores = await db.collection(COLLECTION).find({}).toArray();
        res.json(actores);
    } catch (err) {
        res.status(500).json({ error: "No se pudieron obtener los actores" });
    }
}

// Obtener actor por ID
export async function handleGetActorByIdRequest(req, res) {
    const db = req.app.locals.db;
    const id = req.params.id;

    try {
        const actor = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });
        if (!actor) return res.status(404).json({ error: "Actor no encontrado" });

        res.json(actor);
    } catch (err) {
        res.status(400).json({ error: "ID inválido" });
    }
}

// Obtener actores por ID de película
export async function handleGetActoresByPeliculaRequest(req, res) {
    const db = req.app.locals.db;
    const idPelicula = req.params.pelicula;

    try {
        const actores = await db.collection(COLLECTION).find({ idPelicula }).toArray();
        res.json(actores);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener actores de la película" });
    }
}
