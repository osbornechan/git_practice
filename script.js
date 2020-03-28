
var colors = ['red','orange','yellow','blue','green','purple','pink','brown']
var answerCombi = [];

//*****Look into condition when it's 3 size array
//Generate a random combination
function randomCombiGenerator () {
    for (var i = 0; i < colors.length; i++) {
        var num = Math.floor(Math.random() * 8);
        var randomColor = colors[num];

        if (!answerCombi.includes(randomColor) && answerCombi.length < 4) {
            answerCombi.push(randomColor);
        }
    }
}

var start = document.querySelector('body');
randomCombiGenerator();
//start.addEventListener("click", randomCombiGenerator)
///***** change this to another event listener*****

//Append winning combination to solution row
function appendRandomCombi () {
    for (var j = 0; j < answerCombi.length; j++) {
        var rowCircle = '.ac' + j;
        var answerCircle = document.querySelector(rowCircle);
        answerCircle.style.backgroundColor = answerCombi[j];
    }
}

appendRandomCombi();

//Append available colors to player color selection box
function appendColorBox () {
    for (var k = 0; k < colors.length; k++) {
        var colorBoxCircle = '#cbc' + k;
        var colorBox = document.querySelector(colorBoxCircle);
        colorBox.style.backgroundColor = colors[k];
    }
}

appendColorBox();

//Player select slot and color


//Drag and Drop
function onDragStart (event) {
    event.dataTransfer.setData('text', event.target.id);
    event.dataTransfer.effectAllowed = "copy";
}

function onDragOver (event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
}

function onDrop (event) {
    event.preventDefault();
    var data = event.dataTransfer.getData('text');
    event.target.appendChild(document.getElementById(data));
}