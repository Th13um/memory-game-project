// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

const cardList = document.getElementsByClassName("card");
const newCardList = Array.prototype.slice.call(cardList);
const shuffledCard = shuffle(newCardList);

let newList = "";
for (i = 0; i < shuffledCard.length; i++) {
  newList += shuffledCard[i].outerHTML;
}

function shuffleDeck() {
  document.getElementById("deck").innerHTML = newList;
}

shuffleDeck();

// Game system functions

let matchedCount = 0;
let matchingCards;
let visibleCard = [];
let displayedCards;
let moveCount = 0;

function updateMoveCount() {
  moveCount += 1;
  if (moveCount <= 1) {
    document.getElementById("moves").innerHTML = moveCount + " move";
  } else {
    document.getElementById("moves").innerHTML = moveCount + " moves";
  }
}

function matchCards() {
  matchedCount += 1;
  setTimeout(function() {
    matchingCards = document.querySelectorAll(".show");
    for (let i = 0; i < matchingCards.length; i++) {
      matchingCards[i].className = "card match";
    }
  }, 500);
}

function hideCards() {
  visibleCard = [];
  displayedCards = document.querySelectorAll(".show");
  setTimeout(function() {
    for (let i = 0; i < displayedCards.length; i++) {
      displayedCards[i].className += " wrong";
    }
  }, 500);
  setTimeout(function() {
    for (let i = 0; i < displayedCards.length; i++) {
      displayedCards[i].className = "card hidden";
    }
  }, 1500);
  updateMoveCount();
}

function revealCard(e) {
  e.target.classList.add("show", "open");
  e.target.classList.remove("hidden");
}

function faceUpCard(e) {
  let classMatch = e.target.querySelector("i").className;
  visibleCard.push(classMatch);
}

document.body.addEventListener("click", function(e) {

  let classMatch = e.target.querySelector("i").className;
  let matchedCards = [];

  if (e.target.classList.contains("hidden")) {
    if (document.querySelectorAll(".hidden").length == 16 && moveCount === 0) {
      console.log(newList);
    }
    if (visibleCard.length < 1) {
      revealCard(e);
      faceUpCard(e);
    } else {
      if (visibleCard.includes(classMatch)) {
        matchedCards.push(classMatch);
        revealCard(e);
        matchCards();
        updateMoveCount();
        visibleCard = [];
      } else {
        revealCard(e);
        hideCards();
      }
    }
  }
});

// Restart game function

const restartButton = document.getElementsByClassName("restart")[0];

function restartGame() {
  document.location.reload();
}

restartButton.addEventListener("click", restartGame);
