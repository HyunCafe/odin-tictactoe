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
const cells = document.querySelectorAll(".grid-cells");
const availableCells = [];
let moves = 0;

// add click event listener to each cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // check if cell has already been selected
    if (cell.getAttribute("data-selected") === "true") {
      return;
    }

    // mark cell as selected and add X to cell
    cell.setAttribute("data-selected", true);
    const xSpan = document.createElement("span");
    xSpan.textContent = "X";
    xSpan.classList.add("grid-text");
    cell.appendChild(xSpan);
    moves++;

    // Check game state after 5 moves
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

    // Default / Easy Mode Computer Logic
    easyComputerMove();
  });
});

// Computer Logic Easy Mode
const easyComputerMove = () => {
  if (availableCells.length === 0) {
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableCells.length);
  const computerChoice = availableCells[randomIndex];
  const oSpan = document.createElement("span");
  oSpan.textContent = "O";
  oSpan.classList.add("grid-text");
  computerChoice.appendChild(oSpan);
  computerChoice.setAttribute("data-selected", true);
  moves++;

  // Check game state after computer move
  if (moves >= 5) {
    checkGameState();
  }
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
console.log(winningCombinations);

// Function check game State if win or tie
const checkGameState = () => {
  if (checkWinningCondition(RULES.players.PLAYER_ONE)) {
    displayResult(`${RULES.players.PLAYER_ONE} wins!`);
    return true;
  } else if (checkWinningCondition(RULES.players.PLAYER_TWO)) {
    displayResult(`${RULES.players.PLAYER_TWO} wins!`);
    return true;
  } else if (moves >= 9) {
    displayResult("Tie game!");
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
