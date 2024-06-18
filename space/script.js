const grid=document.querySelector('.grid');
let CurrShooterI =202; 
let width=15;
let direction =1;
let invadorsId;
let goingRight=true;
let aliensRemoved=[];

for(let i=0;i<255;i++){
    const square=document.createElement('div');
    grid.appendChild(square);
}

const squares =Array.from(document.querySelectorAll('.grid div'));

const invadors=[
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
]

function draw(){
    for(let i=0;i<invadors.length;i++){
        if(!aliensRemoved.includes(i)){
            squares[invadors[i]].classList.add('invador');
        }
        
    }
}

draw();

function remove(){
    for(let i=0;i<invadors.length;i++){
        squares[invadors[i]].classList.remove('invador');
    }
}

squares[CurrShooterI].classList.add('shooter');

function moveShooter(e){
    squares[CurrShooterI].classList.remove('shooter');
    switch(e.key){
        case 'ArrowLeft':
            if (CurrShooterI%width !=0 ) CurrShooterI-=1;
            break;
        case 'ArrowRight':
            if (CurrShooterI%width <width-1 ) CurrShooterI+=1;
            break;
    }
    squares[CurrShooterI].classList.add('shooter');
}
document.addEventListener('keydown',moveShooter);

function moveInvadors(){
    const leftEdge=invadors[0]%width===0;
    const rightEdge=invadors[invadors.length-1]%width===width-1;
    remove();

    if(rightEdge &&goingRight){
        for(let i=0;i<invadors.length;i++){
            invadors[i]+=width-1;
            direction=-1;
            goingRight=false;
        }
    }

    if(leftEdge &&!goingRight){
        for(let i=0;i<invadors.length;i++){
            invadors[i]+=width-1;
            direction=1;
            goingRight=true;
        }
    }

    for(let i=0; i<invadors.length;i++){
        invadors[i]+=direction;

    }
    draw();

    if(squares[CurrShooterI].classList.contains('invador','shooter')){
        alert('game over');
        clearInterval(invadorsId);
    }

    for(let i=0;i<invadors.length;i++){
        if(invadors[i]>squares.length){
            alert('game over');
            clearInterval(invadorsId);
        }
    }
    if(aliensRemoved.length===invadors.length){
        alert('you win');
        clearInterval(invadorsId);
    }
}

invadorsId= setInterval(moveInvadors,500)

function shoot(e){
    let laserId;
    let curLaserI=CurrShooterI;

    function moveLaser(){
        squares[curLaserI].classList.remove('laser');
        curLaserI-=width;
        squares[curLaserI].classList.add('laser');

        if(squares[curLaserI].classList.contains('invador')){
            squares[curLaserI].classList.remove('laser');
            squares[curLaserI].classList.remove('invador');
            squares[curLaserI].classList.add('boom');

            setTimeout(()=>squares[curLaserI].classList.remove('boom'),300);
            clearInterval(laserId);

            const alienRemoved=invadors.indexOf(curLaserI);
            aliensRemoved.push(alienRemoved)
        }

    }

    switch(e.key){
        case 'ArrowUp':
            laserId=setInterval(moveLaser,100)
    }
}

document.addEventListener('keydown',shoot)