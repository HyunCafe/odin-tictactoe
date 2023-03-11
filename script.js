"use strict";

const mainGrid = document.querySelector(".main__game");

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

// Player 1 Add Event Listener to game board choices on a 3x3 grid

const playerChoices = document.querySelectorAll(".grid-cells");

playerChoices.forEach((choice) => {
  choice.addEventListener("click", () => {
    // will fill logic in
    // If player chooses X or O fill in with that textContent
    const xSpan = document.createElement("span");
    xSpan.textContent = "X";
    xSpan.classList.add("grid-text");
    choice.appendChild(xSpan);
  });
});

// Player 2 computer logic, attempts to block winning conditions after player 1's turn
const availableCells = [];
const gridCells = document.querySelectorAll(".grid-cells");

gridCells.forEach((cell) => {
  cell.addEventListener("click", () => {
    cell.setAttribute("data-selected", true);
    const index = cell.getAttribute("data-index");
    availableCells.push(index);
  });
});

const computerChoice =
  availableCells[Math.floor(Math.random() * availableCells.length)];

// Define rules object
const RULES = {
  players: {
    PLAYER_ONE: "X",
    PLAYER_TWO: "O",
  },
};

// Function to Fill in with X

// Function to Fill in with O

// Check Winner Condition
// If Player choices have 3 connecting in a row wins
// Else if computer has 3 in a row wins
// Else its a tie

// Reset Game Function

// Add best of 3 counter

// Computer Logic for Challenging where its optimal logic and Impossible where it cheats
// in a goofy way, the logic will be easy so it lets player think they can win
// and right before they win, a gif of sweating will come up from the computer
// and the computer will cheat and win and say was a close one in some cheeky way
