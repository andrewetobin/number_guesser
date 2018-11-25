// Create a random number from 1-100
var randomNumber = Math.floor(Math.random() * 100) + 1;
/* Sets up variables that return the first
    element that matches the CSS class that's set as an argument
*/
var lowOrHi = document.querySelector('.lowOrHi');
var guessSubmit = document.querySelector('#guessSubmit');
var guessField = document.querySelector('.guessField');
var guesses = document.querySelector('.guesses');
var resetButton = document.querySelector('#resetButton');
var clearButton = document.querySelector('#clearButton');
var minField = document.querySelector('#minField');
var maxField = document.querySelector('#maxField');
var rangeButton = document.querySelector('#rangeSubmit');
// Sets up a variable "result" to false for logic in resetGame function
var result = false;
//sets up variables that will later be defined
var min;
var max;

// Sets up event listeners for buttons so when clicked, the specified function will be executed.
rangeButton.addEventListener('click', setRange);
guessSubmit.addEventListener('click', checkGuess);
resetButton.addEventListener('click', resetGame);
resetButton.addEventListener('click', buttonDisabler);

// Defines function "setRange"
function setRange() {
// Sets up variables from input of min and max forms
    min = Number(minField.value);
    max = Number(maxField.value);
// Creates a random number from on min and max variables
    randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
// Displays an alert for user
    alert("The new range is between " + min + " and " + max + "." + " Please submit your guess:");
}

// Defines function called "checkGuess"
function checkGuess() {
// Sets up variable from input in guessField form
    var userGuess = Number(guessField.value);
// Checks to see if  user guessed correct number
    if (userGuess === randomNumber) {
// Send text telling user they guessed correctly.
        lowOrHi.textContent = 'BOOM!';
// Runs "setGameOver" function
        setGameOver();
// Checks if user's guess is a number
    }  else if(isNaN(userGuess)) {
// alerts user that a number wasn't entered
        alert("That is not a valid number");
// resets the guess field
        guessField.value = '';
        return;
// checks if user's guess is out of range
    }  else if(userGuess > max || userGuess < min) {
// alerts user of valid range
        alert(userGuess + " is not within the accepted range, please pick a number between " + min + " and " + max);
// resets guess field
        guessField.value = '';
        return;
// Checks user's guess to see if is lower or higher than the random number then sends text to let user know
    }  else if(userGuess < randomNumber) {
        lowOrHi.textContent = 'That is too low';
    }  else if(userGuess > randomNumber) {
        lowOrHi.textContent = 'That is too high';
    }

//  disables reset button
    document.querySelector('#resetButton').disabled = false;
// changes HTML to report user's last guess
    guesses.innerHTML = "<p>Your last guess was</p><h3>" + userGuess + "</h3>";
// clears guess field
    guessField.value = '';
// puts the focus on the guess field
    guessField.focus();
}

// Defines function "setGameOver"
function setGameOver() {
// disables buttons
    guessField.disabled = true;
    guessSubmit.disabled = true;
    clearButton.disabled = true;
// Changes button text
    resetButton.value = "Next Level";
// sets result to true for resetGame function logic
    result = true;
  }

// Defines function "resetGame"
function resetGame() {
// Clears all the information from resultParas div
    var resetParas = document.querySelectorAll('.resultParas p');
    for (var i = 0 ; i < resetParas.length ; i++) {
        resetParas[i].textContent = '';
    }
// disables buttons
    guessField.disabled = false;
    guessSubmit.disabled = false;
    rangeButton.disabled = false;
// clears fields and puts guess field in focus
    guessField.value = '';
    guesses.innerHTML = '';
    guessField.focus();
// If the user guesses correctly the next round will increase the range
    if (result === true) {
        min = minField.value - 10;
        max = Number(maxField.value) + 10;
// Sets the value of the fields to the new min and max
        minField.value = min;
        maxField.value = max;
// Calls setRange function
        setRange();
// Sets result to false for resetGame function logic
        result = false;
    } else {
        minField.value = 0;
        maxField.value = 100;
// Calls setRange function
        setRange();
    }
// Change button text back to Reset
    resetButton.value = "Reset";
}
// function that disables buttons
function buttonEnabler() {
    clearButton.disabled = false;
}
// function that enables buttons
function buttonDisabler() {
    resetButton.disabled = true;
    clearButton.disabled = true;
}
