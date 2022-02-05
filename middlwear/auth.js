import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const tokenSecret = process.env.TOKEN_SECRET;

const authVerificator = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Authorization: 'Bearer TOKEN'
  if (!token) {
    throw new Error("Authentication failed!");
  }
  const decodedToken = jwt.verify(token, tokenSecret);
  req.userData = { userId: decodedToken.userId, userEmail: decodedToken.email };
  next();
};

export default authVerificator;
