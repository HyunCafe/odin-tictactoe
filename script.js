"use strict";

const mainGrid = document.querySelector(".main__game");

// ----------------------- Display and Track Section  ----------------------- //

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

// ----------------------- Create Grid Section  ----------------------- //

// Create the Board through the DOM
const createGrid = (rows, cols) => {
  const mainGrid = document.querySelector(".main__game");

  // Check if the grid cells have already been created and appended
  if (mainGrid.childElementCount === 0) {
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
  }
};

createGrid(3, 3);

// ----------------------- Player Event Listener Section  ----------------------- //

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
    cell.append(xSpan);
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

    computerMove();

    if (moves >= 5) {
      checkGameState();
    }
  });
});

// ----------------------- Game Logic Section  ----------------------- //

// Define rules object
const RULES = {
  players: {
    PLAYER_ONE: "X",
    PLAYER_TWO: "O",
  },
};

// Set player symbols
const playerOneSymbol = RULES.players.PLAYER_ONE;
const playerTwoSymbol = RULES.players.PLAYER_TWO;

const MODES = {
  EASY: "easy",
  HARD: "hard",
  IMPOSSIBLE: "impossible",
};

// Get mode buttons
const easyBtn = document.querySelector(".button-easy");
const hardBtn = document.querySelector(".button-hard");
const impossibleBtn = document.querySelector(".button-impossible");

// Add event listeners to buttons
easyBtn.addEventListener("click", () => {
  currentMode = MODES.EASY;
  console.log("Current mode set to Easy");
});

hardBtn.addEventListener("click", () => {
  currentMode = MODES.HARD;
  console.log("Current mode set to Hard");
});

impossibleBtn.addEventListener("click", () => {
  currentMode = MODES.IMPOSSIBLE;
  console.log("Current mode set to Impossible");
});

const getAvailableCells = () => {
  return [...document.querySelectorAll(".grid-cells")].filter(
    (cell) => !cell.getAttribute("data-selected")
  );
};

// Use the currentMode variable to determine the computer move logic
const computerMove = () => {
  if (currentMode === MODES.EASY) {
    console.log("Using Easy Mode computer move logic");
    easyComputerMove();
  } else if (currentMode === MODES.HARD) {
    console.log("Using Hard Mode computer move logic");
    hardComputerMove();
  } else if (currentMode === MODES.IMPOSSIBLE) {
    console.log("Using Impossible Mode computer move logic");
    impossibleComputerMove();
  }
};

// Computer Logic Easy Mode
let currentMode = MODES.EASY;
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
    if (availableCells.length > 0) {
      do {
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        computerChoice = availableCells[randomIndex];
      } while (computerChoice.getAttribute("data-selected") === "true");

      // Check if the computer can win with the next move
      const nextMoveWins = winningCombinations.some((combination) => {
        const cells = combination.map((index) =>
          document.querySelector(`[data-index="${index}"]`)
        );
        const computerCells = cells.filter(
          (cell) =>
            cell.getAttribute("data-selected") === "true" &&
            cell.textContent === "O"
        );
        const emptyCell = cells.find(
          (cell) => cell.getAttribute("data-selected") !== "true"
        );

        if (computerCells.length === 2 && emptyCell) {
          computerChoice = emptyCell;
          return true;
        }
        return false;
      });

      // Check if the player can win with the next move and block it
      if (!nextMoveWins) {
        winningCombinations.some((combination) => {
          const cells = combination.map((index) =>
            document.querySelector(`[data-index="${index}"]`)
          );
          const playerCells = cells.filter(
            (cell) =>
              cell.getAttribute("data-selected") === "true" &&
              cell.textContent === "X"
          );
          const emptyCell = cells.find(
            (cell) => cell.getAttribute("data-selected") !== "true"
          );

          if (playerCells.length === 2 && emptyCell) {
            computerChoice = emptyCell;
            return true;
          }
          return false;
        });
      }
    }

    const oSpan = document.createElement("span");
    oSpan.textContent = "O";
    oSpan.classList.add("grid-text");
    computerChoice.append(oSpan);
    computerChoice.setAttribute("data-selected", true);
    moves++;

    if (moves >= 5) {
      checkGameState();
    }

    isComputerMoving = false;
  }, 600);
};

// Computer Logic Hard Mode
const hardComputerMove = () => {
  if (availableCells.length === 0) {
    return;
  }

  isComputerMoving = true;
  setTimeout(() => {
    if (checkGameState()) {
      return;
    }

    let computerChoice;

    // Check if the computer can win with the next move
    const nextMoveWins = winningCombinations.some((combination) => {
      const cells = combination.map((index) =>
        document.querySelector(`[data-index="${index}"]`)
      );
      const computerCells = cells.filter(
        (cell) =>
          cell.getAttribute("data-selected") === "true" &&
          cell.textContent === "O"
      );
      const emptyCell = cells.find(
        (cell) => cell.getAttribute("data-selected") !== "true"
      );

      if (computerCells.length === 2 && emptyCell) {
        computerChoice = emptyCell;
        return true;
      }
      return false;
    });

    // Check if the player can win with the next move and block it
    if (!nextMoveWins) {
      const blockingMoves = [];
      winningCombinations.forEach((combination) => {
        const cells = combination.map((index) =>
          document.querySelector(`[data-index="${index}"]`)
        );
        const playerCells = cells.filter(
          (cell) =>
            cell.getAttribute("data-selected") === "true" &&
            cell.textContent === "X"
        );
        const emptyCell = cells.find(
          (cell) => cell.getAttribute("data-selected") !== "true"
        );

        if (playerCells.length === 2 && emptyCell) {
          blockingMoves.push(emptyCell);
        }
      });

      if (blockingMoves.length > 0) {
        // Choose a random blocking move
        const randomIndex = Math.floor(Math.random() * blockingMoves.length);
        computerChoice = blockingMoves[randomIndex];
      } else {
        // Choose a random move
        const randomIndex = Math.floor(Math.random() * availableCells.length);
        computerChoice = availableCells[randomIndex];
      }
    }

    const oSpan = document.createElement("span");
    oSpan.textContent = "O";
    oSpan.classList.add("grid-text");
    computerChoice.append(oSpan);
    computerChoice.setAttribute("data-selected", true);
    moves++;

    if (moves >= 5) {
      checkGameState();
    }

    isComputerMoving = false;
  }, 600);
};

// Winner Condition Logic
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

// ----------------------- Others Section  ----------------------- //

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

  // Set current computer mode to previous value
  const modeRadios = document.querySelectorAll('input[name="mode"]');
  let selectedMode = MODES.EASY; 
  for (let i = 0; i < modeRadios.length; i++) {
    if (modeRadios[i].checked) {
      selectedMode = modeRadios[i].value;
      break;
    }
  }
  currentMode = selectedMode;
};

// Reset button event listener
const resetButton = document.querySelector(".button-reset");
resetButton.addEventListener("click", resetGame);

//TODO:

// Reset Game Function

// Add best of 3 counter

// Maybe add a strike through on the winning condition and a you won ir lose screen, that continues on to best of 3 if you click anywhere on the  body

// Computer Logic for Challenging where its optimal logic and Impossible where it cheats
// in a goofy way, the logic will be easy so it lets player think they can win
// and right before they win, a gif of sweating will come up from the computer
// and the computer will cheat and win and say was a close one in some cheeky way
