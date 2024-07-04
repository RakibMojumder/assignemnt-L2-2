import { z } from 'zod';

// Define the schema for variants
const variantsValidationSchema = z.object({
    type: z.string().min(1, { message: 'Variant type is required field' }),
    value: z.string().min(1, { message: 'Variant value is required field' }),
});

// Define the schema for inventory
const inventoryValidationSchema = z.object({
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
    inStock: z.boolean(),
});

// Define the schema for product
const productValidationSchema = z.object({
    name: z.string().min(1, { message: 'Name is required field' }),
    description: z
        .string()
        .min(1, { message: 'Description is required field' }),
    price: z.number().min(0, { message: 'Price must be at least 0' }),
    category: z.string().min(1, { message: 'Category is required field' }),
    tags: z
        .array(z.string())
        .min(1, { message: 'At least one tag is required' }),
    variants: z
        .array(variantsValidationSchema)
        .min(1, { message: 'At least one variant is required' }),
    inventory: inventoryValidationSchema,
});

export default productValidationSchema;
