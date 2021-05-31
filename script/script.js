'use strict';

// Selecting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const player0Name = document.getElementById('name--0');
const player1Name = document.getElementById('name--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');
const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//modal elements
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnShowModal = document.querySelector('.btn--info');

//definite empty values for these variables
let scores, currentScore, activePlayer, playing;

// functionalities

//Init/Reset game

const newGame = function () {
  // console.log("New game initialized");
  //total scores
  scores = [0, 0];
  //set player current score to 0 when game starts
  currentScore = 0;

  // start with player 1 or 0
  activePlayer = 0;

  // game playing state
  playing = true;
  // Set initial score to 0 & hide the dice

  // Reset scores to 0
  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');
  player0Name.textContent = 'Player 1';
  player1Name.textContent = 'Player 2';
  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');
};

//Initialize game
newGame();

// Switch player

const switchPlayer = function () {
  // switch to next player
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  // set the current score to 0
  currentScore = 0;
  // ternary: if the active player is 0 (player 1) the change to 1 (player 2);
  activePlayer = activePlayer === 0 ? 1 : 0;

  //remove the current active class and switch it to other player
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');

  //Add the current active class to the other player
};
// Roll the dice

const rollDice = function () {
  // generate a random roll
  const dice = Math.trunc(Math.random() * 6) + 1;

  // display dice
  diceElement.classList.remove('hidden');
  diceElement.src = `img/dice-${dice}.png`;

  // check for rolled result if true, switch to next player
  if (dice !== 1) {
    // add dice to current score
    currentScore += dice;
    // determine the active player and set the current score
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    // current0Element.textContent = currentScore; // need to change later
  } else {
    switchPlayer();
  }
};

// Hold the current score

const holdScore = function () {
  // add current score to active player score
  // scores[1] = scores[1] + currentScore
  scores[activePlayer] += currentScore;
  console.log(scores[activePlayer]);
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  // check if the total score greater or equal than 100

  if (scores[activePlayer] >= 100) {
    // finish the game
    playing = false;
    diceElement.classList.add('hidden');
    document.getElementById(`name--${activePlayer}`).textContent = `Winner`;
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    // switch player
    switchPlayer();
  }
};

//Modal functionalities
const showModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const hideModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    rollDice();
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    holdScore();
  }
});

btnNewGame.addEventListener('click', newGame);

btnShowModal.addEventListener('click', showModal);

btnCloseModal.addEventListener('click', hideModal);

overlay.addEventListener('click', hideModal);

document.addEventListener('keydown', function (e) {
  // Check if the Escape key was pressed then proceed
  // & check if the modal does not have the hidden class
  // if both condition are true then invoke hideModal function
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    hideModal();
  }
});
