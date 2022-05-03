import { validationResult } from "express-validator";

export const errorResponse = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

export const noBody = (req, res, next) => {
	if (req.body) {
		throw new Error("Body must be empty");
	}

	next();
};
