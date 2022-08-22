'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlatoSchema = Schema({
	dom: String,
	tomarLista: Boolean,
	recordatorio: String,
	mensajeGlobal: String,
	versiculo: String,
	textoVersiculo: String,
	llave: Number,
});

module.exports = mongoose.model('plato', PlatoSchema, 'plato');
