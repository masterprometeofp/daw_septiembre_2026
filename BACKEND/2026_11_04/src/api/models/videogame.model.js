const mongoose = require("mongoose");
const { validate } = require("./console.model");

const GENRES = [
	"Action",
	"Adventure",
	"RPG",
	"Shooter",
	"Sports",
	"Racing",
	"Strategy",
	"Simulation",
	"Platform",
	"Puzzle",
	"Horror",
	"Indie",
	"Other",
];

const PEGI_VALUES = [3, 7, 12, 16, 18];

const videogameSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, trim: true },
		studio: { type: String, trim: true, default: "Unknown Studio" },
		releaseYear: { type: Number, required: false, min: 1990, max: 2100 },
		genre: { type: String, enum: GENRES, default: "Other" },
		pegi: { type: Number, enum: PEGI_VALUES, default: 12 },
		price: { type: Number, min: 0, default: 0 },
		rating: { type: Number, min: 0, max: 10, default: 0 },
		multiplayer: { type: Boolean, default: false },
		stock: { type: Number, min: 0, default: 0 },
		cover: {
			type: String,
			trim: true,
			default:
				"https://res.cloudinary.com/dwkafwila/image/upload/v1772654099/400x600_lwcdfb.png",
		},
		consoles: [{ type: mongoose.Schema.Types.ObjectId, ref: "Console" }],
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

const Videogame = mongoose.model("Videogame", videogameSchema);
module.exports = Videogame;
