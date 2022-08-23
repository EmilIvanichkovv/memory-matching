// // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.3/firebase-app.js";
import {
  getDatabase,
  child,
  get,
  ref,
  push,
  set,
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
const leaderboardDataRef = ref(database, "leaderboard/");

const level16Button = document.getElementById("lvl16-button");
const level36Button = document.getElementById("lvl36-button");
const level64Button = document.getElementById("lvl64-button");
const level16 = 16;
const level36 = 36;
const level64 = 64;
var selectedLevel;

function selectLevel(level, event, button) {
  event.preventDefault();
  const itemParent = button.parentElement.parentElement;
  const leaderboardEl = document.getElementById("scores-lists-div");
  selectedLevel = level;
  itemParent.classList.add("hide");
  leaderboardEl.classList.remove("hide");

  getLeaderboard(selectedLevel).then(function (leaderboard) {
    const results = [];
    var index = 1;
    for (var result in leaderboard) {
      results[index] = leaderboard[result];
      index++;
    }
    results.sort((a, b) => {
      if (
        a.seconds < b.seconds ||
        (a.seconds == b.seconds && a.tens < b.tens)
      ) {
        return -1;
      } else {
        return 1;
      }
    });
    index = 1;
    for (var result in results) {
      leaderboardEl.appendChild(
        createUserResultElement(
          `#${index}`,
          results[result].username,
          results[result].seconds + ":" + results[result].tens,
          results[result].flips
        )
      );
      index++;
    }
  });
}
level16Button.addEventListener("click", (event) => {
  event.preventDefault();

  selectLevel(level16, event, level16Button);
});
level36Button.addEventListener("click", (event) => {
  selectLevel(level36, event, level36Button);
});
level64Button.addEventListener("click", (event) => {
  selectLevel(level64, event, level64Button);
});

// LEADERBOARD ELEMENTS LOAD
const leaderboardEl = document.getElementById("scores-lists");

function createUserResultElement(index, username, time, flips) {
  const userResult = document.createElement("li");
  if (window.localStorage.currentUser === username) {
    userResult.classList.add("curUser");
  }

  const indexEl = document.createElement("span");
  indexEl.classList.add("index");
  indexEl.innerHTML = index;

  const nameEl = document.createElement("span");
  nameEl.classList.add("name");
  nameEl.innerHTML = username;

  const timeEl = document.createElement("span");
  timeEl.classList.add("time");
  timeEl.innerHTML = time;

  const flipsEl = document.createElement("span");
  flipsEl.classList.add("flips");
  flipsEl.innerHTML = flips;

  userResult.appendChild(indexEl);
  userResult.appendChild(nameEl);
  userResult.appendChild(timeEl);
  userResult.appendChild(flipsEl);

  return userResult;
}

// Get leaderboard data from database
async function getLeaderboard(level) {
  const dbRef = ref(database);
  const temp = await get(child(dbRef, `leaderboard${level}/`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No such leaderboard data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });
  return temp;
}
