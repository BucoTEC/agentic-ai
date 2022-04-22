import mongoose from "mongoose";

import timeConstants from "./bookingTimeConstants.js";

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
		enum: timeConstants,
		required: true,
	},
});
