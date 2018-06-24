/**
 * @author :
 * @description :Roting code to handle RMQ route to produc message.
 * @version : 1.0
 *
 */

const express = require('express');
const router = express.Router();
//Below module used for connecting with RMQ
var amqp = require('amqplib/callback_api');
const rmqproducerController = require('../controller/rmqproducerController');

router.post('/', rmqproducerController.produce_message);

module.exports = router;
