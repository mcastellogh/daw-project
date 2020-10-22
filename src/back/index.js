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

//--Mysql
var myjson = require('./datos.json');
var connectionMySQL = require('./mysql-connector');

//--MQTT
//var mqtt = require('mqtt');
//var client  = mqtt.connect('192.168.1.20')

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.get('/ver-dispositivos', function(req, res, next) {
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

/*app.delete('/dispositivos'),function(req,res){

}*/

app.post ( '/ver-dispositivos', function(req,res){ // /dispositivos/:id en el navegador->/dispositivos/1
    id=parseInt(req.body.id.split('_')[1]);    //Obtengo la id que me postea el cliente
    let st=req.body.state;    //Obtengo el estado que me postea el cliente
    //console.log(st,id);
    //--guardar en database
    if (st==true){
        var stat=1;
    }else{
        stat=0;
    }  
    //console.log(stat,id);
    connectionMySQL.query('update Devices set state=? where id=?',[stat,id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });

});
app.post ( '/update-range', function(req,res){ // /dispositivos/:id en el navegador->/dispositivos/1
    id=parseInt(req.body.id.split('_')[1]);     //Obtengo la id que me postea el cliente
    let value=req.body.value;    //Obtengo el estado que me postea el cliente
    console.log("value"); 
    console.log(value,id);
    connectionMySQL.query('update Devices set value=? where id=?',[value,id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });

});
app.post ( '/del-dispositivos', function(req,res){ 
    id=parseInt(req.body.id.split('_')[1]);    //Obtengo la id que me postea el cliente
    //console.log(st,id); 
    //console.log(stat,id);
    connectionMySQL.query('delete from Devices where id=?',[id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });
});

app.post ( '/add-dispositivos', function(req,res){ // /dispositivos/:id en el navegador->/dispositivos/1
    //id=parseInt(req.body.id.split('_')[1]);    //Obtengo la id que me postea el cliente
    let nam=req.body.name;
    let st=parseInt(req.body.state);    //Obtengo el estado que me postea el cliente
    let desc=req.body.description;
    let typ=parseInt(req.body.type);
    //console.log(st,id);
    //--guardar en database
    if (st==true){
        var stat=1;
    }else{
        stat=0;
    }  
    //console.log(stat,id);
    connectionMySQL.query('insert into Devices (name, description, state, type) values (?,?,?,?)',[nam,desc,st,typ],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });

});
/*app.post('/dispositivos',function(req,res){

})*/

app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly. Puerto: ",PORT);

});

//=======[ End of file ]=======================================================
