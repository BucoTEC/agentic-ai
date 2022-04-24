const errorHandler = (err, req, res, next) => {
	// console.error(err.stack);
	res.status(err.status).json(`An error acured: ${err.message}`);
};

export default errorHandler;
