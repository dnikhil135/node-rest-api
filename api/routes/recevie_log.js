const express = require('express');
const router = express.Router();

var amqp = require('amqplib/callback_api');

amqp.connect('amqp://localhost', (err, conn) => {
  conn.createChannel((err, ch) => {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true }, (err, q) => {
      console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, (msg) => {
        console.log(" [x] %s", msg.content.toString());
      }, { noAck: true });
    });
  });
});

module.exports = router;
