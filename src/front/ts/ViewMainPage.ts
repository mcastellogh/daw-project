class ViewMainPage{
    private myf:MyFramework;

    constructor(myf:MyFramework){
        this.myf=myf;
    }

    showDevices(list: DeviceInt[]):void{
        let lista_disp:HTMLElement= this.myf.getElementById("devicesList");
        let img:string;
    
        //${dev.type=="1" ? "static/images/window.png":"static/images/lightbulb.png"}
        for (let dev of list){
            let estado:string = dev.state == "1" ? "checked":"";
            //document.getElementById (`edit_${dev.id}`).addEventListener ("click",this.esc_evt);
            //this.myf.configEventLister("click","edit_1",this)  //("click", `edit_${dev.id}`, this);
            switch(parseInt(dev.type)){
                case 1:
                    if (dev.state == "1"){
                        img="static/images/lamp_onoff_on.png";
                    }else{
                        img="static/images/lamp_onoff_off.png";
                    }
                    break;
                case 2:
                        img="static/images/lamp_dimm.png";
                        break;                    
                case 3:
                    img="static/images/persiana.png";
                    break;
            }
            lista_disp.innerHTML+=
           `<li class="myli">
                <div class="row flex">
                    <div class="col l1 imagen-disp">
                        <span><h5>${dev.id}</h5></span>
                    </div>
                    <div class="col l1 imagen-disp">    
                        <img id="img_${dev.id}" src=${img} alt="" class="myimg">
                    </div>
                    <div class="col l2">
                        <p id="name_${dev.id}" class="title boldName">${dev.name}</p>
                        <p id="desc_${dev.id}" class="title">${dev.description}</p>
                    </div>
                    <div class="col l5">
                        <div class="switch">
                            <label>
                                Off
                                <input id="sw_${dev.id}" type="checkbox" ${estado} >
                                <span class="lever"></span>
                                On
                            </label>
                        </div>
                        <div>
                            <div>
                                <p class="range-field">
                                    <input type="range" name="range" id="rang_${dev.id}" min="0" max="100" value="${dev.value}"/>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="col l3" >
                        <div class="row mybuttons" >
                            <a class="waves-effect waves-teal btn-flat modal-trigger" href="#modal1"><i id="edit_${dev.id}" class="material-icons center color_edt">edit</i></a>
                            <a class="waves-effect waves-teal btn-flat"><i id="del_${dev.id}" class="material-icons center color_del">delete</i></a>           
                        </div>
                    </div>
                </div>
            </li>`;
            if (parseInt(dev.type) == 1){
                (<HTMLInputElement>document.getElementById(`rang_${dev.id}`)).disabled=true;
                document.getElementById(`rang_${dev.id}`).style.opacity = "0.3";
            }
                
                
                /*`<li class="collection-item avatar">
                <div class="row">
                    <div class="col l12">
                        <img src=${img} alt="" class="circle">
                    </div>
                </div>
                <div class="row">
                    <div class="col l4">
                        <div class="row">
                            <span class="title">${dev.name}</span>
                        </div>
                        <div class="row">       
                            <span class="title">${dev.description}</span>
                        </div>
                        <div class="row">            
                            
                                <a class="waves-effect waves-teal btn-flat modal-trigger" href="#modal1"><i id="edit_${dev.id}" class="material-icons center">edit</i></a>
                                <a class="waves-effect waves-teal btn-flat"><i id="del_${dev.id}" class="material-icons center">delete</i></a>
                            
                        </div>
                    </div>
                    <div class="col l8">
                        <div class="switch">
                            <label>
                                Off
                                <input id="dev_${dev.id}" type="checkbox" ${estado} >
                                <span class="lever"></span>
                                On
                            </label>
                        </div>
                        <div>
                            <p class="range-field">
                                <input type="range" name="range" id="rang_${dev.id}" min="0" max="100" />
                                <output for="range" onforminput="value = name.valueAsNumber;"></output>
                            </p>
                        </div>
                    </div>
                </div>

            </li>`;*/
            //let element1:HTMLElement = document.getElementById (`edit_${dev.id}`);
            //element1.addEventListener ("click",this.esc_evt);
        }
        
    }
    getSwitchStateById(id:string):boolean{
        let e:HTMLElement = this.myf.getElementById(id);
        let i:HTMLInputElement = <HTMLInputElement> e;
        return i.checked;
    }
    /*getRangeValueById(id:string):number{
    //    let e:number = this.myf.getElementById(id).value;
        //let i:HTMLInputElement = <HTMLInputElement> e;
        let sldvalue:string = (<HTMLInputElement>elemento).value;
        return sldvalue;
    }*/
}