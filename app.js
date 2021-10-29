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

console.table(table)

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
    for(let i = 0; i < 3; i++) {
        for(let j = 0; j < 3; j++) {
            if(i === 0) {
                ver1 += table[j][0]
            }
            if(i === 1) {
                ver2 += table[j][1]
            }
            if(i === 0) {
                ver3 += table[j][2]
            }
        }
    }
}

function checkCross() {
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
    checkWinner()
    console.table(table)
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

// let horizontalArr = [hor1, hor2, hor3];
// let verticalArr = [ver1, ver2, ver3];
// let crossArr = [cross1, cross2];
function checkWinner() {
    checkHorizontal();
    checkVertical();
    checkCross();
    // Array 들을 어디에 둬야 하는지 모르겠다.
    let horizontalArr = [hor1, hor2, hor3];
    let verticalArr = [ver1, ver2, ver3];
    let crossArr = [cross1, cross2];

   
    
}

for(let i = 0; i < innerDiv.length; i++) {
    innerDiv[i].addEventListener('click', onClick)
}
