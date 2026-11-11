require("dotenv").config({ quiet: true });

const connect = require("../config/connect");
const mongoose = require("mongoose");
const Videogame = require("../api/models/videogame.model");

// Si cambian los ids, para inyectar los videojuegos tendremos que cambiar todos estos ids
const CONSOLE_IDS = {
	PS5: "6ae213f4cacbb71f823cab32",
	XBOX: "6ae213f4cacbb71f823cab33",
	SWITCH: "6ae213f4cacbb71f823cab34",
	SWITCH2: "6ae213f4cacbb71f823cab35",
	STEAMDECK: "6ae213f4cacbb71f823cab36",
};
const videogames = [
	{
		title: "Marvel's Spider-Man 2",
		studio: "Insomniac Games",
		releaseYear: 2023,
		genre: "Action",
		pegi: 16,
		price: 79.99,
		rating: 9.3,
		multiplayer: false,
		stock: 18,
		consoles: [CONSOLE_IDS.PS5],
	},
	{
		title: "God of War Ragnarök",
		studio: "Santa Monica Studio",
		releaseYear: 2022,
		genre: "Action",
		pegi: 18,
		price: 69.99,
		rating: 9.5,
		multiplayer: false,
		stock: 14,
		consoles: [CONSOLE_IDS.PS5],
	},
	{
		title: "Astro Bot",
		studio: "Team Asobi",
		releaseYear: 2024,
		genre: "Platform",
		pegi: 7,
		price: 69.99,
		rating: 9.1,
		multiplayer: false,
		stock: 20,
		consoles: [CONSOLE_IDS.PS5],
	},
	{
		title: "Halo Infinite",
		studio: "343 Industries",
		releaseYear: 2021,
		genre: "Shooter",
		pegi: 16,
		price: 39.99,
		rating: 8.4,
		multiplayer: true,
		stock: 10,
		consoles: [CONSOLE_IDS.XBOX],
	},
	{
		title: "Forza Horizon 5",
		studio: "Playground Games",
		releaseYear: 2021,
		genre: "Racing",
		pegi: 3,
		price: 59.99,
		rating: 9.2,
		multiplayer: true,
		stock: 12,
		consoles: [CONSOLE_IDS.XBOX, CONSOLE_IDS.PS5],
	},
	{
		title: "The Legend of Zelda: Tears of the Kingdom",
		studio: "Nintendo EPD",
		releaseYear: 2023,
		genre: "Adventure",
		pegi: 12,
		price: 69.99,
		rating: 9.6,
		multiplayer: false,
		stock: 25,
		consoles: [CONSOLE_IDS.SWITCH, CONSOLE_IDS.SWITCH2],
	},
	{
		title: "Mario Kart World",
		studio: "Nintendo EPD",
		releaseYear: 2025,
		genre: "Racing",
		pegi: 3,
		price: 79.99,
		rating: 8.6,
		multiplayer: true,
		stock: 30,
		consoles: [CONSOLE_IDS.SWITCH2],
	},
	{
		title: "Donkey Kong Bananza",
		studio: "Nintendo EPD",
		releaseYear: 2025,
		genre: "Platform",
		pegi: 7,
		price: 69.99,
		rating: 9.1,
		multiplayer: false,
		stock: 22,
		consoles: [CONSOLE_IDS.SWITCH2],
	},
	{
		title: "Elden Ring",
		studio: "FromSoftware",
		releaseYear: 2022,
		genre: "RPG",
		pegi: 16,
		price: 59.99,
		rating: 9.6,
		multiplayer: true,
		stock: 16,
		consoles: [CONSOLE_IDS.PS5, CONSOLE_IDS.XBOX, CONSOLE_IDS.STEAMDECK],
	},
	{
		title: "Balatro",
		studio: "LocalThunk",
		releaseYear: 2024,
		genre: "Indie",
		pegi: 12,
		price: 14.99,
		rating: 9.0,
		multiplayer: false,
		stock: 40,
		consoles: [
			CONSOLE_IDS.PS5,
			CONSOLE_IDS.XBOX,
			CONSOLE_IDS.SWITCH,
			CONSOLE_IDS.STEAMDECK,
		],
	},
	{
		title: "Stardew Valley",
		studio: "ConcernedApe",
		releaseYear: 2016,
		genre: "Simulation",
		pegi: 7,
		price: 14.99,
		rating: 9.1,
		multiplayer: true,
		stock: 35,
		consoles: [
			CONSOLE_IDS.PS5,
			CONSOLE_IDS.XBOX,
			CONSOLE_IDS.SWITCH,
			CONSOLE_IDS.STEAMDECK,
		],
	},
];

const seedVideogames = async () => {
	try {
		await connect();
		await Videogame.deleteMany({});
		await Videogame.insertMany(videogames);
		console.log(`${videogames.length} videojuegos insertados`);
	} catch (error) {
		console.error("Error insertando videojuegos", error.message);
	} finally {
		await mongoose.disconnect();
	}
};

seedVideogames();
