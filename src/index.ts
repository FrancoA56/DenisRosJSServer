import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

// Montar el router en /api
app.use("/api", router);

// Iniciar el servidor
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});