const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const createError = require("../utils/createError");

const ALLOWED_TYPES = ["image/jpg", "image/png", "image/webp", "image/gif"];

const multerUpload = multer({
	storage: multer.memoryStorage(),
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		if (!ALLOWED_TYPES.includes(file.mimetype)) {
			return cb(createError("Formato no permitido: solo jpg, png, webp y gif"));
		}
		return cb(null, true);
	},
});

const uploadToCloudinary = (buffer, folder) => {
	return new Promise((resolve, reject) => {
		const stream = cloudinary.uploader.upload_stream(
			{ folder },
			(error, result) => {
				if (error) {
					return reject(error);
				}
				return resolve(result);
			},
		);
		stream.end(buffer);
	});
};

const uploadImage = (fieldName, folder) => {
	multerUpload.single(fieldName);
	async (req, res, next) => {
		try {
			if (!req.file) {
				return next();
			}
			const result = await uploadToCloudinary(req.file.buffer, folder);
			req.file.url = result.secure_url;
			req.file.publicId = result.publicId;
			return next();
		} catch (error) {
			return next(error);
		}
	};
};

module.exports = uploadImage