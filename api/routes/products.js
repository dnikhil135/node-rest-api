const express = require('express');
const router = express.Router();
const Product = require('../model/product');
const mongoose = require('mongoose');

//API to Domonstrate GET request for product route.
router.get('/', (req, res, next) => {
    Product.find()
        .select('name price _id')//selected feild selection
        .exec()
        .then(docs => {
            console.log(docs);
            const response = {
                count: docs.length,
                product: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        _id: doc.id,
                        request: {
                            method: 'GET',
                            URL: 'http://localhost:3000/products/' + doc._id
                        }
                    }
                })

            };

            res.status(200).json(response)
        })
        .catch(err => {
            console.log(err);
        })
});

//API to Domonstrate GET request for product route with parameter.

router.get('/:productId', (req, res, next) => {
    var productId = req.params.productId;
    console.log(productId);
    Product.findById(productId)
        .select('name price _id')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: {
                        method: 'GET',
                        URL: 'http://localhost:3000/products/' + doc._id
                    }
                })
            } else {
                res.status(404).json('Not Found')
            }
        }).catch(err => {

            console.log(err);
            res.status(500).json({
                error:err
            })
        })
})

//API to Domonstrate POST request for product route.
//Handling Requets Body using Body parser.
router.post('/', (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log('===> ' + result);
        res.status(200).json({
            createdProduct:{
            message: 'product is created',
            product: product
        }
        });
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId

    //Product.update({_id:id}, {$Set: {name: req.body.newName, price: req.body.newPrice}});

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propNmae] = ops.value;
    }
    Product.update({ _id: id }, { $Set: updateOps })
        .exec()
        .then(result => {
            console.log(result);
            res.status(201).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findOneAndRemove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Product Removed Successfuly"
            });

        }).catch(err => {

            console.log(err);
            res.status(500).json({
                error: err
            })

        })
});

router.put('/', (req, res, next) => {
    res.status(201).json({
        message: 'This handles PUT request'
    });
});

module.exports = router;