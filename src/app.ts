/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import express, { NextFunction, Request, Response } from 'express';
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

//---------------------ERROR HANDLING---------------------
// ROUTE ERROR
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: 'Route not found' });
});

// SERVER ERROR
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(500).send('Something is broken');
});

export default app;
