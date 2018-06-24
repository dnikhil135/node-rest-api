const jsonWebToken = require('jsonwebtoken');

module.exports = (req, res, next) => {

    

        const decoded = jsonWebToken.verify(req.body.token, 'secret');
        console.log(req.body.token)
        req.userData = decoded;
        next();
    
}