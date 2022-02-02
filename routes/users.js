import express from "express";
const router = express.Router();
import { getAllUsers, creatUser } from "../controllers/users.js";

router.get("/", getAllUsers);

router.post("/", creatUser);

export default router;
