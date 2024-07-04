import express, { Request, Response } from 'express';
import cors from 'cors';
import productRoute from './app/modules/product/product.route';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('hello from api');
});

app.use('/api/products', productRoute);

export default app;
