const mongoose=require("mongoose")
const joi = require("joi")



const productCommentSchema = new mongoose.Schema({
    productId:{
        typeof:mongoose.Schema.ObjectId,
        ref:"Product",
        required:true
    },
    rate:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    authorId:{
        typeof:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    }
     
})

const ProductComment = mongoose.model("ProductComment",productCommentSchema)