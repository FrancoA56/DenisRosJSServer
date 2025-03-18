import express from "express";
import router from "./routes";
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';

dotenv.config();

const app = express();
app.use(express.json());

// Configura CORS
app.use(
  cors({
    origin: ['http://localhost:8080','http://localhost:3001'], // Permite solicitudes desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
  })
);

// Montar el router en /api
app.use("/api", router);

// Iniciar el servidor
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


