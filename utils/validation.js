import ResError from "./ResError.js";
import Joi from "joi";

import { validationResult, matchedData } from "express-validator";

export const errorResponse = (req, res, next) => {
	const errors = validationResult(req);
	const test = matchedData(req, {
		locations: ["body"],
		includeOptionals: true,
	});
	console.log(test);
	if (!errors.isEmpty()) {
		throw new ResError(400, errors.array());
	}
	next();
};

export const noBody = (req, res, next) => {
	if (req.body) {
		throw new ResError(400, "Body must be empty");
	}

	next();
};

export const registerSchema = {
	email: {
		in: "body",
		notEmpty: "true",
		isEmail: "true",
	},
	password: {
		in: "body",
		notEmpty: "true",
		isString: "true",
	},
	username: {
		in: "body",
		notEmpty: "true",
		isString: "true",
	},
};

const joiLoginSchema = Joi.object({
	email: Joi.string().email().required(),
	password: Joi.string().required(),
});
export const joiTest = (req, res, next) => {
	const { error } = joiLoginSchema.validate(req.body);
	console.log(req.body);
	if (error) {
		const msg = error.details.map((el) => el.message).join(",");
		throw new ResError(400, msg);
	} else {
		next();
	}
};
