const express = require('express');
const router = express.Router();

router.get("/",(req, res, next) => {
    res.status(200).json({
        message:'This handle request for GET for order'
    });
});

router.post('/', (req, res, next) => {
res.status(200).json({
        message:'This handle POST request for order service.'
    });
});

router.get('/:orderId',(req, res, next) => {
    var orderId = req.params.orderId;
    console.log(orderId);
    res.status(201).json({
        message:'This is handle request for order with orderId ==> '+orderId,
        orderId:orderId
    });
});

module.exports=router;