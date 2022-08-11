'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IglesiasSchema = Schema({
    nombrePastor: String,
    celular: String,
    direccion: String,
    ciudad: String,
    nombreIglesia: String,
    svIglesia: Boolean,
    svFinanza: Boolean,
    svMusica: Boolean,
    muelle: Boolean, //Muelle
    grafico: Boolean,
    listaAdmin: Boolean,
    idea4: Boolean,
    fechaPago: Date,
    suspender: Boolean,
    mensajeIglesia: String,
    ministerios: [String],
    setLevel: Number,
    cantCulto: Number
});

module.exports = mongoose.model('iglesias', IglesiasSchema);