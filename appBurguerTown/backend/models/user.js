'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
	access: String,
    mail: String,
	password: String,
	name: String,
	establishment: String,
	state: Boolean,
});

module.exports = mongoose.model('user', UserSchema, 'user');