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
        console.log("Id del elemento escuchado:"+elemento.id);
        switch (ident){
            case "botonAdd":
                console.log("Acceso a Modal con boton Add");
                (<HTMLInputElement>this.myf.getElementById('tit_modal')).innerHTML="Agregar dispositivo";
                (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value="";
                (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value="";
                (<HTMLInputElement>this.myf.getElementById('tipo_dis')).value=""
                break;            
            case "modalacep":
                //--Sale del Modal con boton Aceptar
                let nombre:string = (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value;
                let descripcion:string = (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value;
                let tipo:string = (<HTMLInputElement>this.myf.getElementById('tipo_dis')).value;
                let id_mod:string=(<HTMLInputElement>this.myf.getElementById('id_dis')).value;
                console.log(nombre,descripcion,tipo);
                let data:DeviceInt;

                //-- Ver si sale de inserción o de adición de dispositivo
                let context_modal:string = (<HTMLBodyElement>this.myf.getElementById('tit_modal')).innerHTML;
                console.log(context_modal);
                if(context_modal=="Editar dispositivo"){
                    //--edita
                    console.log("id:"+id_mod);
                    data = {"id":`${id_mod}`,"action":"edit","name":`${nombre}`,"description":`${descripcion}`,"state":"0","type":`${tipo}`,"value":0};  
                }else{
                    //--agrega
                    data = {"id":"","action":"add","name":`${nombre}`,"description":`${descripcion}`,"state":"0","type":`${tipo}`,"value":0};
                    
                }
                this.myf.requestPOST(`http://${this.ip_server}:8000/add-dispositivos`,data,this);
                this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                break;
            case "edit":
                this.myf.getElementById('tit_modal').innerHTML="Editar dispositivo";
                let idx:string=(<HTMLInputElement>this.myf.getElementById(`tipo_${elemento.id.split('_')[1]}`)).textContent;
                (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value=<string>this.myf.getElementById(`name_${elemento.id.split('_')[1]}`).textContent;
                (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value=<string>this.myf.getElementById(`desc_${elemento.id.split('_')[1]}`).textContent;
                (<HTMLSelectElement>this.myf.getElementById('tipo_dis')).options[idx].selected=true;
                (<HTMLInputElement>this.myf.getElementById('id_dis')).value=elemento.id;
                break;
            case "del":
                console.log(elemento.id.split('_')[1]);
                let opcion:boolean = confirm(`Borrar el dispositivo ${elemento.id.split('_')[1]}?`);
                if (opcion===true){
                    let data = {"id":`${elemento.id}`};
                    this.myf.requestPOST(`http://${this.ip_server}:8000/del-dispositivos`,data,this);
                    this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                }
                break;
            case "sw":
                console.log(elemento.id.split('_')[1]);
                let state:boolean = this.view.getSwitchStateById(elemento.id);
                //let data1:DeviceInt = {"id":`${elemento.id}`,"action":"","name":"","description":"","state":state,"type":"","value":0};
                let data1 = {"id":`${elemento.id}`,"state":state};
                this.myf.requestPOST(`http://${this.ip_server}:8000/ver-dispositivos`,data1,this);
                //console.log("img_"+elemento.id.split('_')[1]);
                if (state==true){
                    //if (data1.type)
                    (<HTMLImageElement>this.myf.getElementById(`img_${elemento.id.split('_')[1]}`)).src="static/images/lamp_onoff_on.png";
                }else{
                    (<HTMLImageElement>this.myf.getElementById(`img_${elemento.id.split('_')[1]}`)).src="static/images/lamp_onoff_off.png";
                }
                //location.reload();
                //this.view.showDevices(data1);
                //this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                break;
            case "rang":
                let sldvalue:string = (<HTMLInputElement>elemento).value;
                let data2 = {"id":`${elemento.id}`,"value":`${sldvalue}`};
                this.myf.requestPOST(`http://${this.ip_server}:8000/update-range`,data2,this); //deberie ir /value
                console.log(elemento.id.split('_')[1]);
                console.log(sldvalue);
                break;
        }        
    }
    handleGETResponse(status:number, response:string):void{
        //--Respuesta del servidor con todos los dispositivos en BD
        console.log("Respuesta del servidor:"+response);
        let data: DeviceInt[] = JSON.parse(response);
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

function greeter(person) {
    return "Hello, " + person;
 }
 
 //document.body.innerHTML = greeter(user);
 
 console.log("Hola mundo");

//=======[ End of file ]=======================================================
