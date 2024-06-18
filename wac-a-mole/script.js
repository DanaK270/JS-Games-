const squares= document.querySelectorAll(".square");
const mole= document.querySelector(".mole");
const timeLeft= document.querySelector("#time-left");
const score= document.querySelector("#score");
const button=document.querySelector("#button");


let result=0;
let hitPosition;
let time=60;
let timerId=null;

button.addEventListener("click",startGame);

function startGame(){
    moveMole();    
    function randomSquare(){
        squares.forEach(square => {
            square.classList.remove("mole");
        });

        let randomSquare= squares[Math.floor(Math.random()*9)];
        randomSquare.classList.add("mole");

        hitPosition=randomSquare.id;
        
    }

    squares.forEach(square => {
        square.addEventListener('mousedown', ()=>{
            if(square.id==hitPosition){
                result++;
                score.textContent=result;
                hitPosition=null;
            }
        })
    })

    function moveMole(){
        
        timerId=setInterval(randomSquare,1000);
    }



    function countDown(){
        time--;
        timeLeft.textContent=time;

        if(time==0){
            clearInterval(countDownId);
            alert("time is up! \n your score is = "+result);
            score.textContent=0;
            timeLeft.textContent=60;
            clearInterval(timerId);
            time=60;

        }

    }

    let countDownId= setInterval(countDown,1000);
}
