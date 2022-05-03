import express from "express";
const router = express.Router();

import {
	singIn,
	register,
	confirmRegister,
} from "../controllers/authControllers.js";

import {
	noBody,
	errorResponse,
	registerSchema,
	joiTest,
} from "../utils/validation.js";

import { param, checkSchema } from "express-validator";

router.get("/", joiTest, singIn);
router.get("/confirm/:token", param("token").exists(), noBody, confirmRegister);

router.post("/", checkSchema(registerSchema), errorResponse, register);

export default router;
