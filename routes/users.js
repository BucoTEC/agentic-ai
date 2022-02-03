import express from "express";
const router = express.Router();
import { getAllUsers, creatUser, getSingleUser } from "../controllers/users.js";

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.post("/", creatUser);

export default router;
