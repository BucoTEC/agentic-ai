import express from "express";
const router = express.Router();
import {
	singIn,
	register,
	confirmRegister,
} from "../controllers/authControllers.js";

import { body, validationResult } from "express-validator";

const errorResponse = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

router.get("/", body("email").isEmail(), errorResponse, singIn);
router.get("/confirm/:token", confirmRegister);
router.post("/", register);

export default router;
