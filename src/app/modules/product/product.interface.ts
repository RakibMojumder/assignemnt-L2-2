import { Model } from 'mongoose';

export interface TVariants {
    type: string;
    value: string;
}

export interface TInventory {
    quantity: number;
    inStock: boolean;
}

export interface TProduct {
    name: string;
    description: string;
    price: number;
    category: string;
    tags: Array<string>;
    variants: Array<TVariants>;
    inventory: TInventory;
}

export interface ProductMethods {}

export interface ProductModel
    extends Model<TProduct, Record<string, never>, ProductMethods> {
    isProductExists: (productId: string) => Promise<TProduct | null>;
}
