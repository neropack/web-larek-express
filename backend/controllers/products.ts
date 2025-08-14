import { Request, Response } from 'express';
import Product from '../models/product';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json({ items: products, total: products.length });
  } catch (error) {
    res.status(500).json({ message: 'Error getting products' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error creating product' });
  }
};
