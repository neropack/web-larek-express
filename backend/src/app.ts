import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { errors } from 'celebrate';

import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import errorMiddleware from './middlewares/error-handler';
import { requestLogger, errorLogger } from './middlewares/logger';

const PORT = process.env.PORT || 2000;
const DB_ADD: string = process.env.DB_ADDRESS || 'mongodb://localhost:27017/mydb';

const app = express();
mongoose.connect(DB_ADD).then(() => {
  console.log('Connected to DB');
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(express.static(path.join(__dirname, './public')));

app.use('/product', productRoutes);
app.use('/order', orderRoutes);

app.use(errorLogger);
app.use(errors());

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
