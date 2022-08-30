'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PedidoSchema = Schema({
	tiempo: Number,
    mesa: Number,
	pedidoComida: String,
	pedidoBebida: String,
	estado: String,
	precio: Number,
	establishment: String,
});

module.exports = mongoose.model('pedido', PedidoSchema, 'pedido');