const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const productController = require('../controller/productController');
const mongoose = require('mongoose');

//API to Domonstrate GET request for product route.
router.get('/', productController.get_all_product);

//API to Domonstrate GET request for product route with parameter.

router.get('/:productId', productController.product_based_on_productid)

//API to Domonstrate POST request for product route.
//Handling Requets Body using Body parser.
router.post('/', );

router.patch('/:productId', productController.product_based_on_productid);

router.delete('/:productId', productController.delete_product);

router.put('/', (req, res, next) => {
    res.status(201).json({
        message: 'This handles PUT request'
    });
});

module.exports = router;