database = window.localStorage
const level16 = 16
const level36 = 36
const level64 = 64

const gameLevel = level16

const startButton = document.getElementById('start-game')
const restartButton = document.getElementById('restart-game')
const gameField = document.getElementById('memory-game')
const afterFinishBoard = document.getElementById('after-finish')
var welcomeText = document.getElementById('wellcoming')
welcomeText.textContent += " " + database.getItem("currentUser") + "?"
var resultTimeMessage = document.getElementById('result-time')

startButton.addEventListener('click', event => {
    event.preventDefault()
    const itemParent = startButton.parentElement
    itemParent.classList.add('hide')
    gameField.classList.remove('hide')
    interval = setInterval(startTimer, 10)

})

const cards = document.querySelectorAll('.memory-card')
let flippedCards = 0
let hasFlippedCard = false
let boardLock = false
let firstCard, secondCard

function flipCard() {
    if(boardLock) return
    if(this == firstCard) return
    this.classList.add('flip')

    if (!hasFlippedCard) {
        hasFlippedCard = true
        firstCard = this

        return
    }
    secondCard = this
    areMatching()
    if (flippedCards === gameLevel / 2){
        gameField.classList.add('finished-game')
        afterFinishBoard.classList.remove('hide')
        clearInterval(interval)
        const currenTime = seconds + ":" + tens
        resultTimeMessage.textContent += " " + currenTime
    }
}

function areMatching() {
    let isMatch = firstCard.dataset.socialmedia === secondCard.dataset.socialmedia
    if(isMatch){
        disableMatchingCards()
        flippedCards = flippedCards + 1
    }
    else{
        unflipCards()
    }
}

function disableMatchingCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    boardLock = true
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1000)
}

function resetBoard() {
    hasFlippedCard = false
    boardLock = false
    firstCard = null
    secondCard = null
  }

  function restartGame() {
    event.preventDefault()
    location.reload()
  }

  (function shuffleCards() {
    cards.forEach(card => {
      let randomPos = Math.floor(Math.random() * level16);
      card.style.order = randomPos;
    })
  })()

cards.forEach(card => card.addEventListener('click', flipCard))
restartButton.addEventListener('click', restartGame)

// TIMER UTILS
var interval
var seconds = 00
var tens = 00
var timerSeconds = document.getElementById('seconds')
var timerTens = document.getElementById('tens')

function startTimer(){
    tens++

    if(tens < 9) timerTens.innerHTML = "0" + tens
    if(tens > 9) timerTens.innerHTML = tens
    if(tens > 99){
        tens = 0
        seconds++
        timerSeconds.innerHTML = "0" + seconds
        timerTens.innerHTML = "0" + 0
    }
    if(seconds > 9) timerSeconds.innerHTML = seconds   
}