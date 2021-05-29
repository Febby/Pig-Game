'use strict'

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Set initial score to 0 & hide the dice

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');

//total scores
const scores = [0, 0];
//set player current score to 0 when game starts
let currentScore = 0;

// start with player 1 or 0
let activePlayer = 0;


// functionalities

// Roll the dice

const rollDice = function (){
    // generate a random roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);

    // display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `img/dice-${dice}.png`;


    // check for rolled result if true, switch to next player
    if (dice !== 1){
        // add dice to current score
        currentScore += dice;
        // determine the active player and set the current score
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        // current0Element.textContent = currentScore; // need to change later
    } else{
        // switch to next player
        document.getElementById(`current--${activePlayer}`).textContent = currentScore
        // set the current score to 0
        currentScore = 0;
        // ternary: if the active player is 0 (player 1) the change to 1 (player 2);
        activePlayer = activePlayer === 0 ? 1 : 0;
        
        //remove the current active class and switch it to other player
        player0Element.classList.toggle('player--active');
        player1Element.classList.toggle('player--active');

        //Add the current active class to the other player

    }
}

btnRoll.addEventListener('click', rollDice);