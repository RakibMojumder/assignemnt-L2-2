import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoute from './app/modules/product/product.route';
import orderRoute from './app/modules/order/order.route';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('hello from api');
});

app.use('/api/products', productRoute);
app.use('/api/orders', orderRoute);

export default app;
