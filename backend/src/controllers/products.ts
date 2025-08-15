import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

import Product from '../models/product';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

export const getProducts = async (_: Request, res: Response, next: NextFunction) => {
  try {
    const products = await Product.find();
    return res.json({ items: products, total: products.length });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title } = req.body;
    const existingProduct = await Product.findOne({ title });
    if (existingProduct) {
      return next(new ConflictError('Продукт с таким заголовком уже существует'));
    }
    const product = new Product(req.body);
    await product.save();
    return res.status(201).json(product);
  } catch (error) {
    if (error instanceof Error && error.message.includes('E11000')) {
      return next(new ConflictError('Продукт с таким заголовком уже существует'));
    }
    if (error instanceof MongooseError.ValidationError) {
      return next(new BadRequestError(error.message));
    }
    return next(error);
  }
};
