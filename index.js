const canvas = document.getElementById('canvas1')
const ctx = canvas.getContext('2d');
canvas.width = 1100;
canvas.height = 1000;

let ducks = []
let animationId;
let gameOn = false;
let initialValue

const backgroundImg = new Image();
backgroundImg.src = "./images/backgroundnewer.jpg";

const duckImg = new Image();
duckImg.src = './images/duck1.png'

class Duck {
    constructor() {
        this.width = 115;
        this.height = 80;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 2;
        this.directionY = Math.random() * 5 - 1;
        this.duckImg = duckImg
    };
    update() {
        this.x -= this.directionX;
    }
    draw() {
        ctx.drawImage(this.duckImg, this.x, this.y, this.width, this.height)
    }
};


const duck = new Duck();
let frameCount = 1;


function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(backgroundImg, 0, 0, 1100, 1000)
    // if(frameCount % 90 === 0) {
    //     ducks.push(duck)
    for(let i=0; i<ducks.length;i++) {
        ducks[i].draw();
        ducks[i].update();
    }
    // duck.draw()
    // duck.update(); 
};


function gameOver() {
    gameOn = false
    clearInterval(animationId)
    // clearcanvas and draw gameOver
};

function startGame() {
    setInterval(() => {
        ducks.push(new Duck());
        console.log(ducks)
      }, 3000);
    
    if (!gameOn) {
        animationId = setInterval(animate, 16)
        gameOn = true
    };
    animate();
};

window.onload = () => {
    document.getElementById("start-button").onclick = () => {
        startGame();
    };
};

