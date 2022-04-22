import User from "../models/userModel.js";
import "express-async-errors";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// const tokenSecret = process.env.TOKEN_SECRET;

export const getAllUsers = async (req, res) => {
	const allUsers = await User.find();
	if (allUsers.length < 1) {
		throw new Error("No users in database");
	}
	res.json(allUsers);
};

export const getSingleUser = async (req, res) => {
	const { id } = req.params;
	const user = await User.findById(id);
	if (!user) {
		throw new Error("No user with this id");
	}
	res.json(user);
};

export const deleteUser = async (req, res) => {
	const { id } = req.params;
	if (id !== req.userData.userId) {
		throw Error("You are not authorized do to that");
	}
	await User.findByIdAndDelete(id);
	res.json("Deleted user succesfuly");
};

// export const updateUser =  async(req,res)=>{
//   const {id} = req.params
//   const updatedUser
// }
//TODO need to add bycrip for passeord encription and JWT for auth
