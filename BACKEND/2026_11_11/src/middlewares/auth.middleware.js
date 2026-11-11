const User = require("../api/models/user.model");
const createError = require("../utils/createError");
const { verifyToken } = require("../utils/token");

const isAuth = (allowedRoles = []) => {
	return async (req, res, next) => {
		try {
			const authorization = req.headers.authorization;

			if (!authorization || !authorization.startsWith("Bearer ")) {
				return next(createError("No autorizado", 401));
			}

			const token = authorization.replace("Bearer ", "");
			const decoded = verifyToken(token);
			const user = await User.findById(decoded.id).select("-password");
			if (!user) {
				return next(createError("No autorizado", 401));
			}
			if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
				return next(createError("No autorizado por rol", 401));
			}

            req.user = user;
            return next()
		} catch (error) {
            return next(createError("No autorizado", 401))
        }
	};
};

module.exports = isAuth;
