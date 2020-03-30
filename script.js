//*********************** GAME BOARD MECHANICS ***********************
var colors = ['red','orange','yellow','blue','green','purple','pink','brown']
var answerCombi = [];

//Generate a random combination
function randomCombiGenerator () {
    while (answerCombi.length < 4){
        var num = Math.floor(Math.random() * 8);
        var randomColor = colors[num];

        if (!answerCombi.includes(randomColor)) {
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

//Restrict droppable access to current row
function addDropCondition () {
    for (var n = 1; n < 5; n++) {
        var slots = '#r' + (gameTurn+1) + 'c' + n;
        var slotToAddDrop = document.querySelector(slots);
        slotToAddDrop.setAttribute('ondrop', 'onDrop(event)');
        slotToAddDrop.setAttribute('ondragover', 'onDragOver(event)');
    }
}

//Button to reveal answer combination
function revealAnswer () {
    var answers = document.querySelectorAll('#answer .circle');
    for (var p = 0; p < answers.length; p++) {
        answers[p].style.visibility = 'visible';
    }

    var revealButton = document.querySelector('.reveal');
    revealButton.style.visibility = 'hidden';
}

document.querySelector('.reveal').addEventListener('click', revealAnswer);

//Highlight current row for player to fill
function hightlightCurrentRow () {
    var nextRow = '#r' + (gameTurn + 1);
    var currentRow = '#r' + gameTurn;

    if (gameTurn === 1) {
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
    } else if (gameTurn === 2) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    } else if (gameTurn === 3) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    } else if (gameTurn === 4) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    } else if (gameTurn === 5) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    } else if (gameTurn === 6) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    } else if (gameTurn === 7) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    } else if (gameTurn === 8) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
    }
}

//Make pegs in used rows undraggable
function disableDraggable () {
    for (var q = 0; q < 4; q++) {
        var circles = '#r' + gameTurn + 'c' + (q + 1);
        console.log(circles)
        var selectPegs = document.querySelector(circles).childNodes;

        if (gameTurn === 1) {
            selectPegs[1].setAttribute('draggable', 'false');
        } else {
            selectPegs[0].setAttribute('draggable', 'false');
        }
    }
}

// ******************************* PLAYER MOVES ****************************
//Player drag and drop colored pegs

var fromBox = false;

function onDragStart (event) {
    event.dataTransfer.setData('text', event.target.id);

    var parentOnDrag = event.target.parentElement;

    if (parentOnDrag.className === 'color-box') {
        fromBox = true;
        var clonePegs = document.getElementById(event.target.id).cloneNode();
        console.log('drag start: ' + clonePegs)
    }
}

function onDragOver (event) {
    event.preventDefault();
}

function onDrop (event) {
    event.preventDefault();

    var data = event.dataTransfer.getData('text');

    //If parent node is color-box, clone the node
    if (fromBox === true) {
        var clonePegs = document.getElementById(data).cloneNode();
        event.target.appendChild(clonePegs);
        console.log('on drop clone: ' + clonePegs)
    // If parent node is not color-box, move the node
    } else {
        event.target.appendChild(document.getElementById(data));
        console.log('on drop move: ' + document.getElementById(data))
    }
    fromBox = false;
}

//Map occupied rows to current arrays
var currentRowArray = [];
var tinySlotArraySorted = [];
var gameTurn = 1;

function populateArray () {
    for (var l = 1; l < 5; l++) {
            var selectId = '#r' + gameTurn + 'c' + l;
            var currentSlot = document.querySelector(selectId).childNodes;

        if (gameTurn === 1) {
            var readSlot = currentSlot[1].style.backgroundColor;
        } else { //Returns a Nodelist that has only 1 element
            var readSlot = currentSlot[0].style.backgroundColor;
        }
        currentRowArray.push(readSlot);
    }
}

//Compare the player's combination with the answer combination
function checkAnswer () {
    var tinySlotArray = [];

    for (var m = 0; m < answerCombi.length; m++) {
        if (m === 0) {
            //Correct color & position
            if (answerCombi[0] === currentRowArray[0]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[0] === currentRowArray[1] || answerCombi[0] === currentRowArray[2] || answerCombi[0] === currentRowArray[3]) {
                tinySlotArray.push('white');
            }
        } else if (m === 1) {
            //Correct color & position
            if (answerCombi[1] === currentRowArray[1]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[1] === currentRowArray[0] || answerCombi[1] === currentRowArray[2] || answerCombi[1] === currentRowArray[3]) {
                tinySlotArray.push('white');
            }
        } else if (m === 2) {
            //Correct color & position
            if (answerCombi[2] === currentRowArray[2]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[2] === currentRowArray[0] || answerCombi[2] === currentRowArray[1] || answerCombi[2] === currentRowArray[3]) {
                tinySlotArray.push('white');
            }
        } else if (m === 3) {
            //Correct color & position
            if (answerCombi[3] === currentRowArray[3]) {
                tinySlotArray.push('black');
            //Correct color but wrong position
            } else if (answerCombi[3] === currentRowArray[0] || answerCombi[3] === currentRowArray[1] || answerCombi[3] === currentRowArray[2]) {
                tinySlotArray.push('white');
            }
        }
    }

    //Populate the 4 tiny slots in order of black to white
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

//Clear the player's arrays for next round
function clearArrays () {
    for (var p = 0; p < 4; p++) {
        currentRowArray.pop();
        tinySlotArraySorted.pop();
    }
}

//Check the 4 tiny slots to determine win condition
var answerRow = document.querySelector('#answer');

function winOrLose () {
    if (tinySlotArraySorted[0] === 'black' && tinySlotArraySorted[1] === 'black' && tinySlotArraySorted[2] === 'black' && tinySlotArraySorted[3] === 'black') {
        alert('You win!');
        revealAnswer();
    } else if (gameTurn === 8) {
        alert('You lose!');
        revealAnswer();
    }
    clearArrays();
}

//Controls game state
function trackGameState () {
    if (gameTurn === 1) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 2) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 3) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 4) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 5) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 6) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 7) {
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
        disableDraggable();
    } else if (gameTurn === 8) {
        populateArray();
        checkAnswer();
        winOrLose();
    }
    gameTurn++;
}

document.querySelector('.check').addEventListener('click', trackGameState);