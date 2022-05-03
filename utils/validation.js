import ResError from "./ResError.js";

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
