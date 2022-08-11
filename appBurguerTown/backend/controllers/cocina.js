'use strict'

const cron = require('node-cron');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

var Plato = require('../models/plato');


var controller = {

    test: function(req, res) {
        console.log('Entre a test');
        res.send('Estoy andando https.. Test.');
    },

    saveLista: function(req, res) {
        var saveLista = new Lista();

        var params = req.body;

        saveLista.iglesia = params.iglesia;
        saveLista.idUser = params.idUser;
        saveLista.nombreUser = params.nombreUser;
        saveLista.apellidoUser = params.apellidoUser;
        saveLista.idLider = params.idLider;
        saveLista.nombreLider = params.nombreLider;
        saveLista.apellidoLider = params.apellidoLider;
        saveLista.fechaDom = params.fechaDom;
        saveLista.celula = params.celula;
        saveLista.domingo = params.domingo;
        saveLista.contador = params.contador;

        saveLista.save((err, listaStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el conjunto de datos de la lista.'
            });

            if (!listaStored) return res.status(404).send({
                message: 'No se ha podido guardar en la lista.'
            });

            return res.status(200).send({
                lista: listaStored
            })
        });
    },



    registerIglesia: function(req, res) {
        var saveIglesias = new Iglesias();

        var params = req.body;

        saveIglesias.nombrePastor = params.nombrePastor;
        saveIglesias.celular = params.celular;
        saveIglesias.direccion = params.direccion;
        saveIglesias.ciudad = params.ciudad;
        saveIglesias.nombreIglesia = params.nombreIglesia;
        saveIglesias.svIglesia = params.svIglesia;
        saveIglesias.svFinanza = params.svFinanza;
        saveIglesias.svMusica = params.svMusica;
        saveIglesias.muelle = params.muelle;
        saveIglesias.fechaPago = params.fechaPago;
        saveIglesias.suspender = params.suspender;
        saveIglesias.mensajeIglesia = params.mensajeIglesia;
        saveIglesias.ministerios = params.ministerios;

        saveIglesias.idea2 = params.idea2;
        saveIglesias.idea3 = params.idea3;
        saveIglesias.idea4 = params.idea4;
        saveIglesias.setLevel = params.setLevel;
        saveIglesias.cantCulto = params.cantCulto;


        saveIglesias.save((err, iglesiasStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el conjunto de datos de la lista.'
            });

            if (!iglesiasStored) return res.status(404).send({
                message: 'No se ha podido guardar en la lista.'
            });

            return res.status(200).send({
                iglesias: iglesiasStored
            })
        });
    },

    getImageFile: function(req, res) {
        var file = req.params.image;
        var path_file = './uploads/' + file;

        fs.exists(path_file, (exists) => {
            if (exists) {
                return res.sendFile(path.resolve(path_file));
            } else {
                return res.status(200).send({
                    message: "No existe la imagen..."
                });
            }
        })
    },

    uploadImage: function(req, res) {
        var userId = req.params.id;
        let img = req.params.img;
        let fileName = 'Imagen no subida...';
        if (req.file) {
            console.log(req.file);
            var file_path = req.file.path;
            var file_split = file_path.split('\/');
            var file_name = file_split[1];
            var ext_split = req.file.originalname.split('\.');
            var file_ext = ext_split[1]
            if (file_ext == 'png' || file_ext == 'jpg' || file_ext == 'jpeg' || file_ext == 'PNG' || file_ext == 'JPG' || file_ext == 'JPEG') {
                console.log(file_name);

                User.findByIdAndUpdate(userId, { img: file_name }, {
                    new: true
                }, (err, albumUpdated) => {

                    if (err) {
                        console.log(err);
                    } else if (!albumUpdated) {
                        console.log("No se ha podido actualizar el album");
                        res.status(404).send({ message: 'No se ha podido actualizar el album' });
                    } else {
                        console.log("Album actualizado correctamente");
                        res.status(200).send(albumUpdated);
                    }
                })

            } else {
                res.status(200).send({ message: 'Extension del archivo no valida' });
            }
        } else {
            res.status(200).send({ message: 'No has subido ninguna imagen..' });
        }
    },

    /* Registracion de YOUTUBE */
    register: function(req, res) {
        let userData = req.body;
        let user = new User(userData);

        User.findOne({ mailAccess: userData.mailAccess }, (error, user) => {
            if (error) {
                console.log(error)
            } else {
                if (userData.mailAccess == "" || user) {
                    return res.status(401).send('Persona ya registrada en el sistema')
                } else {
                    let saveUser = new User(req.body);
                    saveUser.save((error, registeredUser) => {
                        if (error) {
                            console.log(error);
                            console.log("Estoy en el error");
                        } else {
                            let payload = { subject: registeredUser._id }
                            let token = jwt.sign(payload, 'secretKey')
                            res.status(200).send({ token });
                        }
                    })
                }
            }
        })


    },
    /* Registracion de YOUTUBE */

    // Dom.save((error, registeredDomInicial) => {
    //   if (error) {
    //     console.log(error)
    //   } else {
    //     let payload = { subject: registeredDomInicial._id}
    //     let token = jwt.sign(payload, 'secretKey')
    //     res.status(200).send({token});
    //   }
    // })
    registerDomInicial: function(req, res) {
        var domSave = new Dom();

        var params = req.body;

        domSave.dom = params.dom;
        domSave.faltaParaCierre = params.faltaParaCierre;
        domSave.recordatorio = params.recordatorio;
        domSave.apellidoUser = params.apellidoUser;
        domSave.mensajeGlobal = params.mensajeGlobal;
        domSave.versiculo = params.versiculo;
        domSave.textoBiblico = params.textoBiblico;
        domSave.llave = params.llave;



        Dom.findOne({ llave: params.llave }, (error, user) => {
            if (error) {
                console.log(error)
            } else if (user) {
                return res.status(401).send('Persona ya registrada en el sistema')
            } else {
                domSave.save((err, registeredDomInicial) => {
                    return res.status(200).send({
                        registerDom: registeredDomInicial
                    })
                });
            }
        })
    },


    /* Login youtube */
    login: function(req, res) {
        let userData = req.body

        User.findOne({ mailAccess: userData.mailAccess }, (error, user) => {
            if (error) {
                console.log(error)
            } else {
                if (userData.mailAccess == "" || !user) {
                    console.log(user);
                    res.status(401).send('Invalid email')
                } else if (user.password !== userData.password) {
                    console.log("Contra mal");
                    res.status(401).send('Invalid password')

                } else {
                    console.log("Estoy en el final de todo");
                    let payload = { subject: user._id }
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({ token, user })
                }
            }
        })
    },
    /* Login youtube */

    getUsers: function(req, res) {
        /*var user = req.params.user;*/
        User.find({ /*user*/ }).sort().exec((err, users) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!users) return res.status(404).send({
                message: 'No hay chicos para mostrar'
            });

            return res.status(200).send({
                users
            });
        });
    },
    getDatoLista: function(req, res) {
        /*var user = req.params.user;*/
        Dom.find({ /*user*/ }).sort().exec((err, datoLista) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los dato lista.'
            });

            if (!datoLista) return res.status(404).send({
                message: 'No hay dato lista para mostrar'
            });

            return res.status(200).send({
                datoLista
            });
        });
    },

    getMicelula: function(req, res) {
        var idLider = req.params.idLider;
        User.find({ idLider }).sort().exec((err, micelula) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!micelula) return res.status(404).send({
                message: 'No hay chicos para mostrar'
            });

            return res.status(200).send({ micelula });
        });
    },
    getCelulahome: function(req, res) {
        var idLider = req.params.idLider;
        User.find({ idLider }).sort({ ultimaActualizacion: "desc" }).exec((err, celulahomeres) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!celulahomeres) return res.status(404).send({
                message: 'No hay chicos para mostrar'
            });

            return res.status(200).send({ celulahomeres });

        });
    },

    getListaRoja: function(req, res) {

        var iglesiaVal = req.params.iglesia;

        User.find({ faltas: { $gte: 2 }, iglesia: iglesiaVal }).sort({ nombre: "desc" }).exec((err, listaRoja) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!listaRoja) return res.status(404).send({
                message: 'No hay personas en lista roja para mostrar'
            });

            return res.status(200).send({ listaRoja });

        });
    },

    getMuelle: function(req, res) {
        var sexoVal = req.params.sexo;
        var iglesiaVal = req.params.iglesia;
        User.find({ sexo: sexoVal, iglesia: iglesiaVal, miLider: 'sin lider' }).sort().exec((err, muelle) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el muelle.'
            });

            if (!muelle) return res.status(404).send({
                message: 'No hay muelle para mostrar'
            });

            return res.status(200).send({ muelle });
        });
    },

    getMuelleMixto: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.find({ iglesia: iglesiaVal, miLider: 'sin lider' }).sort().exec((err, muelle) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el muelle.'
            });

            if (!muelle) return res.status(404).send({
                message: 'No hay muelle para mostrar'
            });

            return res.status(200).send({ muelle });
        });
    },

    setMuelle: function(req, res) {
        var setVal = req.params.muelle;
        var iglesiaVal = req.params.iglesia;

        Iglesias.findOneAndUpdate({ nombreIglesia: iglesiaVal }, { muelle: setVal }, (err, setMuelle) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el setMuelle.'
            });

            if (!setMuelle) return res.status(404).send({
                message: 'No hay setMuelle para mostrar'
            });

            return res.status(200).send({ setMuelle });
        });
    },

    setGrafico: function(req, res) {
        var setVal = req.params.grafico;
        var iglesiaVal = req.params.iglesia;

        Iglesias.findOneAndUpdate({ nombreIglesia: iglesiaVal }, { grafico: setVal }, (err, setGrafico) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el setGrafico.'
            });

            if (!setGrafico) return res.status(404).send({
                message: 'No hay setGrafico para mostrar'
            });

            return res.status(200).send({ setGrafico });
        });
    },

    setListaAdmin: function(req, res) {
        var setVal = req.params.listaAdmin;
        var iglesiaVal = req.params.iglesia;

        Iglesias.findOneAndUpdate({ nombreIglesia: iglesiaVal }, { listaAdmin: setVal }, (err, setListaAdmin) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el setListaAdmin.'
            });

            if (!setListaAdmin) return res.status(404).send({
                message: 'No hay setListaAdmin para mostrar'
            });

            return res.status(200).send({ setListaAdmin });
        });
    },

    setLevel: function(req, res) {
        var setVal = req.params.setlevel;
        var iglesiaVal = req.params.iglesia;

        Iglesias.findOneAndUpdate({ nombreIglesia: iglesiaVal }, { setLevel: setVal }, (err, setLevel) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el setLevel.'
            });

            if (!setLevel) return res.status(404).send({
                message: 'No hay setLevel para mostrar'
            });

            return res.status(200).send({ setLevel });
        });
    },

    setCantCulto: function(req, res) {
        var setVal = req.params.setCantCulto;
        var iglesiaVal = req.params.iglesia;

        Iglesias.findOneAndUpdate({ nombreIglesia: iglesiaVal }, { cantCulto: setVal }, (err, setCantCulto) => {
            if (err) return res.status(500).send({
                message: 'Error al devolver el setCantCulto.'
            });

            if (!setCantCulto) return res.status(404).send({
                message: 'No hay setCantCulto para mostrar'
            });

            return res.status(200).send({ setCantCulto });
        });
    },

    getMonitoreo: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.find({ pasarLista: false, iglesia: iglesiaVal }).sort().exec((err, monitoreo) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el monitoreo.'
            });

            if (!monitoreo) return res.status(404).send({
                message: 'No hay monitoreo para mostrar'
            });

            return res.status(200).send({ monitoreo });
        });
    },

    getListAccess: function(req, res) {
        var accessVal = req.params.access;
        var iglesiaVal = req.params.iglesia;
        User.find({ access: accessVal, iglesia: iglesiaVal }).sort({ ultimaActualizacion: "desc" }).exec((err, access) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el access.'
            });

            if (!access) return res.status(404).send({
                message: 'No hay access para mostrar'
            });

            return res.status(200).send({ access });
        });
    },

    getSoliNivel: function(req, res) {
        var soli = req.params.soli;
        var iglesiaVal = req.params.iglesia;

        User.find({ soliNivel: soli, iglesia: iglesiaVal }).sort().exec((err, soliNivel) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el soliNivel.'
            });

            if (!soliNivel) return res.status(404).send({
                message: 'No hay soliNivel para mostrar'
            });

            return res.status(200).send({ soliNivel });
        });
    },

    getSoliEstudio: function(req, res) {
        var soli = req.params.soli;
        var iglesiaVal = req.params.iglesia;
        User.find({ soliEstudio: soli, iglesia: iglesiaVal }).sort().exec((err, soliEstudio) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el soliEstudio.'
            });

            if (!soliEstudio) return res.status(404).send({
                message: 'No hay soliEstudio para mostrar'
            });

            return res.status(200).send({ soliEstudio });
        });
    },

    getEstudiando: function(req, res) {
        var soli = req.params.soli;
        var iglesiaVal = req.params.iglesia;
        User.find({ estudiando: soli, iglesia: iglesiaVal }).sort().exec((err, estudiando) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el estudiando.'
            });

            if (!estudiando) return res.status(404).send({
                message: 'No hay estudiando para mostrar'
            });

            return res.status(200).send({ estudiando });
        });
    },

    getEliminar: function(req, res) {
        var soli = req.params.soli;
        var iglesiaVal = req.params.iglesia;
        User.find({ soliEliminar: soli, iglesia: iglesiaVal }).sort().exec((err, soliEliminar) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el soliEliminar.'
            });

            if (!soliEliminar) return res.status(404).send({
                message: 'No hay soliEliminar para mostrar'
            });

            return res.status(200).send({ soliEliminar });
        });
    },

    getConteoDom: function(req, res) {
        var fechaDom = req.params.fechaDom;
        var iglesiaVal = req.params.iglesia;
        Lista.count({ fechaDom: fechaDom, iglesia: iglesiaVal, domingo: true }).sort().exec((err, totalDom) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el totalDom.'
            });

            if (!totalDom) return res.status(200).send({ totalDom });

            return res.status(200).send({ totalDom });
        });
    },

    getCantNiveles: function(req, res) {

        var iglesiaVal = req.params.iglesia;
        User.count({ nivelPersonal: 0, iglesia: iglesiaVal }).sort().exec((err0, getNv0) => {
            if (err0) return res.status(500).send({ message: 'Error al devolver el getNv0.' });

            User.count({ nivelPersonal: 1, iglesia: iglesiaVal }).sort().exec((err1, getNv1) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el getNv1.' });

                User.count({ nivelPersonal: 2, iglesia: iglesiaVal }).sort().exec((err2, getNv2) => {
                    if (err2) return res.status(500).send({ message: 'Error al devolver el getNv2.' });

                    User.count({ nivelPersonal: 3, iglesia: iglesiaVal }).sort().exec((err3, getNv3) => {
                        if (err3) return res.status(500).send({ message: 'Error al devolver el getNv3.' });

                        User.count({ nivelPersonal: 4, iglesia: iglesiaVal }).sort().exec((err4, getNv4) => {
                            if (err4) return res.status(500).send({ message: 'Error al devolver el getNv4.' });

                            User.count({ nivelPersonal: 5, iglesia: iglesiaVal }).sort().exec((err5, getNv5) => {
                                if (err4) return res.status(500).send({ message: 'Error al devolver el getNv4.' });

                                return res.status(200).send({ getNv0, getNv1, getNv2, getNv3, getNv4, getNv5 });

                            });
                        });
                    });
                });
            });
        });
    },

    getCantBautismo: function(req, res) {

        var iglesiaVal = req.params.iglesia;
        User.count({ bautizado: true, iglesia: iglesiaVal }).sort().exec((err0, getSiBaut) => {
            if (err0) return res.status(500).send({ message: 'Error al devolver el getSiBaut.' });

            User.count({ bautizado: false, iglesia: iglesiaVal }).sort().exec((err1, getNoBaut) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el getNoBaut.' });

                return res.status(200).send({ getSiBaut, getNoBaut });

            });
        });
    },

    getPerfilAsistencia: function(req, res) {
        var fechaDom0 = req.params.fechaDom4;
        var fechaDom1 = req.params.fechaDom3;
        var fechaDom2 = req.params.fechaDom2;
        var fechaDom3 = req.params.fechaDom1;
        var fechaDom4 = req.params.fechaDom0;
        var iglesiaVal = req.params.iglesia;
        var idVal = req.params.id;

        Lista.findOne({ fechaDom: fechaDom0, iglesia: iglesiaVal, idUser: idVal }).sort().exec((err0, asist0) => {
            if (err0) return res.status(500).send({ message: 'Error al devolver el asist0.' });
            Lista.findOne({ fechaDom: fechaDom1, iglesia: iglesiaVal, idUser: idVal }).sort().exec((err1, asist1) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el asist1.' });
                Lista.findOne({ fechaDom: fechaDom2, iglesia: iglesiaVal, idUser: idVal }).sort().exec((err2, asist2) => {
                    if (err2) return res.status(500).send({ message: 'Error al devolver el asist2.' });
                    Lista.findOne({ fechaDom: fechaDom3, iglesia: iglesiaVal, idUser: idVal }).sort().exec((err3, asist3) => {
                        if (err3) return res.status(500).send({ message: 'Error al devolver el asist3.' });
                        Lista.findOne({ fechaDom: fechaDom4, iglesia: iglesiaVal, idUser: idVal }).sort().exec((err4, asist4) => {
                            if (err4) return res.status(500).send({ message: 'Error al devolver el asist4.' });

                            return res.status(200).send({ asist0, asist1, asist2, asist3, asist4, });

                        });
                    });
                });
            });
        });
    },

    getConteoDomNew: function(req, res) {
        var fechaDom0 = req.params.fechaDom0;
        var fechaDom1 = req.params.fechaDom1;
        var fechaDom2 = req.params.fechaDom2;
        var fechaDom3 = req.params.fechaDom3;
        var fechaDom4 = req.params.fechaDom4;
        var fechaDom5 = req.params.fechaDom5;
        var fechaDom6 = req.params.fechaDom6;
        var iglesiaVal = req.params.iglesia;
        Lista.count({ fechaDom: fechaDom0, iglesia: iglesiaVal, domingo: true }).sort().exec((err0, totalDom0) => {

            if (err0) return res.status(500).send({ message: 'Error al devolver el totalDom0.' });
            Lista.count({ fechaDom: fechaDom1, iglesia: iglesiaVal, domingo: true }).sort().exec((err1, totalDom1) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el totalDom1.' });
                Lista.count({ fechaDom: fechaDom2, iglesia: iglesiaVal, domingo: true }).sort().exec((err2, totalDom2) => {
                    if (err2) return res.status(500).send({ message: 'Error al devolver el totalDom2.' });
                    Lista.count({ fechaDom: fechaDom3, iglesia: iglesiaVal, domingo: true }).sort().exec((err3, totalDom3) => {
                        if (err3) return res.status(500).send({ message: 'Error al devolver el totalDom3.' });
                        Lista.count({ fechaDom: fechaDom4, iglesia: iglesiaVal, domingo: true }).sort().exec((err4, totalDom4) => {
                            if (err4) return res.status(500).send({ message: 'Error al devolver el totalDom4.' });
                            Lista.count({ fechaDom: fechaDom5, iglesia: iglesiaVal, domingo: true }).sort().exec((err5, totalDom5) => {
                                if (err5) return res.status(500).send({ message: 'Error al devolver el totalDom5.' });
                                Lista.count({ fechaDom: fechaDom6, iglesia: iglesiaVal, domingo: true }).sort().exec((err6, totalDom6) => {
                                    if (err6) return res.status(500).send({ message: 'Error al devolver el totalDom6.' });

                                    return res.status(200).send({ totalDom0, totalDom1, totalDom2, totalDom3, totalDom4, totalDom5, totalDom6 });

                                });
                            });
                        });
                    });
                });
            });
        });
    },

    getConteoFullNew: function(req, res) {
        var fechaDom0 = req.params.fechaDom0;
        var fechaDom1 = req.params.fechaDom1;
        var fechaDom2 = req.params.fechaDom2;
        var fechaDom3 = req.params.fechaDom3;
        var fechaDom4 = req.params.fechaDom4;
        var fechaDom5 = req.params.fechaDom5;
        var fechaDom6 = req.params.fechaDom6;
        var iglesiaVal = req.params.iglesia;
        Lista.find({ fechaDom: fechaDom0, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err0, totalFull0) => {
            if (err0) return res.status(500).send({ message: 'Error al devolver el totalFull0.' });
            Lista.find({ fechaDom: fechaDom1, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err1, totalFull1) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el totalFull1.' });
                Lista.find({ fechaDom: fechaDom2, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err2, totalFull2) => {
                    if (err2) return res.status(500).send({ message: 'Error al devolver el totalFull2.' });
                    Lista.find({ fechaDom: fechaDom3, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err3, totalFull3) => {
                        if (err3) return res.status(500).send({ message: 'Error al devolver el totalFull3.' });
                        Lista.find({ fechaDom: fechaDom4, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err4, totalFull4) => {
                            if (err4) return res.status(500).send({ message: 'Error al devolver el totalFull4.' });
                            Lista.find({ fechaDom: fechaDom5, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err5, totalFull5) => {
                                if (err5) return res.status(500).send({ message: 'Error al devolver el totalFull5.' });
                                Lista.find({ fechaDom: fechaDom6, iglesia: iglesiaVal, contador: { "$exists": true } }).sort().exec((err6, totalFull6) => {
                                    if (err6) return res.status(500).send({ message: 'Error al devolver el totalFull6.' });
                                    return res.status(200).send({ totalFull0, totalFull1, totalFull2, totalFull3, totalFull4, totalFull5, totalFull6 });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    getConteoCelTrue: function(req, res) {
        var fechaDom0 = req.params.fechaDom0;
        var fechaDom1 = req.params.fechaDom1;
        var fechaDom2 = req.params.fechaDom2;
        var fechaDom3 = req.params.fechaDom3;
        var fechaDom4 = req.params.fechaDom4;
        var fechaDom5 = req.params.fechaDom5;
        var fechaDom6 = req.params.fechaDom6;
        var iglesiaVal = req.params.iglesia;

        Lista.count({ fechaDom: fechaDom0, iglesia: iglesiaVal, celula: true }).sort().exec((err0, totalCelTrue0) => {
            if (err0) return res.status(500).send({ message: 'Error al devolver el totalCelTrue0.' });
            Lista.count({ fechaDom: fechaDom1, iglesia: iglesiaVal, celula: true }).sort().exec((err1, totalCelTrue1) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el totalCelTrue1.' });
                Lista.count({ fechaDom: fechaDom2, iglesia: iglesiaVal, celula: true }).sort().exec((err2, totalCelTrue2) => {
                    if (err2) return res.status(500).send({ message: 'Error al devolver el totalCelTrue2.' });
                    Lista.count({ fechaDom: fechaDom3, iglesia: iglesiaVal, celula: true }).sort().exec((err3, totalCelTrue3) => {
                        if (err3) return res.status(500).send({ message: 'Error al devolver el totalCelTrue3.' });
                        Lista.count({ fechaDom: fechaDom4, iglesia: iglesiaVal, celula: true }).sort().exec((err4, totalCelTrue4) => {
                            if (err4) return res.status(500).send({ message: 'Error al devolver el totalCelTrue4.' });
                            Lista.count({ fechaDom: fechaDom5, iglesia: iglesiaVal, celula: true }).sort().exec((err5, totalCelTrue5) => {
                                if (err5) return res.status(500).send({ message: 'Error al devolver el totalCelTrue5.' });
                                Lista.count({ fechaDom: fechaDom6, iglesia: iglesiaVal, celula: true }).sort().exec((err6, totalCelTrue6) => {
                                    if (err6) return res.status(500).send({ message: 'Error al devolver el totalCelTrue6.' });
                                    return res.status(200).send({ totalCelTrue0, totalCelTrue1, totalCelTrue2, totalCelTrue3, totalCelTrue4, totalCelTrue5, totalCelTrue6 });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    getConteoCelFalse: function(req, res) {
        var fechaDom0 = req.params.fechaDom0;
        var fechaDom1 = req.params.fechaDom1;
        var fechaDom2 = req.params.fechaDom2;
        var fechaDom3 = req.params.fechaDom3;
        var fechaDom4 = req.params.fechaDom4;
        var fechaDom5 = req.params.fechaDom5;
        var fechaDom6 = req.params.fechaDom6;
        var iglesiaVal = req.params.iglesia;

        Lista.count({ fechaDom: fechaDom0, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err0, totalCelFalse0) => {
            if (err0) return res.status(500).send({ message: 'Error al devolver el totalCelFalse0.' });
            Lista.count({ fechaDom: fechaDom1, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err1, totalCelFalse1) => {
                if (err1) return res.status(500).send({ message: 'Error al devolver el totalCelFalse1.' });
                Lista.count({ fechaDom: fechaDom2, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err2, totalCelFalse2) => {
                    if (err2) return res.status(500).send({ message: 'Error al devolver el totalCelFalse2.' });
                    Lista.count({ fechaDom: fechaDom3, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err3, totalCelFalse3) => {
                        if (err3) return res.status(500).send({ message: 'Error al devolver el totalCelFalse3.' });
                        Lista.count({ fechaDom: fechaDom4, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err4, totalCelFalse4) => {
                            if (err4) return res.status(500).send({ message: 'Error al devolver el totalCelFalse4.' });
                            Lista.count({ fechaDom: fechaDom5, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err5, totalCelFalse5) => {
                                if (err5) return res.status(500).send({ message: 'Error al devolver el totalCelFalse5.' });
                                Lista.count({ fechaDom: fechaDom6, iglesia: iglesiaVal, celula: false, idUser: { "$ne": '' } }).sort().exec((err6, totalCelFalse6) => {
                                    if (err6) return res.status(500).send({ message: 'Error al devolver el totalCelFalse6.' });
                                    return res.status(200).send({ totalCelFalse0, totalCelFalse1, totalCelFalse2, totalCelFalse3, totalCelFalse4, totalCelFalse5, totalCelFalse6 });
                                });
                            });
                        });
                    });
                });
            });
        });
    },

    getConteoFull: function(req, res) {
        var fechaDom = req.params.fechaDom;
        var iglesiaVal = req.params.iglesia;
        Lista.find({ fechaDom: fechaDom, iglesia: iglesiaVal, contador: { "$exists": true } }).where().exec((err, totalFull) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el totalFull.'
            });

            if (!totalFull) return res.status(200).send({ totalFull });

            return res.status(200).send({ totalFull });
        });
    },

    getFaltantes: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.find({ iglesia: iglesiaVal, faltas: { "$gte": 3 } }).where().exec((err, faltantes) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el faltantes.'
            });

            if (!faltantes) return res.status(200).send({ faltantes });

            return res.status(200).send({ faltantes });
        });
    },

    getEncelu: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, idLider: { "$ne": 'sin lider' } }).sort().exec((err, encelu) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el encelu.'
            });

            if (!encelu) return res.status(200).send({ encelu });

            return res.status(200).send({ encelu });
        });
    },

    getSincelu: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, idLider: { "$in": 'sin lider' } }).sort().exec((err, sincelu) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el sincelu.'
            });

            if (!sincelu) return res.status(200).send({ sincelu });

            return res.status(200).send({ sincelu });
        });
    },

    getCantLideres: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, lider: true }).sort().exec((err, cantLideres) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el cantLideres.'
            });

            if (!cantLideres) return res.status(200).send({ cantLideres });

            return res.status(200).send({ cantLideres });
        });
    },

    getCantAdmin: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, admin: true }).sort().exec((err, cantAdmin) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el cantAdmin.'
            });

            if (!cantAdmin) return res.status(200).send({ cantAdmin });

            return res.status(200).send({ cantAdmin });
        });
    },

    getCantMujeres: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, idLider: { "$ne": 'sin lider' }, sexo: 'mujer' }).sort().exec((err, totalMujeres) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el totalMujeres.'
            });

            if (!totalMujeres) return res.status(200).send({ totalMujeres });

            return res.status(200).send({ totalMujeres });
        });
    },

    getCantHombres: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, idLider: { "$ne": 'sin lider' }, sexo: 'hombre' }).sort().exec((err, totalHombres) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el totalHombres.'
            });

            if (!totalHombres) return res.status(200).send({ totalHombres });

            return res.status(200).send({ totalHombres });
        });
    },

    //////////////////

    getEdaduno: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.find({ iglesia: iglesiaVal, idLider: { "$ne": 'sin lider' } }).sort().exec((err, totalEdaduno) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el totalEdaduno.'
            });

            if (!totalEdaduno) return res.status(200).send({ totalEdaduno });

            return res.status(200).send({ totalEdaduno });
        });
    },

    getLideres: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.find({ iglesia: iglesiaVal, lider: true }).sort().exec((err, lideres) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el lideres.'
            });

            if (!lideres) return res.status(200).send({ lideres });

            return res.status(200).send({ lideres });
        });
    },

    getReunionSelect: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.count({ iglesia: iglesiaVal, reunionSelect: 0 }).sort().exec((err, reu0) => {
            User.count({ iglesia: iglesiaVal, reunionSelect: 1 }).sort().exec((err, reu1) => {
                User.count({ iglesia: iglesiaVal, reunionSelect: 2 }).sort().exec((err, reu2) => {
                    User.count({ iglesia: iglesiaVal, reunionSelect: 3 }).sort().exec((err, reu3) => {
                        User.count({ iglesia: iglesiaVal, reunionSelect: 4 }).sort().exec((err, reu4) => {
                            User.count({ iglesia: iglesiaVal, reunionSelect: 5 }).sort().exec((err, reu5) => {
                                User.count({ iglesia: iglesiaVal, reunionSelect: 6 }).sort().exec((err, reu6) => {
                                    User.count({ iglesia: iglesiaVal, reunionSelect: 7 }).sort().exec((err, reu7) => {
                                        User.count({ iglesia: iglesiaVal, reunionSelect: 8 }).sort().exec((err, reu8) => {
                                            User.count({ iglesia: iglesiaVal, reunionSelect: 100 }).sort().exec((err, reuVar) => {
                                                User.count({ iglesia: iglesiaVal, reunionSelect: -1 }).sort().exec((err, noReu) => {
                                                    return res.status(200).send({ reu0, reu1, reu2, reu3, reu4, reu5, reu6, reu7, reu8, reuVar, noReu });
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });

    },

    getDatosIglesia: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        Iglesias.findOne({ nombreIglesia: iglesiaVal }).sort().exec((err, datoIglesia) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el datoIglesia.'
            });

            if (!datoIglesia) return res.status(200).send({ datoIglesia });

            return res.status(200).send({ datoIglesia });
        });
    },

    getIglesiaById: function(req, res) {
        var id = req.params.id;
        Iglesias.findById({ _id: id }).sort().exec((err, datoIglesia) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el datoIglesia.'
            });

            if (!datoIglesia) return res.status(200).send({ datoIglesia });

            return res.status(200).send({ datoIglesia });
        });
    },

    getTodasLasIgles: function(req, res) {

        Iglesias.find({}).sort().exec((err, todasLasIgles) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el todasLasIgles.'
            });

            if (!todasLasIgles) return res.status(200).send({ todasLasIgles });

            return res.status(200).send({ todasLasIgles });
        });
    },

    getTodaIgle: function(req, res) {
        var iglesiaVal = req.params.iglesia;
        User.find({ iglesia: iglesiaVal }).sort({ nombre: 1 }).exec((err, todaIglesia) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver el todaIglesia.'
            });

            if (!todaIglesia) return res.status(200).send({ todaIglesia });

            return res.status(200).send({ todaIglesia });
        });
    },



    /*
      getClientes: function(req, res) {
        var user = req.params.user;
        Clientes.find({}).sort().exec((err, conexionJ) => {

          if (err) return res.status(500).send({
            message: 'Error al devolver los datos.'
          });

          if (!conexionJ) return res.status(404).send({
            message: 'No hay chicos para mostrar'
          });

          return res.status(200).send({
            conexionJ
          });
        });
      },*/
    /*
      getDatoConsola: function(req, res) {
        var user = req.params.user;
        ConsolaDato.find({user}).sort().exec((err, consola) => {

          if (err) return res.status(500).send({
            message: 'Error al devolver los datos.'
          });

          if (!consola) return res.status(404).send({
            message: 'No hay chicos para mostrar'
          });

          return res.status(200).send({
            consola
          });
        });
      },*/

    getFechaDom: function() {
        Dom.find({ llave: '1551' }).sort().exec((err, user) => {
            var Fechax = new Date(user[0].dom);
            var fechaParaSuma = Fechax.getDate() + "-" + (Fechax.getMonth() + 1) + "-" + Fechax.getFullYear();

            cambiarDom(8, fechaParaSuma);
            habilitarLista();
        });
    },

    getUserById: function(req, res) {
        var id = req.params.id;
        User.findById(id, (err, user) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!user) return res.status(404).send({
                message: 'No hay chicos para mostrar'
            });

            return res.status(200).send({
                user
            });
        });
    },

    getPersonal: function(req, res) {
        var id = req.params.id;
        User.findById(id, (err, personal) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!personal) return res.status(404).send({
                message: 'No hay chicos para mostrar'
            });

            return res.status(200).send({ personal });
        });
    },

    updateUser: function(req, res) {
        var userId = req.params.id;
        var update = req.body;

        User.findByIdAndUpdate(userId, update, {
            new: true
        }, (err, userUpdated) => {
            if (err) return res.status(500).send({
                message: ' Error al actualizar '
            });

            if (!userUpdated) return res.status(404).send({
                message: 'No existe esta persona'
            });

            return res.status(200).send({
                userUpdate: userUpdated
            });
        });
    },

    editarIglesia: function(req, res) {
        var userId = req.params.id;
        var update = req.body;

        Iglesias.findByIdAndUpdate(userId, update, {
            new: true
        }, (err, iglesia) => {
            if (err) return res.status(500).send({
                message: ' Error al actualizar '
            });

            if (!iglesia) return res.status(404).send({
                message: 'No existe esta persona'
            });

            return res.status(200).send({
                iglesia
            });
        });
    },

    eliminarUsuario: function(req, res) {
        var userId = req.params.id;

        User.findByIdAndRemove(userId, (err, userEliminado) => {
            if (err) return res.status(500).send({
                message: 'No se ha podido borrar la persona'
            });

            if (!userEliminado) return res.status(404).send({
                message: 'No se puede eliminar persona'
            });

            return res.status(200).send({
                eliminado: userEliminado
            });
        });
    },

    eliminarIglesia: function(req, res) {
        var userId = req.params.id;

        Iglesias.findByIdAndRemove(userId, (err, iglesiaEliminado) => {
            if (err) return res.status(500).send({
                message: 'No se ha podido borrar la iglesia'
            });

            if (!iglesiaEliminado) return res.status(404).send({
                message: 'No se puede eliminar iglesia'
            });

            return res.status(200).send({
                eliminado: iglesiaEliminado
            });
        });
    },

    agregarCampo: function(req, rs) {
        var nombreIglesia = req.iglesia;
        var value1 = req.value1;
        var value2 = req.value2;
        // Iglesias.updateMany({}, { "$set": { setLevel: 0 } }, function(err, rs) {
        //     if (err) { return console.error(err); }
        //     console.log(rs);
        // });

        User.updateMany({}, { "$set": { tesorero: false } }, function(err, rs) {
            if (err) { return console.error(err); }
            console.log(rs);
        });
    }
};

function reiniciarLista() {
    User.updateMany({ pasarLista: true }, { pasarLista: false }, function(err, rs) {
        if (err) {
            return console.error(err);
        }
        console.log(rs);
    });
}

function negarLista() {
    Dom.findOneAndUpdate({ llave: '1551' }, { tomarLista: false }, (err, user) => {});
}

function habilitarLista() {
    Dom.findOneAndUpdate({ llave: '1551' }, { tomarLista: true }, (err, user) => {});
}

function cambiarDom(d, fecha) {
    var Fecha = new Date();
    var sFecha = fecha || (Fecha.getDate() + "/" + (Fecha.getMonth() + 1) + "/" + Fecha.getFullYear());
    var sep = sFecha.indexOf('/') != -1 ? '/' : '-';
    var aFecha = sFecha.split(sep);
    var fecha = aFecha[2] + '/' + aFecha[1] + '/' + aFecha[0];
    fecha = new Date(fecha);
    fecha.setDate(fecha.getDate() + parseInt(d));
    var anno = fecha.getFullYear();
    var mes = fecha.getMonth() + 1;
    var dia = fecha.getDate();
    mes = (mes < 10) ? ("0" + mes) : mes;
    dia = (dia < 10) ? ("0" + dia) : dia;
    var fechaFinal = anno + sep + mes + sep + dia;
    insertarFechaDom(fechaFinal);
    return (fechaFinal);
}

function insertarFechaDom(fechaNueva) {
    // var insertarFecha = fechaNueva;
    Dom.findOneAndUpdate({ llave: '1551' }, { dom: fechaNueva }, (err, user) => {

    });
}

cron.schedule('1 3 * * Thursday', () => {
    negarLista();
});

cron.schedule('5 4 * * Saturday', () => {
    controller.getFechaDom();
    reiniciarLista();
});

// cron.schedule('30 * * * * *', () => {
//     controller.getFechaDom();
//     reiniciarLista();
// });


module.exports = controller;