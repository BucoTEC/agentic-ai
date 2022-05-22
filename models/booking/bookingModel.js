import mongoose from "mongoose";

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
	date: {
		type: Date,
		required: true,
	},

	comment: {
		type: String,
		min: 5,
	},
});

export default new mongoose.model("Booking", bookingSchema);
