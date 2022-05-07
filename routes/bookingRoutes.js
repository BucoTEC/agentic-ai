import express from "express";
const router = express.Router();

import {
	allBokings,
	oneBooking,
	addBooking,
	updateBooking,
	deleteBooking,
} from "#root/controllers/bookingControllers.js";

import {
	noBody,
	validateAddBooking,
	validateUpdateBooking,
} from "#root/utils/validation.js";

router.get("/", noBody, allBokings);

router.get("/:id", noBody, oneBooking);

router.post("/", validateAddBooking, addBooking);

router.patch("/:id", validateUpdateBooking, updateBooking);

router.delete("/:id", noBody, deleteBooking);

export default router;
