// 'use strict'


// var express = require('express');
// var bodyParser = require('body-parser');

// var app = express();
// const fs = require('fs');
// const https = require('https');
// const path = require('path');
// const mongoose = require('mongoose');
// // const app = require('./app');
// const port = 3900;

// // rutas
// var iglesia_routes = require('./routes/iglesia');


// // middlewares

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Configurar cabeceras y cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });

// //Rutas
// app.use('/api', iglesia_routes);

// const sslServer = https.createServer({
//         key: fs.readFileSync(path.join(__dirname, 'ssl', 'key.pem')),
//         cert: fs.readFileSync(path.join(__dirname, 'ssl', 'csr.pem')),
//     },
//     app
// )

// sslServer.listen(3443, () => console.log('Estoy por ssl'));

// mongoose.Promise = global.Promise;

// mongoose.connect('mongodb://localhost:27017/iglesia')
//     .then(() => {
//         console.log("Conexion a la DataBase establecida con exito");


//         //creacion del servidor
//         app.listen(port, () => {
//             console.log("Servidor corriendo correctamente en la url: Localhost:3900");
//         });

//     })
//     .catch(err => console.log(err));

// // //exportar
// // module.exports = app;