/*=============================================================================
 * Authors: Agustin Bassi, Brian Ducca, Santiago Germino 
 * Date: Jul 2020
 * Licence: GPLV3+
 * Project: DAW - CEIoT - Project Structure
 * Brief: Main frontend file (where the logic is)
=============================================================================*/

class User{
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogger:boolean;

    constructor(id:number,name:string,email:string){
        this._id=id;
        this._name=name;
        this._email=email;
    }
    set id(id:number){
        this._id=id;
    }
    get id():number{
        return this._id;
    }
    printInfo():void{
        console.log("id="+this._id+", name= "+this._name+ ", email="+this._email);

    }
}

class Main{
    main():void{
        console.log("Mensaje desde main");
        let usuarios:Array<User>;
        usuarios=new Array<User>();
        usuarios.push(new User(1,"MAC";"mac@gmail.com"));
        usuarios.push(new User(2,"MAC1";"mac1@gmail.com"));
        usuarios.push(new User(3,"MAC2";"mac2@gmail.com"));

        for(let i in usuarios){
            usuarios[i].printInfo();
        }

    }
}



window.onload=function(){
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
