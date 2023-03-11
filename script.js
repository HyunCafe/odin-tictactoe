'use strict';

const mainGrid = document.querySelector('.main__game')


// Player 1 Add Event Listener to game board choices on a 3x3 grid

// Player 2 computer logic, attempts to block winning conditions after player 1's turn

// Wining condition logic/function

// Winner Display Message
const displayResult = (result) => {
    document.getElementsByClassName('main__result').textContent = result;
}

// Reset Game Function

// Add best of 3 counter

// Create the Board through the DOM
const createGrid = (rows, cols) => {
    const mainGrid = document.querySelector('.main__game');
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const gridCell = document.createElement('div');
        gridCell.classList.add('grid-cells');
        mainGrid.append(gridCell);
      }
    }
  };
  createGrid(3, 3);
  
  
  // Define rules object
  const RULES = {
    players: {
        PLAYER_ONE: 'X',
        PLAYER_TWO: 'O'
    }
  };
  

  // Computer Logic for Challenging where its optimal logic and Impossible where it cheats
  // in a goofy way, the logic will be easy so it lets player think they can win
  // and right before they win, a gif of sweating will come up from the computer
  // and the computer will cheat and win and say was a close one in some cheeky way


  // Add event listeners to player choices
  const playerChoices = document.querySelectorAll('');
  playerChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
     // will fill logic in
    });
  });
  
