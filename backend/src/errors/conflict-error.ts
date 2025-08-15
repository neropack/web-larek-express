import { Error as MongooseError } from 'mongoose';

class ConflictError extends MongooseError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
}

export default ConflictError;
