'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DomSchema = Schema({
	dom: String,
	tomarLista: Boolean,
	recordatorio: String,
	mensajeGlobal: String,
	versiculo: String,
	textoVersiculo: String,
	llave: Number,
});

module.exports = mongoose.model('dom', DomSchema, 'dom');
