'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocalSchema = Schema({
	nombre: String,
    direction: String,
	description: String,
	lastPayment: Number,
	suspend: Boolean,
	namePerson: String,
	phone: String,
	establishment: String,
});

module.exports = mongoose.model('local', LocalSchema, 'local');