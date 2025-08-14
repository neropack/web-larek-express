import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 2000;
const DB_ADD: string = process.env.DB_ADDRESS || 'mongodb://localhost:27017/mydb';

const app = express();
mongoose.connect(DB_ADD).then(() => {
  console.log('Connected to DB');
});

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
