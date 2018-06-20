exports.get_all_order = (req, res, next) => {
    res.status(200).json({
        message: 'This handle request for GET for order'
    });
}

//exports.post_order =

exports.get_order_on_orderid = (req, res, next) => {
    var orderId = req.params.orderId;
    console.log(orderId);
    res.status(201).json({
        message: 'This is handle request for order with orderId ==> ' + orderId,
        orderId: orderId
    });
}

