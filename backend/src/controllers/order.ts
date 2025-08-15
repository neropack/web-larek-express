import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';
import { ad } from '@faker-js/faker/dist/airline-CLphikKp';

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { total, items, payment, email, phone, address } = req.body;

    if (!total || !items || !payment || !email || !phone || !address) {
      throw new Error('Данные отсутствуют')
    }

    if (!Array.isArray(items) || items.length === 0) {
      return next(new BadRequestError('Items must not be an empty array'));
    }

    const products = await Product.find({ _id: { $in: items } });
    const totalPrice = products.reduce((sum, product) => sum + (product.price || 0), 0);

    if (totalPrice !== total) {
      return next(new BadRequestError('Total price doesn not match the sum of items price'));
    }

    const orderID = faker.string.uuid();
    return res.status(200).json({ id: orderID, total: totalPrice });
  } catch (error) {
    return next(new BadRequestError('Ошибка создания заказа'));
  }
};

export default createOrder;
