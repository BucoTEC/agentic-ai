import express from "express";
const router = express.Router();

import {
	singIn,
	register,
	confirmRegister,
} from "../controllers/authControllers.js";

import { noBody, errorResponse } from "../utils/validation.js";

import { body, param } from "express-validator";

router.get(
	"/",
	body("email").notEmpty().isEmail(),
	body("password").notEmpty().isString(),
	errorResponse,
	singIn
);
router.get("/confirm/:token", param("token").exists(), noBody, confirmRegister);
router.post("/", register);

export default router;
