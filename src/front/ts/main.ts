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
    main():void{
        
        console.log("Mensaje desde main");
        let usuarios:Array<User>;
        usuarios=new Array<User>();
        usuarios.push(new User(1,"MAC","mac@gmail.com"));
        usuarios.push(new User(2,"MAC1","mac1@gmail.com"));
        usuarios.push(new User(3,"MAC2","mac2@gmail.com"));

        //--Ejemplo de uso del set
        usuarios[1].email="micorreo@dominio.com";
        //--Ejemplo de uso del get
        console.log("email1:"+usuarios[1].email);

        /*for(let i in usuarios){
            usuarios[i].printInfo();
        }*/
        this.mostrarUsers(usuarios);
        this.myf = new MyFramework();
        let b:HTMLElement= document.getElementById("boton");
        b.addEventListener("click",this);
        this.view=new ViewMainPage(this.myf);
        //b.textContent="Hola Mundo";
        //b.addEventListener("click",()=>{alert("Evento!")}); //this.evento);
        this.myf.configEventLister ("click", "boton", this);
        this.myf.requestGET ("Devices.txt", this);

    }
    mostrarUsers(users:Array<User>):void{
        /*for(let i in users){
            users[i].printInfo();
        }*/
        for (let o of users){
            o.printInfo();
        }
    }
    handleEvent(evt:Event):void{
        let b:HTMLElement= this.myf.getElementByEvent(evt);
        console.log(`Se hizo click"${evt.type}"`);
        console.log("Objeto:"+this);
        console.log("HTMLEement:"+b.id);
        
        if (b.id=="button"){
            this.counter ++;
            b.textContent=`Click ${this.counter}`;
        }else{
            let state:boolean = this.view.getSwitchStateById(b.id);
            let data={"id":`${b.id}`,"state":state,"Nombre":name};
            this.myf.requestPOST("https://cors-anywhere.herokuapp.com/https://postman-echo.com/post",data,this);
        }
        
        
    }
    handleGETResponse(status:number, response:string):void{//callback que se llama cuando requestGET tiene respuesta
        console.log("Respuesta del server:"+response);
        let data: DeviceInt[] = JSON.parse(response);
        console.log("Variable data:"+data);
        this.view.showDevices(data);
        for(let d of data){
            let b:HTMLElement=this.myf.getElementById(`dev_${d.id}`);
            b.addEventListener("click",this);
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
