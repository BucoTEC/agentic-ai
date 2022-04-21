import express from "express";
const router = express.Router();
import {
  getAllUsers,
  getSingleUser,
  deleteUser,
} from "../controllers/users.js";
import authVerificator from "../middlwear/auth.js";

router.get("/", getAllUsers);

router.get("/:id", getSingleUser);

router.delete("/:id", authVerificator, deleteUser);

export default router;
