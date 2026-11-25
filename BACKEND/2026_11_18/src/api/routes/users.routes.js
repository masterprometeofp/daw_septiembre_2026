const express = require("express");
const {
	register,
	login,
	getProfile,
} = require("../controllers/users.controllers");
const isAuth = require("../../middlewares/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/profile", isAuth(["user", "admin"]), getProfile);

module.exports = router;
