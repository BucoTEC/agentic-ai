import express from "express";
const router = express.Router();
import { singIn, creatUser } from "../controllers/auth.js";

router.get("/", singIn);
router.post("/", creatUser);

export default router;
