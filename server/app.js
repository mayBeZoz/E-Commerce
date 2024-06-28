const express = require("express")
const dotenv = require('dotenv');
const StatusCode = require('./core/utils/statusCode')
const dbConnection = require('./core/infrastructure/db-connection')

const app = express()
dotenv.config({path:"./config.env"});
app.use(express.json())

dbConnection()






const ProductsRouter = require('./features/products/router')
const UsersRouter = require('./features/users/router')





app.use('/api/products',ProductsRouter)
app.use('/api/users',UsersRouter)


app.use((err,req,res,next)=>{
    res.status(500).json({
        data:null,
        message:`Internal Server Error : ${err.message}`,
        error:err,
        status_code:StatusCode.internalError
    })
})

const PORT = process.env.PORT || 8000
app.listen(PORT,()=>{
    console.log("server is running on port : " + PORT)
})



