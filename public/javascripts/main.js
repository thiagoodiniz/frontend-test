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
    let elementPosition = getElementPosition(element.id);
    let arrow = document.getElementById('arrow');
    if(positive){
        arrow.innerHTML = renderArrowPercents(percents);
        arrow.style.top = `${elementPosition.top + 10}px`;
        arrow.style.left = `${elementPosition.left + 365}px`;
        arrow.style.display = 'block';
    }
}

function removeArrow(){
    document.getElementById('arrow').style.display = 'none';
}

function getElementPosition(elemID){
    var offsetTrail = document.getElementById(elemID);
    var offsetLeft = 0;
    var offsetTop = 0;
    while (offsetTrail) {
        offsetLeft += offsetTrail.offsetLeft;
        offsetTop += offsetTrail.offsetTop;
        offsetTrail = offsetTrail.offsetParent;
    }
    return {left:offsetLeft, top:offsetTop};
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

function setDataPercentage(data){
    data.map(item => item.percentage = calculatePercentage(item.positive, item.negative))
    return data;
}

const json = getJson()
let data = setDataPercentage(json.data);
data.sort((a,b) => b.percentage.positive - a.percentage.positive)
const list = document.getElementById('list')
list.innerHTML = render(json)

