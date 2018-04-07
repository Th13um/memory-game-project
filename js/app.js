// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
console.log(newList);
