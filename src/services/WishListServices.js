const { mongoose } = require("mongoose");
const WishModel = require("../Models/WishModel");
const ObjectId = mongoose.Types.ObjectId;



exports.WishListService = async (req) => {

    try {

        let user_id = new ObjectId(req.headers.user_id)
        let email = req.headers.email
        const matchStage = { $match: { userID: user_id } }

        let productDetailStage = { $lookup: { from: 'products', localField: 'productID', foreignField: '_id', as: 'details' } }
        let unwindproductDetailStage = { '$unwind': '$details' }
        let limitStage = { $limit: 1 }
        let catagoryDetailStage = { $lookup: { from: 'categories', localField: 'details.categoryID', foreignField: '_id', as: 'category' } }
        let unwindcatagoryDetailStage = { '$unwind': '$category' }

        let BrandDetailStage = { $lookup: { from: 'brands', localField: 'details.brandID', foreignField: '_id', as: 'brand' } }
        let unwindBrandDetailStage = { '$unwind': '$brand' }
 
        let projection = {
            $project: {
                "_id": 0,
                "createdAt": 0,
                "updatedAt": 0,
                "_id": 0,
                "categoryID": 0,
                "brandID": 0,
                "details._id": 0,
                "details.createdAt": 0,

                "details.updatedAt": 0,
                "details.categoryID": 0,
                "details.brandID": 0,
                "category._id": 0,
                "details.brandID": 0,
                "category.createdAt": 0,
                "details.updatedAt": 0,
                "brand.brandID": 0,
                "brand._id": 0,
                "brand.createdAt": 0,
                "brand.updatedAt": 0,

            }
        }

        let result = await WishModel.aggregate([
            matchStage,
            productDetailStage,
            unwindproductDetailStage,
            catagoryDetailStage,
            unwindcatagoryDetailStage,
            BrandDetailStage,
            unwindBrandDetailStage,
            limitStage,
            projection

        ])

        return { status: 'success', data: result }

    } catch (error) {
        return { status: 'fail', message: 'something went wrong.' }
    }
}




exports.SaveWishListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id

        await WishModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });
        return { status: 'success', message: 'Wishlist save success.' }
    } catch (error) {
        return { status: 'fail', message: 'Something went wrong.' }

    }
}


exports.RemoveWishListService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let reqBody = req.body;
        reqBody.userID = user_id
        await WishModel.deleteOne(reqBody);
        return { status: 'success', message: 'Wishlist remove success.' }
    } catch (error) {
        return { status: 'fail', message: 'Something went wrong.' }

    }
}