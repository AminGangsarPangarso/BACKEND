import JwtService from "../services/jwt.service";
import { BadTokenError } from "../utils/apiError"

const authMiddleware = async (req, res, next) => {
	try {
		const token = JwtService.jwtGetToken(req);
		const user = JwtService.jwtVerify(token);
		req.user = user;
		return next();
	} catch (error) {
		next(new BadTokenError())
	}
};

export default authMiddleware;
