// Importamos dotenv y lo arrancamos
require("dotenv").config();
const express = require("express");
const connect = require("./src/config/connect");

// Nos conectamos con la base de datos
connect();
// Definimos el puerto
const PORT = process.env.PORT;
// Creamos el servidor y le añadimos el middleware para poder leer JSON en las peticiones
const server = express();
server.use(express.json());

// Ruta de prueba
server.get("/", (req, res) => {
	return res.status(200).json({ message: "API REST de prueba" });
});

// Levantamos el servidor
server.listen(PORT, () => {
	console.log(`Servidor escuchando en http://localhost:${PORT} 🛜` );
});
