"use strict";

const mainGrid = document.querySelector(".main__game");

// Define rules object
const RULES = {
  players: {
    PLAYER_ONE: "X",
    PLAYER_TWO: "O",
  },
};

const MODES = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

// Winner Display Message
const displayResult = (result) => {
  const resultOverlay = document.querySelector(".main__result");

  // Update the result text and show it
  resultOverlay.textContent = result;
  resultOverlay.style.display = "block";

  setTimeout(() => {
    // Add a click event listener to the body to hide the result overlay when clicked
    document.body.addEventListener("click", () => {
      const overlayStyle = getComputedStyle(resultOverlay);
      if (overlayStyle.display === "block") {
        resultOverlay.style.display = "none";
        resetGame();
      }
    });
  }, 500);
};

// Tracker for Wins and Losses
let wins = 0;
let losses = 0;
let ties = 0;

const trackResult = () => {
  document.querySelector(".wins").textContent = `Wins ${wins}`;
  document.querySelector(".losses").textContent = `Losses ${losses}`;
  document.querySelector(".ties").textContent = `Ties ${ties}`;
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
const cells = document.querySelectorAll(".grid-cells");
const availableCells = [];
let moves = 0;
let isComputerMoving = false;

// add click event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // check if cell has already been selected or game is already won
    if (
      cell.getAttribute("data-selected") === "true" ||
      checkGameState() ||
      isComputerMoving
    ) {
      return;
    }

    // mark cell as selected and add X to cell
    cell.setAttribute("data-selected", true);
    const xSpan = document.createElement("span");
    xSpan.textContent = "X";
    xSpan.classList.add("grid-text");
    cell.appendChild(xSpan);
    moves++;

    if (moves >= 5) {
      checkGameState();
    }

    // add available cells to array
    availableCells.length = 0;
    cells.forEach((cell) => {
      if (cell.getAttribute("data-selected") !== "true") {
        availableCells.push(cell);
      }
    });

    easyComputerMove();

    if (moves >= 5) {
      checkGameState();
    }
  });
});

// Computer Logic Easy Mode
const easyComputerMove = () => {
  if (availableCells.length === 0) {
    return;
  }

  isComputerMoving = true;
  setTimeout(() => {
    if (checkGameState()) {
      return;
    }

    let computerChoice;
    do {
      const randomIndex = Math.floor(Math.random() * availableCells.length);
      computerChoice = availableCells[randomIndex];
    } while (computerChoice.getAttribute("data-selected") === "true");

    const oSpan = document.createElement("span");
    oSpan.textContent = "O";
    oSpan.classList.add("grid-text");
    computerChoice.appendChild(oSpan);
    computerChoice.setAttribute("data-selected", true);
    moves++;

    if (moves >= 5) {
      checkGameState();
    }

    isComputerMoving = false;
  }, 600);
};

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

let isUpdated = false;

const checkGameState = () => {
  if (checkWinningCondition(RULES.players.PLAYER_ONE)) {
    displayResult(`You Win!`);
    if (!isUpdated) {
      wins++;
      isUpdated = true;
    }
    trackResult();
    return true;
  } else if (checkWinningCondition(RULES.players.PLAYER_TWO)) {
    displayResult(`The Computer Wins!`);
    if (!isUpdated) {
      losses++;
      isUpdated = true;
    }
    trackResult();
    return true;
  } else if (moves >= 9) {
    displayResult("Tie game!");
    if (!isUpdated) {
      ties++;
      isUpdated = true;
    }
    trackResult();
    return true;
  }
  return false;
};

// Check Winner Condition Closure
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

    if (isSame) {
      isWinning = true;
      displayResult(`${player} wins!`);
      return;
    }
  });
  return isWinning;
};

// Reset Game Function
const resetGame = () => {
  const gridCells = document.querySelectorAll(".grid-cells");
  gridCells.forEach((cell) => {
    cell.textContent = "";
    cell.setAttribute("data-selected", false);
  });
  moves = 0;
  isUpdated = false;
  isComputerMoving = false;
  availableCells.length = 0;
};

//TODO:

// Reset Game Function

// Add best of 3 counter

// Maybe add a strike through on the winning condition and a you won ir lose screen, that continues on to best of 3 if you click anywhere on the  body

// Computer Logic for Challenging where its optimal logic and Impossible where it cheats
// in a goofy way, the logic will be easy so it lets player think they can win
// and right before they win, a gif of sweating will come up from the computer
// and the computer will cheat and win and say was a close one in some cheeky way
