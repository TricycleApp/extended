const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

/** Get all products */
router.get('/all', productController.getAllProducts);

/** Get a product */
router.get('/:barcode', productController.getProduct);

/** Create a product */
router.post('/add', productController.addProduct);

/** Edit a product */
router.put('/edit/:barcode', productController.editProduct);

/** Delete a product */
router.delete('/delete/:barcode', productController.deleteProduct);

module.exports = router;