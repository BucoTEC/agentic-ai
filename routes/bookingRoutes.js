import express from "express";
const router = express.Router();

import {
	allBokings,
	oneBooking,
	addBooking,
	updateBooking,
	deleteBooking,
} from "../controllers/bookingControllers.js";

router.get("/", allBokings);

router.get("/:id", oneBooking);

router.post("/", addBooking);

router.patch("/:id", updateBooking);

router.delete("/:id", deleteBooking);
export default router;
