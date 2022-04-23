import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import "express-async-errors";

import User from "../models/userModel.js";
dotenv.config();

const tokenSecret = process.env.JWT_SECRET;

export const singIn = async (req, res) => {
	const { email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (!existingUser) {
		throw new Error("Wrong credentials, user not found");
	}
	let validPassword = false;
	validPassword = await bcrypt.compare(password, existingUser.password);

	if (!validPassword) {
		throw new Error("Wrong credentials, user not found");
	}

	const token = jwt.sign(
		{ userId: existingUser.id, email: existingUser.email },
		tokenSecret
		// { expiresIn: "1h" }
	);
	res.json({
		token,
		userId: existingUser._id,
		username: existingUser.username,
	});
};

export const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	const existingUser = await User.findOne({ email });
	if (existingUser) {
		throw new Error("User already exists");
	}
	const hashedPassword = await bcrypt.hash(password, 12);

	const newUser = new User({
		username,
		email,
		password: hashedPassword,
	});
	await newUser.save();

	const token = jwt.sign(
		{ userId: newUser._id, email: newUser.email, isAdmin: newUser.isAdmin },
		tokenSecret
		// { expiresIn: "1h" } just for dev
	);

	!token && next();
	res.json({ userId: newUser._id, email: newUser.email, token });
};
