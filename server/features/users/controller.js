const controllerHandler = require('../../core/middlewares/controllerHandler')
const StatusCode = require('../../core/utils/statusCode')
const {User, validateAddUser,validateUpdateUser} = require('./model')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class UserController {
    static login = controllerHandler(
        async (req,res,next) => {
            const {email,password} = req.body
            try {
                const user = await User.findOne({email})
                if (user) {
                    console.log(user);
                    const validPassword = await bcrypt.compare(password,user.password)
                    if (validPassword) {
                        const token = jwt.sign(
                            {
                                _id:user._id,
                                email:user.email,
                                date:Date()
                            },
                            process.env.JWT_SECRET
                        )
                        return res.status(200).json({
                            data:{
                                user,
                                token
                            },
                            message:"Logged In Successfully",
                            error:null,
                            status_code:StatusCode.success
                        })
                    }else {
                        return res.status(401).json({
                            data:null,
                            message:"Invalid Password",
                            error:null,
                            status_code:StatusCode.unAuthorized
                        })
                    }
                }else {
                    return res.status(404).json({
                        data:null,
                        message:"User Not Found",
                        error:null,
                        status_code:StatusCode.notFound
                    })
                }

            }catch (err) {
                next(err)
            }
        }
    )


    static register = controllerHandler(
        async (req, res, next) => {
            const body = req.body;
            const {error} = validateAddUser(body)
            if (error) {
                return res.status(400).json({
                    data:null,
                    message:`Validation Error : ${error.message}`,
                    error:error,
                    status_code:StatusCode.validation
                })
            }else {
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(body.password, salt);
                try {
                    const user = await User.create({...body,password:hashedPassword});
                    await user.save()
                    const token = jwt.sign(
                        {
                            _id:user._id,
                            email:user.email,
                            date:Date()
                        },
                        process.env.JWT_SECRET
                    )
                    res.status(200).json({
                        data:{
                            user,
                            token
                        },
                        message:"User Created Successfully",
                        error:null,
                        status_code:StatusCode.success,
                        
                    })
                }catch(err) {
                    next(err)
                }
                            
            }
        }
    )

    static deleteUserById = controllerHandler(
        async (req,res,next) => {
            const userId = req.params.id
            try {
                const user = await User.findByIdAndDelete(userId)
                if (user) {
                    return res.status(200).json({
                        data:null,
                        message:"User Deleted Successfully",
                        error:null,
                        status_code:StatusCode.success
                    })
                }else {
                    return res.status(404).json({
                        data:null,
                        message:"User Not Found",
                        error:null,
                        status_code:StatusCode.notFound
                    })
                }
            } catch (err) {
                next(err)
            }
        }
    )


    static updateUserById = controllerHandler(
        async (req,res,next)=> {
            
        }
    )
}

module.exports = UserController;