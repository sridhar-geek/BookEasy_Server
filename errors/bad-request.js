import { StatusCodes } from 'http-status-codes';
import CustomAPIError from './custom-api.js'

// this error is to give status 404 to user
class BadRequestError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;