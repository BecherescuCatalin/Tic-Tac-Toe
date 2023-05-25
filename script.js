const xplayer = document.querySelector(".xplayer");
const oplayer = document.querySelector(".oplayer");
const cells = document.querySelectorAll(".cell");
const xscore = document.querySelector(".xscore");
const oscore = document.querySelector(".oscore");
const btn = document.querySelector(".btn");

const btnPlay = document.querySelector(".play");
const btnStop = document.querySelector(".stop");
btnStop.classList.add("a");
xplayer.classList.add("active");

let xS = 0;
let oS = 0;

const winCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

startGame();
function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked));
  btn.addEventListener("click", restartGame);
  running = true;
}

function cellClicked() {
  const cellId = this.id;
  if (options[cellId] != "" || !running) {
    return;
  }
  updateCell(this, cellId);
  checkWinner();
}

function updateCell(cell, id) {
  options[id] = currentPlayer;
  cell.textContent = currentPlayer;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "0" : "X";
  if (currentPlayer == "X") {
    xplayer.classList.add("active");
    oplayer.classList.remove("active");
  }
  if (currentPlayer == "0") {
    oplayer.classList.add("active");
    xplayer.classList.remove("active");
  }
  cells.textContent = `${currentPlayer}`;
}

function checkWinner() {
  let win = false;
  for (let i = 0; i < winCombo.length; i++) {
    let condition = winCombo[i];
    let cellA = options[condition[0]];
    let cellB = options[condition[1]];
    let cellC = options[condition[2]];

    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA === cellB && cellB === cellC) {
      win = true;
      break;
    }
  }
  if (win) {
    if (currentPlayer == "X") {
      xplayer.classList.add("win");
      xS++;
      xscore.textContent = `X score : ${xS}`;
    } else if (currentPlayer == "0") {
      oplayer.classList.add("win");
      oS++;
      oscore.textContent = `0 score : ${oS}`;
    }
    running = false;
  } else if (!options.includes("")) {
    xplayer.classList.remove("active");
    oplayer.classList.remove("active");
    running = false;
  } else {
    changePlayer();
  }
}
function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.textContent = ""));
  running = true;
  xplayer.classList.add("active");
  xplayer.classList.remove("win");
  oplayer.classList.remove("active");
  oplayer.classList.remove("win");
}
const x = document.getElementById("audio");
function playAudio() {
  x.play();
  btnPlay.classList.add("a");
  btnStop.classList.remove("a");
}

function pauseAudio() {
  x.pause();
  btnPlay.classList.remove("a");
  btnStop.classList.add("a");
}
