let rows = 3;
let cols = 3;
let table = document.querySelector('#field');

let colors = ['red', 'green', 'blue'];

function chooseColor(colors) {
    let randomColor = Math.floor(Math.random() * (colors.length - 0) + 0);
    return colors[randomColor]; // возвращаем строкой цвет!
}

function createTable(table) {
    for (let i = 0; i < rows; i++) {
        let newRow = table.appendChild(document.createElement('tr'));
        for (let j = 0; j < cols; j++) {
            let newCell = document.createElement('td');
            newCell.style.backgroundColor = chooseColor(colors);
            newRow.appendChild(newCell);

        }
    }
}
createTable(table);


let cells = document.querySelectorAll('#field td');
cells.forEach(elem => {
    elem.addEventListener('click', function (event) {
        let currentCell = event.target;
        let currentColor = elem.style.backgroundColor;
        console.log(currentColor);
        for (let i = 0; i < colors.length; i++) {
            if (currentColor == colors[colors.length - 1]) {
                elem.style.backgroundColor = colors[0];
            } else if (currentColor == colors[i] && currentColor != colors[colors.length - 1]) {
                elem.style.backgroundColor = colors[i + 1];
            }
        }
        if (isWinner(currentCell)) {
            let conf = confirm('You won! Would you try again?');
            if (conf) {
                location.reload();
            }
        }
    });
});

function isWinner(currentCell) {
    let color = currentCell.style.backgroundColor;
    let count = 0;
    for (let elem of cells) {
        if (elem.style.backgroundColor != color) {
            count++;
        }
    }
    if (count == 0) {
        return true;
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let input = document.querySelector('.game');
let btn = document.querySelector('#submit');
let out = document.querySelector('.out');
let arr = ['камень', 'ножницы', 'бумага'];
let youCountWin = 0;
let compCountWin = 0;
// функция запуска раунда
function playRound(playerSelection, computerSelection, arr) {
    if (playerSelection == arr[0] && computerSelection == arr[0] || playerSelection == arr[1] && computerSelection == arr[1] || playerSelection == arr[2] && computerSelection == arr[2]) {
        out.textContent = "Draw";
    } else if (playerSelection == arr[0] && computerSelection == arr[1] || playerSelection == arr[1] && computerSelection == arr[2] || playerSelection == arr[2] && computerSelection == arr[0]) {
        youCountWin++;
        out.textContent = 'You won this round';
    } else {
        compCountWin++;
        out.textContent = 'Comp won this round';
    }
    result(youCountWin, compCountWin);
}

let playerSelection; // выбор игрока
let computerSelection; // выбор компьютера

//console.log(result) // выводим результат

btn.addEventListener('click', function () {
    playerSelection = input.value.toLowerCase();
    computerSelection = computerPlay(arr);
    playRound(playerSelection, computerSelection, arr);
});

function computerPlay(arr) {
    let rand = Math.floor(Math.random() * (arr.length - 0) + 0);
    return arr[rand];
}

function result(you, comp) {
    if (you == 5) {
        alert('You won');
    } else if (comp == 5) {
        alert('Comp won');
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

let tableScreen = document.querySelector('.table_screen');
let btnStart = document.querySelector('.btn_screen');
let wrapperScreen = document.querySelector('.wrapper_screen');


let f = 0;
btnStart.addEventListener('click', function () {
    let question = +prompt("Какое количество квадратов задать для новой сетки?");
    if (tableScreen.hasChildNodes()) {
        while (tableScreen.hasChildNodes()) {
            tableScreen.removeChild(tableScreen.lastChild);
        }
    }
    let rows = question;
    let cols = question;
    for (let i = 0; i < rows; i++) {
        let row = document.createElement('tr');
        tableScreen.appendChild(row);
        for (let j = 0; j < cols; j++) {
            let col = document.createElement('td');
            col.style.backgroundColor = `rgb(${0} ${0} ${0})`;
            col.style.opacity = 1;
            row.appendChild(col);
        }
    }
    let cellsScreen = document.querySelectorAll('.table_screen td');

    cellsScreen.forEach(elem => {
        elem.addEventListener('mouseenter', function (event) {
            let currentCell = event.target;
            let currentOpacity = currentCell.style.opacity;
            currentCell.style.opacity = `${currentOpacity - 0.4}`;

        });
    });
});