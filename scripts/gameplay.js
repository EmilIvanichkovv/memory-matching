database = window.localStorage;
const level16 = 16;
const level36 = 36;
const level64 = 64;
var selectedLevel = NaN;

const startButton = document.getElementById("start-game");
const level16Button = document.getElementById("lvl16-button");
const level36Button = document.getElementById("lvl36-button");
const level64Button = document.getElementById("lvl64-button");
const restartButton = document.getElementById("restart-game");

const gameField = document.getElementById("memory-game");
const afterFinishBoard = document.getElementById("after-finish");
var welcomeText = document.getElementById("wellcoming");
welcomeText.textContent += " " + database.getItem("currentUser") + "?";
var resultTimeMessage = document.getElementById("result-time");

function selectLevel(level, event, button) {
  event.preventDefault();
  const itemParent = button.parentElement.parentElement;
  console.log(itemParent);
  selectedLevel = level;
  itemParent.classList.add("hide");
  startButton.parentElement.classList.remove("hide");
}
level16Button.addEventListener("click", (event) => {
  selectLevel(level16, event, level16Button);
});
level36Button.addEventListener("click", (event) => {
  selectLevel(level36, event, level36Button);
});
level64Button.addEventListener("click", (event) => {
  selectLevel(level64, event, level64Button);
});

startButton.addEventListener("click", (event) => {
  event.preventDefault();
  const itemParent = startButton.parentElement;
  itemParent.classList.add("hide");
  gameField.classList.remove("hide");
  interval = setInterval(startTimer, 10);
  gameplay();
});

function prepareBoard() {
  loadAllCards(selectedLevel);
  const cardsOnBoard = document.querySelectorAll(
    `.memory-card-${selectedLevel}`
  );

  (function shuffleCards() {
    cardsOnBoard.forEach((card) => {
      let randomPos = Math.floor(Math.random() * level16);
      card.style.order = randomPos;
    });
  })();

  return cardsOnBoard;
}

function gameplay() {
  const cards = prepareBoard();
  let flippedCards = 0;
  let hasFlippedCard = false;
  let boardLock = false;
  let firstCard, secondCard;

  function flipCard() {
    if (boardLock) return;
    if (this == firstCard) return;
    this.classList.add("flip");

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;

      return;
    }
    secondCard = this;
    areMatching();
    if (flippedCards === gameLevel / 2) {
      gameField.classList.add("finished-game");
      afterFinishBoard.classList.remove("hide");
      clearInterval(interval);
      const currenTime = seconds + ":" + tens;
      resultTimeMessage.textContent += " " + currenTime;
    }
  }

  function unflipCards() {
    boardLock = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");

      resetBoard();
    }, 1000);
  }

  function areMatching() {
    let isMatch =
      firstCard.dataset.socialmedia === secondCard.dataset.socialmedia;
    if (isMatch) {
      disableMatchingCards();
      flippedCards = flippedCards + 1;
    } else {
      unflipCards();
    }
  }

  function disableMatchingCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
  }

  function resetBoard() {
    hasFlippedCard = false;
    boardLock = false;
    firstCard = null;
    secondCard = null;
  }

  function restartGame() {
    event.preventDefault();
    location.reload();
  }

  cards.forEach((card) => card.addEventListener("click", flipCard));
  restartButton.addEventListener("click", restartGame);
}

// TIMER UTILS
var interval;
var seconds = 00;
var tens = 00;
var timerSeconds = document.getElementById("seconds");
var timerTens = document.getElementById("tens");

function startTimer() {
  tens++;

  if (tens < 9) timerTens.innerHTML = "0" + tens;
  if (tens > 9) timerTens.innerHTML = tens;
  if (tens > 99) {
    tens = 0;
    seconds++;
    timerSeconds.innerHTML = "0" + seconds;
    timerTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) timerSeconds.innerHTML = seconds;
}
