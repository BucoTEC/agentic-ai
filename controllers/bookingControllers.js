import "express-async-errors";

import Booking from "#root/models/booking/bookingModel.js";
import User from "#root/models/user/userModel.js";

import ResError from "#root/utils/ResError.js";

// TODO add data validation on incoming req with body, express validator
// TODO add date picker limitation depending on curretn time and date

export const allBokings = async (req, res) => {
	const { isAdmin } = req.userData;
	if (isAdmin) {
		const allBookings = await Booking.find();
		return res.status(200).json({ message: "All bookings", data: allBookings });
	}
	const { userId } = req.userData;
	const currentUserBookings = await Booking.find({ user: userId });
	res
		.status(200)
		.json({ message: "current user bookings", data: currentUserBookings });
};

export const oneBooking = async (req, res) => {
	const { userId, isAdmin } = req.userData;
	const { id } = req.params;

	const booking = await Booking.findById(id);

	if (!booking) {
		throw new ResError(404, `Not found booking with id: ${id}`);
	}

	if (userId == booking.user || isAdmin) {
		return res
			.status(200)
			.json({ message: "One booking details", data: booking });
	}

	throw new ResError(403, "You are not authorized to view this booking");
};

// TODO find user and check if he has two more bookings on the same day

export const addBooking = async (req, res) => {
	const { userId } = req.userData;
	const { day, time } = req.body;

	const currentUser = await User.findById(userId);

	const newBooking = new Booking({ user: userId, day, time });
	currentUser.bookings.push(newBooking);

	await currentUser.save();
	await newBooking.save();
	res.json({
		message: "succesfuly added booking",
		data: {
			creator: currentUser.username,
			newBooking,
		},
	});
};

export const updateBooking = async (req, res) => {
	const { userId, isAdmin } = req.userData;
	const { id } = req.params;

	const booking = await Booking.findById(id);
	if (!booking) {
		throw new ResError(404, `Not found booking with id: ${id}`);
	}

	if (!isAdmin) {
		req.body.status = "pending";
	}

	if (userId == booking.user || isAdmin) {
		const updatedBooking = await Booking.findByIdAndUpdate(id, { ...req.body });
		return res
			.status(200)
			.json({ message: "Booking updated", data: updatedBooking });
	}

	throw new ResError(403, "You are not authorized to view this booking");
};

export const deleteBooking = async (req, res) => {
	const { userId, isAdmin } = req.userData;
	const { id } = req.params;

	const booking = await Booking.findById(id);
	if (!booking) {
		return res.json(`No booking found with id: ${id}`);
	}
	if (booking.user != userId || !isAdmin) {
		throw new ResError(403, "You are not the owner of this booking");
	}

	await booking.remove();

	const user = await User.findById(userId);

	const newBookings = user.bookings.filter((item) => item != id);

	user.bookings = newBookings;
	await user.save();

	res.json("succesfuly deleted booking");
};
