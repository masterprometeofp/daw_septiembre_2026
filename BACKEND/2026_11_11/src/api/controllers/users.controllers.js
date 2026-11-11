const User = require("../models/user.model");
const createError = require("../../utils/createError");
const bcrypt = require("bcrypt");
const { createToken } = require("../../utils/token");

const register = async (req, res, next) => {
	try {
		const { username, email, password } = req.body;
		const newUser = new User({ username, email, password });
		await newUser.save();
		return res
			.status(201)
			.json({ message: "Usuario registrado correctamente" });
	} catch (error) {
		return next(error);
	}
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		//Intentamos buscar al user por email
		const user = await User.findOne({ email });
		//Si el usuario no existe arrojamos un error
		if (!user) {
			return next(createError("Email o contraseña incorrecta"));
		}
		//Comparamos la contraseña para ver si la humana es igual a la hasheada en mongo
		const validPassword = await bcrypt.compare(password, user.password);
		//Si está mal arrojamos un error
		if (!validPassword) {
			return next(createError("Email o contraseña incorrecta"));
		}
		//Si todo ha ido bien, creamos el token
		const token = createToken(user._id, user.email);
		return res.status(200).json({ token });
	} catch (error) {
		return next(error);
	}
};

const getProfile = async (req, res, next) => {
	try {
		return res.status(200).json(req.user);
	} catch (error) {
		return next(error);
	}
};

module.exports = { register, login, getProfile };
