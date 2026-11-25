const express = require("express");
const {
	getAllVideogames,
	getVideogameById,
	createVideogame,
	updateVideogame,
	deleteVideogame,
} = require("../controllers/videogames.controllers");
const isAuth = require("../../middlewares/auth.middleware");
const upload = require("../../middlewares/file.middleware");

const router = express.Router();

router.get("/", getAllVideogames);
router.get("/:id", getVideogameById);
router.post("/", isAuth(["admin"]), upload.single("cover"), createVideogame);
router.put("/:id", isAuth(["admin"]), upload.single("cover"), updateVideogame);
router.delete("/:id", isAuth(["admin"]), deleteVideogame);

module.exports = router;
