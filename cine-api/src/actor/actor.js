import { ObjectId } from "mongodb";

// Esquema actor
export function Actor(data) {
    return {
        _id: data._id ? new ObjectId(data._id) : new ObjectId(),
        idPelicula: data.idPelicula || "",
        nombre: data.nombre || "",
        edad: parseInt(data.edad) || 0,
        estaRetirado: data.estaRetirado === true || data.estaRetirado === "true",
        premios: Array.isArray(data.premios) ? data.premios : []
    };
}
