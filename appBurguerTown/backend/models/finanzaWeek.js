'use strict'
var mongoosePaginate = require('mongoose-paginate-v2');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var FinanzaWeekSchema = Schema({
    // Datos del registro
    amount: Number,
    cantDiezmos: Number,
    cantGastos: Number,
    iglesia: String,
    // Pertenece al dom
    dateDom: Date
});
FinanzaWeekSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('finanzaWeek', FinanzaWeekSchema, 'finanzasWeek');