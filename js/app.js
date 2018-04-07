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
  adjustStars();
  victory();
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
  if (e.target.classList.contains("hidden")) {
    if (document.querySelectorAll(".hidden").length == 16 && moveCount === 0) {

      const cards = document.getElementsByClassName("card");
      cards.onClick = startCount();
    }

      let classMatch = e.target.querySelector("i").className;
      let matchedCards = [];

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

// Stars rating system

let starRating = document.getElementsByClassName("stars")[0];
let starCount = "3 stars";

function adjustStars() {
  if (moveCount > 10) {
    starRating.innerHTML = "<li><i class='fas fa-star'></i></li><li><i class='fas fa-star'></i></li><li><i class='far fa-star'></i></li>";
    starCount = "2 stars";
  }
  if (moveCount > 20) {
    starRating.innerHTML = "<li><i class='fas fa-star'></i></li><li><i class='far fa-star'></i></li><li><i class='far fa-star'></i></li>";
    starCount = "1 star";
  }
}

// Timer

let seconds = 0;
let time;
let timerOn = 0;

function countTime() {
  timer.innerHTML = seconds;
  seconds += 1;
  time = setTimeout(function() {
    countTime();
  }, 1000);
}

function startCount() {
  if (!timerOn) {
    timerOn = 1;
    countTime();
  }
}

function stopCount() {
  clearTimeout(time);
  timerOn = 0;
}

// Victory

function victoryAlert() {
  sweetAlert({
      title: "Good job!",
      text: "You finish in " + (seconds - 1) + "s with " + starCount,
      icon: "success",
      buttons: ["Cancel", "Restart ?"]

    })
    .then((restart) => {
      if (restart) {
        restartGame();
      } else {
        swal("Have a nice day!");
      }
    });
}

function victory() {
  if (matchedCount === 8) {
    stopCount();
    victoryAlert();
  }
}
