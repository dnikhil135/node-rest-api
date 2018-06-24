/**
 * @author :
 * @description :Controller to handle user RMQ API.
 * @version : 1.0
 *
 */

const amqp = require('amqplib/callback_api');

//Below code to publish message on RMQ server.
exports.produce_message = (req, res, next) => {
    console.log('<<<Inside POST of RabbitMQ>>>');
    amqp.connect('amqp://localhost', (err, conn) => {
        console.log('<<<Connect with RabbitMQ..>>>');
        conn.createChannel((err, ch) => {
            var ex = 'logs';
            console.log(req.body);
            //var msg = process.argv.slice(2).join(' ') || req.body;
            var msg = JSON.stringify(req.body);
            ch.assertExchange(ex, 'fanout', { durable: false });
            ch.publish(ex, '', new Buffer(msg));
            console.log(" [x] Message Produced to RabbitMQ Queue %s", msg);
            res.status(200).json('Message send to RabbitMQ');
        });

        //setTimeout(() => { conn.close(); process.exit(0) }, 500);
    })

}
