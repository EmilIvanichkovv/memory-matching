// THIS MUST BE IN SEPARATE FILE
const navGame = document.getElementById('nav-game')
const navLeaderboard = document.getElementById('nav-leaderboard')
const navAcc = document.getElementById('nav-account')


navGame.addEventListener('click',  event => {
    window.location.href = "game.html"
})

navAcc.addEventListener('click', event => {
    console.log("HIHIIH")
    window.location.href = "login.html"
})