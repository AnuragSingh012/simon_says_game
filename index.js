gameSeq = [];
userSeq = [];

let btns = ["yellow", "red", "green", "blue"];

let start = false;
let level = 0;
let h2 = document.querySelector("h2");
let highestScore = 0;

document.addEventListener("keypress", () => {
    if(start == false) {
        console.log("key pressed");
        start = true;
        levelUp();
    }
});

function btnFlash(btn) {

    btn.classList.add("flash");
    setTimeout(() => {
        btn.classList.remove("flash");
    }, 150);
}

function userFlash(btn) {

    btn.classList.add("userFlash");
    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 200);
}


function gameSound() {
    var audio = new Audio("gameSeq.wav");
    audio.play();
}


function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    btnFlash(randBtn);
    gameSound();
}

function errorSound() {
    var audio = new Audio("error.mp3");
    audio.play();
}

function checkSeq(idx) {
    if(userSeq[idx] === gameSeq[idx]){
        if(userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        errorSound();
        h2.innerHTML = `GAME OVER! Your score was <b>${level}</b>.<br> Press any key to restart`;
        let h3 = document.createElement("h3");
        highestScore = Math.max(highestScore, level);
        console.log(highestScore);
        h3.innerText = `Highest Score = ${highestScore}`;
        console.log(h3);
        h2.insertAdjacentElement("afterbegin",h3);
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}

function flashSound() {
    var audio = new Audio("clickSound.wav");
    audio.play();
}


function btnPress() {
    userFlash(this);
    flashSound();
    userColor = this.getAttribute("id");
    userSeq.push(userColor);
    checkSeq(userSeq.length - 1);
    console.log(userSeq);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    start = false;
    level = 0;
    gameSeq = [];
    userSeq = [];
}