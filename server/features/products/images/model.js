const mongoose=require("mongoose")
const joi = require("joi")


const productImageSchema = new mongoose.Schema({
    mimeType:{
        required:true,
        type:String,
    },
    imageBuffer: {
        required:true,
        type:Buffer,
    },
    href:{
        required:true,
        type:String,
    },
    productId:{
        required:true,
        type:mongoose.Schema.ObjectId,
        ref:"Product"
    }
})


const ProductImage = mongoose.model("ProductImage",productImageSchema)