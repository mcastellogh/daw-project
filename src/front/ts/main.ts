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
       
        this.myf.requestGET (`http://${this.ip_server}:8000/dispositivos`,this);

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
        //console.log(elemento);
        //console.log(`Se hizo click, evento: ${evt.type}`);
        //console.log("HTMLEement:"+elemento.id);
        let ident:string = elemento.id.split('_')[0]
        console.log(ident);
        switch (ident){
            case "botonAdd":
                console.log("botonADD");
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



                
                break;
            case "del":
                console.log(elemento.id.split('_')[1]);
                let opcion:boolean = confirm(`Borrar el dispositivo ${elemento.id} ?`);
                if (opcion===true){
                    let data = {"id":`${elemento.id}`};
                    this.myf.requestPOST(`http://${this.ip_server}:8000/deldispositivos`,data,this);
                    this.myf.requestGET (`http://${this.ip_server}:8000/dispositivos`,this);
                }
                break;
            case "dev":
                console.log(elemento.id.split('_')[1]);
                let state:boolean = this.view.getSwitchStateById(elemento.id);
                let data = {"id":`${elemento.id}`,"state":state};
                this.myf.requestPOST(`http://${this.ip_server}:8000/dispositivos`,data,this);
                break;
            case "rang":
                var slider = document.getElementById(`rang_${elemento.id}`);
                console.log(elemento.id.split('_')[1]);
                //console.log(slider.range.get());
                
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
            this.myf.configEventLister ("click", `dev_${d.id}`, this);
            this.myf.configEventLister ("click", `edit_${d.id}`, this);
            this.myf.configEventLister ("click", `del_${d.id}`, this);
            this.myf.configEventLister ("change", `rang_${d.id}`, this);







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
