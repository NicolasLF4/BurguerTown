'use strict'

var IglesiaController = require('../controllers/iglesia');
var FinanzaController = require('../controllers/finanza');
var express = require('express');
const jwt = require('jsonwebtoken');
var multer = require('multer');

function verifyToken(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(401).send('Unauthorized request1')
    }
    let token = req.headers.authorization.split(' ')[1]
    if (token === 'null') {
        return res.status(401).send('Unauthorized request2')
    }
    let payload = jwt.verify(token, 'secretKey')
    if (!payload) {
        return res.status(401).send('Unauthorized request')
    }
    req.userId = payload.subject
    next()
}

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, './uploads/albums');
    },
    filename(req, file = {}, cb) {
        const { originalname } = file;
        const fileExtension = (originalname.match(/\.+[\S]+$/) || [])[0];
        cb(null, `${file.fieldname}__${Date.now()}${fileExtension}`);
        crypto.pseudoRandomBytes(16, function(err, raw) {
            cb(null, raw.toString('hex') + Date.now() + fileExtension);
        });
    },
});

var upload = multer({ dest: 'uploads/' }, storage);

var router = express.Router();

router.get('/test', IglesiaController.test);
router.post('/login', IglesiaController.login);
router.post('/register', verifyToken, IglesiaController.register); /*, verifyToken*/
router.post('/registerIglesia', verifyToken, IglesiaController.registerIglesia); /* , verifyToken,*/
router.post('/saveLista', verifyToken, IglesiaController.saveLista); /*, verifyToken*/
router.post('/registerDomInicial', verifyToken, IglesiaController.registerDomInicial); /*  verifyToken,*/

router.get('/users', verifyToken, IglesiaController.getUsers); /*, verifyToken*/
router.get('/users/:id?', verifyToken, IglesiaController.getUserById); /*, verifyToken*/
router.get('/micelula/:idLider', verifyToken, IglesiaController.getMicelula);
router.get('/celulahome/:idLider', verifyToken, IglesiaController.getCelulahome); /*, verifyToken*/
router.get('/datoLista', verifyToken, IglesiaController.getDatoLista); /*, verifyToken*/
router.get('/muelle/:sexo,:iglesia', verifyToken, IglesiaController.getMuelle); /*, verifyToken*/
router.get('/muellemixto/:iglesia', verifyToken, IglesiaController.getMuelleMixto); /*, verifyToken*/
router.get('/monitoreo/:iglesia', verifyToken, IglesiaController.getMonitoreo); /*, verifyToken*/
router.get('/listAccess/:access,:iglesia', verifyToken, IglesiaController.getListAccess); /*, verifyToken*/
router.get('/getSoliNivel/:soli,:iglesia', verifyToken, IglesiaController.getSoliNivel); /*, verifyToken*/
router.get('/getSoliEstudio/:soli,:iglesia', verifyToken, IglesiaController.getSoliEstudio); /*, verifyToken*/
router.get('/getEliminar/:soli,:iglesia', verifyToken, IglesiaController.getEliminar); /*, verifyToken*/
router.get('/getEstudiando/:soli,:iglesia', verifyToken, IglesiaController.getEstudiando); /*, verifyToken*/
router.get('/conteoDom/:fechaDom,:iglesia', verifyToken, IglesiaController.getConteoDom); /*, verifyToken*/
router.get('/getCantNiveles/:iglesia', verifyToken, IglesiaController.getCantNiveles); /*, verifyToken*/

//FILTROS
router.get('/getListaRoja/:iglesia', verifyToken, IglesiaController.getListaRoja); /*, verifyToken*/

router.post('/upload-image/:id,:img', upload.single('image'), IglesiaController.uploadImage);
router.get('/get-image/:image', IglesiaController.getImageFile);

router.get('/getPerfilAsistencia/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:iglesia,:id', verifyToken, IglesiaController.getPerfilAsistencia); /*, verifyToken*/

