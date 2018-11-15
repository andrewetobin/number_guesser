var randomNumber = Math.floor(Math.random() * 100) + 1;
var lowOrHi = document.querySelector('.lowOrHi');
var guessSubmit = document.querySelector('#guessSubmit');
var guessField = document.querySelector('.guessField');
var guesses = document.querySelector('.guesses');
var resetButton = document.querySelector('#resetButton');
var clearButton = document.querySelector('#clearButton');
var minField = document.querySelector('#minField');
var maxField = document.querySelector('#maxField');
var rangeButton = document.querySelector('#rangeSubmit');
var result = false;
var min;
var max;

rangeButton.addEventListener('click', setRange);
guessSubmit.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', buttonDisabler);

function setRange() {
    min = Number(minField.value);
    max = Number(maxField.value);
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    alert("The new range is between " + min + " and " + max + "." + " Please submit your guess:");
}

function checkGuess() {
    var userGuess = Number(guessField.value);

    if (userGuess === randomNumber) {
        lowOrHi.textContent = 'BOOM!';
        setGameOver();
    }  else if(isNaN(userGuess)) {
        alert("That is not a valid number");
        guessField.value = '';
        return;
    }  else if(userGuess > max || userGuess < min) {
        alert(userGuess + " is not within the accepted range, please pick a number between " + min + " and " + max);
        guessField.value = '';
        return;
    }  else if(userGuess < randomNumber) {
        lowOrHi.textContent = 'That is too low';
    }  else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'That is too high';
    }

    document.querySelector('#resetButton').disabled = false;

    guesses.innerHTML = "<p>Your last guess was</p><h3>" + userGuess + "</h3>";
    guessField.value = '';
    guessField.focus();
}

function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;
    clearButton.disabled = true;
    resetButton.value = "Next Level";
    result = true;
  }

function resetGame() {
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }

    guessField.disabled = false;
    guessSubmit.disabled = false;
    rangeButton.disabled = false;

    guessField.value = '';
    guesses.innerHTML = '';
    guessField.focus();

    if (result === true) {
        min = min - 10;
        max = max + 10;
        minField.value = min;
        maxField.value = max;
        setRange();
        result = false;
    } else {
        minField.value = 0;
        maxField.value = 100;
        setRange();
    }

    resetButton.value = "Reset";
}

function buttonEnabler() {
    clearButton.disabled = false;
}

function buttonDisabler() {
    resetButton.disabled = true;
    clearButton.disabled = true;
}
