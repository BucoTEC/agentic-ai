import express from "express";
const router = express.Router();
import {
	getAllUsers,
	getSingleUser,
	deleteUser,
	updateUser,
} from "#root/controllers/userControllers.js";

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
