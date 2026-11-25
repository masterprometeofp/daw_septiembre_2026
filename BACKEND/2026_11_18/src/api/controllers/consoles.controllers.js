const createError = require("../../utils/createError");
const Console = require("../models/console.model");

// GET ALL: devuelve todas las consolas
const getAllConsoles = async (req, res, next) => {
  try {
    // find() sin filtro devuelve todos los documentos de la colección
    const consoles = await Console.find();
    // Respondemos con código 200 y el array de consolas
    return res.status(200).json(consoles);
  } catch (error) {
    // Si algo falla, pasamos el error al middleware de errores
    return next(error);
  }
};
// GET BY ID: devuelve una consola por su id
const getConsoleById = async (req, res, next) => {
  try {
    // Sacamos el id de los parámetros de la URL
    const { id } = req.params;
    // Buscamos la consola con ese _id
    const consoleFound = await Console.findById(id);

    // Si no existe ninguna consola con ese id, enviamos un error 404
    if (!consoleFound) {
      return next(createError("Consola no encontrada", 404));
    }

    // Si existe, respondemos con código 200 y la consola
    return res.status(200).json(consoleFound);
  } catch (error) {
    // Si el id no tiene un formato válido, Mongoose lanza un CastError
    return next(error);
  }
};
// CREATE: crea una consola nueva
const createConsole = async (req, res, next) => {
  try {
    // Creamos un documento nuevo con los datos del body
    const newConsole = new Console(req.body);
    // Lo validamos y lo guardamos en la base de datos
    const createdConsole = await newConsole.save();
    // Respondemos con código 201 (Created) y la consola guardada
    return res.status(201).json(createdConsole);
  } catch (error) {
    // Si los datos no cumplen el esquema, Mongoose lanza un ValidationError
    return next(error);
  }
};
const updateConsole = async (req, res, next) => {
  try {
    // Sacamos el id de los parámetros de la URL
    const { id } = req.params;
    // Buscamos la consola por su id y le aplicamos los cambios del body
    const updatedConsole = await Console.findByIdAndUpdate(id, req.body, {
      // Devuelve el documento ya modificado (por defecto devolvería el anterior)
      new: true,
      // Aplica las validaciones del esquema también al actualizar
      runValidators: true,
    });

    // Si no existe ninguna consola con ese id, enviamos un error 404
    if (!updatedConsole) {
      return next(createError("Consola no encontrada", 404));
    }

    // Respondemos con la consola modificada
    return res.status(200).json(updatedConsole);
  } catch (error) {
    // Si el id no es válido o los cambios no cumplen el esquema, pasamos el error
    return next(error);
  }
};
// DELETE: elimina una consola
const deleteConsole = async (req, res, next) => {
  try {
    // Sacamos el id de los parámetros de la URL
    const { id } = req.params;
    // Buscamos la consola por su id y la eliminamos
    const deletedConsole = await Console.findByIdAndDelete(id);

    // Si no existía ninguna consola con ese id, enviamos un error 404
    if (!deletedConsole) {
      return next(createError("Consola no encontrada", 404));
    }

    // Respondemos con la consola eliminada
    return res.status(200).json(deletedConsole);
  } catch (error) {
    // Si el id no tiene un formato válido, pasamos el error
    return next(error);
  }
};
// Exportamos todos los controladores para usarlos en las rutas
module.exports = {
  getAllConsoles,
  getConsoleById,
  createConsole,
  updateConsole,
  deleteConsole,
};