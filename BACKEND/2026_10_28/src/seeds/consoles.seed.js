// Permite ejecutar dotenv sin necesidar de pasar por todo el proyecto, incluyendo el index
require("dotenv").config({ quiet: true });

const mongoose = require("mongoose");
const connect = require("../config/connect");
const Console = require("../api/models/console.model");

const consoles = [
	{
		name: "PlayStation 5",
		brand: "Sony",
		releaseYear: 2020,
		type: "Home",
		mediaFormat: "Mixed",
		storageGB: 825,
	},
	{
		name: "Xbox Series X",
		brand: "Microsoft",
		releaseYear: 2020,
		type: "Home",
		mediaFormat: "Mixed",
		storageGB: 1000,
	},
	{
		name: "Nintendo Switch",
		brand: "Nintendo",
		releaseYear: 2017,
		type: "Hybrid",
		mediaFormat: "Cartridge",
		storageGB: 32,
	},
	{
		name: "Nintendo Switch 2",
		brand: "Nintendo",
		releaseYear: 2025,
		type: "Hybrid",
		mediaFormat: "Cartridge",
		storageGB: 256,
	},
	{
		name: "Steam Deck",
		brand: "Valve",
		releaseYear: 2022,
		type: "Portable",
		mediaFormat: "Digital",
		storageGB: 512,
	},
];

const seedConsoles = async () => {
	try {
		await connect();
		await Console.deleteMany({});
		await Console.insertMany(consoles);
		console.log(`${consoles.length} consolas insertadas`);
	} catch (error) {
		console.error("Error insertando consolas", error.message);
	} finally {
		await mongoose.disconnect();
	}
};

seedConsoles();
