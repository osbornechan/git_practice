
var colors = ['red','orange','yellow','blue','green','purple','pink','brown']
var answerCombi = [];

//*****Look into condition when it's 3 size array
//Generate a random combination
function randomCombiGenerator () {
    for (var i = 0; i < colors.length; i++) {
        var num = Math.floor(Math.random() * 8);
        var randomColor = colors[num];
        //No duplicates in answerCombi - ADD CHECK BOX TO SELECT DUPLICATES, ADD BUTTON TO REVEAL ANSWER
        if (!answerCombi.includes(randomColor) && answerCombi.length < 4) {
            answerCombi.push(randomColor);
        }
    }
}

randomCombiGenerator();

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
        var colorBoxCircles = document.querySelector(colorBoxCircle);
        colorBoxCircles.style.backgroundColor = colors[k];
    }
}

appendColorBox();

//Player select colors (Drag and Drop)
function onDragStart (event) {
    event.dataTransfer.setData('text', event.target.id);
    event.dataTransfer.effectAllowed = 'copy'; // WHY DOES THIS NOT WORK????
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


var currentRowArray = [];
var tinySlotArraySorted = [];
var gameTurn = 1;

//Map game row to currentRowArray
function populateArray () {
    for (var l = 1; l < 5; l++) {
        var selectId = '#r' + gameTurn + 'c' + l;
        var currentSlot = document.querySelector(selectId).childNodes;
        var readSlot = currentSlot[1].style.backgroundColor;
        currentRowArray.push(readSlot);
    }
}

//Compare the arrays
function checkAnswer () {
    var tinySlotArray = [];

    for (var m = 0; m < answerCombi.length; m++) {
        if (m === 0) {
            //Correct color & position
            if (answerCombi[0] === currentRowArray[0]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[0] === currentRowArray[1] || answerCombi[0] === currentRowArray[2] || answerCombi[0] === currentRowArray[3]) {
                tinySlotArray.push('grey');
            }
        } else if (m === 1) {
            //Correct color & position
            if (answerCombi[1] === currentRowArray[1]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[1] === currentRowArray[0] || answerCombi[1] === currentRowArray[2] || answerCombi[1] === currentRowArray[3]) {
                tinySlotArray.push('grey');
            }
        } else if (m === 2) {
            //Correct color & position
            if (answerCombi[2] === currentRowArray[2]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[2] === currentRowArray[0] || answerCombi[2] === currentRowArray[1] || answerCombi[2] === currentRowArray[3]) {
                tinySlotArray.push('grey');
            }
        } else if (m === 3) {
            //Correct color & position
            if (answerCombi[3] === currentRowArray[3]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[3] === currentRowArray[0] || answerCombi[3] === currentRowArray[1] || answerCombi[3] === currentRowArray[2]) {
                tinySlotArray.push('grey');
            }
        }
    }

    tinySlotArraySorted = tinySlotArray.sort()

    var slot1 = '#r' + gameTurn + 'tc1';
    var slot2 = '#r' + gameTurn + 'tc2';
    var slot3 = '#r' + gameTurn + 'tc3';
    var slot4 = '#r' + gameTurn + 'tc4';

    var tinySlot1 = document.querySelector(slot1);
    var tinySlot2 = document.querySelector(slot2);
    var tinySlot3 = document.querySelector(slot3);
    var tinySlot4 = document.querySelector(slot4);

    tinySlot1.style.backgroundColor = tinySlotArraySorted[0];
    tinySlot2.style.backgroundColor = tinySlotArraySorted[1];
    tinySlot3.style.backgroundColor = tinySlotArraySorted[2];
    tinySlot4.style.backgroundColor = tinySlotArraySorted[3];
}

//Clear arrays for next row
function clearArrays () {
    for (var p = 0; p < 4; p++) {
        currentRowArray.pop();
        tinySlotArraySorted.pop();
    }
}

//Check the 4 tiny slots for win condition
function winOrLose () {
    if (tinySlotArraySorted[0] === 'black' && tinySlotArraySorted[1] === 'black' && tinySlotArraySorted[2] === 'black' && tinySlotArraySorted[3] === 'black') {
        alert('You win!');
    } else if (gameTurn === 8) {
        alert('You lose!');
    }

    clearArrays();
}

function trackGameState () {
    if (gameTurn === 1) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 2) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 3) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 4) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 5) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 6) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 7) {
        populateArray();
        checkAnswer();
        winOrLose();
    } else if (gameTurn === 8) {
        populateArray();
        checkAnswer();
        winOrLose();
    }
    gameTurn++;
}

document.querySelector('button').addEventListener('click', trackGameState);

//Recreate selected pegs
var colorBox = document.querySelector('.color-box');

function cloneSelectedPegs () {
    var clonedPeg = document.createElement('div');
    clonedPeg.classList.add('circle-box');
    clonedPeg.id = event.target.id + event.target.id;
    clonedPeg.style.backgroundColor = event.target.style.backgroundColor;
    clonedPeg.draggable = 'true';
    clonedPeg.setAttribute('ondragstart', 'onDragStart(event)')
    colorBox.appendChild(clonedPeg);
}

colorBox.addEventListener('dragstart', cloneSelectedPegs);