/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:string;
    value:number;
    action:string;
}

class Main implements EventListenerObject,GETResponseListener, POSTResponseListener {
  myf:MyFramework;
  view:ViewMainPage;
  counter:number=0;
  dispositivos:DeviceInt[];
  //dispositivos:DeviceInt;
  ip_server:string = "192.168.1.41";
    main():void{
        this.myf = new MyFramework();
        this.view=new ViewMainPage(this.myf);
        this.myf.configEventLister ("click", "botonAdd", this);
        this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);  
    }

    handleEvent(evt:Event):void{
        let elemento:HTMLElement= this.myf.getElementByEvent(evt);
        let ident:string = elemento.id.split('_')[0]
        //console.log("Id del elemento escuchado:"+elemento.id);
        switch (ident){
            case "botonAdd":
                //--Acceso a Modal con boton Add
                //--Título del modal
                (<HTMLInputElement>this.myf.getElementById('tit_modal')).innerHTML="Agregar dispositivo";

                //--Limpia el formulario
                (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value="";
                (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value="";
                (<HTMLInputElement>this.myf.getElementById('tipo_dis')).value=""
                break;            
            case "modalacep":
                //--Sale del Modal con boton Aceptar asignando los valores de los campos
                let nombre:string = (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value;
                let descripcion:string = (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value;
                let tipo:string = (<HTMLInputElement>this.myf.getElementById('tipo_dis')).value;
                let id_mod:string=(<HTMLInputElement>this.myf.getElementById('id_dis')).value;
                let data:DeviceInt;

                //-- Ver si sale de inserción o de adición de dispositivo
                let context_modal:string = (<HTMLBodyElement>this.myf.getElementById('tit_modal')).innerHTML;
                if(context_modal=="Editar dispositivo"){
                    //--edita
                    console.log("id:"+id_mod);
                    data = {"id":`${id_mod}`,"action":"edit","name":`${nombre}`,"description":`${descripcion}`,"state":"0","type":`${tipo}`,"value":0};  
                }else{
                    //--agrega
                    data = {"id":"","action":"add","name":`${nombre}`,"description":`${descripcion}`,"state":"0","type":`${tipo}`,"value":0};
                    
                }
                //--Graba nuevo dispositivo en BD
                this.myf.requestPOST(`http://${this.ip_server}:8000/add-dispositivos`,data,this);
                //--Refresca página
                //this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                break;
            case "edit":
                //--Título del modal
                this.myf.getElementById('tit_modal').innerHTML="Editar dispositivo";
                //--Intento de set de select en modal
                //console.log((<HTMLSelectElement>this.myf.getElementById('tipo_dis')).options[3]);
                //console.log((<HTMLSelectElement>this.myf.getElementById('tipo_dis')).options.selectedIndex);

                //--Trae los valores del dispositivo al modal
                (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value=<string>this.myf.getElementById(`name_${elemento.id.split('_')[1]}`).textContent;
                (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value=<string>this.myf.getElementById(`desc_${elemento.id.split('_')[1]}`).textContent;
                
                //--Guarda la id del dispositivo en el modal 
                (<HTMLInputElement>this.myf.getElementById('id_dis')).value=elemento.id;
                break;
            case "del":
                //--Borra dispositivo
                let opcion:boolean = confirm(`Borrar el dispositivo ${elemento.id.split('_')[1]}?`);
                if (opcion===true){
                    let data_del = {"id":`${elemento.id}`};
                    this.myf.requestPOST(`http://${this.ip_server}:8000/del-dispositivos`,data_del,this);
                    //--Refresca página
                    //this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                }
                break;
            case "sw":
                //--Cambia estado del Switch del dispositivo
                //console.log(elemento.id.split('_')[1]);
                let state:boolean = this.view.getSwitchStateById(elemento.id);
                //let data:DeviceInt = {"id":`${elemento.id}`,"action":"","name":"","description":"","state":state,"type":"","value":0};
                let data_sw = {"id":`${elemento.id}`,"state":state};
                this.myf.requestPOST(`http://${this.ip_server}:8000/sw-dispositivos`,data_sw,this);            
                //--Refresca página
                //this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                //location.reload(true);
                break;
            case "rang":
                let sldvalue:string = (<HTMLInputElement>elemento).value;
                let data_rg = {"id":`${elemento.id}`,"value":`${sldvalue}`};
                this.myf.requestPOST(`http://${this.ip_server}:8000/update-range`,data_rg,this); //deberie ir /value
                //console.log(sldvalue);
                break;
        }        
        
    }
    handleGETResponse(status:number, response:string):void{
        //--Respuesta del servidor con todos los dispositivos en BD
        console.log("Respuesta del servidor:"+response);
        let data: DeviceInt[] = JSON.parse(response);
        this.dispositivos=data;
        //console.log("Variable data:"+data[0].name);
        this.view.showDevices(data);

        //--Arma las escuchas de los clicks
        for(let d of data){
            //--Escucha switch on/off
            this.myf.configEventLister ("click", `sw_${d.id}`, this);
            //--Escucha boton edición dispositivo
            this.myf.configEventLister ("click", `edit_${d.id}`, this);
            //--Escucha boton borrar dispositivo
            this.myf.configEventLister ("click", `del_${d.id}`, this);
            //--Escucha slider dispositivo
            this.myf.configEventLister ("change", `rang_${d.id}`, this);
            //--Escucha apertura de modal
            this.myf.configEventLister ("click", "modal1", this);
        }
    }

    //--Callback que se llama cuando requestPOST tiene respuesta
    handlePOSTResponse(status:number, response:string):void{
     console.log(status);
     console.log(response);
    }
}



window.onload = () => {
    let m:Main=new Main();
    m.main();
}
//=======[ Settings, Imports & Data ]==========================================

let user = "TypesScript Users!";

//=======[ Main module code ]==================================================

/*function greeter(person) {
    return "Hello, " + person;
 }
 
 //document.body.innerHTML = greeter(user);
 
 console.log("Hola mundo");*/

//=======[ End of file ]=======================================================
