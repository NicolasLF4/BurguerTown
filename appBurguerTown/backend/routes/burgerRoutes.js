'use strict'

var CocinaController = require('../controllers/cocina');
var AdminController = require('../controllers/admin');
var express = require('express');
const jwt = require('jsonwebtoken');
var multer = require('multer');

// function verifyToken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).send('Unauthorized request1')
//     }
//     let token = req.headers.authorization.split(' ')[1]
//     if (token === 'null') {
//         return res.status(401).send('Unauthorized request2')
//     }
//     let payload = jwt.verify(token, 'secretKey')
//     if (!payload) {
//         return res.status(401).send('Unauthorized request')
//     }
//     req.userId = payload.subject
//     next()
// }

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

router.get('/test', CocinaController.test);
router.get('/getCategorys/:establishment', CocinaController.getCategorys);
router.get('/getPlatos/:establishment,:category', CocinaController.getPlatos);
router.get('/getAllPlatos/:establishment', CocinaController.getAllPlatos);

router.delete('/deletePlato/:id', CocinaController.deletePlato);

router.post('/registerPlato', CocinaController.registerPlato);
router.post('/registerCategory', CocinaController.registerCategory);



// router.post('/login', CocinaController.login);


// router.post('/register', verifyToken, CocinaController.register); /*, verifyToken*/
// router.post('/registerIglesia', verifyToken, CocinaController.registerIglesia);
// router.post('/saveLista', verifyToken, CocinaController.saveLista); 
// router.post('/registerDomInicial', verifyToken, CocinaController.registerDomInicial);

// router.get('/users', verifyToken, CocinaController.getUsers); 
// router.get('/users/:id?', verifyToken, CocinaController.getUserById); 
// router.get('/micelula/:idLider', verifyToken, CocinaController.getMicelula);
// router.get('/celulahome/:idLider', verifyToken, CocinaController.getCelulahome); 
// router.get('/datoLista', verifyToken, CocinaController.getDatoLista); 
// router.get('/muelle/:sexo,:iglesia', verifyToken, CocinaController.getMuelle); 
// router.get('/muellemixto/:iglesia', verifyToken, CocinaController.getMuelleMixto); 
// router.get('/monitoreo/:iglesia', verifyToken, CocinaController.getMonitoreo); 
// router.get('/listAccess/:access,:iglesia', verifyToken, CocinaController.getListAccess); 
// router.get('/getSoliNivel/:soli,:iglesia', verifyToken, CocinaController.getSoliNivel); 
// router.get('/getSoliEstudio/:soli,:iglesia', verifyToken, CocinaController.getSoliEstudio); 
// router.get('/getEliminar/:soli,:iglesia', verifyToken, CocinaController.getEliminar); 
// router.get('/getEstudiando/:soli,:iglesia', verifyToken, CocinaController.getEstudiando); 
// router.get('/conteoDom/:fechaDom,:iglesia', verifyToken, CocinaController.getConteoDom); 
// router.get('/getCantNiveles/:iglesia', verifyToken, CocinaController.getCantNiveles); 

// //FILTROS
// router.get('/getListaRoja/:iglesia', verifyToken, CocinaController.getListaRoja); 

// router.post('/upload-image/:id,:img', upload.single('image'), CocinaController.uploadImage);
// router.get('/get-image/:image', CocinaController.getImageFile);

// router.get('/getPerfilAsistencia/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:iglesia,:id', verifyToken, CocinaController.getPerfilAsistencia); 

// router.get('/conteoDomNew/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, CocinaController.getConteoDomNew); 
// router.get('/conteoFullNew/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, CocinaController.getConteoFullNew); 

// router.get('/getBautismo/:iglesia', verifyToken, CocinaController.getCantBautismo); 

// router.get('/conteoCelTrue/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, CocinaController.getConteoCelTrue); 
// router.get('/conteoCelFalse/:fechaDom0,:fechaDom1,:fechaDom2,:fechaDom3,:fechaDom4,:fechaDom5,:fechaDom6,:iglesia', verifyToken, CocinaController.getConteoCelFalse); 
// router.get('/conteoFull/:fechaDom,:iglesia', verifyToken, CocinaController.getConteoFull); 
// router.get('/getFaltantes/:iglesia', verifyToken, CocinaController.getFaltantes); 
// router.get('/getEncelu/:iglesia', verifyToken, CocinaController.getEncelu); 
// router.get('/getSincelu/:iglesia', verifyToken, CocinaController.getSincelu); 
// router.get('/getCantLideres/:iglesia', verifyToken, CocinaController.getCantLideres); 
// router.get('/getCantAdmin/:iglesia', verifyToken, CocinaController.getCantAdmin); 
// router.get('/getCantMujeres/:iglesia', verifyToken, CocinaController.getCantMujeres); 
// router.get('/getCantHombres/:iglesia', verifyToken, CocinaController.getCantHombres); 
// router.get('/getEdaduno/:iglesia', CocinaController.getEdaduno); 
// router.get('/getDatosIglesia/:iglesia', verifyToken, CocinaController.getDatosIglesia); 
// router.get('/getIglesiaById/:id', verifyToken, CocinaController.getIglesiaById); 
// router.get('/getTodasLasIgles', verifyToken, CocinaController.getTodasLasIgles); 
// router.get('/getTodaIgle/:iglesia', verifyToken, CocinaController.getTodaIgle); 
// router.get('/getLideres/:iglesia', verifyToken, CocinaController.getLideres); 
// router.get('/getReunionSelect/:iglesia', verifyToken, CocinaController.getReunionSelect); 
// router.get('/personal/:id', verifyToken, CocinaController.getPersonal); 

// router.put('/setmuelle/:muelle,:iglesia', verifyToken, CocinaController.setMuelle); 
// router.put('/setgrafico/:grafico,:iglesia', verifyToken, CocinaController.setGrafico); 
// router.put('/setListaAdmin/:listaAdmin,:iglesia', verifyToken, CocinaController.setListaAdmin); 
// router.put('/setlevel/:setlevel,:iglesia', verifyToken, CocinaController.setLevel); 
// router.put('/setCantCulto/:setCantCulto,:iglesia', verifyToken, CocinaController.setCantCulto); 
// router.put('/actualizar/:id', verifyToken, CocinaController.updateUser); 
// router.put('/agregarcampo/:iglesia,:value1,:value2', verifyToken, CocinaController.agregarCampo); 
// router.put('/editarIglesia/:id', verifyToken, CocinaController.editarIglesia); 
// router.delete('/eliminar/:id', verifyToken, CocinaController.eliminarUsuario); 
// router.delete('/eliminarIglesia/:id', verifyToken, CocinaController.eliminarIglesia); 


// FINANZA
// router.post('/saveFinanza', verifyToken, FinanzaController.saveFinanza); /*, verifyToken*/
// router.get('/getWeekTotal/:iglesia', verifyToken, FinanzaController.getWeekTotal); /*, verifyToken*/
// router.get('/getAllWeek/:iglesia,:domDate', verifyToken, FinanzaController.getAllWeek); /*, verifyToken*/
// router.get('/getCierreAnterior/:iglesia,:domDate', verifyToken, FinanzaController.getCierreAnterior); /*, verifyToken*/
// router.get('/getAllFinanza/:iglesia', verifyToken, FinanzaController.getAllFinanza); /*, verifyToken*/





module.exports = router;