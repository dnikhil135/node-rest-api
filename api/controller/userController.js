const User = require('../model/user');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');

exports.signup = (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(409).json({
                    message: 'mail exist!!'
                })
            } else {

                password: bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json(err);
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        })
                        user
                            .save()
                            .then(result => {
                                console.log(result);
                                res.status(200).json({
                                    message: 'user created'
                                })

                            }).catch(err => {
                                console.log(err);
                                res.status(200).json({
                                    error: err
                                })
                            })
                    }
                })

            }
        })

}

exports.delete_user = (req, res, next) => {
    const id = req.params.id;
    User.findOneAndRemove(id).exec()
        .then(result => {
            res.status(201).json('User Deleted')
        })
        .catch(err => {
            console.log(err);
        })
}

exports.finall_user = (req, res, next) => {
    User.find()
        .exec()
        .then(result => {
            res.status(201).json({
                Responce: result
            })
        }).catch(err => {
            console.log(err);
        })
}

exports.login = (req, res, next) => {
    // const email =  req.body.email;
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                res.status(404).json({
                    message: 'Auth Failed'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    res.status(404).json({
                        message: 'Auth Failed'
                    })
                }

                if (result) {
                    //JWT token generaion!!!
                    const token = jsonWebToken.sign({
                        email: user[0].email,
                        userId: user[0].password,
                    },
                        "process.env.JWT_KEY",
                        {
                            expiresIn: '1h'
                        }

                    );
                    res.status(200).json({
                        message: 'Auth Succesful!!',
                        token: token
                    })
                }

            })

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
}