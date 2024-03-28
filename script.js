'use strict';

const playerElement0 = document.querySelector('.player--0');
const playerElement1 = document.querySelector('.player--1');

const scoreElement0 = document.getElementById('score--0');
const scoreElement1 = document.getElementById('score--1');

const currentScoreElement0 = document.getElementById('current--0');
const currentScoreElement1 = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');

const newBtn = document.querySelector('.btn--new');
const holdBtn = document.querySelector('.btn--hold');
const rollBtn = document.querySelector('.btn--roll');

let activePlayer, currentScore, scores;

const initialStageOfGame = function () {
  activePlayer = 0;
  currentScore = 0;
  scores = [0, 0];

  scoreElement0.textContent = 0;
  scoreElement1.textContent = 0;
  currentScoreElement0.textContent = 0;
  currentScoreElement1.textContent = 0;

  diceElement.classList.add('hidden');
  playerElement0.classList.remove('player--winner');
  playerElement1.classList.remove('player--winner');
  rollBtn.classList.remove('hidden');
  holdBtn.classList.remove('hidden');
  playerElement1.classList.remove('player--active');
  playerElement0.classList.add('player--active');
};
initialStageOfGame();

const playerChangeFunc = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerElement0.classList.toggle('player--active');
  playerElement1.classList.toggle('player--active');
};

rollBtn.addEventListener('click', function () {
  const dice = Math.floor(Math.random() * 6 + 1);
  diceElement.classList.remove('hidden');
  diceElement.src = `dice-${dice}.png`;
  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    playerChangeFunc();
  }
});

holdBtn.addEventListener('click', function () {
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
  if (scores[activePlayer] >= 20) {
    console.log('hi');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    rollBtn.classList.add('hidden');
    holdBtn.classList.add('hidden');
    diceElement.classList.add('hidden');
  } else {
    playerChangeFunc();
  }
});

newBtn.addEventListener('click', initialStageOfGame);
