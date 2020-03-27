var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {type:String},
    description:{type:String},
    status: Number
}, { collection: 'task' });
schema.index({title: 'text', description:'text'})


module.exports = mongoose.model('task', schema);