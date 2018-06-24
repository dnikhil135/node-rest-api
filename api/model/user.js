/**
 * @author :
 * @description :model for user.
 * @version : 1.0
 *
 */

const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    userId: String,
    username : String,
    latitude: String,
    longitude: String,
    email: { type: String, match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ },//Validation
    password: { type: String }//Validation

});

module.exports = mongoose.model('User', userSchema);
