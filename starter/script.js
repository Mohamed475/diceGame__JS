'use strict';

// ALL USED VARs
const score0El = document.querySelector('#score--0'),
  score1El = document.querySelector('#score--1'),
  currentDiceValue0 = document.querySelector('#current--0'),
  currentDiceValue1 = document.querySelector('#current--1'),
  player0El = document.querySelector('.player--0'),
  player1El = document.querySelector('.player--1'),
  dice = document.querySelector('.dice'),
  newBtn = document.querySelector('.btn--new'),
  rollBtn = document.querySelector('.btn--roll'),
  holdBtn = document.querySelector('.btn--hold');

// SET INITIAL VALUES
score0El.textContent = score1El.textContent = 0;
dice.classList.add('hidden');
const winScore = 50;

// SWITCH PLAYER FUNCs
function switchToPlayer2() {
  player0El.classList.remove('player--active');
  player1El.classList.add('player--active');
}

function switchToPlayer1() {
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
}

// DIC ROLLING FUNC
function diceRollingFunc() {
  if (
    Number(score0El.textContent) < winScore &&
    Number(score1El.textContent) < winScore
  ) {
    // GUESS RANDOM NUM FORM 1 TO 6 IN EVERY CLICK ON ROLL BTN AND DISPLAY HIDDEN DICE
    const randomNum = Math.trunc(Math.random() * 6) + 1;
    dice.classList.remove('hidden');

    // PLAYER 1 FUNCTIONALITY
    if (player0El.classList.contains('player--active')) {
      // SET THE SUITIBLE DICE IMG ACCORDING TO CREATED RANDOM NUM
      dice.src = `dice-${randomNum}.png`;

      // DICE NOT EQUALS TO 1 BEHVIOR
      if (randomNum !== 1) {
        currentDiceValue0.textContent =
          Number(currentDiceValue0.textContent) + randomNum;

        // DICE EQULS TO 1 BEHVIOR - SWITCH THE PLAYER TO ANOTHER ONE
      } else {
        currentDiceValue0.textContent = 0;
        switchToPlayer2();
      }

      // PLAYER 2 FUNCTIONALITY
    } else {
      // SET THE SUITIBLE DICE IMG ACCORDING TO CREATED RANDOM NUM
      dice.src = `dice-${randomNum}.png`;

      // DICE NOT EQUALS TO 1 BEHVIOR
      if (randomNum !== 1) {
        currentDiceValue1.textContent =
          Number(currentDiceValue1.textContent) + randomNum;

        // DICE EQULS TO 1 BEHVIOR - SWITCH THE PLAYER TO ANOTHER ONE
      } else {
        currentDiceValue1.textContent = 0;
        switchToPlayer1();
      }
    }
  } else {
    dice.classList.add('hidden');
  }
}

// HOLD BTN FUNC
function holdBtnFunc() {
  // FOR PLAYER-1
  if (player0El.classList.contains('player--active')) {
    // HOLD THE VALUE ON PLAYER-1 TOTAL SCORE
    score0El.textContent =
      Number(score0El.textContent) + +currentDiceValue0.textContent;

    // PLAYER WIN ACTION
    if (Number(score0El.textContent) >= winScore) {
      player0El.classList.add('player--winner');

      // SWITCH PLAYER
    } else {
      switchToPlayer2();
    }

    // RESET THE CURRENT VALUE TO 0
    currentDiceValue0.textContent = 0;

    // FOR PLAYER-2
  } else {
    // HOLD THE VALUE ON PLAYER-2 TOTAL SCORE
    score1El.textContent =
      Number(score1El.textContent) + +currentDiceValue1.textContent;

    // PLAYER WIN ACTION
    if (Number(score1El.textContent) >= winScore) {
      player1El.classList.add('player--winner');

      // SWITCH PLAYER
    } else {
      switchToPlayer1();
    }

    // RESET THE CURRENT VALUE TO 0
    currentDiceValue1.textContent = 0;
  }
}

// RESET FUNC
function gameRestart() {
  if (player0El.classList.contains('player--winner')) {
    player0El.classList.remove('player--winner');
  } else {
    player1El.classList.remove('player--winner');
  }
  score1El.textContent = 0;
  score0El.textContent = 0;
  dice.classList.add('hidden');
}

// THE DICE ROLL BTN CLICK ACTION
rollBtn.addEventListener('click', diceRollingFunc);

// THE HOLD BTN CLICK ACTION
holdBtn.addEventListener('click', holdBtnFunc);

// RESET ALL GAME DATA
newBtn.addEventListener('click', gameRestart);
