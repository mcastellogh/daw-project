//--Ejercitación
var myjson = require('./datos.json');
//console.log(myjson);

var express = require('express');
var app = express();
app.use(express.json()); 

//--Handlers
function getHandler(req,res){
    let id=req.query.id;
    console.log(myjson[id-1]);
    res.send(myjson[id-1]);
}


function postHandler(req,res){
    let id=req.query.id;    //Obtengo la id que me postea el cliente
    let st=req.query.st;    //Obtengo el estado que me postea el cliente
    console.log(myjson[id-1],myjson[id-1].state);
    myjson[id-1].state=st;  //cambio el valor de la clave 'state' del json y
    res.send(myjson[id-1]); //la envío al cliente
}

//-- Recursos del server
//--GET
app.get('/',getHandler);

//--POST
app.post('/',postHandler);


app.listen(3333,function(req,res){
    console.log('Api!');
})
//--Para probar el GET: http://miot.mcastello.com:3333/?id=2
