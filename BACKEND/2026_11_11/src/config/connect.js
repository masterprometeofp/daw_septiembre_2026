const mongoose = require("mongoose");

// Nuestro string de conexión con MongoAtlas viene de nuestra variable de entorno MONGO_URI
const connect = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log("Conectado con la base de datos ✅");
	} catch (error) {
		console.error("Error conectando con la base de datos ❌", error.message);
	}
};

module.exports = connect;
