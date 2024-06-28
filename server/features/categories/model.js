const mongoose=require("mongoose")
const joi = require("joi")

const categorySchema = new mongoose.Schema({
    name:String
})