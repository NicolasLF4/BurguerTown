'use strict'

var CocinaController = require('../controllers/cocina');
var AdminController = require('../controllers/admin');
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
router.post('/registerIglesia', verifyToken, IglesiaController.registerIglesia);
router.post('/saveLista', verifyToken, IglesiaController.saveLista); 
router.post('/registerDomInicial', verifyToken, IglesiaController.registerDomInicial);

router.get('/users', verifyToken, IglesiaController.getUsers); 
router.get('/users/:id?', verifyToken, IglesiaController.getUserById); 
router.get('/micelula/:idLider', verifyToken, IglesiaController.getMicelula);
router.get('/celulahome/:idLider', verifyToken, IglesiaController.getCelulahome); 
router.get('/datoLista', verifyToken, IglesiaController.getDatoLista); 
router.get('/muelle/:sexo,:iglesia', verifyToken, IglesiaController.getMuelle); 
router.get('/muellemixto/:iglesia', verifyToken, IglesiaController.getMuelleMixto); 
router.get('/monitoreo/:iglesia', verifyToken, IglesiaController.getMonitoreo); 
router.get('/listAccess/:access,:iglesia', verifyToken, IglesiaController.getListAccess); 
router.get('/getSoliNivel/:soli,:iglesia', verifyToken, IglesiaController.getSoliNivel); 
router.get('/getSoliEstudio/:soli,:iglesia', verifyToken, IglesiaController.getSoliEstudio); 
router.get('/getEliminar/:soli,:iglesia', verifyToken, IglesiaController.getEliminar); 
router.get('/getEstudiando/:soli,:iglesia', verifyToken, IglesiaController.getEstudiando); 
router.get('/conteoDom/:fechaDom,:iglesia', verifyToken, IglesiaController.getConteoDom); 
router.get('/getCantNiveles/:iglesia', verifyToken, IglesiaController.getCantNiveles); 

//FILTROS
router.get('/getListaRoja/:iglesia', verifyToken, IglesiaController.getListaRoja); 

router.post('/upload-image/:id,:img', upload.single('image'), IglesiaController.uploadImage);
router.get('/get-image/:image', IglesiaController.getImageFile);

router.get('/getPerfilAsistencia/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:iglesia,:id', verifyToken, IglesiaController.getPerfilAsistencia); 

router.get('/conteoDomNew/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoDomNew); 
router.get('/conteoFullNew/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoFullNew); 

router.get('/getBautismo/:iglesia', verifyToken, IglesiaController.getCantBautismo); 

router.get('/conteoCelTrue/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoCelTrue); 
router.get('/conteoCelFalse/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, IglesiaController.getConteoCelFalse); 
router.get('/conteoFull/:fechaDom,:iglesia', verifyToken, IglesiaController.getConteoFull); 
router.get('/getFaltantes/:iglesia', verifyToken, IglesiaController.getFaltantes); 
router.get('/getEncelu/:iglesia', verifyToken, IglesiaController.getEncelu); 
router.get('/getSincelu/:iglesia', verifyToken, IglesiaController.getSincelu); 
router.get('/getCantLideres/:iglesia', verifyToken, IglesiaController.getCantLideres); 
router.get('/getCantAdmin/:iglesia', verifyToken, IglesiaController.getCantAdmin); 
router.get('/getCantMujeres/:iglesia', verifyToken, IglesiaController.getCantMujeres); 
router.get('/getCantHombres/:iglesia', verifyToken, IglesiaController.getCantHombres); 
router.get('/getEdaduno/:iglesia', IglesiaController.getEdaduno); 
router.get('/getDatosIglesia/:iglesia', verifyToken, IglesiaController.getDatosIglesia); 
router.get('/getIglesiaById/:id', verifyToken, IglesiaController.getIglesiaById); 
router.get('/getTodasLasIgles', verifyToken, IglesiaController.getTodasLasIgles); 
router.get('/getTodaIgle/:iglesia', verifyToken, IglesiaController.getTodaIgle); 
router.get('/getLideres/:iglesia', verifyToken, IglesiaController.getLideres); 
router.get('/getReunionSelect/:iglesia', verifyToken, IglesiaController.getReunionSelect); 
router.get('/personal/:id', verifyToken, IglesiaController.getPersonal); 

router.put('/setmuelle/:muelle,:iglesia', verifyToken, IglesiaController.setMuelle); 
router.put('/setgrafico/:grafico,:iglesia', verifyToken, IglesiaController.setGrafico); 
router.put('/setListaAdmin/:listaAdmin,:iglesia', verifyToken, IglesiaController.setListaAdmin); 
router.put('/setlevel/:setlevel,:iglesia', verifyToken, IglesiaController.setLevel); 
router.put('/setCantCulto/:setCantCulto,:iglesia', verifyToken, IglesiaController.setCantCulto); 
router.put('/actualizar/:id', verifyToken, IglesiaController.updateUser); 
router.put('/agregarcampo/:iglesia,:value1,:value2', verifyToken, IglesiaController.agregarCampo); 
router.put('/editarIglesia/:id', verifyToken, IglesiaController.editarIglesia); 
router.delete('/eliminar/:id', verifyToken, IglesiaController.eliminarUsuario); 
router.delete('/eliminarIglesia/:id', verifyToken, IglesiaController.eliminarIglesia); 


// FINANZA
router.post('/saveFinanza', verifyToken, FinanzaController.saveFinanza); /*, verifyToken*/
router.get('/getWeekTotal/:iglesia', verifyToken, FinanzaController.getWeekTotal); /*, verifyToken*/
router.get('/getAllWeek/:iglesia,:domDate', verifyToken, FinanzaController.getAllWeek); /*, verifyToken*/
router.get('/getCierreAnterior/:iglesia,:domDate', verifyToken, FinanzaController.getCierreAnterior); /*, verifyToken*/
router.get('/getAllFinanza/:iglesia', verifyToken, FinanzaController.getAllFinanza); /*, verifyToken*/





module.exports = router;