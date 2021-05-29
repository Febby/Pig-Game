'use strict'

// Selecting elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const diceElement = document.querySelector('.dice');

// Set initial score to 0 & hide the dice

score0Element.textContent = 0;
score1Element.textContent = 0;
diceElement.classList.add('hidden');