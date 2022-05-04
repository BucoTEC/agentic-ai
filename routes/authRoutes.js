import express from "express";
const router = express.Router();

import {
	singIn,
	register,
	confirmRegister,
} from "../controllers/authControllers.js";

import {
	noBody,
	validateSignIn,
	validateRegister,
} from "../utils/validation.js";

router.get("/", validateSignIn, singIn);

router.get("/confirm/:token", noBody, confirmRegister);

router.post("/", validateRegister, register);

export default router;
