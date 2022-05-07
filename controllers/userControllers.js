import "express-async-errors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

import User from "#root/models/user/userModel.js";
import ResError from "#root/utils/ResError.js";

dotenv.config();

// const tokenSecret = process.env.JWT_SECRET;

export const getAllUsers = async (req, res) => {
	const { isAdmin } = req.userData;
	if (!isAdmin) {
		throw new Error(403, "You are not authorized to view all users");
	}
	const allUsers = await User.find();
	if (allUsers.length < 1) {
		throw new ResError(404, "No users in database");
	}
	res.status(200).json({ message: "All users", data: allUsers });
};

export const getSingleUser = async (req, res) => {
	const { id } = req.params;
	const { userId, isAdmin } = req.userData;
	const user = await User.findById(id);
	if (!user) {
		throw new ResError(404, "No user with this id");
	}
	if (user._id == userId || isAdmin) {
		return res.status(200).json({ message: "Your requested user", data: user });
	}
	throw new ResError(403);
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	const { userId, isAdmin } = req.userData;

	if (id == userId || isAdmin) {
		await User.findByIdAndDelete(id);
		return res.status(204).json({ message: "Deleted user successfuly" });
	}
	throw ResError(403, "You are not authorized do to that");
};

// TODO GENERATE UPDATED TOKEN
export const updateUser = async (req, res) => {
	const { id } = req.params;
	const { userId, isAdmin } = req.userData;

	if (id == userId || isAdmin) {
		if (req.body.password) {
			req.body.password = await bcrypt.hash(req.body.password, 12);
		}

		if (req.body.email) {
			req.body.emailConfirmed = false;
		}

		const updatedUser = await User.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true }
		);

		return res.status(201).json({
			message: "User updated successfully",
			data: {
				username: updatedUser.username,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
			},
		});
	}
	throw ResError(403, "You are not authorized do to that");
};
