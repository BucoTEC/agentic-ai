import express from "express";
const router = express.Router();
import { singIn } from "../controllers/auth.js";

router.get("/", singIn);
export default router;
