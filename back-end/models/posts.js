// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Posts', new Schema({
    author: String,
    title: String,
    body: String,
}), 'posts'); //collection "users"
