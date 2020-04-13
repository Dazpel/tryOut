// let player = new Image();
// player.src = 'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';

// img.onload = function() {
//   init();
// };

// function init() {
//   window.requestAnimationFrame(step);
//   drawFrame(0, 0, 0, 0);
//   drawFrame(1, 0, scaledWidth, 0);
//   drawFrame(0, 0, scaledWidth * 2, 0);
//   drawFrame(2, 0, scaledWidth * 3, 0);
// }

// function drawFrame(frameX, frameY, canvasX, canvasY) {
//   ctx.fillStyle = 'green'
//     ctx.fillRect(0,0, 700, 500)

//     ctx.drawImage(img,
//                   frameX * width, frameY * height, width, height,
//                   canvasX, canvasY, scaledWidth, scaledHeight);
//   }

// const scale = 2;
// const width = 16;
// const height = 18;
// const scaledWidth = scale * width;
// const scaledHeight = scale * height;

// const cycleLoop = [0, 1, 0, 2];
// let currentLoopIndex = 0;
// let frameCount = 0;
// let currentDirection = 0;

// function step() {
//   frameCount++;
//   if (frameCount < 15) {
//     window.requestAnimationFrame(step);
//     return;
//   }
//   frameCount = 0;
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawFrame(cycleLoop[currentLoopIndex], 0, 0, 0);
//   currentLoopIndex++;

//   if (currentLoopIndex >= cycleLoop.length) {
//     currentLoopIndex = 0;
//     currentDirection++; // Next row/direction in the sprite sheet
//   }
//   // Reset to the "down" direction once we've run through them all
//   if (currentDirection >= 4) {
//     currentDirection = 0;
//   }
//   window.requestAnimationFrame(step);
// }

// function drawFrame(frameX, frameY, canvasX, canvasY) {

//     ctx.drawImage(img,
//                   frameX * width, frameY * height, width, height,
//                   canvasX, canvasY, scaledWidth, scaledHeight);
//   }

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let animateId = null;
let carImg = new Image();
carImg.src = './images/car.png'; //Loads the car

let lightCounter = 0;
let lightSwitch = false;
let lightTime = 100;

var car = {
  //This is your car object
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  image: carImg,
};

// function drawVirus() {
//   ctx.fillStyle = 'red';
//   ctx.fillRect(300, 0, 30, 100);
// }
let safeBox = {
  x: 650,
  y: 220,
  w: 50,
  h: 60
}
function winningShade() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(safeBox.x, safeBox.y, safeBox.w, safeBox.h);
}

function lightsOff() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 700, 500);
}

function drawCanvas() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 700, 500);
}

function drawCar() {
  ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
}

function detectMove() {
  document.body.onkeydown = function (e) {
    // console.log(e)
    switch (e.keyCode) {
      case 38:
        if (car.y <= 0) {
          console.log('Border');
        } else {
          car.y -= 10;
        }
        break;
      case 40:
        if (car.y === 450) {
          console.log('Border');
        } else {
          car.y += 10;
        }
        break;
      case 37:
        // left
        if (car.x <= 0) {
          console.log('Border');
        } else {
          car.x -= 10;
        }
        break;

      case 39:
        //right
        if (car.x === 650) {
          console.log('Border');
        } else {
          car.x += 10;
        }
        break;
      default:
        break;
    }
  };
 }


let obstacle = [
  {
    x: 100,
    y: Math.floor(Math.random()* 50),
    w: 30,
    h: 200
  },
  {
    x: 300,
    y: Math.floor(Math.random()* 50 + 250),
    w: 30,
    h: 200
  },
  {
    x: 450,
    y: Math.floor(Math.random()* 50),
    w: 30,
    h: 200
  }

]

function drawObstacle() {
  for(i = 0; i < obstacle.length; i++){
  ctx.fillStyle = 'red';
  ctx.fillRect(obstacle[i].x, obstacle[i].y, obstacle[i].w, obstacle[i].h); 
  }
}

function deleteVirus(index){  // deletes virus- add to collision
  virus.splice(index, 1); // add to detect virus function
}

let life = 3 // number-- evertime character hits virus

function detectObstacle(obs) {
  // obs.map((obj) => {
  var insideSafe = { x: 699, y: 220, width: 50, height: 10 }; //Our obstacles
  var b = { x: car.x, y: car.y, width: car.w, height: car.h }; //Our car
  for(i = 0; i < obstacle.length; i++){
  if (
    obstacle[i].x < b.x + b.width &&
    obstacle[i].x + obstacle[i].w > b.x &&
    obstacle[i].y < b.y + b.height &&
    obstacle[i].y + obstacle[i].h > b.y
  ){
    console.log("Obstacle!")
  }
  }
}
function detectWin(){
var insideSafe = { x: 699, y: 240, width: 50, height: 10 }; //Our obstacles
  var b = { x: car.x, y: car.y, width: car.w, height: car.h };
if(
    insideSafe.x < b.x + b.width &&
    insideSafe.x + insideSafe.width > b.x &&
    insideSafe.y < b.y + b.height &&
    insideSafe.y + insideSafe.height > b.y
){
  console.log('Safe!')
}
}
function startGame() {
  ctx.clearRect(0, 0, 700, 500);

  drawCanvas();

  drawObstacle();

  // if (lightCounter % lightTime === 0) {
  //   lightSwitch = !lightSwitch;
  // }

  // if (lightSwitch) {
  //   lightsOff();
  //   lightTime = 500;
  // } else {
  //   lightTime = 100;
  // }

  // lightCounter++;

  winningShade();
  drawCar();
  detectObstacle();
  detectWin()
  detectMove();
  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  startGame();
};
