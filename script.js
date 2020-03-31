//*********************** GAME BOARD MECHANICS ***********************
var colors = ['red','darkorange','yellow','deepskyblue','limegreen','blueviolet','deeppink','saddlebrown']
var answerCombi = [];

//Change title color
function titleColorChange () {
    var num = Math.floor(Math.random() * 8);
    document.querySelector('span').style.color = colors[num];
}


//Generate a random combination
function randomCombiGenerator () {
    while (answerCombi.length < 4){
        console.log(answerCombi)
        var num = Math.floor(Math.random() * 8);
        var randomColor = colors[num];

        if (!answerCombi.includes(randomColor)) {
            answerCombi.push(randomColor);
        }
    }
    console.log(answerCombi)
}


//Append secret code to answer row
function appendRandomCombi () {
    for (var j = 0; j < answerCombi.length; j++) {
        var answerCircle = '.ac' + j;
        var forEachAnswerCircle = document.querySelector(answerCircle);
        forEachAnswerCircle.style.backgroundColor = answerCombi[j];
    }
}


//Append available colors to player color selection box
function appendColorBox () {
    for (var k = 0; k < colors.length; k++) {
        var colorBoxCircle = '#cbc' + k;
        var forEachColorBoxCircle = document.querySelector(colorBoxCircle);
        forEachColorBoxCircle.style.backgroundColor = colors[k];
    }
}

appendColorBox();

//Only current row can accept drops
function addDropCondition () {
    for (var n = 1; n < 5; n++) {
        var slot = '#r' + (gameTurn+1) + 'c' + n;
        var slotToAddDrop = document.querySelector(slot);
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
    revealButton.style.visibility = 'hidden';
    alert(`You lose. Click 'Restart' to try again.`);
    startToRestart();
    gameTurn = gameTurn - 1;
    endState = true;
}

document.querySelector('.reveal').addEventListener('click', revealAnswer);

//Highlight current row for player to fill
function hightlightCurrentRow () {
    var nextRow = '#r' + (gameTurn + 1);
    var currentRow = '#r' + gameTurn;

    if (gameTurn === 0) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
    } else if (gameTurn === 1) {
        document.querySelector(nextRow).style.backgroundColor = '#f2b632';
        document.querySelector(currentRow).style.backgroundColor = '#b5b5b7';
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
// function disableDraggable2(currentRow){
//     var currentRowCircles = document.querySelectorAll(currentRow + ' .circle.');
//     for(const currentRowCircle of currentRowCircles){
//         currentRowCircle.setAttribute('draggable', 'false');
//     }
// }


// ******************************* PLAYER MOVES ****************************
//Player clicks start
var gameTurn = 0;
var endState = false;
var revealButton = document.querySelector('.reveal');
var checkButton = document.querySelector('.check')
revealButton.disabled = true;
checkButton.disabled = true;

function start () {
    if (gameTurn === 0 && endState === false) {
        titleColorChange();
        hightlightCurrentRow();
        randomCombiGenerator();
        appendRandomCombi();
        addDropCondition ()
        event.target.style.visibility = 'hidden';
        revealButton.disabled = false;
        checkButton.disabled = false;
        gameTurn = 1;
    } else if (endState === true) {
        titleColorChange();
        resetBoard();
        answerCombi = [];
        randomCombiGenerator();
        appendRandomCombi();
        event.target.style.visibility = 'hidden'
        gameTurn = 1;
    }
}

document.querySelector('.start').addEventListener('click', start);


//Player drag and drop colored pegs
var fromBox = false;

function onDragStart (event) {
    event.dataTransfer.setData('text', event.target.id);

    var parentOnDrag = event.target.parentElement;
    if (parentOnDrag.className === 'color-box') {
        fromBox = true;
        var clonePegs = document.getElementById(event.target.id).cloneNode();
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
    // If parent node is not color-box, move the node
    } else {
        event.target.appendChild(document.getElementById(data));
    }
    fromBox = false;
}


//Map occupied rows to current arrays
var currentRowArray = [];
var tinySlotArraySorted = [];

function populateArray () {
    for (var l = 1; l < 5; l++) {
        var slot = '#r' + gameTurn + 'c' + l;
        var currentSlot = document.querySelector(slot).childNodes;
        var readSlot = currentSlot[0].style.backgroundColor;
        currentRowArray.push(readSlot);
    }
}

//Check if all 4 slots are filled
function areAllSlotsFilled () {
    var slot1 = '#r' + gameTurn + 'c1';
    var slot2 = '#r' + gameTurn + 'c2';
    var slot3 = '#r' + gameTurn + 'c3';
    var slot4 = '#r' + gameTurn + 'c4';

    var checkSlots1 = document.querySelector(slot1);
    var checkSlots2 = document.querySelector(slot2);
    var checkSlots3 = document.querySelector(slot3);
    var checkSlots4 = document.querySelector(slot4);

    if (checkSlots1.hasChildNodes() === false || checkSlots2.hasChildNodes() === false || checkSlots3.hasChildNodes() === false || checkSlots4.hasChildNodes() === false) {
        alert('You need at least 4 pegs!');
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
        alert(`You win! Click 'Restart' to try again.`);
        revealAnswer();
        startToRestart();
        gameTurn = gameTurn - 1;
        endState = true;
    } else if (gameTurn === 8) {
        alert(`You lose. Click 'Restart' to try again.`);
        revealAnswer();
        startToRestart();
        gameTurn = gameTurn - 1;
        endState = true;
    }
    clearArrays();
}

//Controls game state
function trackGameState () {
    if (gameTurn === 1) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 2) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 3) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 4) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 5) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 6) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 7) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
        addDropCondition();
        hightlightCurrentRow();
    } else if (gameTurn === 8) {
        areAllSlotsFilled();
        populateArray();
        checkAnswer();
        winOrLose();
    }
    gameTurn++;
}

checkButton.addEventListener('click', trackGameState);

//Hover and highlight

// document.querySelector(`#r${gameTurn+1}c1`).addEventListener('dragenter', function () {event.target.style.border = 'dotted white';})

// document.querySelector(`#r${gameTurn+1}c1`).addEventListener('drop', function () {event.target.style.border = 'none';})


//********************************** END GAME ********************************
//Reset Board
function resetBoard () {
    //Removing all pegs on the board
    var allCircles = document.querySelectorAll('.board');
    for (const circle of allCircles) {
        if (circle.hasChildNodes()) {
            circle.removeChild(circle.childNodes[0]);
        }
    }

    var allTinyCircles = document.querySelectorAll('.tiny-circle');
    for (const tinyCircle of allTinyCircles) {
        tinyCircle.style.backgroundColor = 'transparent';
    }

    //Hiding answer combination
        document.querySelector('.reveal').style.visibility = 'visible';
        document.querySelector('.ac0').style.visibility = 'hidden';
        document.querySelector('.ac1').style.visibility = 'hidden';
        document.querySelector('.ac2').style.visibility = 'hidden';
        document.querySelector('.ac3').style.visibility = 'hidden';

    //Resetting row color
    var allRows = document.querySelectorAll('.row');
    for (const row of allRows) {
        row.style.backgroundColor = '#677077';
    }

    document.querySelector('#answer').style.backgroundColor = '#252839';
    document.querySelector('#r1').style.backgroundColor = '#f2b632';
}

function startToRestart () {
    var restartButton = document.querySelector('.start');
    restartButton.style.visibility = 'visible';
    restartButton.style.backgroundColor = '#677077';
    restartButton.innerText = 'Restart';
}