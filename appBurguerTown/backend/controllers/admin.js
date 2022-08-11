'use strict'

var Plato = require('../models/plato');
const cron = require('node-cron');
const moment = require('moment');

const optionsPaginate = {
    page: 1,
    limit: 20
};

var controller = {

    saveFinanza: function(req, res) {
        var saveFinanza = new Finanza();
        var params = req.body;

        saveFinanza.amount = params.amount;
        saveFinanza.type = params.type;
        saveFinanza.name = params.name;
        saveFinanza.description = params.description;
        saveFinanza.dateRegister = params.dateRegister;
        saveFinanza.idUser = params.idUser;
        saveFinanza.nameUser = params.nameUser;
        saveFinanza.idUserRegister = params.idUserRegister;
        saveFinanza.nameUserRegister = params.nameUserRegister;
        saveFinanza.star = params.star;
        saveFinanza.date = params.date;
        saveFinanza.edit = params.edit;
        saveFinanza.iglesia = params.iglesia;
        saveFinanza.dateDom = params.dateDom;

        saveFinanza.save((err, finanzaStored) => {
            if (err) return res.status(500).send({
                message: 'Error al guardar el conjunto de datos de la Finanza.'
            });
            if (!finanzaStored) return res.status(404).send({
                message: 'No se ha podido guardar en la Finanza.'
            });
            return res.status(200).send({
                finanza: finanzaStored
            })
        });
    },

    // Para los graficos avance semanal de finanzas
    getWeekTotal: function(req, res) {
        var nameIglesia = req.params.iglesia;
        /*var user = req.params.user;*/
        finanzaWeek.find({ iglesia: nameIglesia }).sort({ $natural: 1 }).limit(5).exec((err, weekTotal) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los dato lista.'
            });

            if (!weekTotal) return res.status(404).send({
                message: 'No hay dato lista para mostrar'
            });

            return res.status(200).send({
                weekTotal
            });
        });
    },

    // Este get trae el monto del cierre de la semana anterior para sumar con los registros actuales
    // Se le manda la fecha del domingo restada una semana
    getCierreAnterior: function(req, res) {
        var nameIglesia = req.params.iglesia;
        var valdomDate = req.params.domDate;

        /*var user = req.params.user;*/
        finanzaWeek.find({ iglesia: nameIglesia, dateDom: valdomDate }).sort({ $natural: -1 }).limit(5).exec((err, weekTotal) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los dato lista.'
            });

            if (!weekTotal) return res.status(404).send({
                message: 'No hay dato lista para mostrar'
            });

            return res.status(200).send({
                weekTotal
            });
        });
    },

    // Registros de la semana para autosumarse y sumar tambien al valor de la semana anterior
    getAllWeek: function(req, res) {
        var nameIglesia = req.params.iglesia;
        var valdomDate = req.params.domDate;
        /*var user = req.params.user;*/
        Finanza.paginate({ iglesia: nameIglesia, dateDom: valdomDate }, optionsPaginate, (err, allWeek) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los dato lista.'
            });

            if (!allWeek) return res.status(404).send({
                message: 'No hay dato lista para mostrar'
            });

            return res.status(200).send({
                allWeek
            });
        });
    },

    // Todos los registros
    getAllFinanza: function(req, res) {
        var nameIglesia = req.params.iglesia;

        Finanza.find({ iglesia: nameIglesia }).sort().exec((err, allFinanza) => {

            if (err) return res.status(500).send({
                message: 'Error al devolver los dato lista.'
            });

            if (!allFinanza) return res.status(404).send({
                message: 'No hay dato lista para mostrar'
            });

            return res.status(200).send({
                allFinanza
            });
        });
    },

    CierreFinanzaSemanal: function(req, res) {
        dom.find({ llave: '1551' }).sort().exec((err, datosDom) => {

            Iglesias.find({}).sort().exec((err, todasLasIgles) => {

                if (err) return res.status(500).send({
                    message: 'Error al devolver el todasLasIgles.'
                });
                if (!todasLasIgles) return res.status(200).send({ todasLasIgles });


                // return res.status(200).send({ todasLasIgles });
                for (let i = 0; i < todasLasIgles.length; i++) {

                    // Llama a cada finanza de cada iglesia
                    Finanza.find({ iglesia: todasLasIgles[i].nombreIglesia, dateDom: datosDom[0].dom }).sort().exec((err, allFinanzaPerIglesia) => {

                        if (err) return res.status(500).send({
                            message: 'Error al devolver allFinanzaPerIglesia.'
                        });

                        if (!allFinanzaPerIglesia) return res.status(200).send({ allFinanzaPerIglesia });

                        // Declara cosas en 0
                        let sumaMontoPerIgle = 0;
                        let sumaCantDiezmos = 0;
                        let sumaCantGastos = 0;

                        // Suma todo lo ingresado y cuenta diezmos y gastos
                        for (let q = 0; q < allFinanzaPerIglesia.length; q++) {
                            sumaMontoPerIgle += allFinanzaPerIglesia[q].amount;
                            if (allFinanzaPerIglesia[q].amount < 0) {
                                sumaCantGastos++;
                            }
                            if (allFinanzaPerIglesia[q].type == "diezmo") {
                                sumaCantDiezmos++;
                            }
                        }

                        // Valor de la semana pasada
                        console.log(datosDom[0].dom)
                        let semanaPasada = moment(datosDom[0].dom).subtract(7, 'days').format("YYYY-MM-DD");

                        console.log(semanaPasada + "Soy 176");
                        console.log(todasLasIgles[i].nombreIglesia);
                        finanzaWeek.find({ iglesia: todasLasIgles[i].nombreIglesia, dateDom: semanaPasada }).sort().exec((err, cierrePasadoWeek) => {

                            // if (err) return res.status(500).send({
                            //     message: 'Error al devolver los dato lista.'
                            // });

                            // if (!cierrePasadoWeek) return res.status(404).send({
                            //     message: 'No hay dato lista para mostrar'
                            // });
                            if (!cierrePasadoWeek) return res.status(200).send({ cierrePasadoWeek });
                            console.log(cierrePasadoWeek);

                            let saveFinanzaWeek = new finanzaWeek();

                            saveFinanzaWeek.amount = sumaMontoPerIgle + cierrePasadoWeek.amount;
                            saveFinanzaWeek.cantDiezmos = sumaCantDiezmos;
                            saveFinanzaWeek.cantGastos = sumaCantGastos;
                            saveFinanzaWeek.iglesia = todasLasIgles[i].nombreIglesia;
                            saveFinanzaWeek.dateDom = datosDom[0].dom;

                            console.log(saveFinanzaWeek);
                            saveFinanzaWeek.save((err, resFinanzaWeek) => {
                                if (err) {
                                    console.log(err);
                                    console.log("Estoy en el err");
                                } else {

                                    console.log(resFinanzaWeek);
                                }
                            });



                        })
                    });


                }
            });
        });

    }

};



// cron.schedule('1 3 * * Thursday', () => {
//     negarLista();
// });
cron.schedule('* * * * *', () => {

    // cron.schedule('1 4 * * Saturday', () => {
    controller.CierreFinanzaSemanal();
});


module.exports = controller;