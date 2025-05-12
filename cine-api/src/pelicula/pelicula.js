import { ObjectId } from "mongodb";

// Schema películas
export function Pelicula(data) {
    return {
        _id: data._id ? new ObjectId(data._id) : new ObjectId(),
        nombre: data.nombre || "",
        generos: Array.isArray(data.generos) ? data.generos : [],
        anioEstreno: parseInt(data.anioEstreno) || 0
    };
}
