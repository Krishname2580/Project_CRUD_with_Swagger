const express = require('express')
const ProductEjsController = require('../controller/productEjsController')
const multer = require('../utils/multer')
const cloudinary = require('../utils/cloudinary')

const router = express.Router()


router.get('/', ProductEjsController.homePage)
router.get('/home', ProductEjsController.homePage)
router.get('/create', ProductEjsController.createPage)
router.post('/create', multer.single('image'), ProductEjsController.createProduct)
router.get('/products/:id', ProductEjsController.productDetails)
router.get('/product/:id/edit', ProductEjsController.editView)
router.post("/product/:id/edit", multer.single('image'), ProductEjsController.updateProduct);
router.get('/product/:id/delete', ProductEjsController.deleteProduct)

module.exports = router