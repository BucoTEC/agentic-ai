import mongoose from "mongoose";

import { bookingTime, bookingDay } from "./bookingTimeConstants.js";

const bookingSchema = new mongoose.Schema({
	user: {
		type: mongoose.Types.ObjectId,
		ref: "User",
	},
	status: {
		type: String,
		default: "pending",
		enum: ["pending", "confirmed", "declined"],
		required: true,
	},
	time: {
		type: String,
		enum: bookingTime,
		required: true,
	},
	day: {
		type: String,
		enum: bookingDay,
		required: true,
	},
	comment: {
		type: String,
		min: 5,
	},
});

export default new mongoose.model("Booking", bookingSchema);
