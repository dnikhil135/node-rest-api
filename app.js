const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const moongose = require('mongoose');
require('body-parser-xml')(bodyParser);

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/user');
const rabbitmqRoutes = require('./api/routes/rabbitmq');
const xmlparseRoutes = require('./api/routes/xmlparse');
const recevielogRoutes = require('./api/routes/recevie_log');


// For Logging Request on Console.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({}));
app.use(bodyParser.xml({
    limit: '1MB',   // Reject payload bigger than 1 MB
    xmlParseOptions: {
        normalize: true,     // Trim whitespace inside text nodes
        normalizeTags: true, // Transform tags to lowercase
        explicitArray: false // Only put nodes in array if >1
    }
}));

//Routes configuration for routing.
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);
app.use('/rabbitMQ', rabbitmqRoutes);
app.use('/xmlparse', xmlparseRoutes);
app.use('/xmlparse', recevielogRoutes);

//mongoose.connect('mongodb://nodejs:nodejs@node-shop-api-shard-00-00-5lpcu.mongodb.net:27017,node-shop-api-shard-00-01-5lpcu.mongodb.net:27017,node-shop-api-shard-00-02-5lpcu.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-api-shard-0&authSource=admin&retryWrites=true');
moongose.connect('mongodb://localhost/noderest', (err) => {
    if (err) throw err;
    console.log('Successfully connected');

});

//Coustomized error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

//Generic Exception Handling.
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
