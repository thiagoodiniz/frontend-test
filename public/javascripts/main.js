function getJson(){
    var obj = new XMLHttpRequest();
    obj.overrideMimeType("application/json");
    obj.open('GET', 'fazenda.json', false); 
    obj.send();
    if (obj.readyState == 4 && obj.status == "200") {
        return JSON.parse(obj.responseText)
    }   
}

function render(json){
    return `
        ${
            json.data.map(item => 
                `
                <li class="list-item" onmouseover="renderArrowPercents()" id="${item.__id}">
                    <img class="img" src="${item.picture}" alt="...">
                    <div class="text"> 
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                    </div>
                </li>
                `
            ).join('')
        }
        `
}

function renderArrowPercents(){
    return  `
            <div class="into-arrow">
                <p class="p1">Gostam</p>
                <p class="p2">Não Gostam</p>
                <div class="percent-one">
                    <p>40%</p>
                </div>
                <div class="percent-two">
                    <p>60%</p>
                </div>
            </div>
           `
}

const json = getJson()
const list = document.getElementById('list')
list.innerHTML = render(json)

