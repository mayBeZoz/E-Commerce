const mongoose=require("mongoose")
const joi = require("joi")


const productSchema = new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    price:{
        required:true,
        type:Number
    },
    currency:{
        required:true,
        type:String
    },
    description:{
        required:true,
        type:String
    },
    quantity:{
        required:true,
        type:Number
    },
    brand:{
        required:false,
        type:String
    },
    categoryId:{
        type:mongoose.Schema.ObjectId,
        ref:"Category"
    },
    commentsId:{
        type:mongoose.Schema.ObjectId,
        ref:"ProductComment"
    },
    imagesId:{
        type:mongoose.Schema.ObjectId,
        ref:"ProductImage"
    }
})

const Product = mongoose.Model("Product",productSchema)