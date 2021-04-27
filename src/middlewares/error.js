const httpStatus = require('http-status');
const {APIError} = require('../utils/error');

const apiErrorHandler = (err, req, res, next) => {
  /*
    delegate to the default Express error handler,
    when the headers have already been sent to the client.
    check https://expressjs.com/en/guide/error-handling.html
     */
  if (res.headersSent) {
    return next(err);
  }

  if (!(err instanceof APIError)) {
    return next(err);
  }

  const response = {
    code: err.status,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
  };
  return res.status(err.status).json(response);
};

const parseToAPIError = (err, req, res, next) => {
  let parsedError = err;
  if (!err instanceof APIError) {
    parsedError = new APIError({
      message: err.message,
      status: err.status,
    });
  }
  next(parsedError);
};

const notFound = (req, res, next) => {
  next(new APIError({message: 'Resource not found', status: httpStatus.NOT_FOUND}));
};

module.exports = {
  apiErrorHandler,
  notFound,
  parseToAPIError,
};
