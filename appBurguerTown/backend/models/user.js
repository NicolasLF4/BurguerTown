'use strict'
var mongoosePaginate = require('mongoose-paginate');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var UserSchema = Schema({
    iglesia: String,
    nombre: String,
    nombre2: String,
    apellido: String,
    access: Number,
    mailAccess: String,
    password: String,
    lider: Boolean,
    contador: Boolean,
    admin: Boolean,
    cantCelulas: Number,
    liderAlabanza: Boolean,
    musico: Boolean,
    tesorero: Boolean,
    nacimiento: String,
    email: String,
    sexo: String,
    direccion: String,
    ciudad: String,
    idLider: String,
    miLider: String,
    ministerio: String,
    prefijo: String,
    celular: Number,
    primeraVez: Boolean,
    cantNotificacion: Number,
    notificacion: [String],
    pasarLista: Boolean,
    img: String,
    descripcion: [{
        nota: String,
        hora: String,
        fecha: String,
        autor: String,
        tipo: String,
        leido: Boolean
    }],
    edad: String,
    faltas: Number,
    contactadoId: String,
    contactadoNombre: String,
    soliEliminar: Boolean,
    motivoEliminar: String,
    soliNivel: Boolean,
    motivoNivel: String,
    soliEstudio: Boolean,
    descEstudio: String,
    estudiando: Boolean,
    nivelPersonal: Number,
    reunionSelect: Number,
    //Bautismo
    soliBautismo: Boolean,
    motivoBautismo: String,
    inscBautismo: Boolean,
    bautizado: Boolean,
    ultimaActualizacion: Date
});
UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('user', UserSchema, 'users');