import express from "express";
const router = express.Router();

import {
	allBokings,
	oneBooking,
	addBooking,
	updateBooking,
	deleteBooking,
} from "../controllers/bookingControllers.js";

import { noBody } from "../utils/validation.js";

router.get("/", noBody, allBokings);

router.get("/:id", oneBooking);

router.post("/", addBooking);

router.patch("/:id", updateBooking);

router.delete("/:id", deleteBooking);
export default router;
