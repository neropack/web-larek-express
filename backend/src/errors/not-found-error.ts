import { Error as MongooseError } from 'mongoose';

class NotFoundError extends MongooseError {
  public statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
