const navGame = document.getElementById("nav-game");
const navLeaderboard = document.getElementById("nav-leaderboard");
const navAcc = document.getElementById("nav-logout");

navGame.addEventListener("click", (event) => {
  if (window.localStorage.getItem("currentUser") === "") return;
  window.location.href = "game.html";
});

navLeaderboard.addEventListener("click", (event) => {
  window.location.href = "leaderboard.html";
});

navAcc.addEventListener("click", (event) => {
  window.localStorage.removeItem("currentUser");
  window.location.href = "login.html";
});
