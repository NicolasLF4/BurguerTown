'use strict'
var mongoosePaginate = require('mongoose-paginate-v2');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FinanzaSchema = Schema({
    // Datos del registro
    amount: Number,
    type: String,
    name: String,
    description: String,
    // Fecha del registro
    dateRegister: Date,

    // Persona que cargo el registro
    idUser: String,
    nameUser: String,

    // Dueño del diezmo
    idUserRegister: String,
    nameUserRegister: String,
    // Resaltar
    star: Boolean,
    // Momento al cargar el registro
    date: Date,
    edit: Boolean,
    iglesia: String,
    // Pertenece al dom
    dateDom: String
});
FinanzaSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('finanza', FinanzaSchema, 'finanzas');