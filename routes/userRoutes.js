import express from "express";
const router = express.Router();
import {
	getAllUsers,
	getSingleUser,
	deleteUser,
	updateUser,
} from "#root/controllers/userControllers.js";

import { noBody, validateUpdateUser } from "#root/utils/validation.js";

router.get("/", noBody, getAllUsers);

router.get("/:id", noBody, getSingleUser);

router.patch("/:id", validateUpdateUser, updateUser);

router.delete("/:id", noBody, deleteUser);

export default router;
