document.addEventListener('DOMContentLoaded', function () {

    const grid = document.querySelector('.minesweeper_field');
    let width = 10;
    let bombAmount = 20;
    let squares = [];


    //create Board
    function createBoard() {
        // get shuffled game array with random bombs
        const bombArray = Array(bombAmount).fill('bomb'); //get array with 20 empty slots, then fill it BOMB
        const emptyArray = Array(width * width - bombAmount).fill('valid');
        const gameArray = emptyArray.concat(bombArray);
        const shuflledArray = gameArray.sort(() => Math.random() - 0.5);

        for (let i = 0; i < width * width; i++) {
            let square = document.createElement('div');
            square.setAttribute('id', i);
            square.classList.add(shuflledArray[i]);
            grid.appendChild(square);
            squares.push(square);
        }
    }
    createBoard();

});