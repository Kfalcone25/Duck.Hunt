const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 1100;
canvas.height = 1000;

let misses = 0
let score = 0;
let ducks = [];
let animationId;
let gameOn = false;
let initialValue;

const backgroundImg = new Image();
backgroundImg.src = "./images/backgroundnewer.jpg";

const duckImg = new Image();
duckImg.src = "./images/duckssprite.png";

let spriteWidth = 64;
let spriteHeight = 30;
class Duck {
  constructor() {
    this.width = 180;
    this.height = 100;
    this.x = canvas.width;
    this.y = Math.random() * (canvas.height - this.height);
    this.directionX = Math.random() * 10 + 7;
    this.directionY = Math.random() * 5 - 1;
    this.duckImg = duckImg;
    this.frameX = 7;
    this.frameY = 1;
  }
  update() {
    this.x -= this.directionX;
  }
  draw() {
    ctx.drawImage(
      duckImg,
      this.frameX * spriteWidth,
      this.frameY * spriteHeight,
      spriteWidth,
      spriteHeight,
      this.x,
      this.y,
      spriteWidth,
      spriteHeight
    );
  }
}

let frameCount = 1;

window.addEventListener("click", function (e) {
  function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width, // relationship bitmap vs. element for x
      scaleY = canvas.height / rect.height; // relationship bitmap vs. element for y

    return {
      x: (evt.clientX - rect.left) * scaleX, // scale mouse coordinates after they have
      y: (evt.clientY - rect.top) * scaleY, // been adjusted to be relative to element
    };
  }
  //Mouse click event on Duck

  canvas.addEventListener("click", (event) => {
    const mouse = getMousePos(canvas, event);
    console.log(mouse.x, mouse.y);

    for (let i = 0; i < ducks.length; i++) {
      // console.log(ducks[i].x, ducks[i].width, "DUCK PROPERTIES")
      if (
        mouse.x >= ducks[i].x &&
        mouse.x <= ducks[i].x + ducks[i].width &&
        mouse.y >= ducks[i].y &&
        mouse.y <= ducks[i].y + ducks[i].height
      ) {
        console.log("Duck is dead");
        ducks.splice(i, 1);
        score++;
      }
    }
  });
});
// Check if the click was on a duck

// function missedShots() {
//   if (getMousePos !== ducks[i] ) {
//     misses++
//   }
//   // if(misses++) {
//   //   ctx.
//   // }
// }

function winCondition() {
  if (score >= 10) {
    gameOver()
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundImg, 0, 0, 1100, 1000);
  // if(frameCount % 90 === 0) {
  //     ducks.push(duck)
  winCondition();
  for (let i = 0; i < ducks.length; i++) {
    ducks[i].draw();
    ducks[i].update();
    if (Math.floor(ducks[i].x) < canvas.width - 1100) {
      ducks.splice(i, 16);
    }
    if (frameCount % 10 == 0) {
      ducks[i].frameX--;
      if (ducks[i].frameX === 0) {
        ducks[i].frameX = 7;
      }
    }
  }
  frameCount++;
  ctx.font = "50px serif";
  ctx.fillText(`${score}`, canvas.width - 150, 85);

  
}

function gameOver() {
  gameOn = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  clearInterval(animationId);
  ctx.fillStyle = 'white'
  ctx.fillText('Game Over!', 400, 482)
  if (clearRect === true) {
    clearTimeout(score)
  }
  // clearcanvas and draw gameOver
}

function startGame() {
  setInterval(() => {
    ducks.push(new Duck());
    console.log(ducks);
  }, 1000);

  if (!gameOn) {
    animationId = setInterval(animate, 16);
    gameOn = true;
  }
  animate();
}

window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };
};
