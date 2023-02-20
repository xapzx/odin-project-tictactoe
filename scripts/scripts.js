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
    const _playerTurn = (index) => {
        if(gameBoard.getSquare(index) !== null) {
            displayController.wrongSelection();
        } else {
            displayController.rightSelection();
            gameBoard.setSquare(index, _players[_round++ % 2]);
        }
        
        if(_checkWin()) {
            displayController.declareWinner(((_round) % 2) + 1);
        } else if(_round === 10) {
            console.log("DRAW");
        }

        displayController.updateTurn();
    }

    // Check if there is a winning combination
    const _checkWin = () => {
        const winCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6],            // Diagonals
        ];
        
        const currentPlayerMark = _players[(_round - 1) % 2].getMark();
        for(const combo of winCombinations) {
            if(gameBoard.getSquare(combo[0]) === currentPlayerMark && gameBoard.getSquare(combo[1]) === currentPlayerMark && gameBoard.getSquare(combo[2]) === currentPlayerMark) {
                return true;
            }
        }
    }

    // Restart the game, clear the game board
    const _restartGame = () => {
        _round = 1;
        gameBoard.clearBoard();
    }

    // Get the current round
    const getRound = () => _round;

    // Initialise click event for each square
    const _init = (() => {
        for(let i = 0; i < _boardHTML.length; i++) {
            _boardHTML[i].addEventListener('click', _playerTurn.bind(_boardHTML[i], i));
        }

        document.querySelector('.restart-btn').addEventListener('click', _restartGame);
        document.querySelector('.modal-toggle').addEventListener('click', _restartGame);
    })();

    return {
        getRound
    }
})();

// Display Controller Module
const displayController = (function() {
    // Show which players turn it is
    const _turnHTML = document.querySelector('.player-turn > h1');
    const updateTurn = () => {
        if(gameController.getRound() % 2) {
            _turnHTML.innerText = "Player 1's Turn";
        } else {
            _turnHTML.innerText = "Player 2's Turn";
        }
    }

    // Declare the winner
    const containerHTML = document.querySelector('.container');
    const modalWrapper = document.querySelector('.modal-wrapper');
    const modalButtons = document.querySelector('.modal-toggle');
    const modelTitle = document.querySelector('.modal-title');
    const declareWinner = (playerNum) => {
        modelTitle.innerText = 'Player ' + playerNum + ' Wins!'
        _toggleWinModal();
    };

    const _toggleWinModal = () => {
        containerHTML.classList.toggle('modal--active');
        modalWrapper.classList.toggle('modal--active');
    }

    // Toggles error for selecting an already selected square
    const wrongSelectionHTML = document.querySelector('.selection-err');
    const wrongSelection = () => {
        wrongSelectionHTML.classList.add('wrong-selection');
    }

    const rightSelection = () => {
        wrongSelectionHTML.classList.remove('wrong-selection');
    }

    // Initialise buttons to play again
    const _init = (() => {
        modalButtons.addEventListener('click', _toggleWinModal);
        modalButtons.addEventListener('click', updateTurn);
    })();

    return {
        updateTurn,
        declareWinner,
        wrongSelection,
        rightSelection
    }
})();