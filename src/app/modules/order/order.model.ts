import { Schema, model } from 'mongoose';
import { OrderMethods, OrderModel, TOrder } from './order.interface';
import { Product } from '../product/product.model';

const orderSchema = new Schema<TOrder, OrderModel, OrderMethods>({
    email: { type: String, required: true },
    productId: { type: Schema.Types.ObjectId, required: true, ref: 'Product' },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

orderSchema.statics.isProductAvailable = async (
    productId: string,
    quantity: number
) => {
    const isAvailable = await Product.findOne({
        _id: productId,
        'inventory.quantity': { $gte: quantity },
    });

    return isAvailable;
};

orderSchema.post('save', async (doc, next) => {
    const reduceQuantity = await Product.findOneAndUpdate(
        { _id: doc.productId },
        { $inc: { 'inventory.quantity': -doc.quantity } },
        { new: true }
    );

    if (reduceQuantity?.inventory.quantity === 0) {
        await Product.findOneAndUpdate(
            { _id: doc.productId },
            { 'inventory.inStock': false }
        );
    }

    next();
});

const Order = model<TOrder, OrderModel>('Order', orderSchema);

export default Order;
