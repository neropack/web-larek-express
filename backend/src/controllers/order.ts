import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return next(new BadRequestError('Items must not be an empty array'));
  }

  const products = await Product.find({ _id: { $in: items } });
  const totalPrice = products.reduce((sum, product) => sum + (product.price || 0), 0);

  if (totalPrice !== total) {
    return next(new BadRequestError('Total price doesn not match the sum of items price'));
  }

  const orderID = faker.string.uuid();
  return res.status(201).json({ id: orderID, total: totalPrice });
};

export default createOrder;
