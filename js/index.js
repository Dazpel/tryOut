let introMusic = document.getElementById('start');
let playingMusic = document.getElementById('playing');
let stepMusic = document.getElementById('step');
let successMusic = document.getElementById('success');

let gameTracker = {
  name: 'Corona(The Beer)',
  country: 'Colombia',
  level: 1,
  hp: 100,
  lysols: 3,
  cFlag: '../images/colombia-flag-country.png',
};

introMusic.play();
const begin = () => {
  introMusic.pause();
  playingMusic.play();

  let trackDiv = document.getElementById('gameTracker');
  let initVal = `<div id="gInfo"><h1>${gameTracker.country}: Level ${gameTracker.level}/5</h1>
  <h3>${gameTracker.name} HP: ${gameTracker.hp} - Lysols Left: ${gameTracker.lysols}</h3></div></div>
  <div id="gFlag"><img src="${gameTracker.cFlag}" alt=""></div> 
</div>`;
  trackDiv.innerHTML = initVal;

  document.getElementById('mainPage').style.display = 'none';

  document.getElementById('game-board').style.display = 'grid';

  document.getElementById(
    'body'
  ).style.backgroundImage = `url('../images/bogota.jpg')`;
 
};

let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let animateId = null;
let logImg = new Image();

//  NEW IMAGES
logImg.src = '/images/log.png'
let colCanvas = new Image();
colCanvas.src = '/images/mat to colombia.jpg'
let montCanvas = new Image();
montCanvas.src = '/images/map to montenegro.jpg'
let grceCanvas = new Image();
grceCanvas.src = '/images/map to greece.jpg'
let treeImg = new Image();
treeImg.src = '/images/tree.png'
let rockImg = new Image();
rockImg.src = '/images/rocks.png'
let mountainImg = new Image();
mountainImg.src = '/images/mountain.png'
let metalFloorCanvas = new Image();
metalFloorCanvas.src = '/images/metalfloor.png'
let column = new Image();
column.src = '/images/greek-column.png'

let newLevel = false;

let lightCounter = 0;
let lightSwitch = false;
let lightTime = 100;
let canMove = true;
let stageCounter = 0;
let direction = '';
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

function drawPlayer() {
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
  x: Math.floor(Math.random() * 550 + 50),
  y: Math.floor(Math.random() * 200 + 50),
  w: 30,
  h: 100,
};

let obstacle = [];

let virus = []

var win = {
  x: 660,
  y: Math.floor(Math.random() * 400 + 50),
  w: 40,
  h: 60,
  type: 'win',
};

