/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/


/*function configClick(){

}*/

interface DeviceInt{
    id:string;
    name:string;
    description:string;
    state:string;
    type:string;
    value:number;
}

class Main implements EventListenerObject,GETResponseListener, POSTResponseListener {
  myf:MyFramework;
  view:ViewMainPage;
  counter:number=0;
  ip_server:string = "192.168.1.41";
    main():void{
        
       /* console.log("Mensaje desde main");
        //-- Prueba con arrays
        let usuarios:Array<User>;
        usuarios=new Array<User>();
        usuarios.push(new User(1,"MAC","mac@gmail.com"));
        usuarios.push(new User(2,"MAC1","mac1@gmail.com"));
        usuarios.push(new User(3,"MAC2","mac2@gmail.com"));

        //--Ejemplo de uso del set
        usuarios[1].email="micorreo@dominio.com";
        //--Ejemplo de uso del get
        console.log("email1:"+usuarios[1].email);

        //for(let i in usuarios){
          //  usuarios[i].printInfo();
        //}
        this.mostrarUsers(usuarios);*/

        
        this.myf = new MyFramework();
        //let botAdd:HTMLElement= document.getElementById("botonAdd");
        //let botEdit:HTMLElement= document.getElementById("edit_1");
        //botAdd.addEventListener("click",this);
        //botEdit.addEventListener("click",this);
        this.view=new ViewMainPage(this.myf);
        //b.textContent="Hola Mundo";
        //botEdit.addEventListener("click",()=>{alert("Evento!")}); //this.evento);
        this.myf.configEventLister ("click", "botonAdd", this);
       
        this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
        
    }
    /*mostrarUsers(users:Array<User>):void{
        //for(let i in users){
          //  users[i].printInfo();
        //}
        for (let o of users){
            o.printInfo();
        }
    }*/
    handleEvent(evt:Event):void{

        let elemento:HTMLElement= this.myf.getElementByEvent(evt);
        //let data:DeviceInt;
        //console.log(elemento);
        //console.log(`Se hizo click, evento: ${evt.type}`);
        //console.log("HTMLEement:"+elemento.id);
        let ident:string = elemento.id.split('_')[0]
        console.log("Id del elemento escuchado:"+ident);
        switch (ident){
            case "botonAdd":
                console.log("Acceso a Modal con boton Add");
                //console.log(elemento);
                break;            
            case "modalacep":
                console.log("Se sale del Modal con boton Aceptar");
                let nombre:string = (<HTMLInputElement>this.myf.getElementById('nombre_dis')).value;
                let descripcion:string = (<HTMLInputElement>this.myf.getElementById('descrip_dis')).value;
                let tipo:string = (<HTMLInputElement>this.myf.getElementById('tipo_dis')).value;
                console.log(nombre,descripcion,tipo);
                let data = {"name":`${nombre}`,"description":`${descripcion}`,"state":"0","type":`${tipo}`};
                this.myf.requestPOST(`http://${this.ip_server}:8000/add-dispositivos`,data,this);
                this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                break;
            case "edit":
                //var M:any;
                console.log(elemento.id.split('_')[1]);
                //var myDialog = document.getElementById("myModal");
                //console.log(modal);
                //let myDialog:any = <any>document.getElementById("myModal");
                //document.getElementById("myModal").style.display = "block";
                //myDialog.modal('open');

                //var instance = M.Modal.getInstance(elems);
                //var elems = document.querySelectorAll('.modal');
                //var instances = M.Modal.init(elems, {});
                //var elems = document.querySelectorAll('.modal');
                //var instances = M.Modal.init(elems, {opacity:0.6});
                

                
                break;
            case "del":
                console.log(elemento.id.split('_')[1]);
                let opcion:boolean = confirm(`Borrar el dispositivo ${elemento.id} ?`);
                if (opcion===true){
                    let data = {"id":`${elemento.id}`};
                    this.myf.requestPOST(`http://${this.ip_server}:8000/del-dispositivos`,data,this);
                    this.myf.requestGET (`http://${this.ip_server}:8000/ver-dispositivos`,this);
                }
                break;
            case "sw":
                console.log(elemento.id.split('_')[1]);
                let state:boolean = this.view.getSwitchStateById(elemento.id);
                let data1 = {"id":`${elemento.id}`,"state":state};
                this.myf.requestPOST(`http://${this.ip_server}:8000/ver-dispositivos`,data1,this);
                break;
            case "rang":
                //let sldvalue:string = (<HTMLInputElement>this.myf.getElementById(`rang_${elemento.id}`)).value;
                let sldvalue:string = (<HTMLInputElement>elemento).value;
                let data2 = {"id":`${elemento.id}`,"value":`${sldvalue}`};
                this.myf.requestPOST(`http://${this.ip_server}:8000/update-range`,data2,this); //deberie ir /value
                console.log(elemento.id.split('_')[1]);
                console.log(sldvalue);
                
                break;
        }
        /*if (elemento.id=="botonAdd"){
            this.counter ++;
            //b.textContent=`ClicK ${this.counter}`;
            console.log(`Pulsacion nro: ${this.counter}`)
        }else if (elemento.id==""){
            console.log(`Pulsacion nro:`)
        }else{
            let state:boolean = this.view.getSwitchStateById(elemento.id);
            let data={"id":`${elemento.id}`,"state":state};
            //this.myf.requestPOST("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post",data,this);
            this.myf.requestPOST("http://192.168.1.41:8000/dispositivos",data,this);
        }*/
        
        
    }
    handleGETResponse(status:number, response:string):void{//callback que se llama cuando requestGET tiene respuesta
        //--Respuesta del servidor con todos los dispositivos en BD
        console.log("Respuesta del servidor:"+response);
        let data: DeviceInt[] = JSON.parse(response);
        console.log("Variable data:"+data);
        this.view.showDevices(data);
        //--Arma las escuchas de los clicks
        for(let d of data){
            /*let sw:HTMLElement=this.myf.getElementById(`dev_${d.id}`);
            sw.addEventListener("click",this);
            let edt:HTMLElement=this.myf.getElementById(`edit_${d.id}`);
            edt.addEventListener("click",this);*/
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
    handlePOSTResponse(status:number, response:string):void{//callback que se llama cuando requestGET tiene respuesta
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
