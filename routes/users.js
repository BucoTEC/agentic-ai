import express from "express";
const router = express.Router();
import {
  getAllUsers,
  creatUser,
  getSingleUser,
  deleteUser,
} from "../controllers/users.js";

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.delete("/:id", deleteUser);

router.post("/", creatUser);

export default router;
