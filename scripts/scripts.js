
// Gameboard Module
const gameBoard = (function() {
    const _board = new Array(9);

    // Renders the game board
    const _render = () => {
        const boardHtml = document.querySelector('.game-container');
        for(let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            boardHtml.appendChild(square);
        }
    }
    
    // Mark the player's selected square
    const setSquare = (index, player) => {
        const boardSquare = document.querySelector(`.square:nth-child(${index+1})`);
        boardSquare.innerText = "0";
        _board[index] = "0";
    }

    _render();
    return {
        setSquare
    }
})();

// Player Factory
const Player = (mark) => {
    const _mark = mark;

    // Get the player's mark
    const getMark = () => _mark;

    return {
        getMark
    }
}