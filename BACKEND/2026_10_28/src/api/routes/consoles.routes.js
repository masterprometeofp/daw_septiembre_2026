// Importamos express para utilizar un router
const express = require("express");
// Importamos todos los controladores
const {
	getAllConsoles,
	getConsoleById,
	createConsole,
	updateConsole,
	deleteConsole,
} = require("../controllers/consoles.controllers");

// Creamos un nuevo router
const router = express.Router();

// Creamos las rutas del router
router.get("/", getAllConsoles);
router.get("/:id", getConsoleById);
router.post("/", createConsole);
router.put("/:id", updateConsole);
router.delete("/:id", deleteConsole);

module.exports = router;
