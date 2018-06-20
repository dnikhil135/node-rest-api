const express = require('express');
const router = express.Router();
var amqp = require('amqplib/callback_api');
const rabbitmqController = require('../controller/rabbitmqController');

router.post('/', rabbitmqController.produce_on_rmq);

module.exports = router;


