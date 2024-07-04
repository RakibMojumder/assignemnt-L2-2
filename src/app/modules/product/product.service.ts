import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (productData: TProduct) => {
    try {
        const response = await Product.create(productData);
        return response;
    } catch (error) {
        console.log(error);
    }
};

const getAllProductsFromDB = async () => {
    try {
        const response = await Product.find({}).select('-_id -__v');
        return response;
    } catch (error) {
        console.log(error);
    }
};

const getSingleProductFromDB = async (productId: string) => {
    try {
        const response = await Product.findById({ _id: productId }).select(
            '-_id -__v'
        );
        return response;
    } catch (error) {
        console.log(error);
    }
};

const deleteProductFromDB = async (productId: string) => {
    try {
        const response = await Product.findByIdAndDelete({ _id: productId });
        return response;
    } catch (error) {
        console.log(error);
    }
};

export default {
    createProductIntoDB,
    getAllProductsFromDB,
    getSingleProductFromDB,
    deleteProductFromDB,
};
