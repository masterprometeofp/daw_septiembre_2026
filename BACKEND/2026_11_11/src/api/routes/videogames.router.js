const express = require("express");
const {
	getAllVideogames,
	getVideogameById,
	createVideogame,
	updateVideogame,
	deleteVideogame,
} = require("../controllers/videogames.controllers");
const isAuth = require("../../middlewares/auth.middleware");

const router = express.Router();

router.get("/", getAllVideogames);
router.get("/:id", getVideogameById);
router.post("/", isAuth(["admin"]), createVideogame);
router.put("/:id", isAuth(["admin"]), updateVideogame);
router.delete("/:id", isAuth(["admin"]), deleteVideogame);

module.exports = router;
