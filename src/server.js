import express from "express";
import { config } from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { router } from "./routes/userRoutes.js";

config();

const app = express();

app.use(cors());
app.use(express.json());

app.use(router)

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    console.error("❌ Variável MONGO_URI não definida no arquivo .env");
    process.exit(1);
}

mongoose
    .connect(MONGO_URI)
    .then(() => {
        console.log("✅ Conectado ao banco de dados com sucesso!");

        const server = app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta: http://localhost:${PORT}`);
        });

        server.on("error", (error) => {
            console.error("❌ Erro ao iniciar o servidor:", error.message);
        })
    })
    .catch((error) => {
        console.error("❌ Erro ao conectar no banco de dados", error);
    })