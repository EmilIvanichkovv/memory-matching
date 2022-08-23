// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  child,
  get,
  ref,
  push,
  set,
  update,
} from "https://www.gstatic.com/firebasejs/9.9.3/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCiugbpO2Tid9-9SGS8zw0_PW2obxlPFA0",
  authDomain: "memorymatchinggame.firebaseapp.com",
  projectId: "memorymatchinggame",
  storageBucket: "memorymatchinggame.appspot.com",
  messagingSenderId: "495458129080",
  appId: "1:495458129080:web:64279c6b1841698122904d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Get result data for some username
async function getUserResultByUsername(level, username) {
  const dbRef = ref(database);
  const temp = await get(child(dbRef, `leaderboard${level}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        for (var resultId in snapshot.val()) {
          if (snapshot.val()[resultId].username === username) {
            return { id: resultId, value: snapshot.val()[resultId] };
          }
        }
        return false;
      } else {
        console.log("There is no data for 'leaderboard'");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return temp;
}

// Write current user result to the database
function writeUserResultData(level, username, seconds, tens, flips) {
  const userResultRef = push(ref(database, `leaderboard${level}/`));
  const userResultId = userResultRef.key;
  set(ref(database, `leaderboard${level}/` + userResultId), {
    username: username,
    seconds: seconds,
    tens: tens,
    flips: flips,
  })
    .then(() => {})
    .catch((error) => {});
  return userResultRef.key;
}

function writeUserResultIfBetter(level, username, seconds, tens, flips) {
  const prevUserResult = getUserResultByUsername(level, username).then(
    function (result) {
      if (result != false) {
        if (
          seconds < result.value.seconds ||
          (seconds == result.value.seconds && tens < result.value.tens)
        ) {
          const updateResult = {};
          updateResult["leaderboard/" + result.id] = {
            username: username,
            seconds: seconds,
            tens: tens,
            flips: flips,
          };
          update(ref(database), updateResult);
        }
      } else {
        writeUserResultData(level, username, seconds, tens, flips);
      }
    }
  );
}

const level16 = 16;
const level36 = 36;
const level64 = 64;
var selectedLevel = NaN;

const startButton = document.getElementById("start-game");
const level16Button = document.getElementById("lvl16-button");
const level36Button = document.getElementById("lvl36-button");
const level64Button = document.getElementById("lvl64-button");
const restartButton = document.getElementById("restart-game");
const leaderboardButton = document.getElementById("leaderboard");
const midGameRestartButton = document.getElementById("restart-mid-game");

const gameField = document.getElementById("memory-game");
const afterFinishBoard = document.getElementById("after-finish");
var welcomeText = document.getElementById("wellcoming");
welcomeText.textContent +=
  " " + window.localStorage.getItem("currentUser") + "?";
var resultTimeMessage = document.getElementById("result-time");

function selectLevel(level, event, button) {
  event.preventDefault();
  const itemParent = button.parentElement.parentElement;
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
      let randomPos = Math.floor(Math.random() * selectedLevel);
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
  var flipsCounter = 0;

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
    flipsCounter++;
    areMatching();
    if (flippedCards === selectedLevel / 2) {
      gameField.classList.add("finished-game");
      afterFinishBoard.classList.remove("hide");
      clearInterval(interval);
      const currentTime = seconds + ":" + tens;
      writeUserResultIfBetter(
        selectedLevel,
        window.localStorage.currentUser,
        seconds,
        tens,
        flipsCounter
      );
      resultTimeMessage.textContent +=
        " " + currentTime + " and " + flipsCounter + " flips";
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

  function restartGame(event) {
    event.preventDefault();
    location.reload();
  }

  function gotoLeaderboard(event) {
    event.preventDefault();
    window.location.href = "leaderboard.html";
  }

  cards.forEach((card) => card.addEventListener("click", flipCard));
  restartButton.addEventListener("click", restartGame);
  leaderboardButton.addEventListener("click", gotoLeaderboard);
}

midGameRestartButton.addEventListener("click", (event) => {
  location.reload();
});
// TIMER UTILS
var interval;
var seconds = "00";
var tens = "00";
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
