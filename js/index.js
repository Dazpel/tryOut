
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let animateId = null;
let carImg = new Image();
carImg.src = './images/car.png'; //Loads the car
let newLevel = false;
let lightCounter = 0;
let lightSwitch = false;
let lightTime = 100;
let canMove = true;
let stageCounter = 0;
let direction = ''
let img = new Image();
img.src = './images/sprite.png'; // Loads player
let contamination = 0;

const faceUp = 520;
const faceLeft = 580;
const faceDown = 650;
const faceRight = 710;
lives = 3;
let currentLoopIndex = 0;
let frameCount = 0;

let virusCount = 0;

let player = {
  //This is your player object
  sx: 10,
  sy: 710,
  sw: 40,
  sh: 60,
  x: 0,
  y: 0,
  w: 40,
  h: 60,
  image: img,
};

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

function step(dir) {
  frameCount++;
  if (frameCount < 5) {
   //window.requestAnimationFrame(step);
    return;
  }
  frameCount = 0;
  

  //drawPlayer()

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
  currentLoopIndex++;
  if (currentLoopIndex >= movement.length) {
    currentLoopIndex = 0;
  }
  //window.requestAnimationFrame(step);
}

var object = {
  x: Math.floor(Math.random()*550 + 50),
  y: Math.floor(Math.random()*200 + 50),
  w: 30,
  h: 100
}

let obstacle = []

let virus = []

var win = {
  x: 660,
  y: Math.floor(Math.random()*400 + 50),
  w: 40,
  h: 60,
  type: 'win'
}

/*var car = {
  //This is your car object
  x: 0,
  y: 0,
  w: 50,
  h: 50,
  image: carImg,
};*/

function createObstacles() {
  for(i=0; i<3; i++)
  {
    let obs = {
      x: 50 + Math.floor(Math.random()*125) + 200*i,
      y: Math.floor(Math.random()*50 + 250*(i%2)),
      w: 30,
      h: 200
    }
    obstacle.push(obs)
  }
}

function createVirus() {
  for(i=0; i<3; i++)
  {
    let obs = {
      x: 50 + Math.floor(Math.random()*125) + 200*i,
      y: Math.floor(Math.random()*50 + 250*(i%2)),
      w: 50,
      h: 50
    }
    virus.push(obs)
  }
}

function deleteObstacle(index)
{
  obstacle.splice(index,1)
}

function deleteVirus(index) {
  virus.splice(index,1)
}

function drawObstacles(obj) {
  ctx.fillStyle = 'red';
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h);
}

function drawVirusObs(obj) {
  ctx.fillStyle = 'blue';
  ctx.fillRect(obj.x, obj.y, obj.w, obj.h)
}

function winningShade() {
  ctx.fillStyle = 'blue';
  ctx.fillRect(win.x, win.y, win.w, win.h);
}

function lightsOff() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 700, 500);
}

function drawCanvas() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 700, 500);
}

function drawVirus(i) {
  ctx.fillStyle = 'rgba(255,0,0,.25)'
  ctx.fillRect(0,0,-25+i,500)
}

/*function drawCar() {
  ctx.drawImage(car.image, car.x, car.y, car.w, car.h);
}*/

function detectMove(move) {
  if(move)
  {
    switch(direction) {
      case 'left':
        if (player.x <= 0) {
          console.log('Border');
        } else {
          player.x -= 5;
        }
        break;
      case 'right':
        if (player.x === 660) {
          console.log('Border');
        } else {
          player.x += 5;
        }
        break;
      case 'up':
        if (player.y <= 0) {
          console.log('Border');
        } else {
            player.y -= 5;
        }
        break;
      case 'down':
        if (player.y === 440) {
          console.log('Border');
        } else {
          player.y += 5;
        }
        break;
      
    }
    step(direction)
  }
}

document.body.onkeydown = function (e) {
  switch (e.keyCode) {
    case 38:
      direction = 'up'
      break;
    case 40:
      direction = 'down'
      break;
    case 37:
      // left
      direction = 'left'
      break;

    case 39:
      //right
      direction = 'right'
      break;
    default:
      break;
  }
};


