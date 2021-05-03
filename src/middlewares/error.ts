import {NextFunction, Request, Response} from 'express';
import httpStatus from 'http-status';
import {APIError} from '../utils/error';

const apiErrorHandler = (err: any, _req: Request, res: Response, next: NextFunction) => {
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

const parseToAPIError = (err: any, _req: Request, _res: Response, next: NextFunction) => {
  let parsedError = err;
  if (!(err instanceof APIError)) {
    parsedError = new APIError({
      message: err.message,
      status: err.status,
    });
  }
  next(parsedError);
};

const notFound = (_req: Request, _res: Response, next: NextFunction) => {
  next(new APIError({message: 'Resource not found', status: httpStatus.NOT_FOUND}));
};

export {
  apiErrorHandler,
  notFound,
  parseToAPIError,
};
