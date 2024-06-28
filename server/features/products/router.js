const express = require('express')
const router = express.Router()
const ProductController = require('./controller')
const upload = require('../../core/middlewares/fileHandler')

router.get('/',ProductController.getAllProducts)
router.post('/',ProductController.AddProduct)
router.get('/:id',ProductController.getProductById)
router.patch('/:id',ProductController.UpdateProduct)
router.delete('/:id',ProductController.deleteProductById)

router.get('/:productId/images/:imageId',ProductController.getProductImageById)
router.delete('/:productId/images/:imageId',ProductController.deleteProductImageById)
router.post('/:productId/images',upload.array('images', 10),ProductController.addProductImages)

module.exports = router