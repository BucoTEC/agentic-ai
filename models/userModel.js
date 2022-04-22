import mongoose from "mongoose";

const validateEmail = function (email) {
	const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	return re.test(email);
};

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		min: 3,
		max: 20,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
		validate: [validateEmail, "Please fill a valid email address"],
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		],
	},
	password: {
		type: String,
		min: 6,
		required: true,
	},
	bookings: {
		type: [mongoose.SchemaTypes.ObjectId],
		ref: "Booking",
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

export default new mongoose.model("User", userSchema);
