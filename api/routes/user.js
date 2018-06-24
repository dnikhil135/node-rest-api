/**
 * @author :
 * @description :Roting code to handle User API routes.
 * @version : 1.0
 *
 */

const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

router.post('/signup', userController.signup);

router.delete('/:id', userController.delete_user)

router.get('/findAll', userController.find_all_user)

//API to return JWT token to end user.
router.post('/login', userController.login)

module.exports = router;
