const { SaveCartListService, CartListService, DeleteFromCartListService } = require("../services/CartListServices")

exports.SaveCartList = async (req, res) => {
    const result = await SaveCartListService(req)
    res.status(200).json({ result })
}

exports.CartList = async (req, res) => {
    const result = await CartListService(req)
    res.status(200).json({ result })
}



exports.DeleteFromCartList = async (req, res) => {
    const result = await DeleteFromCartListService(req)
    res.status(200).json({ result })
}



























