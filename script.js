"use strict";

const mainGrid = document.querySelector(".main__game");

// Define rules object
const RULES = {
  players: {
    PLAYER_ONE: "X",
    PLAYER_TWO: "O",
  },
};

// Winner Display Message
const displayResult = (result) => {
  document.getElementsByClassName("main__result").textContent = result;
};

// Create the Board through the DOM
const createGrid = (rows, cols) => {
  const mainGrid = document.querySelector(".main__game");
  let cellIndex = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const gridCell = document.createElement("div");
      gridCell.classList.add("grid-cells");
      gridCell.setAttribute("data-index", cellIndex);
      mainGrid.append(gridCell);

      cellIndex++;
    }
  }
};
createGrid(3, 3);

// Keep track of the number of moves made
let moves = 0;

// Player 1 Add Event Listener to game board choices on a 3x3 grid
const playerChoices = document.querySelectorAll(".grid-cells");

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    if (choice.getAttribute("data-selected") === "true") {
      return;
    }

    const xSpan = document.createElement("span");
    xSpan.textContent = "X";
    xSpan.classList.add("grid-text");
    choice.appendChild(xSpan);
    choice.setAttribute("data-selected", true); // set data-selected to true when player selects a cell

    moves++;

    if (moves >= 3) {
      const isWinning = checkWinningCondition(RULES.players.PLAYER_ONE); // check if the player has won
      if (isWinning) {
        displayResult(`${RULES.players.PLAYER_ONE} wins!`);
      }
    }
  });
});

// Player 2 computer logic, attempts to block winning conditions after player 1's turn
const gridCells = document.querySelectorAll(".grid-cells");
const availableCells = [];

gridCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (cell.getAttribute("data-selected") === "true") {
      return;
    }

    const oSpan = document.createElement("span");
    oSpan.textContent = "O";
    oSpan.classList.add("grid-text");
    cell.appendChild(oSpan);
    cell.setAttribute("data-selected", true);
    moves++;

    if (moves >= 3) {
      const isWinning = checkWinningCondition(RULES.players.PLAYER_TWO); // check if the player has won
      if (isWinning) {
        displayResult(`${RULES.players.PLAYER_TWO} wins!`);
      }
    }
  });

  if (cell.getAttribute("data-selected") !== "true") {
    availableCells.push(cell);
  }
});

const computerChoice =
  availableCells[Math.floor(Math.random() * availableCells.length)];

// Winner Condition Logic
const winningCombinations = [];

// rows
for (let i = 0; i < 9; i += 3) {
  winningCombinations.push([i, i + 1, i + 2]);
}

// columns
for (let i = 0; i < 3; i++) {
  winningCombinations.push([i, i + 3, i + 6]);
}

// diagonals
winningCombinations.push([0, 4, 8]);
winningCombinations.push([2, 4, 6]);
console.log(winningCombinations);

// Check Winner Condition
const checkWinningCondition = (player) => {
  let isWinning = false;
  winningCombinations.forEach((combination) => {
    const cells = combination.map((index) =>
      document.querySelector(`[data-index="${index}"]`)
    );
    const isSame = cells.every(
      (cell) =>
        cell.textContent === player &&
        cell.getAttribute("data-selected") === "true"
    );
    console.log(`isSame: ${isSame}`);

    if (isSame) {
      isWinning = true;
      console.log("You win!");
      displayResult(`${player} wins!`);
      return;
    }
  });
  return isWinning;
};

// Reset Game Function

// Add best of 3 counter

// Computer Logic for Challenging where its optimal logic and Impossible where it cheats
// in a goofy way, the logic will be easy so it lets player think they can win
// and right before they win, a gif of sweating will come up from the computer
// and the computer will cheat and win and say was a close one in some cheeky way
