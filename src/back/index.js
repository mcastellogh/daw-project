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

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

//=======[ Main module code ]==================================================
app.get('/ver-dispositivos', function(req, res, next) {
    connectionMySQL.query('Select * from Devices',function(err,respuesta){
       if(err){
           res.send(err).status(400);
       }
       res.send(respuesta);
    });
});

//--Guarda en BD el cambio de estado de dispositivo
app.post ( '/sw-dispositivos', function(req,res){ 
    //--Obtengo la id que me postea el cliente
    id=parseInt(req.body.id.split('_')[1]);    
    //--Obtengo el estado que me postea el cliente
    let st=req.body.state;    
    //console.log(st,id);

    //--Obtiene estado
    if (st==true){
        var stat=1;
    }else{
        stat=0;
    }  
    //console.log(stat,id);
    //--Guarda en DB
    connectionMySQL.query('update Devices set state=? where id=?',[stat,id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });
});

//--Guarda en BD el cambio de rango (slider) de dispositivo (sólo para tipos 2 y 3)
app.post ( '/update-range', function(req,res){ 
    //--Obtengo la id que me postea el cliente
    id=parseInt(req.body.id.split('_')[1]);     
    //--Obtengo el estado que me postea el cliente
    let value=req.body.value;    
    console.log("value"); 
    console.log(value,id);
    //--Guarda en BD
    connectionMySQL.query('update Devices set value=? where id=?',[value,id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });

});
//--Elimina de BD dispositivo
app.post ( '/del-dispositivos', function(req,res){ 
    //--Obtengo la id que me postea el cliente
    id=parseInt(req.body.id.split('_')[1]);    
    //console.log(st,id); 
    //console.log(stat,id);
    //--Realiza transacción en BD
    connectionMySQL.query('delete from Devices where id=?',[id],function(err,respuesta){
        if(err){
            res.send(err).status(400);
        }
        res.send(respuesta).status(200);
     });
});
//--Agrega/edita dispositivos
app.post ( '/add-dispositivos', function(req,res){
    //--Obtengo la id que me postea el cliente
    let id=parseInt(req.body.id.split('_')[1]);   
    let action = req.body.action;
    let nam = req.body.name;
    //--Obtengo el estado que me postea el cliente
    let st = parseInt(req.body.state);    
    let desc = req.body.description;
    let typ = parseInt(req.body.type);
    //--Determina acción (agregar/editar)
    if (action=="add"){
        if (st==true){
            var stat=1;
        }else{
            stat=0;
        } 
        //--Agrega 
        connectionMySQL.query('insert into Devices (name, description, state, type) values (?,?,?,?)',[nam,desc,st,typ],function(err,respuesta){
            if(err){
                res.send(err).status(400);
            }
            res.send(respuesta).status(200);
        });
    }else{
        //--Edita
        connectionMySQL.query('update Devices set name=?, description=?, type=?  where id=?',[nam,desc,typ,id],function(err,respuesta){
            if(err){
                res.send(err).status(400);
            }
            res.send(respuesta).status(200);
        });
    }

});

//--Inicia la aplicación
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly. Puerto: ",PORT);

});

//=======[ End of file ]=======================================================
