/* eslint-disable no-unused-vars */
import { Model, SchemaDefinitionProperty } from 'mongoose';
import { TProduct } from '../product/product.interface';

export interface TOrder {
    email: string;
    productId: SchemaDefinitionProperty<string, TOrder>;
    price: number;
    quantity: number;
}

export interface OrderMethods {}

export interface OrderModel
    extends Model<TOrder, Record<string, never>, OrderMethods> {
    isProductAvailable: (
        productId: string,
        quantity: number
    ) => Promise<TProduct>;
}
