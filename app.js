const board = document.querySelector(".board");
board.classList.add("hidden");
const counter = document.querySelector(".moves");
const timer = document.querySelector(".time");
const timeAndMoves = document.querySelector(".time-and-moves");
timeAndMoves.classList.add("hidden");
const welcomeScreen = document.querySelector(".start");
const over = document.getElementById("over");

const emojis = ["🍕", "🍺", "🎮", "🐸", "💎", "💣", "🥝", "🚂"];

// shuffle emojis array
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let moreEmojis = [];
let flippedCards = [];
let flippedCount = 0;
let matchedCount = 0;
let moves = 0;
let interval;

shuffle(emojis);
moreEmojis = [...emojis];
shuffle(moreEmojis);
moreEmojis = [...moreEmojis, ...emojis];
const flipCards = (e) => {
  const flipCard = e.target;
  flipCard.classList.toggle("flip");
  flipCard.parentNode.classList.add("disabled");
  flippedCards.push(flipCard);
  flippedCount++;
  if (flippedCount === 2) {
    checkForMatch();
    moves++;
    counter.innerHTML = `Moves: ${moves}`;
  }
};

const checkForMatch = () => {
  const firstCard = flippedCards[0];
  const secondCard = flippedCards[1];
  if (firstCard.textContent === secondCard.textContent) {
    board.classList.add("disabled");
    setTimeout(() => {
      firstCard.parentNode.classList.add("matched");
      secondCard.parentNode.classList.add("matched");
      flippedCards = [];
      flippedCount = 0;
      matchedCount++;
      if (matchedCount === 8) {
        gameOver();
      }
      setTimeout(() => {
        board.classList.remove("disabled");
      }, 200);
    }, 500);
  } else {
    board.classList.add("disabled");
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      firstCard.parentNode.classList.remove("disabled");
      secondCard.parentNode.classList.remove("disabled");
      flippedCards = [];
      flippedCount = 0;
      setTimeout(() => {
        board.classList.remove("disabled");
      }, 200);
    }, 500);
  }
};

const game = () => {
  for (let i = 0; i < moreEmojis.length; i++) {
    const card = document.createElement("div");
    card.classList.add("card");

    const flipCard = document.createElement("div");
    flipCard.classList.add("flip-card");
    card.appendChild(flipCard);

    const cardBefore = document.createElement("div");
    cardBefore.classList.add("card-front");
    cardBefore.textContent = "?";
    flipCard.appendChild(cardBefore);

    const cardAfter = document.createElement("div");
    cardAfter.classList.add("card-back");
    cardAfter.textContent = moreEmojis[i];
    flipCard.appendChild(cardAfter);

    card.addEventListener("click", flipCards);
    board.appendChild(card);
  }
};

let seconds = 0;
let minutes = 0;
const time = () => {
  seconds++;
  if (seconds === 60) {
    seconds = 0;
    minutes++;
  }
  if (minutes === 60) {
    minutes = 0;
  }

  seconds < 10 ? (seconds = `0${seconds}`) : seconds;

  timer.innerHTML = `Time: ${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds}`;
};
const handleStart = () => {
  game();
  board.classList.remove("hidden");
  board.classList.add("board");
  timeAndMoves.classList.remove("hidden");
  welcomeScreen.classList.remove("start");
  welcomeScreen.classList.add("hidden");
  interval = setInterval(time, 1000);
};

const handleReStart = () => {
  shuffle(moreEmojis);
  moves = 0;
  counter.innerHTML = `Moves: ${moves}`;
  seconds = 0;
  minutes = 0;
  timer.innerHTML = `Time: 00:00`;
  interval = setInterval(time, 1000);
  matchedCount = 0;
  game();
  board.classList.remove("hidden");
  board.classList.add("board");
  timeAndMoves.classList.remove("hidden");
  welcomeScreen.classList.remove("start");
  over.classList.add("hidden");
  over.classList.remove("game-over");
};

const gameOver = () => {
  clearInterval(interval);
  over.classList.add("game-over");
  over.classList.remove("hidden");
  board.classList.remove("board");
  board.classList.add("hidden");
  board.innerHTML = "";
  timeAndMoves.classList.add("hidden");
  over.innerHTML = `<h2>Congratulations!</h2>
  <p>You finished the game in <span class="moves">${moves}</span> moves!</p>
  <p>Your time: <span class="time">${timer.innerHTML
    .toLocaleLowerCase()
    .slice(5)}</span></p>
  <button onclick="handleReStart()">Play Again</button>`;
};
