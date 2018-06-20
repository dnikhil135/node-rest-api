const Product = require('../model/product');
exports.get_all_product = (req, res, next) => {
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
}