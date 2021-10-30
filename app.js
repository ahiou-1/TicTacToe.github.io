const gameSection = document.querySelector('.game-section');

//=====HTML 만드는 로직=====//
for(let i = 0; i < 3; i++) {
    const createDivHor = document.createElement('div');
    createDivHor.setAttribute('class', `hor-${i+1}`)
    gameSection.appendChild(createDivHor)
}

const divHor1 = document.querySelector('.hor-1')
const divHor2 = document.querySelector('.hor-2')
const divHor3 = document.querySelector('.hor-3')

for(let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
        if(i === 0) {
            const createInnerDiv = document.createElement('div')
            createInnerDiv.setAttribute('class', `num-${j}`)
            createInnerDiv.setAttribute('id', 'inner-div')
            divHor1.appendChild(createInnerDiv)
        }
        if(i === 1) {
            const createInnerDiv = document.createElement('div')
            createInnerDiv.setAttribute('class', `num-${3+j}`)
            createInnerDiv.setAttribute('id', 'inner-div')
            divHor2.appendChild(createInnerDiv)
        }
        if(i === 2) {
            const createInnerDiv = document.createElement('div')
            createInnerDiv.setAttribute('class', `num-${6+j}`)
            createInnerDiv.setAttribute('id', 'inner-div')
            divHor3.appendChild(createInnerDiv)
        }
    }
}

const innerDiv = document.querySelectorAll('#inner-div')

//=====3X3 테이블 만드는 로직=====//
const table = Array.from(Array(3), () =>  Array(3).fill(null) ) 

for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {
        table[i][j] = null
    }
}

//=====게임 승리 체크 로직=====//
let hor1 = 0;
let hor2 = 0;
let hor3 = 0;

let ver1 = 0;
let ver2 = 0;
let ver3 = 0;

let cross1 = 0;
let cross2 = 0;


function checkHorizontal() {
    hor1 = 0;
    hor2 = 0;
    hor3 = 0;

    for (let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(i === 0) {
                hor1 += table[0][j]
            }
            if(i === 1) {
                hor2 += table[1][j]
            }
            if(i === 2) {
                hor3 += table[2][j]
            }
        }
    }
}

function checkVertical() {
    ver1 = 0;
    ver2 = 0;
    ver3 = 0;

    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(i === 0) {
                ver1 += table[j][0]
            }
            if(i === 1) {
                ver2 += table[j][1]
            }
            if(i === 2) {
                ver3 += table[j][2]
            }
        }
    }
}

function checkCross() {
    cross1 = 0;
    cross2 = 0;

    for(let i = 0; i < 2; i++) {
        for(let j = 0; j < 3; j++) {
            if(i === 0) {
                cross1 += table[j][j]
            }
            if(i === 1) {
                cross2 = table[0][2] + table[1][1] + table[2][0]
            }
        }
    }
}

//=====번갈아 클릭시 O,X 로직=====//
let myTurn = true;

function onClick(event) {
    const className = event.target.className;

    switchTurn(className);
    checkWinner();
    paintOX(className);
    event.target.removeEventListener('click', onClick);
}

function switchTurn(className) {
    myTurn = !myTurn;
    if(myTurn) {
        switch (className) {
            case 'num-0': 
                table[0][0] = 1
                break;
            case 'num-1': 
                table[0][1] = 1
                break;
            case 'num-2': 
                table[0][2] = 1
                break;
            case 'num-3': 
                table[1][0] = 1
                break;
            case 'num-4': 
                table[1][1] = 1
                break;
            case 'num-5': 
                table[1][2] = 1
                break;
            case 'num-6': 
                table[2][0] = 1
                break;
            case 'num-7': 
                table[2][1] = 1
                break;
            case 'num-8': 
                table[2][2] = 1
                break;
        }

    } else if (!myTurn) {
        switch (className) {
            case 'num-0': 
                table[0][0] = 10
                break;
            case 'num-1': 
                table[0][1] = 10
                break;
            case 'num-2': 
                table[0][2] = 10
                break;
            case 'num-3': 
                table[1][0] = 10
                break;
            case 'num-4': 
                table[1][1] = 10
                break;
            case 'num-5': 
                table[1][2] = 10
                break;
            case 'num-6': 
                table[2][0] = 10
                break;
            case 'num-7': 
                table[2][1] = 10
                break;
            case 'num-8': 
                table[2][2] = 10
                break;
        }
    }
}

function checkWinner() {
    checkHorizontal();
    checkVertical();
    checkCross();

    let horizontalArr = [hor1, hor2, hor3];
    let verticalArr = [ver1, ver2, ver3];
    let crossArr = [cross1, cross2];

    if(horizontalArr.some(score => score === 3 || score === 30)) {
        showWinner();
        for(let i = 0; i < innerDiv.length; i++) {
            innerDiv[i].removeEventListener('click', onClick)
        }
    } else if(verticalArr.some(score => score === 3 || score === 30)) {
        showWinner();
        for(let i = 0; i < innerDiv.length; i++) {
            innerDiv[i].removeEventListener('click', onClick)
        }
    } else if(crossArr.some(score => score === 3 || score === 30)) {
        showWinner();
        for(let i = 0; i < innerDiv.length; i++) {
            innerDiv[i].removeEventListener('click', onClick)
        }
    } else {
        decideDraw();
    }
}

function paintOX(className) {
    const selectedTile = document.querySelector(`.${className}`);
    const span = document.createElement('span');
    span.setAttribute('class', 'material-icons md-48');
    
    if(myTurn) { // X
        span.textContent = 'close';
        selectedTile.appendChild(span);
        
    } else if(!myTurn) { // O
        span.textContent = 'circle';
        selectedTile.appendChild(span);
    }
}

//=====게임 끝내는 로직=====//
let draw = 0;
function showWinner() {
    const result = document.createElement('p')
    result.setAttribute('class', 'result');
    result.textContent = 'win!'
    gameSection.appendChild(result)
}

function showDraw() {
    const result = document.createElement('p')
    result.setAttribute('class', 'result');
    result.textContent = 'draw!'
    gameSection.appendChild(result)
}

function decideDraw() {
    let mergeTable = [...table[0], ...table[1], ...table[2]];

    for(let i = 0; i < mergeTable.length; i++){
        if(mergeTable.every(score => score != null)){
            draw += 1;
        }
    }

    if(draw === 9) {
        showDraw();
    }
}

//=====게임을 켜고 끄는 로직=====//
const playBtn = document.querySelector('.playBtn');
const resetBtn = document.querySelector('.resetBtn');

let started = false;

playBtn.addEventListener('click', playGame)
resetBtn.addEventListener('click', resetGame)

function playGame() {
    started = true;
    
    for(let i = 0; i < innerDiv.length; i++) {
        innerDiv[i].addEventListener('click', onClick)
    }

    playBtn.style.visibility = 'hidden';
    resetBtn.style.visibility = 'visible';
}

function resetGame() {
    draw = 0;
    if(started) {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                table[i][j] = null
            }
        }
        for(let i = 0; i < innerDiv.length; i++) {
            innerDiv[i].innerHTML = '';
            innerDiv[i].removeEventListener('click', onClick)
        }
        const result = document.querySelector('.result');
        result.remove();
    }

    playBtn.style.visibility = 'visible';
    resetBtn.style.visibility = 'hidden';
}
