
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    email: { type: String, required: true,lowercase:true,unique:true },
    otp: { type: String, required: true },


}, {
    timestamps: true,
    versionKey: false
})



const UserModel = mongoose.model('users', dataSchema)

module.exports = UserModel;

