document.addEventListener("DOMContentLoaded", function () {

    let chess = [
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ],
        [0, 0, 0, 0, 0, 0, 0, 0, ]
    ];
    let field = document.querySelector('.chess_field');

    function draw() {
        let count = 0;
        for (let i = 0; i < chess.length; i++) {
            let row = chess[i];
            for (let k = 0; k < row.length; k++) {
                let newCell = document.createElement('div');
                newCell.addEventListener('click', horse); // обработчик события на каждый елемент
                newCell.classList.add('chess_block');
                newCell.setAttribute('data-x', `${k}`); // где х -это каждая ячейка строки 
                newCell.setAttribute('data-y', `${i}`); // где y -это каждая строка 
                if (count % 2 !== 0) {
                    newCell.classList.add('bg_black');
                }
                field.appendChild(newCell);
                count++;
            }
            count++;
        }

    }
    draw();

    function horse() {
        document.querySelectorAll('.chess_block').forEach(elem => {
            elem.classList.remove('active');
            elem.classList.remove('green');
        });
        this.classList.add('green');
        let x = this.dataset.x;
        let y = this.dataset.y;
        if (+x + 2 < 8 && +y + 1 < 8) {
            document.querySelector(`.chess_block[data-x="${+x + 2}"][data-y="${+y + 1}"]`).classList.add('active');
        }
        if (+x + 2 < 8 && +y - 1 >= 0) {
            document.querySelector(`.chess_block[data-x="${+x + 2}"][data-y="${+y - 1}"]`).classList.add('active');
        }
        if (+x - 2 >= 0 && +y + 1 < 8) {
            document.querySelector(`.chess_block[data-x="${+x - 2}"][data-y="${+y + 1}"]`).classList.add('active');
        }
        if (+x - 2 >= 0 && +y - 1 >= 0) {
            document.querySelector(`.chess_block[data-x="${+x - 2}"][data-y="${+y - 1}"]`).classList.add('active');
        }
        if (+x + 1 < 8 && +y + 2 < 8) {
            document.querySelector(`.chess_block[data-x="${+x + 1}"][data-y="${+y + 2}"]`).classList.add('active');
        }
        if (+x - 1 >= 0 && +y + 2 < 8) {
            document.querySelector(`.chess_block[data-x="${+x - 1}"][data-y="${+y + 2}"]`).classList.add('active');
        }
        if (+x + 1 < 8 && +y - 2 >= 0) {
            document.querySelector(`.chess_block[data-x="${+x + 1}"][data-y="${+y - 2}"]`).classList.add('active');
        }
        if (+x - 1 >= 0 && +y - 2 >= 0) {
            document.querySelector(`.chess_block[data-x="${+x - 1}"][data-y="${+y - 2}"]`).classList.add('active');
        }
    }
});