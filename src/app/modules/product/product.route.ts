import express from 'express';
import productController from './product.controller';

const route = express.Router();

route
    .route('/')
    .post(productController.createProduct)
    .get(productController.getAllProduct);

route
    .route('/:productId')
    .get(productController.getSingleProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct);

const productRoute = route;
export default productRoute;