function detectCollision(obs) {
  // obs.map((obj) => {
  var a = { x: obs.x, y: obs.y, width: obs.w, height: obs.h }; //Our obstacles
  var b = { x: player.x, y: player.y, width: player.w, height: player.h }; //Our player
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
  
    switch(direction)
    {
      case 'left':
        if (player.x <= 0) {
          console.log('Border');
        } else {
          player.x += 5;
        }
        break;
      case 'right':
        if (player.x === 650) {
          console.log('Border');
        } else {
          player.x -= 5;
        }
        break;
      case 'up':
        if (player.y <= 0) {
          console.log('Border');
        } else {
            player.y += 5;
        }
        break;
      case 'down':
        if (player.y === 450) {
          console.log('Border');
        } else {
          player.y -= 5;
        }
        break;
    }  
  }
  // });
}

function detectVirusObsCollision (obs) {
  var a = { x: obs.x, y: obs.y, width: obs.w, height: obs.h }; //Our obstacles
  var b = { x: player.x, y: player.y, width: player.w, height: player.h }; //Our player
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
    lives--
    virus.splice(obs,1)
  }
}

function detectVirusCollision() {
  var a = { x: 0, y: 0, width: -25+virusCount, height: 500 }; //Our virus
  var b = { x: player.x, y: player.y, width: player.w, height: player.h }; //Our player
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
    contamination++
    if(contamination === 200)
    {
      lives--
      contamination = 0
    }
}
}

function detectWin() {
  var a = { x: 699, y: win.y+25, width: 1, height: 1 }; //Our obstacles
  var b = { x: player.x, y: player.y, width: player.w, height: player.h }; //Our car
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
      newLevel = true;
      win.w = 0;
      win.h = 0;
  }
}

function drawLives() {
  ctx.fillStyle = 'white'
  ctx.font = '20px serif'
  ctx.fillText(lives.toString(),player.x+17,player.y)
}

function drawContamination() {
  ctx.fillStyle = 'red'
  ctx.fillRect(player.x,player.y-10,40,10)
  ctx.fillStyle = 'green'
  ctx.fillRect(player.x,player.y-10,(40- 40*(contamination/200)),10)
}

function startGame() {
  ctx.clearRect(0, 0, 700, 500);

  drawCanvas();
  drawVirus(virusCount);
  for(i=0;i<obstacle.length;i++)
  {
    drawObstacles(obstacle[i]);
  }
  
  for(j=0;j<virus.length;j++)
  {
    drawVirusObs(virus[j])
  }
  winningShade();
  step();
  if (lightCounter % lightTime === lightTime-1) {
    lightSwitch = !lightSwitch;
  }

  if (lightSwitch) {
    lightsOff();
    lightTime = 500;
    virusCount+= .5;
    detectWin();
    detectMove(canMove);
    detectVirusCollision();
    for(i=0;i<obstacle.length;i++)
    {
      detectCollision(obstacle[i])
    }
    for(j=0;j<virus.length;j++)
    {
      detectVirusObsCollision(virus[j])
    }
    direction = ''
  } else {

    lightTime = 100;
  }

  lightCounter++;

  // drawCar();
  
  drawPlayer();
  drawLives();
  drawContamination();
  if(newLevel)
  {
    virusCount = 0
    lightSwitch = false
    lightCounter = 0
    //clear obstacle array
    for(i=0;i<obstacle.length;i++)
    {
      deleteObstacle(i)
    }
    for(j=0;j<virus.length;j++)
    {
      deleteVirus(j)
    }
    canMove = false
    if(player.x > 0)
    {
      player.x -= 10
    }
    else
    {
      //create new obstacle array
      createObstacles();
      createVirus();
      canMove = true
      newLevel = false
      win.y = Math.floor(Math.random()*400 + 50)
      win.h = 50
      win.w = 50
      
      lightCounter = 0;
    }
  }
  
  if(lives <= 0)
  {
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,700,500)
    ctx.fillStyle = "white"
    ctx.font = '50px serif'
    ctx.fillText('Game Over',250,245)
  }
  
  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  createObstacles();
  createVirus();
  startGame();
};


