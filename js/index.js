

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let animateId = null;
let img = new Image();
img.src = '../images/sprite.png'; // Loads player
let carImg = new Image();
carImg.src = './images/car.png'; //Loads the car

let lightCounter = 0;
let lightSwitch = false;
let lightTime = 100;

//Sprite Facing Y coordinates
const faceUp = 520;
const faceLeft = 580;
const faceDown = 650;
const faceRight = 710;

// Initial values for Step Function
let currentLoopIndex = 0;
let frameCount = 0;

//Functionality
let player = {
  //This is your player object
  sx: 10,
  sy: 710,
  sw: 40,
  sh: 60,
  x: 0,
  y: 190,
  w: 40,
  h: 60,
  image: img,
};

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

const movement = [
  10,
  75,
  10,
  140,
  75,
  205,
  140,
  265,
  205,
  330,
  265,
  395,
  460,
  525,
];

function faceDirection(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(
    img,
    frameX,
    frameY,
    player.sw,
    player.sh,
    canvasX,
    canvasY,
    player.sw,
    player.sh
  );
  player.sx = frameX;
  player.sy = frameY;
  player.x = canvasX;
  player.y = canvasY;
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



function drawPlayer(){
  ctx.drawImage(
    img,
    player.sx,
    player.sy,
    player.sw,
    player.sh,
    player.x,
    player.y,
    player.w,
    player.h
  );
}

function detectMove() {
  document.body.onkeydown = function (e) {
    // console.log(e)
    var speed = 2;
    switch (e.keyCode) {
      case 38:
        if (player.y <= 0) {
          console.log('Border');
        } else {
          step('up');
          player.y -= speed;
        }
        break;
      case 40:
        if (player.y === 450) {
          console.log('Border');
        } else {
          step('down');
          player.y += speed;
        }
        break;
      case 37:
        // left
        if (player.x <= 0) {
          console.log('Border');
        } else {
          step('left');
          player.x -= speed;
        }
        break;

      case 39:
        //right
        if (player.x === 650) {
          console.log('Border');
        } else {
          step('right');
          player.x += speed;
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

//Detect movement and change sprites accordingly
function step(dir) {
  frameCount++;
  if (frameCount < 5) {
    window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  

  drawPlayer()

  switch (dir) {
    case 'up':
      faceDirection(movement[currentLoopIndex], faceUp, player.x, player.y);
      break;
    case 'down':
      faceDirection(movement[currentLoopIndex], faceDown, player.x, player.y);
      break;
    case 'left':
      faceDirection(movement[currentLoopIndex], faceLeft, player.x, player.y);
      break;
    case 'right':
      faceDirection(movement[currentLoopIndex], faceRight, player.x, player.y);
      break;

    default:
      break;
  }

  //
  //
  //
  currentLoopIndex++;
  if (currentLoopIndex >= movement.length) {
    currentLoopIndex = 0;
  }
  window.requestAnimationFrame(step);
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
  // drawCar();
  step()
  detectObstacle();
  detectWin()
  detectMove();
  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  startGame();
};
