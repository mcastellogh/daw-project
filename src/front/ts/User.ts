class User{
    private _id:number;
    private _name:string;
    private _email:string;
    private _isLogged:boolean;

    constructor(id:number,name:string,email:string){
        this._id=id;
        this._name=name;
        this._email=email;
    }
    //--Setters
    set id(id:number){
        this._id=id;
    }
    set name(name:string){
        this._name=name;
    }
    set email(email:string){
        this._email=email;
    }
    //--Getters
    get id():number{
        return this._id;
    }
    get name():string{
        return this._name;
    }
    get email():string{
        return this._email;
    }

    printInfo():void{
        console.log("id="+this._id+", name= "+this._name+ ", email="+this._email);

    }
}