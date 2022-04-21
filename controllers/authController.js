import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const tokenSecret = process.env.TOKEN_SECRET || "hahaha_false_secret";

export const singIn = async (req, res, next) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		next(Error("Wrong credentials, user not found"));
	}
	let validPassword = false;
	validPassword = await bcrypt.compare(password, existingUser.password);

	if (!validPassword) {
		next(Error("Wrong credentials, user not found"));
	}

	const token = jwt.sign(
		{ userId: existingUser.id, email: existingUser.email },
		"supersecret_dont_share",
		{ expiresIn: "1h" }
	);
	res.json({
		token,
		userId: existingUser._id,
		username: existingUser.username,
	});
};

export const creatUser = async (req, res, next) => {
	const { username, email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		next(Error("User already exists"));
	}
	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});
	await newUser.save();

	const token = jwt.sign(
		{ userId: newUser._id, email: newUser.email },
		tokenSecret,
		{ expiresIn: "1h" }
	);

	!token && next();
	res.json({ userId: newUser._id, email: newUser.email, token });
};
