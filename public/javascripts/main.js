function getJson(){
    var obj = new XMLHttpRequest();
    obj.overrideMimeType("application/json");
    obj.open('GET', 'fazenda.json', false); 
    obj.send();
    if (obj.readyState == 4 && obj.status == "200") {
        return JSON.parse(obj.responseText)
    }   
}

const json = getJson()
