const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const ROLES = ["user", "admin"];

const userSchema = new mongoose.Schema(
	{
		username: { type: String, required: true, trim: true, unique: true },
		email: {
			type: String,
			required: true,
			trim: true,
			unique: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			minlength: [8, "La contraseña debe de tener un mínimo de 8 caracteres"],
		},
		role: { type: String, enum: ROLES, default: "user" },
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

// Hooks o middleware de Mongoose
userSchema.pre("save", async function () {
	if (!this.isModified("password")) {
		return;
	}
	// Salt rounds
	this.password = await bcrypt.hash(this.password, 10);
});

const User = mongoose.model("User", userSchema);

module.exports = User;
