/**
 * @author :
 * @description :This file contain code to consume RMQ messages and send to DB.
 * @version : 1.0
 *
 */

const express = require('express');
const router = express.Router();
var amqp = require('amqplib/callback_api');
const User = require('../model/user');
const mongoose = require('mongoose');

amqp.connect('amqp://127.0.0.1', (err, conn) => {
  conn.createChannel((err, ch) => {
    var ex = 'logs';

    ch.assertExchange(ex, 'fanout', { durable: false });

    ch.assertQueue('', { exclusive: true }, (err, q) => {
      console.log(" [*] Waiting for messages in Queue %s. To exit press CTRL+C", q.queue);
      ch.bindQueue(q.queue, ex, '');

      ch.consume(q.queue, (msg) => {
        var obj = JSON.parse(msg.content.toString());
        console.log('obj-->' + obj)
        console.log(" [x]Message Consumed from RabbitMQ Queue===>   %s", obj.latitude);
        const user = new User({
          userId: obj.userId,
          username: obj.username,
          latitude: obj.latitude,
          longitude: obj.longitude
        });
        user.save();
      }, { noAck: true });
    });
  });
});

module.exports = router;
