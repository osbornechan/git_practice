
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

//Player select colors (Drag and Drop)
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

//Read the row
var currentRowArray = [];

function makeArray () {
    for (var l = 1; l < 5; l++) {
        var selectId = '#r1c' + l;
        console.log('selectId: ' + selectId)
        var currentSlot = document.querySelector(selectId).childNodes;
        console.log('currentRow: ' + currentSlot)
        var readSlot = currentSlot[1].style.backgroundColor;
        console.log('readSlot: ' + readSlot)
        currentRowArray.push(readSlot);
        console.log(currentRowArray)
    }
    checkAnswer();
}

document.querySelector('button').addEventListener('click', makeArray);

//Compare the arrays
function checkAnswer () {
    var tinySlot1 = document.querySelector('#r1tc1');
    var tinySlot2 = document.querySelector('#r1tc2');
    var tinySlot3 = document.querySelector('#r1tc3');
    var tinySlot4 = document.querySelector('#r1tc4');

    for (var m = 0; m < answerCombi.length; m++) {
        for (var n = 0; n < currentRowArray.length; n++) {
            if (m === 0) {
                //Correct color & position
                if (answerCombi[0] === currentRowArray[0]) {
                    tinySlot1.style.backgroundColor = 'black';
                //Correct color but wrong position
                } else if (answerCombi[0] === currentRowArray[n] && answerCombi[0] !== currentRowArray[0]) {
                    tinySlot1.style.backgroundColor = 'grey';
                }
            } else if (m === 1) {
                //Correct color & position
                if (answerCombi[1] === currentRowArray[1]) {
                    tinySlot2.style.backgroundColor = 'black';
                //Correct color but wrong position
                } else if (answerCombi[1] === currentRowArray[n] && answerCombi[1] !== currentRowArray[1]) {
                    tinySlot2.style.backgroundColor = 'grey';
                }
            } else if (m === 2) {
                //Correct color & position
                if (answerCombi[2] === currentRowArray[2]) {
                    tinySlot3.style.backgroundColor = 'black';
                //Correct color but wrong position
                } else if (answerCombi[2] === currentRowArray[n] && answerCombi[2] !== currentRowArray[2]) {
                    tinySlot3.style.backgroundColor = 'grey';
                }
            } else if (m === 3) {
                //Correct color & position
                if (answerCombi[3] === currentRowArray[3]) {
                    tinySlot4.style.backgroundColor = 'black';
                //Correct color but wrong position
                } else if (answerCombi[3] === currentRowArray[n] && answerCombi[3] !== currentRowArray[3]) {
                    tinySlot4.style.backgroundColor = 'grey';
                }
            }
        }
    }
}