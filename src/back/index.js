/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main backend file
=============================================================================*/

//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var mysql   = require('./mysql-connector');

var myjson = require('./datos.json');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================

app.get('/devices/', function(req, res, next) {
    let id=req.query.id;
    console.log(myjson[id-1]);
    res.send(myjson[id-1]);

    //response = "{ 'key1':'value1' }"
    //res.send(JSON.stringify(response)).status(200);
});

app.post ( '/', function(req,res){
    let id=req.query.id;    //Obtengo la id que me postea el cliente
    let st=req.query.st;    //Obtengo el estado que me postea el cliente
    console.log(myjson[id-1],myjson[id-1].state);
    myjson[id-1].state=st;  //cambio el valor de la clave 'state' del json y
    res.send(myjson[id-1]); //la envío al cliente
});


app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
