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


const validateAddProductComment = (obj) => {
    
    const schema = joi.object({
        productId:joi.string().required(),
        rate:joi.number().min(1).max(5).required(),
        description:joi.string().required(),
        authorId:joi.string().required()
    })
    
    return schema.validate(obj)
}

const validateUpdateProductComment = (obj) => {
    const schema = joi.object({
        productId:joi.string(),
        rate:joi.number().min(1).max(5),
        description:joi.string(),
        authorId:joi.string()
    })
    
    return schema.validate(obj)
}

module.exports = {
    ProductComment,
    validateAddProductComment,
    validateUpdateProductComment
}