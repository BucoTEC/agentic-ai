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

const noBody = (req, res, next) => {
	if (req.body) {
		throw new Error("Body must be empty");
	}

	next();
};

router.get(
	"/",
	body("email").notEmpty().isEmail(),
	body("password").notEmpty().isString(),
	errorResponse,
	singIn
);
router.get("/confirm/:token", noBody, confirmRegister);
router.post("/", register);

export default router;
