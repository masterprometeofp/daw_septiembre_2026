const Videogame = require("../models/videogame.model");
const createError = require("../../utils/createError");
// GET ALL: devuelve todos los videojuegos
const getAllVideogames = async (req, res, next) => {
	try {
		// find() sin filtro devuelve todos los documentos de la colección
		const videogames = await Videogame.find().populate("consoles", "name brand");
		// Respondemos con código 200 y el array de videojuegos
		return res.status(200).json(videogames);
	} catch (error) {
		// Si algo falla, pasamos el error al middleware de errores
		return next(error);
	}
};

// GET BY ID: devuelve un videojuego por su id
const getVideogameById = async (req, res, next) => {
	try {
		// Sacamos el id de los parámetros de la URL
		const { id } = req.params;
		// Buscamos el videojuego con ese _id
		const videogame = await Videogame.findById(id).populate("consoles");

		// Si no existe ningún videojuego con ese id, enviamos un error 404
		if (!videogame) {
			return next(createError("Videojuego no encontrado", 404));
		}

		// Si existe, respondemos con código 200 y el videojuego
		return res.status(200).json(videogame);
	} catch (error) {
		// Si el id no tiene un formato válido, pasamos el error
		return next(error);
	}
};

// CREATE: crea un videojuego nuevo
const createVideogame = async (req, res, next) => {
	try {
		// Creamos un documento nuevo con los datos del body
		const newVideogame = new Videogame(req.body);
		// Lo validamos y lo guardamos en la base de datos
		const createdVideogame = await newVideogame.save();
		// Respondemos con código 201 (Created) y el videojuego guardado
		return res.status(201).json(createdVideogame);
	} catch (error) {
		// Si los datos no cumplen el esquema, pasamos el error
		return next(error);
	}
};

// UPDATE: modifica un videojuego existente
const updateVideogame = async (req, res, next) => {
	try {
		// Sacamos el id de los parámetros de la URL
		const { id } = req.params;
		// Buscamos el videojuego por su id y le aplicamos los cambios del body
		const updatedVideogame = await Videogame.findByIdAndUpdate(id, req.body, {
			// Devuelve el documento ya modificado
			new: true,
			// Aplica las validaciones del esquema también al actualizar
			runValidators: true,
		});

		// Si no existe ningún videojuego con ese id, enviamos un error 404
		if (!updatedVideogame) {
			return next(createError("Videojuego no encontrado", 404));
		}

		// Respondemos con el videojuego modificado
		return res.status(200).json(updatedVideogame);
	} catch (error) {
		// Si el id no es válido o los cambios no cumplen el esquema, pasamos el error
		return next(error);
	}
};

// DELETE: elimina un videojuego
const deleteVideogame = async (req, res, next) => {
	try {
		// Sacamos el id de los parámetros de la URL
		const { id } = req.params;
		// Buscamos el videojuego por su id y lo eliminamos
		const deletedVideogame = await Videogame.findByIdAndDelete(id);

		// Si no existía ningún videojuego con ese id, enviamos un error 404
		if (!deletedVideogame) {
			return next(createError("Videojuego no encontrado", 404));
		}

		// Respondemos con el videojuego eliminado
		return res.status(200).json(deletedVideogame);
	} catch (error) {
		// Si el id no tiene un formato válido, pasamos el error
		return next(error);
	}
};

// Exportamos todos los controladores para usarlos en las rutas
module.exports = {
	getAllVideogames,
	getVideogameById,
	createVideogame,
	updateVideogame,
	deleteVideogame,
};
