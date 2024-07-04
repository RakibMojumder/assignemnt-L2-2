import { Request, Response } from 'express';
import orderValidationSchema from './order.validation';
import Order from './order.model';
import orderService from './order.service';

interface SearchTerm {
    email: string;
}

const createOrder = async (req: Request, res: Response) => {
    try {
        const data = orderValidationSchema.parse(req.body);

        const isProductAvailable = await Order.isProductAvailable(
            data.productId,
            data.quantity
        );

        if (!isProductAvailable?.name) {
            return res.status(500).json({
                success: false,
                message: 'Insufficient quantity available in inventory',
            });
        }

        const response = await orderService.createOrderIntoDB(data);
        res.json(response);
    } catch (error) {
        console.log(error);
    }
};

const getAllOrder = async (
    req: Request<
        Record<string, never>,
        Record<string, never>,
        Record<string, never>,
        SearchTerm
    >,
    res: Response
) => {
    try {
        const email = req.query?.email;
        const response = await orderService.getAllOrderFromDB(email);

        if (response.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Order not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Order fetched successfully',
            data: response,
        });
    } catch (error) {
        console.log(error);
    }
};

export default { createOrder, getAllOrder };
