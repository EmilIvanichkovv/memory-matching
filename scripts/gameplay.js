
const cards = document.querySelectorAll('.memory-card');

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
    secondCard = this;

    areMatching()

}

function areMatching() {
    let isMatch = firstCard.dataset.socialmedia === secondCard.dataset.socialmedia
    
        isMatch ? disableMatchingCards() : unflipCards()
}

function disableMatchingCards() {
    firstCard.removeEventListener('click', flipCard)
    secondCard.removeEventListener('click', flipCard)

    resetBoard()
}

function unflipCards() {
    boardLock = true;
    setTimeout(() => {
        firstCard.classList.remove('flip')
        secondCard.classList.remove('flip')

        resetBoard()
    }, 1500)
}

function resetBoard() {
    hasFlippedCard = false
    boardLock = false
    firstCard = null
    secondCard = null
  }

cards.forEach(card => card.addEventListener('click', flipCard));