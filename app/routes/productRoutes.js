const express = require('express');
const ProductController = require('../controller/ProductController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Product
 *     description: Product CRUD API
 */

/**
 * @swagger
 * /product/create:
 *   post:
 *     tags:
 *       - Product
 *     summary: Create Product
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Product object
 *         required: true
 *         schema:
 *           type: object
 *           required:
 *             - name
 *             - price
 *             - category
 *           properties:
 *             name:
 *               type: string
 *               example: T-Shirt
 *             price:
 *               type: number
 *               example: 500
 *             category:
 *               type: string
 *               example: Men
 *     responses:
 *       200:
 *         description: Product Created Successfully
 */
router.post('/product/create', ProductController.createProduct);

/**
 * @swagger
 * /product:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get All Products
 *     responses:
 *       200:
 *         description: Product List
 */
router.get('/product', ProductController.getProduct);

/**
 * @swagger
 * /product/edit/{id}:
 *   get:
 *     tags:
 *       - Product
 *     summary: Get Product By ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product Found
 *       404:
 *         description: Product Not Found
 */
router.get('/product/edit/:id', ProductController.getProductById);

/**
 * @swagger
 * /product/update/{id}:
 *   put:
 *     tags:
 *       - Product
 *     summary: Update Product
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Shirt
 *             price:
 *               type: number
 *               example: 800
 *             category:
 *               type: string
 *               example: Women
 *     responses:
 *       200:
 *         description: Product Updated Successfully
 *       404:
 *         description: Product Not Found
 */
router.put('/product/update/:id', ProductController.updateProduct);

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     tags:
 *       - Product
 *     summary: Delete Product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product Deleted Successfully
 *       404:
 *         description: Product Not Found
 */
router.delete('/product/delete/:id', ProductController.deleteProduct);

module.exports = router;