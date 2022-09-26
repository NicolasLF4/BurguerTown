'use strict'

const cron = require('node-cron');
const jwt = require('jsonwebtoken');
var fs = require('fs');
var path = require('path');

var Plato = require('../models/plato');
var Category = require('../models/category');
var Local = require('../models/local');
var User = require('../models/user');
var Pedido = require('../models/pedido')


var controller = {

    test: function(req, res) {
        console.log('Entre a test');
        res.send('Estoy andando https.. Test.');
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
    registerPlato: function(req, res) {
        var savePlato = new Plato();

        var params = req.body;

        savePlato.precio = params.precio;
        savePlato.description = params.description;
        savePlato.image = params.image;
        savePlato.name = params.name;
        savePlato.numberPerson = params.numberPerson;
        savePlato.category = params.category;
        savePlato.establishment = params.establishment;

        savePlato.save((err, platoStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el plato'
            });

            if (!platoStored) return res.status(404).send({
                message: 'No se ha podido guardar el plato'
            });

            return res.status(200).send({
                plato: platoStored
            })
        });

    },

    registerCategory: function(req, res) {
        var saveCategory = new Category();

        var params = req.body;

        let nameCategory = params.name;
        let establishmentName = params.establishment;
        let typeCategory = params.type;

        saveCategory.name = params.name;
        saveCategory.establishment = params.establishment;
        saveCategory.type = params.type;

        Category.findOne({ name: nameCategory }, (error, category) => {
            if (error) {
                console.log('1');
            } else {
                if (params.name == "" || category) {
                    console.log('2');
                    res.status(401).send('invalid category')
                } else {
                    

                    saveCategory.save((err, categoryStored) => {

                        if (err) return res.status(500).send({
                            message: 'Error al guardar el plato'
                        });

                        if (!categoryStored) return res.status(404).send({
                            message: 'No se ha podido guardar el plato'
                        });

                        return res.status(200).send({
                            category: categoryStored
                        })
                    });
                }
            }
        })
      
       

    },

    registerTicket: function(req, res) {
        var saveTicket = new Pedido();

        var params = req.body;

        saveTicket.tiempo = params.tiempo;
        saveTicket.mesa = params.mesa;
        saveTicket.pedidoComida = params.pedidoComida;
        saveTicket.pedidoBebida = params.pedidoBebida;
        saveTicket.estado = params.estado;
        saveTicket.precio = params.precio;
        saveTicket.establishment = params.establishment;

        saveTicket.save((err, ticketStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el plato'
            });

            if (!ticketStored) return res.status(404).send({
                message: 'No se ha podido guardar el plato'
            });

            return res.status(200).send({
                pedido: ticketStored
            })
        });

    },

    getCategorys: function(req, res) {
        var establishmentvar = req.params.establishment;
        var typevar = req.params.type;

        if(typevar == 'undefined'){
            Category.find({ establishment: establishmentvar }).sort().exec((err, categorys) => {
                if (err) return res.status(500).send({message: 'Error al devolver los datos.'});
                if (!categorys) return res.status(404).send({message: 'No hay categorias para mostrar'});
                console.log(categorys);
                return res.status(200).send(categorys);
            });
        }else{
            console.log('tiene type');
            Category.find({ establishment: establishmentvar, type: typevar }).sort().exec((err, categorys) => {
                if (err) return res.status(500).send({message: 'Error al devolver los datos.'});
                if (!categorys) return res.status(404).send({message: 'No hay categorias para mostrar'});
                return res.status(200).send(categorys);
            });
        }
        

    },

    getPlatos: function(req, res) {
        var establishmentvar = req.params.establishment;
        var categoryvar = req.params.category;
        Plato.find({ establishment: establishmentvar, category: categoryvar }).sort().exec((err, platos) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!platos) return res.status(404).send({
                message: 'No hay platos para mostrar'
            });

            return res.status(200).send({
                platos
            });
        });

    },

    getAllPlatos: function(req, res) {
        var establishmentvar = req.params.establishment;
        Plato.find({ establishment: establishmentvar }).sort().exec((err, platos) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!platos) return res.status(404).send({
                message: 'No hay platos para mostrar'
            });

            return res.status(200).send({
                platos
            });
        });

    },

    getTicket: function(req, res) {
        var establishmentvar = req.params.establishment;
        Pedido.find({ establishment: establishmentvar }).sort().exec((err, pedidos) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los datos.'
            });

            if (!pedidos) return res.status(404).send({
                message: 'No hay platos para mostrar'
            });

            return res.status(200).send({
                pedidos
            });
        });

    },


    deletePlato: function(req, res) {
        var platoId = req.params.id;

        Plato.findByIdAndRemove(platoId, (err, platoEliminado) => {
            if (err) return res.status(500).send({
                message: 'No se ha podido borrar el plato'
            });

            if (!platoEliminado) return res.status(404).send({
                message: 'No se puede eliminar el plato'
            });

            return res.status(200).send({
                eliminado: platoEliminado
            });
        });
    },

    deleteCategory: function(req, res) {
        var categoryId = req.params.id;

        Category.findByIdAndRemove(categoryId, (err, categoriaEliminada) => {
            if (err) return res.status(500).send({
                message: 'No se ha podido borrar la categoria'
            });

            if (!categoriaEliminada) return res.status(404).send({
                message: 'No se puede eliminar persona'
            });

            return res.status(200).send({
                eliminado: categoriaEliminada
            });
        });
    },

   


    /* Login youtube */
    login: function(req, res) {
        let userData = req.body
        User.findOne({ mail: userData.mailAccess }, (error, user) => {
            if (error) {
                console.log(error)
            } else {
                if (userData.mailAccess == "" || !user) {
                    res.status(401).send('Invalid email')
                } else if (user.password !== userData.password) {
                    res.status(401).send('Invalid password')
                } else {
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

    
};




module.exports = controller;