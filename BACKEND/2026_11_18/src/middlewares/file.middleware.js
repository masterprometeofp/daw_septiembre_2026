const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		folder: "videogames",
		allowed_formats: ["jpg", "png", "gif", "webp", "jpeg"],
	},
});

const upload = multer({ storage });

module.exports = upload;
