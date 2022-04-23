import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const authVerificator = (req, res, next) => {
	if (!req.headers.authorization) {
		throw new Error("No token found");
	}

	const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
	if (!token) {
		throw new Error("Authentication failed!");
	}
	const decodedToken = jwt.verify(token, tokenSecret);
	req.userData = {
		userId: decodedToken.userId,
		userEmail: decodedToken.email,
		isAdmin: decodedToken.isAdmin,
	};
	next();
};

export default authVerificator;
