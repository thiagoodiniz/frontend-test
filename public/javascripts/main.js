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
                <li class="list-item" onmouseover="hoverItemList(this, ${item.positive}, ${item.negative})" onmouseout="removeArrow()" id="${item.__id}">
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

function hoverItemList(element, positive, negative){
    let percents = calculatePercentage(positive, negative);
    let arrow = document.getElementById('arrow');
    arrow.innerHTML = renderArrowPercents(percents);
    arrow.style.display = 'block';
}

function removeArrow(){
    document.getElementById('arrow').style.display = 'none';
}

function calculatePercentage(positive, negative){
    let total = positive + negative;
    positive = Math.round((positive / total) * 100);
    negative = Math.round((negative / total) * 100);
    return {positive, negative} 
}

function renderArrowPercents(percents){
    return  `
            <div class="into-arrow">
                <p class="p1">Gostam</p>
                <p class="p2">Não Gostam</p>
                <div class="percent-one">
                    <p>${percents.positive}%</p>
                </div>
                <div class="percent-two">
                    <p>${percents.negative}%</p>
                </div>
            </div>
           `
}

const json = getJson()
const list = document.getElementById('list')
list.innerHTML = render(json)

