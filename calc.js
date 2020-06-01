document.addEventListener("DOMContentLoaded", function () {

    let input = document.querySelector('#i_calc');

    // Маска для инпута 
    $('input[name=calc]').mask('000 000 000', {
        reverse: true
    });

    // При перезагрузке страницы инпут очищается
    if (location.reload) {
        document.querySelector('#i_calc').value = '';
    }

    // Вывод значения инпута
    // input.addEventListener('input', function () {
    //     let value = this.value;
    //     console.log(value);
    // });

    // Запрет буков, чтобы не было буков
    document.getElementById('i_calc').onkeydown = function (e) {
        return !(/^[А-Яа-яA-Za-z ]$/.test(e.key));
    };


    let nums = document.querySelectorAll('.cell');
    nums.forEach(elem => {
        //Подцветка при нажатии
        elem.addEventListener('mousedown', function () {
            if (elem.classList.contains('orange')) {
                elem.classList.add('bg_cell_orange');
            } else {
                elem.classList.add('bg_cell_grey');
            }
            this.addEventListener('mouseup', function () {
                if (this.classList.contains('orange')) {
                    this.classList.remove('bg_cell_orange');
                } else {
                    this.classList.remove('bg_cell_grey');
                }
            });
        });



    });

    // Выполняем расчет
    let arr = [];
    document.querySelectorAll('.sign').forEach(elem => {
        elem.addEventListener('click', function () {
            let operator;
            if (elem.dataset.del) {
                arr = [];
                input.value = '';
                semiResultOff();
                input.focus();
            } else if (elem.dataset.sign !== '=' && elem.dataset.sign !== '%') {
                operator = elem.dataset.sign;
                let num = input.value.match(/[^,\s]+/g).join(''); // число без пробелов
                arr.push(num);
                arr.push(operator);
                if (arr.length > 2) {
                    let newArr = arr.slice(0, 3);
                    let lastArr = arr.slice(3);
                    arr.splice(0, 3);
                    let firstNumOfArr = operate(newArr);
                    console.warn(firstNumOfArr);
                    semiResultOn(firstNumOfArr);
                    arr.unshift(`${firstNumOfArr}`);
                    console.error(arr);
                }
                input.value = '';
                input.focus();
            } else if (elem.dataset.sign == '=') {
                let num = input.value.match(/[^,\s]+/g).join('');
                arr.push(num);
                console.error(arr);
                operate(arr); // запускаем функцию OPERATE
                arr = [];
                input.focus();
                deleteInputValue();
                semiResultOff();
            } else if (elem.dataset.sign == '%' && arr.length > 0) {
                operator = elem.dataset.sign;
                let num = input.value.match(/[^,\s]+/g).join('');
                arr.push(num);
                percent(arr);
                arr = [];
                input.focus();
                deleteInputValue();
            } else if (elem.dataset.sign == '%' && arr.length == 0) {
                let num = input.value.match(/[^,\s]+/g).join('');
                input.value = num / 100;
            }
            console.log(arr);
        });
    });

    function percent(arr) {
        let num1 = +arr[0],
            num2 = +arr[2];
        input.value = (num1 * num2) / 100;
    }

    function operate(arr) {
        let num1 = +arr[0],
            num2 = +arr[2];
        if (arr[1] == '+') {
            input.value = num1 + num2;
            arr = [input.value];
            console.warn(arr);
            return input.value;
        }
        if (arr[1] == '-') {
            input.value = num1 - num2;
            arr = [input.value];
            console.warn(arr);
            return input.value;
        }
        if (arr[1] == '/') {
            input.value = num1 / num2;
            arr = [input.value];
            console.warn(arr);
            return input.value;
        }
        if (arr[1] == '*') {
            input.value = num1 * num2;
            arr = [input.value];
            console.warn(arr);
            return input.value;
        }
    }


    // Удаление инпута после нажатия на знак равно '='
    function deleteInputValue() {
        input.addEventListener('keydown', function delKey() {
            input.value = '';
            input.removeEventListener('keydown', delKey);
        });
    }

    //Добавляем нажатие на кнопки 
    document.querySelectorAll('.cell[data-num]').forEach(elem => {
        elem.addEventListener('click', function q() {
            input.value += elem.dataset.num;
        });
    });

    // Окно промежуточного результата ON and OFF
    let numRes = document.querySelector('.num-res');
    let semiResBlock = document.querySelector('.calc_semi-result');

    function semiResultOn(num) {
        if (num) {
            semiResBlock.classList.remove('hide');
            tooltip.textContent = num;
        }
    }

    function semiResultOff() {
        semiResBlock.classList.add('hide');
        tooltip.textContent = '';
    }


    // Popper
    const tooltip = document.querySelector('.tooltip');



});