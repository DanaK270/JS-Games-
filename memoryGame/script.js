const cardArray=[
    {
        name: 'fries',
        img: 'imgs/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'imgs/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'imgs/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'imgs/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'imgs/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'imgs/pizza.png',
    },
    {
        name: 'fries',
        img: 'imgs/fries.png',
    },
    {
        name: 'cheeseburger',
        img: 'imgs/cheeseburger.png',
    },
    {
        name: 'hotdog',
        img: 'imgs/hotdog.png',
    },
    {
        name: 'ice-cream',
        img: 'imgs/ice-cream.png',
    },
    {
        name: 'milkshake',
        img: 'imgs/milkshake.png',
    },
    {
        name: 'pizza',
        img: 'imgs/pizza.png',
    }
];
cardArray.sort(()=>0.5-Math.random());

const displayGrid = document.querySelector('#grid');
const cardsChosen=[];

function createBoard(){
    for(let i=0; i< cardArray.length;i++){
        const card = document.createElement('img');
        card.setAttribute('src','imgs/blank.png');
        card.setAttribute('data-id', i);
        card.addEventListener('click',flipCard)
        displayGrid.appendChild(card);
    }
}

createBoard();

function flipCard(){
    const cardId = this.getAttribute('data-id');
    cardsChosen.push(cardArray[cardId.name]);
    this.setAttribute('src',cardArray[cardId.img]);
    console.log(this);
}