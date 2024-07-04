import { z } from 'zod';

const orderValidationSchema = z.object({
    email: z
        .string()
        .email({ message: 'Invalid email format' })
        .min(5, { message: 'Email must be at least 5 characters' }),
    productId: z
        .string()
        .min(3, { message: 'Product ID must be at least 3 characters' }),
    price: z.number().positive({ message: 'Price must be a positive number' }),
    quantity: z.number().min(1, { message: 'Quantity must be at least 1' }),
});

export default orderValidationSchema;
