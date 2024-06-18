const grid=document.querySelector(".grid");
const blockWidth=100;
const blockHeight=20;
const boardWidth=560;
const boardHeight=300;
let timerId;
const ballDiameter=20;
let xDir=-2;
let yDir=2;
let score=0;

const scoreDisp=document.querySelector('#score');

const userStart=[230,10];
let currentPos=userStart;

const ballStart=[270,40];
let ballPos=ballStart;


class Block{
    constructor(xAxis,yAxis){
        this.bottomLeft=[xAxis,yAxis];
        this.bottomRight=[xAxis+blockWidth,yAxis];
        this.topLeft=[xAxis,yAxis+blockHeight];
        this.topRight=[xAxis+blockWidth,yAxis+blockHeight];
    }

}

const blocks=[
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),

    new Block(10,240),
    new Block(120,240),
    new Block(230,240),
    new Block(340,240),
    new Block(450,240),
   
    new Block(10,210),
    new Block(120,210),
    new Block(230,210),
    new Block(340,210),
    new Block(450,210)
]


function addBlocks(){
    for(let i=0;i<blocks.length;i++){
        const block=document.createElement('div');
        block.classList.add('block');
        block.style.left=blocks[i].bottomLeft[0]+'px';
        block.style.bottom=blocks[i].bottomLeft[1]+'px';
        grid.appendChild(block);
    }
    
}

addBlocks();

const user=document.createElement('div');
user.classList.add('user');
user.style.left= currentPos[0]+'px';
user.style.bottom= currentPos[1]+'px';
grid.appendChild(user)

function drawUser(){
    user.style.left=currentPos[0]+'px';
    user.style.bottom=currentPos[1]+'px'
}

function drawBall(){
    ball.style.left=ballPos[0]+'px';
    ball.style.bottom=ballPos[1]+'px';
}

function moveUser(e){
    switch(e.key){
        case'ArrowLeft':
            if(currentPos[0]>0){
                currentPos[0]-=10;
                drawUser();
            }
            break;
        case'ArrowRight':
            if(currentPos[0]<boardWidth-blockWidth){
                currentPos[0]+=10;
                drawUser();
            }
            break;

    }
}

document.addEventListener('keydown',moveUser);

const ball=document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall(){
    ballPos[0]+=xDir;
    ballPos[1]+=yDir;
    drawBall();
    checkCollisions();
}

timerId= setInterval(moveBall,25.7);


function checkCollisions(){

    //check for block collisions 
    for(let i=0;i<blocks.length;i++){
         if(
            (ballPos[0]>blocks[i].bottomLeft[0]&&ballPos[0]<blocks[i].bottomRight[0])&&
            ((ballPos[1]+ballDiameter)>blocks[i].bottomLeft[1]&&ballPos[1]<blocks[i].topLeft[1])
         ){
            const allBlocks =Array.from(document.querySelectorAll('.block'));
            allBlocks[i].classList.remove('block');
            blocks.splice(i,1);
            changeDirection();
            score++;
            scoreDisp.innerHTML=score;

            //check for win
            if(blocks.length==0){
                scoreDisp.innerHTML='YOU WIN';
                clearInterval(timerId);
                document.removeEventListener('keydown',moveUser);
            }
         }
    }

    //check for wall collisions 
    if(ballPos[0]>=(boardWidth-ballDiameter)||
    ballPos[1]>=(boardHeight-ballDiameter)||
    ballPos[0]<=0){
        changeDirection();
    }

    //check for user collisions
    if(
        (ballPos[0]>currentPos[0]&&ballPos[0]<currentPos[0]+blockWidth)&&
        (ballPos[1]>currentPos[1]&&ballPos[1]<currentPos[1]+blockHeight)
    ){
        changeDirection();
    }

    //check for game over
    if(ballPos[1]<=0){
        clearInterval(timerId);
        scoreDisp.innerHTML='you lose';
        document.removeEventListener('keydown',moveUser);
    }


}

function changeDirection(){
    if(xDir===2 && yDir===2){
        yDir=-2;
        return;
    }
    if(xDir==2&& yDir==-2){
        xDir=-2;
        return;
    }
    if(xDir==-2&& yDir==-2){
        yDir=2;
        return;
    }
    if(xDir==-2&& yDir==2){
        xDir=2;
        return;
    }



}