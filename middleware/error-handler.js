const errorHandler = (err, req, res, next) => {
  // console.error(err.stack);
  res.status(500).json(`An error acured: ${err.message}`);
};

export default errorHandler;
