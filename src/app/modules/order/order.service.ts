import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
    const response = await Order.create(orderData);
    return response;
};

const getAllOrderFromDB = async () => {
    const response = await Order.find({}).select('-_id -__v');
    return response;
};

export default { createOrderIntoDB, getAllOrderFromDB };
