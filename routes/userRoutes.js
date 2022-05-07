import express from "express";
const router = express.Router();
import {
	getAllUsers,
	getSingleUser,
	deleteUser,
	updateUser,
} from "#root/controllers/userControllers.js";

import { noBody } from "#root/utils/validation.js";

router.get("/", noBody, getAllUsers);

router.get("/:id", noBody, getSingleUser);

router.patch("/:id", updateUser);

router.delete("/:id", noBody, deleteUser);

export default router;
