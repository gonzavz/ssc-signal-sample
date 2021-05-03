import httpStatus from 'http-status';

interface IAPIErrorConfig {
  message: string,
  errors?: any,
  status?: number,
}

export class APIError extends Error {
  public errors:any;
  public status:number;
  constructor(config: IAPIErrorConfig) {
    super(message);
    this.message = config.message;
    this.errors = config.errors || [];
    this.status = config.status || httpStatus.INTERNAL_SERVER_ERROR;
  }
}
