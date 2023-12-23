const BrandModel = require("../Models/BrandModel")
const CategoryModel = require("../Models/CategoryModel");
const ProductModel = require("../Models/ProductModel");
const ProductSliderModel = require("../Models/ProductSliderModel")
const mongoose = require('mongoose');
const ReviewModel = require("../Models/ReviewModel");
const ObjectId = mongoose.Types.ObjectId;

const BrandListService = async () => {
    try {
        let data = await BrandModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err }.toString()

    }
}
const CategoryListService = async () => {
    try {
        let data = await CategoryModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err }.toString()

    }
}
const SliderListService = async () => {
    try {
        let data = await ProductSliderModel.find()
        return { status: "success", data: data }
    } catch (err) {
        return { status: "fail", data: err.toString() }


    }
}





const ListByBrandService = async (req) => {
    try {
        let BrandID = new ObjectId(req.params.BrandID)

        let matchStage = { $match: { brandID: BrandID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}
const ListByCategoryService = async (req) => {
    try {
        let CategoryID = new ObjectId(req.params.CategoryID)

        let matchStage = { $match: { categoryID: CategoryID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}
const ListByRemarkService = async (req) => {
    try {
        let Remark = req.params.Remark

        let matchStage = { $match: { remark: Remark } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}











const ListBySmilierService = async (req) => {

    try {
        let CategoryID = new ObjectId(req.params.CategoryID)

        let matchStage = { $match: { categoryID: CategoryID } }
        let limitStage = { $limit: 20 }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            limitStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }


}
const ListByKeywordService = async (req) => {

    try {
        let SearchRegex = { "$regex": req.params.Keyword, "$options": "i" }

        let SearchParams = [{ title: SearchRegex }, { shortDes: SearchRegex }]

        let SearchQuery = { $or: SearchParams }

        let matchStage = { $match: SearchQuery }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage

        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }
}





const DetailsService = async (req) => {
    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let matchStage = { $match: { _id: ProductID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let details = { $lookup: { from: 'productdetails', localField: '_id', foreignField: 'productID', as: 'details' } }
        let unwindDetails = { $unwind: "$details" }

        let projectionStage = {
            $project: {
                'categoryID': 0,
                'brandID': 0,
                'createdAt': 0,
                'updatedAt': 0,
                'category.createdAt': 0,
                'category.updatedAt': 0,
                'brand.createdAt': 0,
                'brand.updatedAt': 0,
            }
        }
        let data = await ProductModel.aggregate([
            matchStage,
            joinWithBrandStage,
            joinWithCategoryStage,
            unwindBrandStage,
            unwindCategoryStage,
            projectionStage,
            details,
            unwindDetails
        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }


}

const ReviewListService = async (req) => {


    try {
        let ProductID = new ObjectId(req.params.ProductID)
        let matchStage = { $match: { productID: ProductID } }
        let joinWithBrandStage = { $lookup: { from: 'brands', localField: 'brandID', foreignField: '_id', as: 'brand' } }
        let joinWithCategoryStage = { $lookup: { from: 'categories', localField: 'categoryID', foreignField: '_id', as: 'category' } }
        
        let joinProfilesStage = { $lookup: { from: 'profiles', localField: 'userID', foreignField: 'userID', as: 'profile' } }

        let unwindProfile = { $unwind: '$profile' }
        let unwindBrandStage = { $unwind: "$brand" }
        let unwindCategoryStage = { $unwind: "$category" }
        let details = { $lookup: { from: 'productdetails', localField: '_id', foreignField: 'productID', as: 'details' } }
        let unwindDetails = { $unwind: "$details" }

        let projectionStage = {
            $project: {
               "des":1,
               "rating":1,
               "profile.cus_name":1
            }
        }
        let data = await ReviewModel.aggregate([
            matchStage,
            joinProfilesStage,
            unwindProfile,
            projectionStage
            // joinWithBrandStage,
            // joinWithCategoryStage,
            // unwindBrandStage,
            // unwindCategoryStage,
            // projectionStage,
            // details,
            // unwindDetails
        ])
        return { status: 'success', data: data }
    } catch (err) {
        console.log(err.toString())
        return { status: "fail", data: err.toString() }

    }




}




module.exports = {
    BrandListService,
    CategoryListService,
    SliderListService,
    ListByBrandService,
    ListByCategoryService,
    ListBySmilierService,
    ListByKeywordService,
    ListByRemarkService,
    DetailsService,
    ReviewListService
}










































