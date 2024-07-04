import { Schema, model } from 'mongoose';
import {
    ProductMethods,
    ProductModel,
    TInventory,
    TProduct,
    TVariants,
} from './product.interface';

const variantsSchema = new Schema<TVariants>(
    {
        type: { type: String, required: true },
        value: { type: String, required: true },
    },
    { _id: false }
);

const inventorySchema = new Schema<TInventory>(
    {
        quantity: { type: Number, required: true },
        inStock: { type: Boolean, default: true },
    },
    { _id: false }
);

const productSchema = new Schema<TProduct, ProductModel, ProductMethods>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: { type: [String], required: true },
    variants: { type: [variantsSchema], required: true },
    inventory: inventorySchema,
});

productSchema.statics.isProductExists = async (productId: string) => {
    const result = await Product.findById({ _id: productId });

    return result?._id;
};

export const Product = model<TProduct, ProductModel>('Product', productSchema);
