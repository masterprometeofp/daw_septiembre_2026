const express = require("express");
const {
	getAllVideogames,
	getVideogameById,
	createVideogame,
	updateVideogame,
	deleteVideogame,
} = require("../controllers/videogames.controllers");

const router = express.Router();

router.get("/", getAllVideogames);
router.get("/:id", getVideogameById);
router.post("/", createVideogame);
router.put("/:id", updateVideogame);
router.delete("/:id", deleteVideogame);

module.exports = router;
