const express = require('express');
const router = express.Router();
var amqp = require('amqplib/callback_api');
const xmlparseController = require('../controller/xmlparseController');

//API to handle POST resquest with XML Body.
router.post('/', xmlparseController.xml_parse);

module.exports = router;

