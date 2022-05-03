import ResError from "./ResError.js";

import { validationResult } from "express-validator";

export const errorResponse = (req, res, next) => {
	const errors = validationResult(req);

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
