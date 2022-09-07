'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CategorySchema = Schema({
	name: String,
    establishment: String,
    type: String
});

module.exports = mongoose.model('category', CategorySchema, 'category');