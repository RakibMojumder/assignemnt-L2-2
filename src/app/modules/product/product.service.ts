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
        let response;

        if (searchValue) {
            response = await Product.aggregate([
                {
                    $match: {
                        $or: [
                            { name: new RegExp(searchValue, 'i') },
                            { category: new RegExp(searchValue, 'i') },
                            { description: new RegExp(searchValue, 'i') },
                        ],
                    },
                },
                {
                    $project: { _id: 0, __v: 0 },
                },
            ]);
        } else {
            response = await Product.find({}).select('-_id -__v');
        }

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
