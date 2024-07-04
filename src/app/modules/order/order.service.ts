import { TOrder } from './order.interface';
import Order from './order.model';

const createOrderIntoDB = async (orderData: TOrder) => {
    const response = await Order.create(orderData);
    return response;
};

const getAllOrderFromDB = async (email: string) => {
    let query;

    if (email) {
        query = { email };
    } else {
        query = {};
    }

    const response = await Order.find(query);
    return response;
};

export default { createOrderIntoDB, getAllOrderFromDB };
