import { Request, Response } from 'express';
import productValidationSchema from './product.validation';

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const data = productValidationSchema.parse(productData);
        // console.log(data);

        res.send('Hello');
    } catch (error) {
        res.json(error.issues[0].message);
    }
};

export default { createProduct };
