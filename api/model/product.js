const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{type:String, required:true},//Validation
    price: {type:Number, required:true}//Validation
});


module.exports = mongoose.model('Product', productSchema);