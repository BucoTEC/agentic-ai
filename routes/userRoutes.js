import express from "express";
const router = express.Router();
import {
	getAllUsers,
	getSingleUser,
	deleteUser,
	updateUser,
} from "../controllers/userControllers.js";

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/:id", updateUser);

router.delete("/:id", deleteUser);

export default router;
