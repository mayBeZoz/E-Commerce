const controllerHandler = require('../../core/middlewares/controllerHandler')
const StatusCode = require('../../core/utils/statusCode')
const {Product,validateAddProduct,validateUpdateProduct} = require('./model')

class ProductController {
    
    static AddProduct = controllerHandler(
        async (req,res,next) => {
            const body = req.body;
            const {error} = validateAddProduct(body)
            if (error) {
                return res.status(400).json({
                    data:null,
                    message:`Validation Error : ${error.message}`,
                    error:error,
                    status_code:StatusCode.validation
                })
            }else {
                try {
                    const product = await Product.create(body)
                    await product.save()
                    return res.status(201).json({
                        data:product,
                        message:"Product Created Successfully",
                        error:null,
                        status_code:StatusCode.success
                    })
                }catch (err){
                    next(err)
                }
            }
        }
    )

    static UpdateProduct = controllerHandler(
        async (req,res,next) => {
            const body = req.body;
            const {error} = validateUpdateProduct(body)
            const id = req.params.id
            if (error) {
                return res.status(400).json({
                    data:null,
                    message:`Validation Error : ${error.message}`,
                    error:error,
                    status_code:StatusCode.validation
                })
            }else {
                try {                   
                    const product = await Product.findOneAndUpdate(
                        { _id: id },
                        { $set: body },
                        { new: true }
                    )
                    if (product){
                        return res.status(200).json({
                            data:product,
                            message:`Product Updated Successfully`,
                            error:null,
                            status_code:StatusCode.success
                        })
                    }
                    return res.status(404).json({
                        data:null,
                        message:"Product Not Found",
                        error:null,
                        status_code:StatusCode.notFound
                    })
                }catch (err){
                    next(err)
                }
            }
        }
    )

    static getAllProducts = controllerHandler(
        async (req,res,next) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;
                const totalProducts = await Product.countDocuments({});
                const totalPages = Math.ceil(totalProducts / limit);
    
                const allProducts = await Product
                .find({})
                .skip(skip)
                .limit(limit)
                .populate('categoryId')
                .select('name _id price currency description quantity brand categoryId discountQty images._id')

                return res.status(200).json({
                    data:{ 
                        products:allProducts,
                        total_pages:totalPages,
                        curr_page:page
                    },
                    message:"Success Getting All Products",
                    error:null,
                    status_code:StatusCode.success
                })
            }catch (err) {
                next(err)
            }
        }
    )

    static getProductById = controllerHandler(
        async (req,res,next) => {
            const id = req.params.id
            try {
                const product = await Product
                .findById(id).populate('categoryId')
                .select('name _id price currency description quantity brand categoryId discountQty images._id')
                if (product){
                    return res.status(200).json({
                        data:product,
                        message:"Success Getting Product By Id",
                        error:null,
                        status_code:StatusCode.success
                    })
                }
                return res.status(404).json({
                    data:null,
                    message:"Product Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }catch (err) {
                next(err)
            }
        }
    )

    static deleteProductById = controllerHandler(
        async (req,res,next) => {
            const id = req.params.id
            try {
                const product = await Product.findByIdAndDelete(id)
                if (product) {
                    return res.status(200).json({
                        data:product,
                        message:"Success Deleting Product By Id",
                        error:null,
                        status_code:StatusCode.success
                    })
                }
                return res.status(404).json({
                    data:null,
                    message:"Product Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }catch (err) {
                next(err)
            }
        }
    )

    static addProductImages = controllerHandler(
        async (req,res,next) => {
            const productId = req.params.productId
            const files = req.files;

            try {
                const product = await Product.findById(productId)
                if (product) {
                    images = files.map(currFile => ({
                        mimeType: currFile.mimetype,
                        imageBuffer: currFile.buffer
                    }))
                    product.images = [...product.images,...images]
                    await product.save()
                    return res.status(200).json({
                        data:product,
                        message:"Product Images Added Successfully",
                        error:null,
                        status_code:StatusCode.success
                   })
                }
                return res.status(404).json({
                    data:null,
                    message:"Product Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }catch (err) {
                next(err)
            }
        }
    )

    static getProductImageById = controllerHandler(
        async (req,res,next) => {
            const productId = req.params.productId
            const imageId = req.params.imageId

            try {
                const product = await Product.findById(productId)
                if (product) {
                    const image = product.images.find(currImage => currImage._id == imageId)
                    if (image) {
                        res.set('Content-Type',image.mimeType)
                        res.send(image.imgBuffer)
                    }
                    else {
                        return res.status(404).json({
                            data:null,
                            message:"Product Image Not Found",
                            error:null,
                            status_code:StatusCode.notFound
                        })
                    }
                }
                return res.status(404).json({
                    data:null,
                    message:"Product Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }catch (err) {
                next(err)
            }
        }
    )

    static deleteProductImageById = controllerHandler(
        async (req,res,next) => {
            const productId = req.params.productId
            const imageId = req.params.imageId
            try {
                const product = await Product.findById(productId)
                if (product) {
                    product.images = product.images.filter(currImage => currImage._id!== imageId)
                    await product.save()
                    return res.status(200).json({
                        data:product,
                        message:"Product Image Deleted Successfully",
                        error:null,
                        status_code:StatusCode.success
                    })
                }
                return res.status(404).json({
                    data:null,
                    message:"Product Not Found",
                    error:null,
                    status_code:StatusCode.notFound
                })
            }catch (err) {
                next(err)
            }
        }
    )
}



module.exports = ProductController;