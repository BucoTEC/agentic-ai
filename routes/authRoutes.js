import express from "express";
const router = express.Router();
import { singIn, register } from "../controllers/authControllers.js";

router.get("/", singIn);
router.post("/", register);

export default router;
