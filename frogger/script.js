const timeLeftDisp=document.querySelector('#time-left');
const resultDisp=document.querySelector('#result');
const startButton=document.querySelector('#start-button');
const squares = document.querySelectorAll('.grid div');
const logsLeft=document.querySelectorAll('.log-left')
const logsRight=document.querySelectorAll('.log-right')
const carsLeft=document.querySelectorAll('.car-left')
const carsRight=document.querySelectorAll('.car-right')

let currentI=76;
const width=9;
let timerId;
let outcomeTimerId;
let currTime=20;

function moveFrog(e){
    squares[currentI].classList.remove('frog');

    switch(e.key){
        case 'ArrowLeft':
            if(currentI%width!=0){
                currentI-=1;
            }
            break;
        case 'ArrowRight':
            if(currentI%width<width-1){
                currentI+=1;
            }
            break;
        case 'ArrowUp':
            if(currentI-width>=0){
                currentI-=width;
            }
            break;
        case 'ArrowDown':
            if(currentI+width<width*width){
                currentI+=width;
            }
            break;

    }

    squares[currentI].classList.add('frog');
}



function autoMoveElem(){
    currTime--;
    timeLeftDisp.textContent=currTime;
    logsLeft.forEach(logLeft=> moveLogLeft(logLeft));
    logsRight.forEach(logRight=> moveLogRight(logRight));
    carsLeft.forEach(carLeft=> moveCarLeft(carLeft));
    carsRight.forEach(carRight=> moveCarRight(carRight));
}

function checkOutcomes(){
    lose();
    win();
}

function moveLogLeft(logLeft){
    switch(true){
        case logLeft.classList.contains('l1'):
            logLeft.classList.remove('l1');
            logLeft.classList.add('l2');
            break;
        case logLeft.classList.contains('l2'):
            logLeft.classList.remove('l2');
            logLeft.classList.add('l3');
            break;
        case logLeft.classList.contains('l3'):
            logLeft.classList.remove('l3');
            logLeft.classList.add('l4');
            break;
        case logLeft.classList.contains('l4'):
            logLeft.classList.remove('l4');
            logLeft.classList.add('l5');
            break;
        case logLeft.classList.contains('l5'):
            logLeft.classList.remove('l5');
            logLeft.classList.add('l1');
            break;
    
    }

}

function moveLogRight(logRight){
    switch(true){
        case logRight.classList.contains('l1'):
            logRight.classList.remove('l1');
            logRight.classList.add('l5');
            break;
        case logRight.classList.contains('l2'):
            logRight.classList.remove('l2');
            logRight.classList.add('l1');
            break;
        case logRight.classList.contains('l3'):
            logRight.classList.remove('l3');
            logRight.classList.add('l2');
            break;
        case logRight.classList.contains('l4'):
            logRight.classList.remove('l4');
            logRight.classList.add('l3');
            break;
        case logRight.classList.contains('l5'):
            logRight.classList.remove('l5');
            logRight.classList.add('l4');
            break;
    
    }

}

function moveCarLeft(carLeft){
    switch(true){
        case carLeft.classList.contains('c1'):
            carLeft.classList.remove('c1');
            carLeft.classList.add('c2');
            break;
        case carLeft.classList.contains('c2'):
            carLeft.classList.remove('c2');
            carLeft.classList.add('c3');
            break;
        case carLeft.classList.contains('c3'):
            carLeft.classList.remove('c3');
            carLeft.classList.add('c1');
            break;
    }

}

function moveCarRight(carRight){
    switch(true){
        case carRight.classList.contains('c1'):
            carRight.classList.remove('c1');
            carRight.classList.add('c3');
            break;
        case carRight.classList.contains('c2'):
            carRight.classList.remove('c2');
            carRight.classList.add('c1');
            break;
        case carRight.classList.contains('c3'):
            carRight.classList.remove('c3');
            carRight.classList.add('c2');
            break;
    }

}

function lose(){
    if(
    squares[currentI].classList.contains('c1')||
    squares[currentI].classList.contains('l4')||
    squares[currentI].classList.contains('l5')|| 
    currTime<=0){
        resultDisp.textContent='you lose';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        squares[currentI].classList.remove('frog');
        document.removeEventListener('keyup',moveFrog);

    }
}

function win(){
    if(squares[currentI].classList.contains('ending-block')){
        resultDisp.textContent='you win';
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        document.removeEventListener('keyup',moveFrog);

    }
}

startButton.addEventListener('click',()=>{
    if(timerId){
        clearInterval(timerId);
        clearInterval(outcomeTimerId);
        timerId=null;
        outcomeTimerId=null;
        document.removeEventListener('keyup',moveFrog);
    }
    else{
        timerId= setInterval(autoMoveElem,1000);
        outcomeTimerId=setInterval(checkOutcomes,50);
        document.addEventListener('keyup',moveFrog);
    }
} )
