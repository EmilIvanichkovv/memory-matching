document.body.onload = addCards;

const cardsBack = "assets/Memory Matching Cards.png";
const socialMediaImages = [
  "Facebook",
  "Google",
  "Instagram",
  "LinkedIn",
  "Snapchat",
  "Spotify",
  "Twitter",
  "YouTube",
];

function addSingleCard(name) {
  // create a new div for memory card
  const divMemoryCard = document.createElement("div");
  divMemoryCard.dataset.socialmedia = name
  divMemoryCard.classList.add("memory-card");

  // and front side of the card
  const imgFrontSide = document.createElement("img");
  imgFrontSide.src = name;
  imgFrontSide.classList.add("front-of-card");
  imgFrontSide.alt = name;

  // add back of the card
  const imgBackSide = document.createElement("img");
  imgBackSide.src = cardsBack;
  imgBackSide.classList.add("back-of-card");
  imgBackSide.alt = "Memory Matching";

  // add the images to the Memory Card div
  divMemoryCard.appendChild(imgFrontSide);
  divMemoryCard.appendChild(imgBackSide);

  // add the newly created element and its content into the DOM
  const gameBoard = document.getElementById("memory-game");
  gameBoard.append(divMemoryCard);
}

function addCards() {
  socialMediaImages.forEach(element => {
    addSingleCard(`assets/game_cards/social_media/${element}.png`);
    addSingleCard(`assets/game_cards/social_media/${element}.png`);

  });
}

