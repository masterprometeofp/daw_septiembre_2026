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
// Importamos el isAuth para proteger que las llamadas de edición solo las puedan ejecutar los admin
const isAuth = require("../../middlewares/auth.middleware");

// Creamos un nuevo router
const router = express.Router();

// Creamos las rutas del router
router.get("/", getAllConsoles);
router.get("/:id", getConsoleById);
router.post("/", isAuth(["admin"]), createConsole);
router.put("/:id", isAuth(["admin"]), updateConsole);
router.delete("/:id", isAuth(["admin"]), deleteConsole);

module.exports = router;
