'use strict';

const body = document.body;


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
function createGrid() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const gridCell = document.createElement('div');
            gridCell.classList.add('grid-cells');
            body.append(gridCell)
        }
    }
}
