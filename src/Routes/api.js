const express = require('express')
const { ProductBrandList, ProductCategoryList, ProductSliderList, ProductListByBrand, ProductListByCategory, ProductListBySmilier, ProductListByKeyword, ProductListByRemark, ProductDetails, ProductReviewList } = require('../Controllers/ProductController')
const { UserOTP, VerifyOTPLogin, UserLogout, CreateProfile, UpdateProfile, ReadProfile } = require('../Controllers/UserController')
const { AuthVerification } = require('../Middleware/AuthVerification')
const { WishList, RemoveWishList, SaveWishList } = require('../Controllers/WishListController')
const { SaveCartList, CartList, DeleteFromCartList } = require('../Controllers/CartController')



const router = express.Router()



//Product Apis
router.get('/ProductBrandList', ProductBrandList)
router.get('/ProductCategoryList', ProductCategoryList)
router.get('/ProductSliderList', ProductSliderList)
router.get('/ProductListByBrand/:BrandID', ProductListByBrand)
router.get('/ProductListByCategory/:CategoryID', ProductListByCategory)
router.get('/ProductListBySmilier/:CategoryID', ProductListBySmilier)
router.get('/ProductListByKeyword/:Keyword', ProductListByKeyword)
router.get('/ProductListByRemark/:Remark', ProductListByRemark)
router.get('/ProductDetails/:ProductID', ProductDetails)
router.get('/ProductReviewList/:ProductID', ProductReviewList)


//User Apis
router.get('/UserOTP/:email', UserOTP)
router.get('/VerifyLogin/:email/:otp', VerifyOTPLogin)
router.get('/UserLogout/', AuthVerification, UserLogout)
router.post('/CreateProfile/', AuthVerification, CreateProfile)
router.post('/UpdateProfile/', AuthVerification, UpdateProfile)
router.get('/ReadProfile/', AuthVerification, ReadProfile)

//Wishlist Apis


router.post('/SaveWishList', AuthVerification, SaveWishList)
router.post('/RemoveWishList', AuthVerification, RemoveWishList)
router.get('/WishList', AuthVerification, WishList)

//Cartlist Apis
router.post('/SaveCartList', AuthVerification, SaveCartList)
router.post('/RemoveCartList/:cartID', AuthVerification, DeleteFromCartList)
router.get('/CartList', AuthVerification, CartList)











module.exports = router;






















































