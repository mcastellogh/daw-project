class ViewMainPage{
    private myf:MyFramework;

    constructor(myf:MyFramework){
        this.myf=myf;
    }

    showDevices(list: DeviceInt[]):void{
        let e:HTMLElement= this.myf.getElementById("devicesList");
        for (let dev of list){
            

            
                e.innerHTML+=`<li class="collection-item avatar">
                <img src=${dev.type=="1" ? "static/images/window.png":"static/images/lightbulb.png"} alt="" class="circle">
                <span class="title">${dev.name}</span>
                <p>${dev.description}<br>
                <a href="#!" class="secondary-content">
                       
                <div class="switch">
                    <label>
                        Off
                        <input id="dev_${dev.id}" type="checkbox" >
                        <span class="lever"></span>
                        On
                    </label>
                </div>
            </li>`;
        }
    }
    getSwitchStateById(id:string):boolean{
            let e:HTMLElement = this.myf.getElementById(id);
            let i:HTMLInputElement = <HTMLInputElement> e;
            return i.checked;

    }
}