interface GETResponseListener{
    handleGETResponse(status:number,response:string):void;
}

interface POSTResponseListener{
    handlePOSTResponse(status:number,response:string):void;
}


class MyFramework{
    getElementById(id:string):HTMLElement{
        let e:HTMLElement;
        e=document.getElementById(id);
        return e;
    }

    requestGET(url:string,listener:GETResponseListener):void{
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            //console.log(url, xhr.readyState,xhr.status);
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handleGETResponse(xhr.status,xhr.responseText);
                }
                else{
                    listener.handleGETResponse(xhr.status,null);
                }
            }
        };
        xhr.open('GET',url,true);
        xhr.send(null);
    }
    requestPOST(url:string, data:object, listener:POSTResponseListener):void{
        let xhr: XMLHttpRequest;
        xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function(){
            //console.log(url, xhr.readyState,xhr.status);
            if(xhr.readyState == 4){
                if(xhr.status == 200){
                    listener.handlePOSTResponse(xhr.status,xhr.responseText);
                }
                else{
                    listener.handlePOSTResponse(xhr.status,null);
                }
            }
        };
        xhr.open('POST',url,true);
        // envio JSON en body de request (Usar con NODEJS)
        xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhr.send(JSON.stringify(data));
        //______________________________
        // envio Formdata en body de request (Usar con Apache,PythonWS,etc.)
        //let formData:FormData = new FormData();
        //for(let key in data) {
          //  formData.append(key, data[key]);
        //}
        //xhr.send(formData);
        //______________________________

              
    }

    getElementByEvent(evt:Event):HTMLElement{
        return <HTMLElement>evt.target;  //casting
    }

    configEventLister (event:string, id:string, listener:EventListenerObject):void
    {
        let b:HTMLElement = document.getElementById (id);
        b.addEventListener (event,listener);
    }

}