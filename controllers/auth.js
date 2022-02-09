import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const singIn = async (req, res) => {
  const { username, email, password } = req.body;
  res.json("sing in");
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
