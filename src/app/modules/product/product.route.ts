import express from 'express';
import productController from './product.controller';

const route = express.Router();

route.post('/', productController.createProduct);

const productRoute = route;
export default productRoute;
