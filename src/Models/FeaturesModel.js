
const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({

    name:{type:String,required:true},
    description:{type:String,required:true},
    img:{type:String,required:true},


}, {
    timestamps: true,
    versionKey: false
})



const FeaturesModel = mongoose.model('features', dataSchema)

module.exports = FeaturesModel;