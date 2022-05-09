import express from "express";
const router = express.Router();

import {
	singIn,
	register,
	confirmRegister,
	emailConfirmationSender,
} from "../controllers/authControllers.js";

import {
	noBody,
	validateSignIn,
	validateRegister,
} from "../utils/validation.js";

router.post("/login", validateSignIn, singIn);

router.get("/confirm/:token", noBody, confirmRegister);

router.get("/send-confirm/:id", noBody, emailConfirmationSender);

router.post("/register", validateRegister, register);

export default router;
