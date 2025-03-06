// press the button and the game will start

let startButton = document.getElementById('startButton');
let resetButton = document.getElementById('resetButton');
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', reset)
let allItems = document.querySelectorAll('div')
let currentSpins = 0;

const spinDuration = 2000; // Total spin duration in milliseconds
const spinInterval = 50; // Interval between item changes in milliseconds
const numberOfSpins = spinDuration / spinInterval;
let moneyValue, moneyLost = 0;
let moneyWon = 0;


allItems.forEach(
    i => i.innerHTML = ['❓']
)


// Get a random items to put it

const items = [
    '🍭',
    '❌',
    '⛄️',
    '🦄',
    '🍌',
    '💩',
    '👻',
    '😻',
    '💵',
    '🤡',    
    '🦖',
    '🍎',
    '😂',
    '🖕',
]

function startGame(){
    moneyValue = Number(document.getElementById("money").value);
    if(checkMoney(moneyValue) == 0){
        currentSpins = 0;
        spinStep()
        
    }
    else{
        alert("Please try again");
    }

}

function reset(){
    allItems.forEach(
        i => i.innerHTML = ['❓']
    )    
}

function checkMoney(moneyV){
    let maxMoney = 100;
    let minMoney = 10;
    if(moneyV > maxMoney){
        alert(`Please be aware that the maximun is ${maxMoney} per wheel \n try putting a lower amount`);
        return 2;
    }
    else if(moneyV < minMoney){
        alert(`Please try to put a minimun of ${minMoney}`)
        return 1;
    }
    else{
        return 0;
    }
}

// Make the the spin as a slot machine
function updateItems(){
    for(let i = 0; i< allItems.length; i++){
        let box = allItems[i];
        box.innerHTML = items[Math.floor(Math.random() * items.length)];
    }
}

function spinStep(){
    updateItems();
    currentSpins ++;

    if(currentSpins < numberOfSpins){
        setTimeout(spinStep, spinInterval)
    }
    else{
        updateItems()
        checkWin()
    }



}

function checkWin(){
    /* 
    --> Ways of winning:
        All items are the same
    
    */
    let columnOneItems = document.querySelectorAll('.lineOne');
    let columnTwoItems = document.querySelectorAll('.lineTwo');
    let columnThreeItems = document.querySelectorAll(".lineThree");
    let columnFourItems = document.querySelectorAll(".lineFour");
    let columnChecker = (items) =>{
        if(items[0].innerHTML == items[1].innerHTML && items[1].innerHTML == items[2].innerHTML &&
            items[2].innerHTML == items[3].innerHTML && items[3].innerHTML == items[4].innerHTML){
            return 1;
        }
        else{
            console.log(items[0].innerHTML + items[1].innerHTML + items[2].innerHTML + items[3].innerHTML + items[4].innerHTML)
            return 0;
        }
        
    }

    let columnOneCheck= columnChecker(columnOneItems);
    let columnTwoCheck = columnChecker(columnTwoItems);
    let columnThreeCheck = columnChecker(columnThreeItems);
    let columnFourCheck = columnChecker(columnFourItems);


    if(columnOneCheck == 0 || columnTwoCheck == 0 || columnThreeCheck == 0 || columnFourCheck == 0){
        document.getElementById("result").innerHTML = 'YOU HAVE LOST 😂🫵' ;
        moneyLost -= moneyValue;
        document.getElementById("lostMoney").innerHTML = moneyLost;
    }
    else if( columnOneCheck == 1 || columnTwoCheck == 1 || columnThreeCheck == 1 || columnFourCheck == 1){
        document.getElementById("result").innerHTML = 'YOU HAVE WON 😕' ;
        moneyWon += moneyValue * 20;
        document.getElementById("wonMoney").innerHTML = moneyWon;
    }



}