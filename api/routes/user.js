const express = require('express');
const router = express.Router();
const User = require('../model/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jsonWebToken = require('jsonwebtoken');
const userController = require('../controller/userController');

router.post('/signup', userController.signup);

router.delete('/:id', userController.delete_user)

router.get('/findAll', userController.finall_user)

router.post('/login', userController.login)

module.exports = router;