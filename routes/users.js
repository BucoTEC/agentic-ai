import express from "express";
const router = express.Router();
import User from "../models/user.js";
import "express-async-errors";

router.get("/", async (req, res) => {
  const allUsers = await User.find();
  if (allUsers.length < 1) {
    throw new Error("No users in database");
  }
  res.json(allUsers);
});

router.post("/", async (req, res) => {
  if (!req.body) {
    throw new Error("Must include payload in req body");
  }
  const newUser = await new User(req.body);
  await newUser.save();

  res.json(newUser);
});

export default router;
