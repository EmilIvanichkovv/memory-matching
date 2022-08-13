const cardsBack = "assets/Memory Matching Cards.png";
const level = {
  socialMediaImages: [
    "Facebook",
    "Google",
    "Instagram",
    "LinkedIn",
    "Snapchat",
    "Spotify",
    "Twitter",
    "YouTube",
  ],
  party: [
    "balloons",
    "bday_card",
    "beer",
    "cake",
    "carnaval",
    "champagne",
    "cocktail",
    "firework",
    "glasses",
    "invite",
    "mask",
    "music_plate",
    "piano",
    "popcorn",
    "rose",
    "star",
    "whistle",
    "xmas_tree",
  ],
  foods: [
    "apple",
    "banana",
    "burger",
    "cherry",
    "chicken_2",
    "chicken",
    "cocktail",
    "coffee",
    "corn",
    "croissant",
    "doner",
    "doner_shihs",
    "donut",
    "eggplant",
    "fish",
    "fries",
    "grape",
    "hotdog",
    "icecream_2",
    "icecream",
    "noodles",
    "orange",
    "pickle",
    "pineapple",
    "pizza",
    "popcorn",
    "sausage",
    "soft_drink_2",
    "soft_drink",
    "steak",
    "sushi",
    "tacos",

  ]
}


function addSingleCard(name, lvl) {
  // create a new div for memory card
  const divMemoryCard = document.createElement("div");
  divMemoryCard.dataset.socialmedia = name
  divMemoryCard.classList.add(`memory-card`);
  divMemoryCard.classList.add(`memory-card-${lvl}`);

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

function addCardsLvl16(lvl) {
  level.socialMediaImages.forEach(element => {
    addSingleCard(`assets/game_cards/social_media/${element}.png`, lvl);
    addSingleCard(`assets/game_cards/social_media/${element}.png`, lvl);
  });
}

function addCardsLvl36(lvl) {
  level.party.forEach(element => {
    addSingleCard(`assets/game_cards/party/${element}.png`, lvl);
    addSingleCard(`assets/game_cards/party/${element}.png`, lvl);
  });
}

function addCardsLvl64(lvl) {
  level.foods.forEach(element => {
    addSingleCard(`assets/game_cards/foods/${element}.png`, lvl);
    addSingleCard(`assets/game_cards/foods/${element}.png`, lvl);
  });
}

