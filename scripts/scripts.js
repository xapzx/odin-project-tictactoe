
const gameBoard = (function() {
    const _board = new Array(9);

    const _render = () => {
        const boardHtml = document.querySelector('.game-container');
        for(let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            boardHtml.appendChild(square);
        }
    }
    
    const setSquare = (index) => {
        const boardSquare = document.querySelector(`.square:nth-child(${index+1})`);
        boardSquare.innerText = "O";
    }

    _render();
    return {
        setSquare
    }
})();