// middlewares/validate.js
module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      // Send first error message
      const err = new Error(error.details[0].message);
      err.status = 400;
      return next(err); // Pass to centralized error handler
    }

    // Replace req.body with validated & cleaned data
    req.body = value;
    next();
  };
};
