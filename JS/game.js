const gameBoard = Array(9).fill(null);
let currentPlayer = "X";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
document.querySelector(".current").innerHTML = `Turn - ${currentPlayer}`;
function makeMove(cell, index) {
  if (gameBoard[index] || checkForWinner() || checkForDraw()) {
    return;
  }
  gameBoard[index] = currentPlayer;

  cell.classList.add("active");
  cell.classList.add("cell-active");

  cell.innerText = currentPlayer;
  setTimeout(() => {
    cell.classList.remove("active");
  }, 500);

  if (checkForWinner()) {
    document.getElementById(
      "statusText"
    ).innerText = `Player ( ${currentPlayer} ) Wins!`;

    document.getElementById("statusText").classList.add("active");
    document.getElementById("statusText").style.border = "1px solid gainsboro";
    document.getElementById("statusText").style.borderRadius = "24px";
    document.getElementById("statusText").style.boxShadow = "0px 0px 10px teal";
    document.getElementById("statusText").style.padding = "5px 10px";

    setTimeout(() => {
      document.getElementById("statusText").classList.remove("active");
    }, 500);

    return;
  } else if (checkForDraw()) {
    document.getElementById("statusText").innerText = "It's a Draw!";
    document.getElementById("statusText").classList.add("active");
    document.getElementById("statusText").style.border = "1px solid gainsboro";
    document.getElementById("statusText").style.borderRadius = "24px";
    document.getElementById("statusText").style.boxShadow =
      "0px 0px 10px crimson";
    document.getElementById("statusText").style.padding = "5px 10px";
    return;
  }

  currentPlayer = currentPlayer === "X" ? "o" : "X";
  document.querySelector(".current").innerHTML = `Turn - ${currentPlayer}`;
}

function checkForWinner() {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return gameBoard[index] === currentPlayer;
    });
  });
}

function checkForDraw() {
  return gameBoard.every((cell) => cell);
}

function resetGame() {
  gameBoard.fill(null);
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.innerText = "";
    cell.classList.remove("cell-active");
  });
  currentPlayer = "X";
  document.getElementById("statusText").innerText = "";
  document.getElementById("statusText").style.padding = "0";

  document.querySelector(".current").innerHTML = `Turn - ${currentPlayer}`;
}

document.getElementById("resetButton").addEventListener("click", resetGame);
