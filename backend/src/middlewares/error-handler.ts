import { NextFunction, Request, Response } from 'express';

import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorMiddleware = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Внутренняя ошибка сервера' : err.message;
  // можно сделать один файл с классами ошибок которые будут наследовать один класс
  if (
    err instanceof BadRequestError
    || err instanceof ConflictError
    || err instanceof NotFoundError) {
    return res.status(statusCode).json({ message });
  }
  return res.status(500).json({ message });
};

export default errorMiddleware;
