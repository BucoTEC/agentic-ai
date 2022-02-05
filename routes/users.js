import express from "express";
const router = express.Router();
import {
  getAllUsers,
  creatUser,
  getSingleUser,
  deleteUser,
} from "../controllers/users.js";
import authVerificator from "../middlwear/auth.js";

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.delete("/:id", authVerificator, deleteUser);

router.post("/", creatUser);

export default router;
