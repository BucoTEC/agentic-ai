const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send(`Ups there was a problem: ${err.message}`);
};

export default errorHandler;
