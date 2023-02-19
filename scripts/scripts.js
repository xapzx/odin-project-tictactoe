// Gameboard Module
const gameBoard = (function() {
    const _board = new Array(9);

    // Renders the game board
    const _render = (() => {
        const boardHtml = document.querySelector('.game-container');
        for(let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            boardHtml.appendChild(square);
        }
    })();
    
    // Mark the player's selected square
    const setSquare = (index, player) => {
        const boardSquare = document.querySelector(`.square:nth-child(${index+1})`);
        const _mark = player.getMark();
        boardSquare.innerText = _mark;
        _board[index] = _mark;
    }

    const clearBoard = () => {
        const _boardHTML = Array.from(document.querySelectorAll('.square'));
        for(let i = 0; i < 9; i++) {
            _board[i] = null;
            _boardHTML[i].innerText = "";
        }
    }

    return {
        setSquare,
        clearBoard
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

    const playerTurn = (index) => {
        if(_round === 9) console.log("DRAW");

        gameBoard.setSquare(index, _players[_round++ % 2]);
    }

    // Initialise click event for each square
    const _init = (() => {
        for(let i = 0; i < _boardHTML.length; i++) {
            _boardHTML[i].addEventListener('click', playerTurn.bind(_boardHTML[i], i));
        }
    })();
})();