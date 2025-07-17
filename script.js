'use strict';

let secretNumber = getSecretNumber();
let score = 20;
let highestScore = 0;
let gameEnded = false;

function getSecretNumber() {
  return Math.trunc(Math.random() * 20) + 1;
}

const guessInput = document.querySelector('.guess-input');
const checkButton = document.querySelector('.btn-check');
const message = document.querySelector('.message');
const secretNumberElement = document.querySelector('.mystery-number');
const scoreElement = document.querySelector('.score');
const highscoreElement = document.querySelector('.highscore');
const againButton = document.querySelector('.btn-again');

let guessInputValue;

guessInput.addEventListener('input', getGuessInputValue);
checkButton.addEventListener('click', checkGuessInputValue);
againButton.addEventListener('click', resetStatus);

function getGuessInputValue(event) {
  guessInputValue = Number(event.target.value);
}

function checkGuessInputValue() {
  if (gameEnded) {
    return;
  }
  const isValid =
    guessInputValue !== undefined &&
    !isNaN(guessInputValue) &&
    guessInputValue >= 1 &&
    guessInputValue <= 20;

  message.classList.remove('failed', 'success');
  secretNumberElement.classList.remove('success');

  if (!isValid) {
    message.textContent = '請輸入介於 1 到 20 之間的數字';
    message.classList.add('failed');

    return;
  }

  if (guessInputValue === secretNumber) {
    gameEnded = true;

    message.textContent = '🎉 恭喜你，答對了！';
    message.classList.add('success');
    secretNumberElement.textContent = secretNumber;
    secretNumberElement.classList.add('success');

    if (score > highestScore) {
      highestScore = score;
      highscoreElement.textContent = highestScore;
    }

    return;
  }

  score--;

  if (score < 1) {
    gameEnded = true;

    message.textContent = '💀 你輸了！答案是 ' + secretNumber;
    message.classList.add('failed');
    scoreElement.textContent = 0;
    secretNumberElement.textContent = secretNumber;

    return;
  }

  if (guessInputValue > secretNumber) {
    message.textContent = '📈 太高了！';
  } else {
    message.textContent = '📉 太低了！';
  }

  message.classList.add('failed');
  scoreElement.textContent = score;
}

function resetStatus() {
  gameEnded = false;

  secretNumber = getSecretNumber();
  score = 20;
  guessInputValue = undefined;

  secretNumberElement.textContent = '?';
  secretNumberElement.classList.remove('success');
  message.textContent = '開始猜測吧...';
  message.classList.remove('failed', 'success');
  scoreElement.textContent = score;

  guessInput.value = '';
  guessInput.focus();
}

guessInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    checkGuessInputValue();
  }
});

guessInput.focus();
