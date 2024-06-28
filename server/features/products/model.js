const mongoose=require("mongoose")
const joi = require("joi")

const productImageSchema = new mongoose.Schema({
    mimeType:{
        required:true,
        type:String
    },
    imageBuffer:{
        required:true,
        type:Buffer
    },
})

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
    discountQty:{
        type:Number,
        required:false,
    },
    images:[productImageSchema]
})

const Product = mongoose.model("Product",productSchema)



const validateAddProduct= (obj) => {
    const schema = joi.object({
        name:joi.string().required(),
        currency:joi.required(),
        description:joi.string().required(),
        quantity:joi.number().required(),
        brand:joi.string().required(),
        categoryId:joi.string().required(),
        price:joi.number().required(),
        discountQty:joi.number()
    })
    return schema.validate(obj)
}

const validateUpdateProduct= (obj) => {
    const schema = joi.object({
        name:joi.string(),
        currency:joi(),
        description:joi.string(),
        quantity:joi.number(),
        brand:joi.string(),
        categoryId:joi.string(),
        price:joi.number(),
        discountQty:joi.number()
    })
    return schema.validate(obj)

}




module.exports = {
    Product,
    validateAddProduct,
    validateUpdateProduct
}

