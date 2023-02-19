// Gameboard Module
const gameBoard = (function() {
    const _board = new Array(9).fill(null);

    // Renders the game board
    const _render = (() => {
        const boardHTML = document.querySelector('.game-container');
        for(let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            boardHTML.appendChild(square);
        }
    })();
    
    // Mark the player's selected square
    const setSquare = (index, player) => {
        const boardSquare = document.querySelector(`.square:nth-child(${index+1})`);
        const _mark = player.getMark();
        boardSquare.innerText = _mark;
        _board[index] = _mark;
    }

    // Get value of a square
    const getSquare = (index) => _board[index];

    // Clear the game board
    const clearBoard = () => {
        const squaresHTML = Array.from(document.querySelectorAll('.square'));
        for(let i = 0; i < 9; i++) {
            _board[i] = null;
            squaresHTML[i].innerText = "";
        }
    }

    return {
        setSquare,
        clearBoard,
        getSquare
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

// Game Controller Module
const gameController = (function() {
    const _player = Player('O');
    const _computer = Player('X');
    const _players = [_computer, _player];
    const _boardHTML = Array.from(document.querySelectorAll('.square'));
    let _round = 1;

    // Function to control player's selection of squares
    const playerTurn = (index) => {
        if(gameBoard.getSquare(index) !== null) {
            console.log('Taken.');
        } else {
            gameBoard.setSquare(index, _players[_round++ % 2]);
        }
        
        if(_checkWin()) {
            console.log(_players[(_round - 1) % 2].getMark() + " is the winner.");
        } else if(_round === 10) {
            console.log("DRAW");
        }
    }

    // Check if there is a winning combination
    const _checkWin = () => {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        
        const currentPlayerMark = _players[(_round - 1) % 2].getMark();
        for(const combo of winCombinations) {
            if(gameBoard.getSquare(combo[0]) === currentPlayerMark && gameBoard.getSquare(combo[1]) === currentPlayerMark && gameBoard.getSquare(combo[2]) === currentPlayerMark) {
                return true;
            }
        }
    }

    // Initialise click event for each square
    const _init = (() => {
        for(let i = 0; i < _boardHTML.length; i++) {
            _boardHTML[i].addEventListener('click', playerTurn.bind(_boardHTML[i], i));
        }
    })();
})();

const displayController = (function() {
    
})();