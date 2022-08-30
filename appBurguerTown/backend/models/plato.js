'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlatoSchema = Schema({
	precio: Number,
	description: String,
	image: String,
	name: String,
	numberPerson: String,
	category: String,
	establishment: String,
});

module.exports = mongoose.model('plato', PlatoSchema, 'plato');
