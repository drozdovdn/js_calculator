const calc = document.querySelector('.calculator');//Получаем ссылку на калькулятор
const display = document.getElementById('calculator__display');//Получаем ссылку на дисплей калькулятора
let state = null;
let flagCalculation = '';
let flagEquality = false;

const setCalc = (e) => {
    let target = e.target;
    if(target.className !== '.calculator__button') {
      target = target.closest('.calculator__button')
    }
    if(target.innerHTML.slice(0,2) === 'x^') {
        squareNumber();
    }
    if(target.innerHTML === '+') {
        additionNumber();
    }
    if(target.innerHTML === '-') {
        subtractionNumber();
    }
    if(target.innerHTML === 'x') {
        multiplicationNumber();
    }
    if(target.innerHTML === '/') {
        divisionNumber();
    }
    addNumber(target);
    clearDisplay(target);
    deleteDisplay(target);
    if(target.innerHTML === '=') {
        flagEquality = true;
        equalityFunction();
    }
    console.log(target.innerHTML)
};

//Вызываем событие click на calculator
calc.addEventListener('click', setCalc);

//Функция равенства
function equalityFunction() {
        console.log(display.innerHTML);
        if(flagCalculation === 'addition') {
            const strResult = String(state + Number(display.innerHTML));
            if(strResult.length > 14) {
                display.innerHTML = reductionNumber(strResult);
            } else display.innerHTML = state + Number(display.innerHTML);
        }
        if(flagCalculation === 'subtraction') {
            display.innerHTML = state - Number(display.innerHTML);
        }
        if(flagCalculation === 'multiplication') {
            let strResult = String(state * Number(display.innerHTML));
            if(strResult.length > 14) {
                display.innerHTML = reductionNumber(strResult);
            } else display.innerHTML = state * Number(display.innerHTML);
        }
        if(flagCalculation === 'division') {
            if (display.innerHTML === '0') {
                display.innerHTML = 'No operation';
            } else {
                const result = state / Number(display.innerHTML);
                if (result ^ 0 === result) {
                    display.innerHTML = result;
                } else display.innerHTML = result.toFixed(13);
                }
            }
    state = null;
    flagCalculation = '';
}
//Функция сокращения записи числа
function reductionNumber(strNumber) {
    let number = Number(strNumber);
    if(number^0 === number) {
        let power = strNumber.length - 1;
        let newNumber = strNumber[0] + '.';
        let massNumber = strNumber.split('');
        massNumber.shift();
        newNumber +=massNumber.join('');
        let result = Number(newNumber).toFixed(2)
        return(result + "e" + power);
    }
}
//Функция возведения в квадрат
function squareNumber() {
    state = +display.innerHTML;
    state *= state;
    let result = String(state);
    if(result.length > 14) {
        display.innerHTML = reductionNumber(result);
    } else display.innerHTML = state;
}
//Функция деления
function divisionNumber() {
    state = +display.innerHTML;
    flagCalculation = 'division';
    display.innerHTML = '';
}
//Функция умножения
function multiplicationNumber() {
    state = +display.innerHTML;
    flagCalculation = 'multiplication';
    display.innerHTML = '';
}
//Функция вычитания
function subtractionNumber() {
    state = +display.innerHTML;
    flagCalculation = 'subtraction';
    display.innerHTML='';
}
//Функфия сложения
function additionNumber() {
    state = +display.innerHTML;
    flagCalculation = 'addition';
    display.innerHTML='';
}
//Удаление посимвольно
function deleteDisplay(tar) {
    let str = display.innerHTML;
    if(tar.innerHTML === 'delete') {
        if(str.length === 1) {
            display.innerHTML = 0;
        } else {
            let str2 = str.split('');
            str2.pop();
            str = str2.join('');
            display.innerHTML = str;
        }
    }
}
//Функция очистки дисплея
function clearDisplay(tar) {
    if(tar.innerHTML === 'CE') {
        display.innerHTML = '0';
    }
};
//Функфия добавления чисел
function addNumber(tar) {
    if(display.innerHTML.length <= 13) {
        if (
            (tar.innerHTML === '0') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '1') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '2') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '3') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '4') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '5') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '6') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '7') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '8') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '9') && (display.innerHTML !== '0') && (flagEquality === false) ||
            (tar.innerHTML === '.') && (display.innerHTML !== '') && (flagEquality === false)
        ) {
            display.innerHTML += tar.innerHTML;
        } else if (
            (tar.innerHTML === '.') ||
            (tar.innerHTML === '-') ||
            (tar.innerHTML === '0') ||
            (tar.innerHTML === '1') ||
            (tar.innerHTML === '2') ||
            (tar.innerHTML === '3') ||
            (tar.innerHTML === '4') ||
            (tar.innerHTML === '5') ||
            (tar.innerHTML === '6') ||
            (tar.innerHTML === '7') ||
            (tar.innerHTML === '8') ||
            (tar.innerHTML === '9')
        ) {
            display.innerHTML = tar.innerHTML;
            flagEquality = false;
        }
    } else display.innerHTML = display.innerHTML;
};