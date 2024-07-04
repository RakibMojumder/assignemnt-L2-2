import { Request, Response } from 'express';
import productValidationSchema from './product.validation';
import productService from './product.service';
import { Product } from './product.model';

const createProduct = async (req: Request, res: Response) => {
    try {
        const productData = req.body;
        const data = productValidationSchema.parse(productData);
        const response = await productService.createProductIntoDB(data);

        res.status(200).json({
            success: true,
            message: 'Product created successfully!',
            data: response,
        });
    } catch (error: any) {
        res.json({
            success: false,
            message: error.issues[0].message,
        });
    }
};

const getAllProduct = async (req: Request, res: Response) => {
    try {
        const response = await productService.getAllProductsFromDB();

        if (response?.length === 0) {
            res.status(400).json({
                success: false,
                message: 'Product not found',
            });
        }

        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: response,
        });
    } catch (error: any) {
        console.log(error);
    }
};

const getSingleProduct = async (req: Request, res: Response) => {
    const response = await productService.getSingleProductFromDB(
        req.params.productId
    );

    if (response?.name) {
        return res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: response,
        });
    }

    return res.status(404).json({
        success: false,
        message: 'Could not find product',
    });
};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const isProductExists = await Product.isProductExists(
            req.params.productId
        );

        if (!isProductExists) {
            return res.status(404).json({
                success: false,
                message: 'Could not delete product. Product not Found',
            });
        }

        await productService.deleteProductFromDB(req.params.productId);

        res.status(200).json({
            success: true,
            message: 'Product deleted successfully!',
            data: null,
        });
    } catch (error) {
        console.log(error);
    }
};

export default {
    createProduct,
    getAllProduct,
    getSingleProduct,
    deleteProduct,
};