// THIS MUST BE IN SEPARATE FILE
const navGame = document.getElementById('nav-game')
const navLeaderboard = document.getElementById('nav-leaderboard')
const navAcc = document.getElementById('nav-account')

// Game button actions:
// Reveal game button content
navGame.addEventListener('mouseenter', event => {
    let menu = navGame.nextElementSibling
    menu.classList.add('reveal')
})
// Hide game button content
navGame.addEventListener("mouseout", event => {
    let menu = navGame.nextElementSibling
    menu.classList.remove('reveal')
})
navGame.addEventListener('click',  event => {
    window.location.href = "game.html"
})

// Reveal leaderboard button content
navLeaderboard.addEventListener('mouseenter', event => {
    let menu = navLeaderboard.nextElementSibling
    menu.classList.add('reveal')
})
// Hide leaderboard button content
navLeaderboard.addEventListener("mouseout", event => {
    let menu = navLeaderboard.nextElementSibling
    menu.classList.remove('reveal')
})

// Reveal log out button content
navAcc.addEventListener('mouseenter', event => {
    let menu = navAcc.nextElementSibling
    menu.classList.add('reveal')
})
// Hide log out button content
navAcc.addEventListener("mouseout", event => {
    let menu = navAcc.nextElementSibling
    menu.classList.remove('reveal')
})
navAcc.addEventListener('click', event => {
    window.location.href = "login.html"
})