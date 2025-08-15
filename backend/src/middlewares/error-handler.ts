import { NextFunction, Request, Response } from 'express';

import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';
import NotFoundError from '../errors/not-found-error';

const errorMiddleware = (err: any, _: Request, res: Response, __: NextFunction) => {
  const statusCode = err.statusCode || 500;
  // можно сделать один файл с классами ошибок которые будут наследовать один класс
  if (
    err instanceof BadRequestError
    || err instanceof ConflictError
    || err instanceof NotFoundError) {
    return res.status(statusCode).json({ message: err.message });
  }

  return res.status(500).json({ message: 'Внутренняя ошибка сервера' });
};

export default errorMiddleware;
