const controllerHandler = require('../../core/utils/controllerHandler')
const StatusCode = require('../../core/utils/statusCode')
const {ProductComment,validateAddProductComment,validateUpdateProductComment} = require('./model')

class ProductCommentController {
    static addProductComment = controllerHandler(
        async (req,res,next) => {
            const productId = req.params.productId
            const body = req.body
            const {error} = validateAddProductComment(body)
            if (error) {
                return res.status(400).json({
                    data:null,
                    message:`Validation Error : ${error.message}`,
                    error:error,
                    status_code:StatusCode.validation
                })
            }else {
                try {
                    const productComment = await ProductComment.create({...body, productId})
                    await productComment.save()
                    return res.status(201).json({
                        data:productComment,
                        message:"Product Comment Added Successfully",
                        error:null,
                        status_code:StatusCode.success
                    })
                } catch (error) {
                    next(error)
                }
            }
            
        }
    )
    
    static getProductComments = controllerHandler(
        async (req,res,next) => {
            const productId = req.params.productId
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;

            const skip = (page - 1) * limit;
            const totalComments = await Product.countDocuments({productId});
            const totalPages = Math.ceil(totalComments / limit);

            const productComments = await ProductComment
            .find({productId})
            .skip(skip)
            .limit(limit)
            .populate('authorId')
            .populate('productId')
            
            return res.status(200).json({
                data:{
                    productComments:productComments,
                    total_pages:totalPages,
                    curr_page:page
                },
                message:"Got Product Comments Successfully",
                error:null,
                status_code:StatusCode.success
            })
        }
    )
    
    static deleteCommentById = controllerHandler(
        async (req, res, next) => {
            const commentId = req.params.commentId
            const productComment = await ProductComment.findByIdAndDelete(commentId)
            if (!productComment) {
                return res.status(404).json({
                    data:null,
                    message:"Product Comment Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }
            if (productComment.productId!= productId) {
                return res.status(404).json({
                    data:null,
                    message:"Product Comment Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }
        }
    )

    static editCommentById = controllerHandler(
        async (req, res, next) => {
            const commentId = req.params.commentId
            const body = req.body
            const {error} = validateUpdateProductComment(body)
            if (error) {
                return res.status(400).json({
                    data:null,
                    message:`Validation Error : ${error.message}`,
                    error:error,
                    status_code:StatusCode.validation
                })
            }else {
                try {
                    const productComment = await ProductComment.findByIdAndUpdate(
                        {_id:commentId},
                        { $set: body },
                        {new: true}
                    )
                    await productComment.save()
                    return res.status(200).json({
                        data:productComment,
                        message:"Product Comment Updated Successfully",
                        error:null,
                        status_code:StatusCode.success
                    })
                } catch (error) {
                    next(error)
                }
            }
        }
    )
}


module.exports = ProductCommentController