exports.produce_on_rmq = (req, res, next) => {
    console.log('<<<Inside POST of RabbitMQ>>>');

    amqp.connect('amqp://localhost', (err, conn) => {
        console.log('<<<Connect with RabbitMQ..>>>');
        conn.createChannel((err, ch) => {
            var ex = 'logs';
            console.log(req.body);
            var msg = process.argv.slice(2).join(' ') || req.body.msg;

            ch.assertExchange(ex, 'fanout', { durable: false });
            ch.publish(ex, '', new Buffer(msg));
            console.log(" [x] Sent %s", msg);
            res.status(201).json('Message send to RabbitMQ');
        });

        setTimeout(() => { conn.close(); process.exit(0) }, 500);
    })
}