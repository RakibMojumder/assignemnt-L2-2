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

const getAllProductsFromDB = async (searchValue: string | undefined) => {
    try {
        let query;

        if (searchValue) {
            query = {
                $or: [
                    { name: new RegExp(searchValue, 'i') },
                    { category: new RegExp(searchValue, 'i') },
                    { description: new RegExp(searchValue, 'i') },
                ],
            };
        } else {
            query = {};
        }

        const response = await Product.find(query).select('-_id -__v');
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const updateProductIntoDB = async (productId: string, updatedData: any) => {
    const response = await Product.findByIdAndUpdate(
        { _id: productId },
        updatedData,
        { new: true }
    );
    return response;
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
    updateProductIntoDB,
};
