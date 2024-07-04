import express from 'express';
import orderController from './order.controller';

const router = express.Router();

router
    .route('/')
    .post(orderController.createOrder)
    .get(orderController.getAllOrder);

const orderRoute = router;

export default orderRoute;
