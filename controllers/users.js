import User from "../models/user.js";
import "express-async-errors";
import bcrypt from "bcrypt";

export const getAllUsers = async (req, res) => {
  const allUsers = await User.find();
  if (allUsers.length < 1) {
    throw new Error("No users in database");
  }
  res.json(allUsers);
};

export const creatUser = async (req, res) => {
  const { username, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log(!!existingUser);
    throw Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  await newUser.save();

  res.json(newUser);
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
  await User.findByIdAndDelete(id);
  res.json("Deleted user succesfuly");
};

// export const updateUser =  async(req,res)=>{
//   const {id} = req.params
//   const updatedUser
// }
//TODO need to add bycrip for passeord encription and JWT for auth
