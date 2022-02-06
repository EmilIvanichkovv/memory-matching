database = window.localStorage

const navGame = document.getElementById('nav-game')
const navLeaderboard = document.getElementById('nav-leaderboard')
const navAcc = document.getElementById('nav-account')


navGame.addEventListener('click',  event => {
    if(database.getItem("currentUser") === "") return
    window.location.href = "game.html"
})

navAcc.addEventListener('click', event => {
    database.removeItem("currentUser")
    window.location.href = "login.html"
})