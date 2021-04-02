const express = require('express');
const BodyParser = require('body-parser');
const ProductController = require('../controllers/product.controller');

const router = express.Router();
router.use(BodyParser.json());

router.get('', ProductController.getProducts);
router.get('/:sku', ProductController.getProduct);
router.post('', ProductController.createProduct);
router.put('/:sku', ProductController.replaceProduct);
router.patch('/:sku', ProductController.modifyProduct);
router.delete('/:sku', ProductController.deleteProduct);
router.delete('', ProductController.deleteProducts);

module.exports = router;