router.get('/conteoDomNew/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoDomNew); /*, verifyToken*/
router.get('/conteoFullNew/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoFullNew); /*, verifyToken*/

router.get('/getBautismo/:iglesia', verifyToken, IglesiaController.getCantBautismo); /*, verifyToken*/

router.get('/conteoCelTrue/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoCelTrue); /*, verifyToken*/
router.get('/conteoCelFalse/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoCelFalse); /*, verifyToken*/
router.get('/conteoFull/:fechaDom,:iglesia', verifyToken, IglesiaController.getConteoFull); /*, verifyToken*/
router.get('/getFaltantes/:iglesia', verifyToken, IglesiaController.getFaltantes); /*, verifyToken*/
router.get('/getEncelu/:iglesia', verifyToken, IglesiaController.getEncelu); /*, verifyToken*/
router.get('/getSincelu/:iglesia', verifyToken, IglesiaController.getSincelu); /*, verifyToken*/
router.get('/getCantLideres/:iglesia', verifyToken, IglesiaController.getCantLideres); /*, verifyToken*/
router.get('/getCantAdmin/:iglesia', verifyToken, IglesiaController.getCantAdmin); /*, verifyToken*/
router.get('/getCantMujeres/:iglesia', verifyToken, IglesiaController.getCantMujeres); /*, verifyToken*/
router.get('/getCantHombres/:iglesia', verifyToken, IglesiaController.getCantHombres); /*, verifyToken*/
router.get('/getEdaduno/:iglesia', IglesiaController.getEdaduno); /*, verifyToken*/
router.get('/getDatosIglesia/:iglesia', verifyToken, IglesiaController.getDatosIglesia); /*, verifyToken*/
router.get('/getIglesiaById/:id', verifyToken, IglesiaController.getIglesiaById); /*, verifyToken*/
router.get('/getTodasLasIgles', verifyToken, IglesiaController.getTodasLasIgles); /*, verifyToken*/
router.get('/getTodaIgle/:iglesia', verifyToken, IglesiaController.getTodaIgle); /*, verifyToken*/
router.get('/getLideres/:iglesia', verifyToken, IglesiaController.getLideres); /*, verifyToken*/
router.get('/getReunionSelect/:iglesia', verifyToken, IglesiaController.getReunionSelect); /*, verifyToken*/
router.get('/personal/:id', verifyToken, IglesiaController.getPersonal); /*, verifyToken*/

router.put('/setmuelle/:muelle,:iglesia', verifyToken, IglesiaController.setMuelle); /*, verifyToken*/
router.put('/setgrafico/:grafico,:iglesia', verifyToken, IglesiaController.setGrafico); /*, verifyToken*/
router.put('/setListaAdmin/:listaAdmin,:iglesia', verifyToken, IglesiaController.setListaAdmin); /*, verifyToken*/
router.put('/setlevel/:setlevel,:iglesia', verifyToken, IglesiaController.setLevel); /*, verifyToken*/
router.put('/setCantCulto/:setCantCulto,:iglesia', verifyToken, IglesiaController.setCantCulto); /*, verifyToken*/
router.put('/actualizar/:id', verifyToken, IglesiaController.updateUser); /*, verifyToken*/
router.put('/agregarcampo/:iglesia,:value1,:value2', verifyToken, IglesiaController.agregarCampo); /*, verifyToken*/
router.put('/editarIglesia/:id', verifyToken, IglesiaController.editarIglesia); /*, verifyToken*/
router.delete('/eliminar/:id', verifyToken, IglesiaController.eliminarUsuario); /*, verifyToken*/
router.delete('/eliminarIglesia/:id', verifyToken, IglesiaController.eliminarIglesia); /*, verifyToken*/


// FINANZA
router.post('/saveFinanza', verifyToken, FinanzaController.saveFinanza); /*, verifyToken*/
router.get('/getWeekTotal/:iglesia', verifyToken, FinanzaController.getWeekTotal); /*, verifyToken*/
router.get('/getAllWeek/:iglesia,:domDate', verifyToken, FinanzaController.getAllWeek); /*, verifyToken*/
router.get('/getCierreAnterior/:iglesia,:domDate', verifyToken, FinanzaController.getCierreAnterior); /*, verifyToken*/
router.get('/getAllFinanza/:iglesia', verifyToken, FinanzaController.getAllFinanza); /*, verifyToken*/





module.exports = router;