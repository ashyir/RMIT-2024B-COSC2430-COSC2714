const productController = require('../controllers/productController');
const express = require('express');

const router = express.Router();

router.get('/search', productController.search);    // Route to display all products or search products
router.get('/:id', productController.details);      // Route to display a single product by ID

module.exports = router;