// Importamos dotenv y lo arrancamos
require("dotenv").config();
// Importaciones
const express = require("express");
const connect = require("./src/config/connect");
const consolesRouter = require("./src/api/routes/consoles.routes");
const videogamesRouter = require("./src/api/routes/videogames.router");

// Nos conectamos con la base de datos
connect();
// Definimos el puerto
const PORT = process.env.PORT;
// Creamos el servidor y le añadimos el middleware para poder leer JSON en las peticiones
const server = express();
server.use(express.json());
// Rutas
server.get("/", (req, res) => {
	return res
		.status(200)
		.json({ message: "API REST de Videojuegos y Consolas" });
});
server.use("/consoles", consolesRouter);
server.use("/videogames", videogamesRouter);
// Middleware de rutas no encontradas
server.use((req, res) => {
	return res.status(404).json({message: "Route not found"})
});
// Middleware de errores generales
server.use((error, req, res) => {
	return res.status(error.status || 500).json({
		message: error.message,
	});
});
// Levantamos el servidor
server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT} 🛜`);
});
