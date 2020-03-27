
var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    email: {type:String},
    password:{type:String},
    
}, { collection: 'users' });



module.exports = mongoose.model('users', schema);