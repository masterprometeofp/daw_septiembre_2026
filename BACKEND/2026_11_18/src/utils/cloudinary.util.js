const cloudinary = require("../config/cloudinary");

const deleteImgCloudinary = async (publicId) => {
	if (!publicId) {
		return;
	}

	try {
		await cloudinary.uploader.destroy(publicId);
	} catch (error) {
		console.error("Cloudinary no pudo eliminar la imagen con el id", publicId);
	}
};

module.exports = deleteImgCloudinary;
