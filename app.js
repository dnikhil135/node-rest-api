const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./api/routes/products');
const ordersRoutes = require('./api/routes/orders');
const usersRoutes = require('./api/routes/user');

// For Logging Request on Console.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({}));

//Routes configuration for routing.
app.use('/products', productsRoutes);
app.use('/orders', ordersRoutes);
app.use('/users', usersRoutes);

///mongoose.connect('mongodb://nodejs:'+ process.env.MONGO_ATLAS_PWD +'@node-shop-api-shard-00-00-5lpcu.mongodb.net:27017,node-shop-api-shard-00-01-5lpcu.mongodb.net:27017,node-shop-api-shard-00-02-5lpcu.mongodb.net:27017/test?ssl=true&replicaSet=node-shop-api-shard-0&authSource=admin&retryWrites=true');
mongoose.connect('mongodb://localhost/noderest', function (err) {
 
   if (err) throw err;
 
   console.log('Successfully connected');
 
});

//Coustomized error handling
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status=404;
    next(error);
});

//Generic Exception Handling.
app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    });
});


module.exports = app;