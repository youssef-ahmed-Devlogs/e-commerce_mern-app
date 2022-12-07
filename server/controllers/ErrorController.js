const sendDevelopmentError = (err, req, res) => {
  res.status(400).json({
    status: "fail",
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendProductionError = (err, req, res, data = {}) => {
  res.status(400).json({
    status: "fail",
    message: err.message,
    ...data,
  });
};

const handleDBValidationError = (err, req, res) => {
  const message = Object.values(err.errors).map((item) => {
    return {
      field: item.path,
      message: item.message,
    };
  });

  err.message = "Invalid input data.";
  sendProductionError(err, req, res, {
    validationMessages: message,
  });
};

const handleDBDuplicateFieldError = (err, req, res) => {
  const duplicatedKey = Object.keys(err.keyValue)[0];
  const duplicatedValue = Object.values(err.keyValue)[0];
  err.message = `Duplicate field is ${duplicatedKey} the value: ${duplicatedValue} is already exists. Please use another value`;

  sendProductionError(err, req, res);
};

// When add wrong id format to params /:id
const handelDBCastError = (err, req, res) => {
  err.message = `Invalid ${err.path}: ${err.value}`;
  sendProductionError(err, req, res);
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV == "development") {
    sendDevelopmentError(err, req, res);
  } else if (process.env.NODE_ENV == "production") {
    if (err.name == "ValidationError") {
      return handleDBValidationError(err, req, res);
    }

    if (err.code == 11000) {
      return handleDBDuplicateFieldError(err, req, res);
    }

    if (err.name == "CastError") {
      return handelDBCastError(err, req, res);
    }

    sendProductionError(err, req, res);
  }
};
