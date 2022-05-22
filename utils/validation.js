import ResError from "./ResError.js";
import Joi from "joi";

export const noBody = (req, res, next) => {
	if (req.body.length > 1) {
		throw new ResError(400, "Body must be empty");
	}

	next();
};

//LOGIN

const joiLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const validateSignIn = validationFunction(joiLoginSchema);

// REGISTER
const joiRegisterSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	username: Joi.string().required(),
});

export const validateRegister = validationFunction(joiRegisterSchema);

// UPDATE USER

const joiUpdateUserSchema = Joi.object({
	email: Joi.string().email(),
	password: Joi.string(),
	username: Joi.string(),
});

export const validateUpdateUser = validationFunction(joiUpdateUserSchema);

// ADD BOOKING

const joiAddBookingSchema = Joi.object({
	date: Joi.date().required(),
	comment: Joi.string().required(),
});

export const validateAddBooking = validationFunction(joiAddBookingSchema);

// UPDATE BOOKING

const joiUpdateBookingSchema = Joi.object({
	date: Joi.date(),
	status: Joi.string(),
	comment: Joi.string(),
});

export const validateUpdateBooking = validationFunction(joiUpdateBookingSchema);

// HELPRE FUNCTION

function validationFunction(schema) {
	return (req, res, next) => {
		const { error } = schema.validate(req.body);
		if (error) {
			const msg = error.details.map((el) => el.message).join(",");
			throw new ResError(400, msg);
		} else {
			next();
		}
	};
}
