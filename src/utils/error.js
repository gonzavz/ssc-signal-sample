const httpStatus = require('http-status');

class APIError extends Error {
  constructor({message, errors, status=httpStatus.INTERNAL_SERVER_ERROR}) {
    super(message);
    this.message = message;
    this.errors = errors || [];
    this.status = status;
  }
}

exports.APIError = APIError;
