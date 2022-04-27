import express from "express";
const router = express.Router();
import {
	singIn,
	register,
	confirmRegister,
} from "../controllers/authControllers.js";

router.get("/", singIn);
router.get("/confirm/:token", confirmRegister);
router.post("/", register);

export default router;
