import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';

const createOrder = async (req: Request, res: Response) => {
  const { total, items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'Items must not be an empty array' });
  }

  const products = await Product.find({ _id: { $in: items } });
  const totalPrice = products.reduce((sum, product) => sum + (product.price || 0), 0);

  if (totalPrice !== total) {
    return res.status(400).json({ message: 'Total price doesn not match the sum of items price' });
  }

  const orderID = faker.string.uuid();
  return res.status(201).json({ id: orderID, total: totalPrice });
};

export default createOrder;
