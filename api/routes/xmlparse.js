const express = require('express');
const router = express.Router();
var amqp = require('amqplib/callback_api');

//API to handle POST resquest with XML Body.
router.post('/', (req, res, body) => {
    // Any request with an XML payload will be parsed
    // and a JavaScript object produced on req.body
    // corresponding to the request payload.
    console.log(req.body);
    res.status(200).end();
});

module.exports = router;

