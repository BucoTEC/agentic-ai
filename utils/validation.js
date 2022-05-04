import ResError from "./ResError.js";
import Joi from "joi";

export const noBody = (req, res, next) => {
	if (req.body) {
		throw new ResError(400, "Body must be empty");
	}

	next();
};

//LOGIN

const joiLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const validateSignIn = (req, res, next) => {
	const { error } = joiLoginSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ResError(400, msg);
	} else {
		next();
	}
};

// REGISTER
const joiRegisterSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	username: Joi.string().required(),
});

export const validateRegister = (req, res, next) => {
	const { error } = joiRegisterSchema.validate(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ResError(400, msg);
	} else {
		next();
	}
};

const joiAddBookingSchema = Joi.object({
	day: Joi.string().required(),
	time: Joi.string().required(),
});

export const validateAddBooking = validationFunction(joiAddBookingSchema);

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
