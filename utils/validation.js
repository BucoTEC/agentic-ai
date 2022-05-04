import ResError from "./ResError.js";
import Joi from "joi";

export const noBody = (req, res, next) => {
	if (req.body) {
		throw new ResError(400, "Body must be empty");
	}

	next();
};

const joiLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});

export const validateSignIn = (req, res, next) => {
	const { error } = joiLoginSchema.validate(req.body);
	console.log(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ResError(400, msg);
	} else {
		next();
	}
};
