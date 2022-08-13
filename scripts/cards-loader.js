const cardsBack = "assets/Memory Matching Cards.png";
const levels = {
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
  ],
};

function loadSingleCard(name, lvl) {
  // create a new div for memory card
  const divMemoryCard = document.createElement("div");
  divMemoryCard.dataset.socialmedia = name;
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

function loadAllCards(lvl) {
  switch (lvl) {
    case 16:
      levels.socialMediaImages.forEach((element) => {
        loadSingleCard(`assets/game_cards/social_media/${element}.png`, lvl);
        loadSingleCard(`assets/game_cards/social_media/${element}.png`, lvl);
      });
      break;
    case 36:
      levels.party.forEach((element) => {
        loadSingleCard(`assets/game_cards/party/${element}.png`, lvl);
        loadSingleCard(`assets/game_cards/party/${element}.png`, lvl);
      });
      break;
    case 64:
      levels.foods.forEach((element) => {
        loadSingleCard(`assets/game_cards/foods/${element}.png`, lvl);
        loadSingleCard(`assets/game_cards/foods/${element}.png`, lvl);
      });
      break;
    default:
      console.log(`Sorry, incorrect lvl: ${lvl}.`);
  }
}
