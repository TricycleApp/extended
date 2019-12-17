const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

const auth = require('../controllers/middleware/auth');

/** Get all products */
router.get('/all', auth, productController.getAllProducts);

/** Get a product */
router.get('/:barcode', auth, productController.getProduct);

/** Create a product */
router.post('/add', auth, productController.addProduct);

/** Edit a product */
router.put('/edit/:barcode', auth, productController.editProduct);

/** Delete a product */
router.delete('/delete/:barcode', auth, productController.deleteProduct);

module.exports = router;