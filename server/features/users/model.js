const mongoose=require("mongoose")
const joi = require("joi")


const userSchema = new mongoose.Schema({
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    },
    phone:{
        required:true,
        type:String,
        unique:true,

    },
    email:{
        required:true,
        type:String,
        unique:true,

    },
    password:{
        required:true,
        type:String
    },
    city:{
        required:true,
        type:String
    },
    country:{
        required:true,
        type:String
    },
    avatar:{
        mimeType:{
            type:String,
            required:false
        },      
        buffer:{
            type:Buffer,
            required:false
        }
    }
})

const User = new mongoose.Model('User',userSchema)

const validateAddUser = (obj) => {
    const schema = joi.object({
        firstName:joi.string().required().min(3).max(15),
        lastName:joi.string().required().min(3).max(15),
        phone:joi.string().required(),
        email:joi.string().required().email(),
        password:joi.string().required().min(6),
        city:joi.string().required(),
        country:joi.string().required(),
    })
    return schema.validate(obj)
}

const validateUpdateUser = (obj) => {
    const schema = joi.object({
        firstName:joi.string().min(3).max(15),
        lastName:joi.string().min(3).max(15),
        phone:joi.string(),
        email:joi.string().email(),
        password:joi.string().min(6),
        city:joi.string(),
        country:joi.string(),
    })
    return schema.validate(obj)
}

module.exports = {
    User,
    validateAddUser,
    validateUpdateUser
}