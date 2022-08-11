'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ListaSchema = Schema({
	iglesia: String,
	idUser: String,
	nombreUser: String,
	apellidoUser: String,
	idLider: String,
	nombreLider: String,
	apellidoLider: String,
	fechaDom: String,
	celula: Boolean,
	domingo: Boolean,
	contador: Number
});

module.exports = mongoose.model('lista', ListaSchema);
