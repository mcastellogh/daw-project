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
var connectionMySQL = require('./mysql-connector');


// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.get('/dispositivos', function(req, res, next) {
    //connectionMySQL.query('Select * from Devices where id=?',[req.params.id],function(err,respuesta){
    connectionMySQL.query('Select * from Devices',function(err,respuesta){
       if(err){
           res.send(err).status(400);
       }
       res.send(respuesta);
    });
});

/*app.get('/dispositivos', function(req, res, next) {
    //let datosFiltrados=myjson.filter((itemDeLaLista)=>{
     //   return itemDeLaLista.id==req.params.id;
    //});
    //res.json(datosFiltrados);
    let id=req.query.id;
    console.log(myjson);
    res.json(myjson);

    //response = "{ 'key1':'value2' }"
    //res.send(JSON.stringify(response)).status(200);
});*/



/*app.get('/dispositivos/:id', function(req, res, next) {
    let datosFiltrados=myjson.filter((itemDeLaLista)=>{
        return itemDeLaLista.id==req.params.id;
    });
    res.json(datosFiltrados);
    //let id=req.query.id;
    //console.log(myjson[id-1]);
    //res.json(myjson[id-1]);

    //response = "{ 'key1':'value2' }"
    //res.send(JSON.stringify(response)).status(200);
});*/

/*app.post ( '/', function(req,res){ // /dispositivos/:id en el navegador->/dispositivos/1
    let id=req.query.id;    //Obtengo la id que me postea el cliente
    let st=req.query.st;    //Obtengo el estado que me postea el cliente
    console.log(myjson[id-1],myjson[id-1].state);
    myjson[id-1].state=st;  //cambio el valor de la clave 'state' del json y
    res.send(myjson[id-1]); //la envío al cliente
});*/
app.post('/dispositivos',function(req,res){

})

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly. Puerto: ",PORT);

});

//=======[ End of file ]=======================================================
