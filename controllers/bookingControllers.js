import "express-async-errors";

import Booking from "../models/booking/bookingModel.js";
import User from "../models/userModel.js";

export const allBokings = async (req, res) => {
	const { isAdmin } = req.userData;
	if (isAdmin) {
		const allBookings = await Booking.find();
		return res.json({ message: "All bookings", data: allBookings });
	}
	const { userId } = req.userData;
	const currentUserBookings = await Booking.find({ user: userId });
	res.json({ message: "current user bookings", data: currentUserBookings });
	//if not admin look for id in query to return onli current user bookings
	//retunr bookings
};

export const oneBooking = (req, res) => {
	res.json("find onr booking from controller");
};

export const addBooking = async (req, res) => {
	const { userId } = req.userData;
	const { day, time } = req.body;
	const currentUser = await User.findById(userId);

	//find user and check if he has two more bookings on the same day

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

export const updateBooking = (req, res) => {
	//get id from path
	//search for booking using path param
	//check if found booking match user id from auth middlwear or is user admin
	//update booking
	res.json("update boking from controller");
};

export const deleteBooking = async (req, res) => {
	const { userId, isAdmin } = req.userData;
	const { id } = req.params;

	const booking = await Booking.findById(id);
	if (!booking) {
		return res.json(`No booking found with id: ${id}`);
	}
	if (booking.user != userId || isAdmin) {
		throw new Error("you are not the owner of this booking");
	}

	await booking.remove();

	const user = await User.findById(userId);

	const newBookings = user.bookings.filter((item) => item != id);

	user.bookings = newBookings;
	await user.save();
	//delete booking
	res.json("succesfuly deleted booking");
};
