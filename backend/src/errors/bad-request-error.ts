import { Error as MongooseError } from 'mongoose';

class BadRequestError extends MongooseError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 400;
  }
}

export default BadRequestError;