function createObstacles() {
  for (i = 0; i < 3; i++) {
    let obs = {

      x: 50 + Math.floor(Math.random()*125) + 200*i,
      y: Math.floor(Math.random()*50 + 250*(i%2)),

      x: 50 + Math.floor(Math.random() * 150) + 200 * i,
      y: Math.floor(Math.random() * 50 + 250 * (i % 2)),

      w: 30,
      h: 200,
    };
    obstacle.push(obs);
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
=======
function deleteObstacle(index) {
  obstacle.splice(index, 1);

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
let canvasSize = {
  x:0,
  y:0,
  w:700,
  h:500,
}

function drawColCanvas() {
  ctx.drawImage(colCanvas, canvasSize.x, canvasSize.y, canvasSize.w, canvasSize.h)
}

function drawMontCanvas() {
  ctx.drawImage(montCanvas, canvasSize.x, canvasSize.y, canvasSize.w, canvasSize.h)
}

function drawGrceCanvas() {
  ctx.drawImage(grceCanvas, canvasSize.x, canvasSize.y, canvasSize.w, canvasSize.h)
}
function drawMetalFloor() {
  ctx.drawImage(metalFloorCanvas, canvasSize.x, canvasSize.y, canvasSize.w, canvasSize.h)
}

function drawTree() {
  ctx.drawImage(treeImg, 320, 200, 70, 90)
}

function drawMountain(){
  ctx.drawImage(mountainImg, 320, 300, 70, 90)
}

function drawRocks() {
  ctx.drawImage(rockImg, 320, 30, 70, 90)
}


function drawVirus(i) {
  ctx.fillStyle = 'rgba(255,0,0,.25)'
  ctx.fillRect(0,0,-25+i,500)
}



function detectMove(move) {
  
  if (move) {
    switch (direction) {
      case 'left':
        stepMusic.play()
        if (player.x <= 0) {
          console.log('Border');
        } else {
          player.x -= 5;
        }
        break;
      case 'right':
        stepMusic.play()
        if (player.x === 660) {
          console.log('Border');
        } else {
          player.x += 5;
        }
        break;
      case 'up':
        stepMusic.play()
        if (player.y <= 0) {
          console.log('Border');
        } else {
          player.y -= 5;
        }
        break;
      case 'down':
        stepMusic.play()
        if (player.y === 440) {
          console.log('Border');
        } else {
          player.y += 5;
        }
        break;
    }

  };
 }


let obstacle = [
  {
    x: 100,
    y: Math.floor(Math.random()* 300),
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
    y: Math.floor(Math.random()* 300),
    w: 30,
    h: 200
  }

]

function drawLog() {
  for(i = 0; i < obstacle.length; i++){
  ctx.drawImage(logImg, obstacle[i].x, obstacle[i].y, obstacle[i].w, obstacle[i].h); 
  }
}

function drawColumn() {
  for(i = 0; i < obstacle.length; i++){
  ctx.drawImage(column, obstacle[i].x, obstacle[i].y, 60, obstacle[i].h); 

    step(direction);
    

  }
}

document.body.onkeydown = function (e) {
  
  switch (e.keyCode) {
    case 38:
      direction = 'up';
      break;
    case 40:
      direction = 'down';
      break;
    case 37:
      // left
      direction = 'left';
      break;

    case 39:
      //right
      direction = 'right';
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

    switch (direction) {
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
  var a = { x: 699, y: win.y + 25, width: 1, height: 1 }; //Our obstacles
  var b = { x: player.x, y: player.y, width: player.w, height: player.h }; //Our car
  if (
    a.x < b.x + b.width &&
    a.x + a.width > b.x &&
    a.y < b.y + b.height &&
    a.y + a.height > b.y
  ) {
    // collision detected!
    playingMusic.pause()
    successMusic.play()
    newLevel = true;
    win.w = 0;
    win.h = 0;
   setInterval(() => {
    playingMusic.play()
   }, 1700);
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


  drawColCanvas();
  drawLog();
  drawTree();
  drawMountain()
  drawRocks();
  
  stepMusic.pause()
  drawCanvas();

  drawVirus(virusCount);
  for(i=0;i<obstacle.length;i++)
  {
    drawObstacles(obstacle[i]);
  }
  
  for(j=0;j<virus.length;j++)
  {
    drawVirusObs(virus[j])

  for (i = 0; i < obstacle.length; i++) {
    borders(obstacle[i]);

  }
  winningShade();
  step();
  if (lightCounter % lightTime === lightTime - 1) {
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


    detectWin();
    detectMove(canMove);
    for (i = 0; i < obstacle.length; i++) {
      detectCollision(obstacle[i]);
    }
    direction = '';

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


  if (newLevel) {
    lightSwitch = false;
    lightCounter = 0;
    //clear obstacle array
    for (i = 0; i < obstacle.length; i++) {
      deleteObstacle(i);

    }
    canMove = false;
    if (player.x > 0) {
      player.x -= 10;
    } else {
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
  

      canMove = true;
      newLevel = false;
      win.y = Math.floor(Math.random() * 400 + 50);
      win.h = 50;
      win.w = 50;

      lightCounter = 0;
    }
  }


  animateId = window.requestAnimationFrame(startGame); //Game rendering -infinite loop that goes super fast
}

window.onload = () => {
  createObstacles();
  createVirus();
  startGame();
};
