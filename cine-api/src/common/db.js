import { MongoClient } from "mongodb";

const uri = "mongodb+srv://admin:6wlKUftQMfVmnXXM@eva-u3-express.c57kgik.mongodb.net/?retryWrites=true&w=majority&appName=eva-u3-express";
const client = new MongoClient(uri);

export async function connectDB() {
    try {
        await client.connect();
        console.log("[MongoDB] Connected to Atlas successfully.");
        return client.db("cine-db");
    } catch (err) {
        console.error("[MongoDB] Connection failed:", err.message);
        throw err;
    }
}

export { client };