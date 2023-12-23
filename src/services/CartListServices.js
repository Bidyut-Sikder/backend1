const CartModel = require("../Models/CartModel");
const mongoose = require('mongoose')
const ObjctID = mongoose.Types.ObjectId;


exports.SaveCartListService = async (req) => {
    try {
        const user_id = req.headers.user_id

        const reqBody = req.body;
        reqBody.userID = user_id;

        await CartModel.create(reqBody)
        return { status: 'success', message: 'Added to cart successfully..' }

    } catch (error) {
        console.log(error)
        return { status: 'fail', message: 'something went wrong.' }
    }

}



exports.CartListService = async (req) => {
    try {
        const user_id = new ObjctID(req.headers.user_id)
        //console.log(user_id)
        const matchStage = { $match: { userID: user_id } }

        const joinWithProduct = { $lookup: { from: 'products', localField: 'productID', foreignField: '_id', as: 'product' } }
        const unwindProduct = { $unwind: '$product' }

        const joinWithCategory = { $lookup: { from: 'categories', localField: 'product.categoryID', foreignField: '_id', as: 'category' } }
        const unwindCategory = { $unwind: '$category' }

        const joinWithBrand = { $lookup: { from: 'brands', localField: 'product.brandID', foreignField: '_id', as: 'brand' } }
        const unwindBrand = { $unwind: '$brand' }
        const projection = {
            $project: {
                "product.title": 1,
                "product.shortDes": 1,
                "product.price": 1,
                "product.discountPrice": 1,
                "product.image": 1,
                "category.name": 1,
                "category.categoryImg": 1,
                "brand.name": 1,
                "brand.brandImg": 1

            }
        }

        const data = await CartModel.aggregate([
            matchStage,
            joinWithProduct,
            unwindProduct,
            joinWithCategory,
            unwindCategory,
            joinWithBrand,
            unwindBrand,
            projection

        ])

        return { status: 'success', data }


    } catch (error) {
        return { status: 'fail', message: 'something went wrong.' }
    }
}



exports.DeleteFromCartListService = async (req) => {
    try {
        const cartID = req.params.cartID
        const user_id = req.headers.user_id

        await CartModel.deleteOne({ _id: cartID, userID: user_id })
        return { status: 'success', message: 'Successfully deleted from the cartlist.' }

    } catch (error) {
        return { status: 'fail', message: 'something went wrong.' }
    }
}



















