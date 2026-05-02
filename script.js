const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector(".status");
const popup = document.getElementById("popup");
const resultText = document.getElementById("resultText");
const newGameBtn = document.getElementById("newGameBtn");

let currentPlayer = "X";
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => handleClick(cell, index));
});

newGameBtn.addEventListener("click", restartGame);

function handleClick(cell, index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;

  checkWinner();
}

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      showResult(`Player ${currentPlayer} Wins! 🎉`);
      gameActive = false;
      return;
    }
  }

  if (!board.includes("")) {
    showResult("It's a Draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function showResult(message) {
  resultText.textContent = message;
  popup.style.display = "flex";
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's Turn";

  cells.forEach(cell => cell.textContent = "");
  popup.style.display = "none";
}