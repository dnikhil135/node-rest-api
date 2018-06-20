const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController')

router.get("/",orderController.get_all_order);

// router.post('/', orderController.post_order);

router.get('/:orderId',orderController.get_order_on_orderid);

module.exports=router;